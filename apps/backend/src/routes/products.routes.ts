import { Router, Request, Response } from 'express';
import { Product } from '../models/index.js';
import { AppError, asyncHandler } from '../middleware/error.middleware.js';
import { optionalAuth } from '../middleware/auth.middleware.js';
import { transformProduct, transformProducts } from '../utils/transforms.js';
import { sendSuccess, sendPaginated, buildPagination, parsePagination } from '../utils/response.js';

const router: ReturnType<typeof Router> = Router();

interface ProductQuery {
  page?: string;
  limit?: string;
  sort?: string;
  category?: string;
  collection?: string;
  minPrice?: string;
  maxPrice?: string;
  search?: string;
  sizes?: string;
  colors?: string;
}

// Get all products with filtering, pagination, sorting
router.get('/', optionalAuth, asyncHandler(async (req: Request<{}, {}, {}, ProductQuery>, res: Response) => {
  const {
    sort = '-createdAt',
    category,
    collection,
    minPrice,
    maxPrice,
    search,
    sizes,
    colors,
  } = req.query;

  const query: any = { isActive: true };

  if (category) query.category = category;
  if (collection) query.collections = collection;
  if (minPrice || maxPrice) {
    query.basePrice = {};
    if (minPrice) query.basePrice.$gte = Number(minPrice);
    if (maxPrice) query.basePrice.$lte = Number(maxPrice);
  }
  if (search) {
    query.$text = { $search: search };
  }
  if (sizes) {
    query['variants.size'] = { $in: sizes.split(',') };
  }
  if (colors) {
    query['variants.color'] = { $in: colors.split(',') };
  }

  // Map frontend sort options to MongoDB sort
  let sortQuery = sort;
  if (sort === 'price_asc') sortQuery = 'basePrice';
  else if (sort === 'price_desc') sortQuery = '-basePrice';
  else if (sort === 'newest') sortQuery = '-createdAt';
  else if (sort === 'popular') sortQuery = '-rating.count';

  const { page, limit, skip } = parsePagination({ page: req.query.page, limit: req.query.limit });

  const [products, total] = await Promise.all([
    Product.find(query)
      .populate('category', 'name slug')
      .sort(sortQuery)
      .skip(skip)
      .limit(limit)
      .lean(),
    Product.countDocuments(query),
  ]);

  sendPaginated(res, transformProducts(products as any), buildPagination(page, limit, total));
}));

// Get featured products
router.get('/featured', asyncHandler(async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 8;
  const products = await Product.find({ isActive: true, isFeatured: true })
    .populate('category', 'name slug')
    .limit(limit)
    .lean();

  sendSuccess(res, transformProducts(products as any));
}));

// Get new arrivals
router.get('/new-arrivals', asyncHandler(async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 8;
  const products = await Product.find({ isActive: true })
    .populate('category', 'name slug')
    .sort('-createdAt')
    .limit(limit)
    .lean();

  sendSuccess(res, transformProducts(products as any));
}));

// Get best sellers
router.get('/best-sellers', asyncHandler(async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 8;
  const products = await Product.find({ isActive: true })
    .populate('category', 'name slug')
    .sort('-rating.count -rating.average')
    .limit(limit)
    .lean();

  sendSuccess(res, transformProducts(products as any));
}));

// Search products
router.get('/search', asyncHandler(async (req: Request, res: Response) => {
  const { q, search, ...filters } = req.query as any;
  const searchTerm = q || search;
  
  if (!searchTerm) {
    return sendPaginated(res, [], buildPagination(1, 12, 0));
  }

  const query: any = {
    isActive: true,
    $text: { $search: searchTerm },
  };

  const page = Math.max(1, parseInt(filters.page) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(filters.limit) || 12));
  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    Product.find(query)
      .populate('category', 'name slug')
      .sort({ score: { $meta: 'textScore' } })
      .skip(skip)
      .limit(limit)
      .lean(),
    Product.countDocuments(query),
  ]);

  sendPaginated(res, transformProducts(products as any), buildPagination(page, limit, total));
}));

// Get single product by slug
router.get('/slug/:slug', optionalAuth, asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findOne({ slug: req.params.slug, isActive: true })
    .populate('category', 'name slug')
    .lean();

  if (!product) {
    throw new AppError('Product not found', 404, 'PRODUCT_NOT_FOUND');
  }

  sendSuccess(res, transformProduct(product as any));
}));

// Get single product by ID or slug (fallback)
router.get('/:idOrSlug', optionalAuth, asyncHandler(async (req: Request, res: Response) => {
  const { idOrSlug } = req.params;
  
  const isObjectId = /^[0-9a-fA-F]{24}$/.test(idOrSlug);
  const query = isObjectId ? { _id: idOrSlug } : { slug: idOrSlug };
  
  const product = await Product.findOne({ ...query, isActive: true })
    .populate('category', 'name slug')
    .lean();

  if (!product) {
    throw new AppError('Product not found', 404, 'PRODUCT_NOT_FOUND');
  }

  sendSuccess(res, transformProduct(product as any));
}));

// Get related products
router.get('/:id/related', asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  
  if (!product) {
    throw new AppError('Product not found', 404, 'PRODUCT_NOT_FOUND');
  }

  const relatedProducts = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
    isActive: true,
  })
    .populate('category', 'name slug')
    .limit(4)
    .lean();

  sendSuccess(res, transformProducts(relatedProducts as any));
}));

export default router;
