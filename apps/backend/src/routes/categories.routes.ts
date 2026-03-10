import { Router, Request, Response } from 'express';
import { Category, Product } from '../models/index.js';
import { AppError, asyncHandler } from '../middleware/error.middleware.js';
import { sendSuccess, parsePagination, buildPagination } from '../utils/response.js';

const router: ReturnType<typeof Router> = Router();

// Get all categories with tree structure
router.get('/', asyncHandler(async (_req: Request, res: Response) => {
  const categories = await Category.find({ isActive: true })
    .sort('order name')
    .lean();

  // Build tree structure
  const buildTree = (items: any[], parentId: null | string = null): any[] => {
    return items
      .filter((item) => {
        const itemParent = item.parent?.toString() || null;
        return itemParent === parentId;
      })
      .map((item) => ({
        ...item,
        children: buildTree(items, item._id.toString()),
      }));
  };

  const tree = buildTree(categories);

  sendSuccess(res, { categories: tree });
}));

// Get category by slug with products
router.get('/:slug', asyncHandler(async (req: Request, res: Response) => {
  const { sort = '-createdAt' } = req.query;

  const category = await Category.findOne({ slug: req.params.slug, isActive: true })
    .populate('children')
    .lean();

  if (!category) {
    throw new AppError('Category not found', 404, 'CATEGORY_NOT_FOUND');
  }

  const { page, limit, skip } = parsePagination(req.query as any);

  // Get products from this category and all descendants
  const categoryIds = [
    category._id,
    ...((category as any).children || []).map((c: any) => c._id),
  ];

  const [products, total] = await Promise.all([
    Product.find({ category: { $in: categoryIds }, isActive: true })
      .populate('category', 'name slug')
      .select('-variants.images')
      .sort(sort as string)
      .skip(skip)
      .limit(limit)
      .lean(),
    Product.countDocuments({ category: { $in: categoryIds }, isActive: true }),
  ]);

  sendSuccess(res, {
    category,
    products,
    pagination: buildPagination(page, limit, total),
  });
}));

export default router;
