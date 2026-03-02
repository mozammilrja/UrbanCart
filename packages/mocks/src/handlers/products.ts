import { http, HttpResponse, delay } from 'msw';
import {
  products,
  getProductById,
  getProductBySlug,
  getFeaturedProducts,
  getProductsByCategory,
  searchProducts,
} from '../data/products';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const productHandlers = [
  // Get all products with filtering and pagination
  http.get(`${BASE_URL}/products`, async ({ request }) => {
    await delay(300);
    
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '12');
    const category = url.searchParams.get('category');
    const search = url.searchParams.get('search');
    const sort = url.searchParams.get('sort') || 'featured';
    const featured = url.searchParams.get('featured');
    
    let filteredProducts = [...products];
    
    // Apply category filter
    if (category) {
      filteredProducts = filteredProducts.filter((p) => p.category.slug === category);
    }
    
    // Apply search filter
    if (search) {
      filteredProducts = searchProducts(search);
    }
    
    // Apply featured filter
    if (featured === 'true') {
      filteredProducts = filteredProducts.filter((p) => p.isFeatured);
    }
    
    // Apply sorting
    switch (sort) {
      case 'price-asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'rating':
        filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default: // featured
        filteredProducts.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    return HttpResponse.json({
      success: true,
      data: paginatedProducts,
      pagination: {
        page,
        limit,
        total: filteredProducts.length,
        totalPages: Math.ceil(filteredProducts.length / limit),
        hasMore: endIndex < filteredProducts.length,
      },
    });
  }),

  // Get single product by ID
  http.get(`${BASE_URL}/products/:id`, async ({ params }) => {
    await delay(200);
    
    const { id } = params;
    const product = getProductById(id as string) || getProductBySlug(id as string);
    
    if (!product) {
      return HttpResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return HttpResponse.json({
      success: true,
      data: product,
    });
  }),

  // Get featured products
  http.get(`${BASE_URL}/products/featured`, async () => {
    await delay(200);
    
    return HttpResponse.json({
      success: true,
      data: getFeaturedProducts(),
    });
  }),

  // Get products by category
  http.get(`${BASE_URL}/categories/:slug/products`, async ({ params }) => {
    await delay(250);
    
    const { slug } = params;
    const categoryProducts = getProductsByCategory(slug as string);
    
    return HttpResponse.json({
      success: true,
      data: categoryProducts,
    });
  }),
];
