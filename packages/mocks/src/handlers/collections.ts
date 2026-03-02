import { http, HttpResponse, delay } from 'msw';
import {
  collections,
  getCollectionById,
  getCollectionBySlug,
  getFeaturedCollections,
  getActiveCollections,
} from '../data/collections';
import { products } from '../data/products';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const collectionHandlers = [
  // Get all collections
  http.get(`${BASE_URL}/collections`, async ({ request }) => {
    await delay(250);
    
    const url = new URL(request.url);
    const featured = url.searchParams.get('featured');
    
    let filteredCollections = getActiveCollections();
    
    if (featured === 'true') {
      filteredCollections = getFeaturedCollections();
    }
    
    return HttpResponse.json({
      success: true,
      data: filteredCollections,
    });
  }),

  // Get single collection by ID or slug
  http.get(`${BASE_URL}/collections/:id`, async ({ params }) => {
    await delay(200);
    
    const { id } = params;
    const collection = getCollectionById(id as string) || getCollectionBySlug(id as string);
    
    if (!collection) {
      return HttpResponse.json(
        { success: false, error: 'Collection not found' },
        { status: 404 }
      );
    }
    
    return HttpResponse.json({
      success: true,
      data: collection,
    });
  }),

  // Get products in a collection
  http.get(`${BASE_URL}/collections/:id/products`, async ({ params, request }) => {
    await delay(300);
    
    const { id } = params;
    const collection = getCollectionById(id as string) || getCollectionBySlug(id as string);
    
    if (!collection) {
      return HttpResponse.json(
        { success: false, error: 'Collection not found' },
        { status: 404 }
      );
    }
    
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '12');
    
    // Get products in this collection
    const collectionProducts = products.filter((p) =>
      p.collections?.some((c) => {
        if (typeof c === 'string') {
          return c === collection.id || c === collection.slug;
        }
        return c.id === collection.id || c.slug === collection.slug;
      })
    );
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = collectionProducts.slice(startIndex, endIndex);
    
    return HttpResponse.json({
      success: true,
      data: paginatedProducts,
      pagination: {
        page,
        limit,
        total: collectionProducts.length,
        totalPages: Math.ceil(collectionProducts.length / limit),
        hasMore: endIndex < collectionProducts.length,
      },
    });
  }),
];
