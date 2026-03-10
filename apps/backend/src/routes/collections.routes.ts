import { Router, Request, Response } from 'express';
import { Collection, Product } from '../models/index.js';
import { AppError, asyncHandler } from '../middleware/error.middleware.js';
import { transformCollection, transformCollections, transformProducts } from '../utils/transforms.js';
import { sendSuccess, sendPaginated, buildPagination, parsePagination } from '../utils/response.js';

const router: ReturnType<typeof Router> = Router();

// Get all collections
router.get('/', asyncHandler(async (req: Request, res: Response) => {
  const { type } = req.query;
  
  const query: any = { isActive: true };
  if (type) query.type = type;

  const collections = await Collection.find(query)
    .sort('order -createdAt')
    .lean();

  const featured = req.query.featured === 'true';
  const filtered = featured ? collections.filter((c: any) => c.isFeatured) : collections;

  sendSuccess(res, transformCollections(filtered as any));
}));

// Get live drops
router.get('/drops', asyncHandler(async (_req: Request, res: Response) => {
  const now = new Date();
  
  const drops = await Collection.find({
    type: 'drop',
    isActive: true,
    isLive: true,
    dropDate: { $lte: now },
    $or: [
      { endDate: { $gte: now } },
      { endDate: null },
    ],
  })
    .sort('-dropDate')
    .lean();

  sendSuccess(res, { drops });
}));

// Get upcoming drops
router.get('/drops/upcoming', asyncHandler(async (_req: Request, res: Response) => {
  const now = new Date();
  
  const drops = await Collection.find({
    type: 'drop',
    isActive: true,
    dropDate: { $gt: now },
  })
    .sort('dropDate')
    .lean();

  sendSuccess(res, { drops });
}));


// Get collection by slug (specific endpoint)
router.get('/slug/:slug', asyncHandler(async (req: Request, res: Response) => {
  const collection = await Collection.findOne({ 
    slug: req.params.slug, 
    isActive: true 
  }).lean();

  if (!collection) {
    throw new AppError('Collection not found', 404, 'COLLECTION_NOT_FOUND');
  }

  // Get products in this collection — use both stored IDs and product.collections ref
  const productIds = collection.products || [];
  const products = await Product.find({
    $or: [
      { _id: { $in: productIds } },
      { collections: collection._id },
    ],
    isActive: true,
  })
    .populate('category', 'name slug')
    .lean();

  sendSuccess(res, {
    ...transformCollection(collection as any),
    products: transformProducts(products as any),
  });
}));

// Get products in a collection by slug
router.get('/:slug/products', asyncHandler(async (req: Request, res: Response) => {
  const { sort = '-createdAt' } = req.query;

  const collection = await Collection.findOne({ 
    slug: req.params.slug, 
    isActive: true 
  }).lean();

  if (!collection) {
    throw new AppError('Collection not found', 404, 'COLLECTION_NOT_FOUND');
  }

  const { page, limit, skip } = parsePagination(req.query as any);
  const productIds = collection.products || [];

  const productQuery = {
    $or: [
      { _id: { $in: productIds } },
      { collections: collection._id },
    ],
    isActive: true,
  };

  const [products, total] = await Promise.all([
    Product.find(productQuery)
      .populate('category', 'name slug')
      .sort(sort as string)
      .skip(skip)
      .limit(limit)
      .lean(),
    Product.countDocuments(productQuery),
  ]);

  sendPaginated(res, transformProducts(products as any), buildPagination(page, limit, total));
}));

// Get collection by slug with products
router.get('/:slug', asyncHandler(async (req: Request, res: Response) => {
  const { sort = '-createdAt' } = req.query;

  const collection = await Collection.findOne({ 
    slug: req.params.slug, 
    isActive: true 
  }).lean();

  if (!collection) {
    throw new AppError('Collection not found', 404, 'COLLECTION_NOT_FOUND');
  }

  // Check if drop is accessible
  if (collection.type === 'drop' && collection.dropDate) {
    const now = new Date();
    if (!collection.isLive || collection.dropDate > now) {
      throw new AppError('This drop is not yet available', 403, 'DROP_NOT_LIVE');
    }
  }

  const { page, limit, skip } = parsePagination(req.query as any);

  const [products, total] = await Promise.all([
    Product.find({ collections: collection._id, isActive: true })
      .populate('category', 'name slug')
      .select('-variants.images')
      .sort(sort as string)
      .skip(skip)
      .limit(limit)
      .lean(),
    Product.countDocuments({ collections: collection._id, isActive: true }),
  ]);

  sendSuccess(res, {
    collection: transformCollection(collection as any),
    products: transformProducts(products as any),
    pagination: buildPagination(page, limit, total),
  });
}));

export default router;
