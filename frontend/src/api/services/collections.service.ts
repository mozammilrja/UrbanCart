import apiClient from '../core/client';
import { ENDPOINTS } from '../core/endpoints';

export interface Collection {
  id: string;
  name: string;
  description: string;
  slug: string;
  image: string;
  productCount: number;
  createdAt: string;
  updatedAt: string;
}

export const collectionsService = {
  getAll: async (): Promise<Collection[]> => {
    return apiClient.get<Collection[]>(ENDPOINTS.COLLECTIONS.LIST);
  },

  getById: async (id: string): Promise<Collection> => {
    return apiClient.get<Collection>(ENDPOINTS.COLLECTIONS.DETAIL(id));
  },
};

export default collectionsService;
