import { getAccessToken, refreshAccessToken, isTokenExpired } from '../auth/token-manager';

type RequestInterceptor = (config: RequestInit) => RequestInit | Promise<RequestInit>;
type ResponseInterceptor = (response: Response) => Response | Promise<Response>;

const requestInterceptors: RequestInterceptor[] = [];
const responseInterceptors: ResponseInterceptor[] = [];

export const addRequestInterceptor = (interceptor: RequestInterceptor) => {
  requestInterceptors.push(interceptor);
};

export const addResponseInterceptor = (interceptor: ResponseInterceptor) => {
  responseInterceptors.push(interceptor);
};

export const applyRequestInterceptors = async (config: RequestInit): Promise<RequestInit> => {
  let result = config;
  for (const interceptor of requestInterceptors) {
    result = await interceptor(result);
  }
  return result;
};

export const applyResponseInterceptors = async (response: Response): Promise<Response> => {
  let result = response;
  for (const interceptor of responseInterceptors) {
    result = await interceptor(result);
  }
  return result;
};

// Auth interceptor - adds token to requests
addRequestInterceptor(async (config) => {
  const token = getAccessToken();

  if (token && isTokenExpired(token)) {
    try {
      await refreshAccessToken();
    } catch {
      // Token refresh failed, continue without auth
    }
  }

  const currentToken = getAccessToken();
  if (currentToken) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${currentToken}`,
      },
    };
  }

  return config;
});

// Response interceptor - handle 401 errors
addResponseInterceptor(async (response) => {
  if (response.status === 401) {
    try {
      await refreshAccessToken();
      // Could retry the original request here
    } catch {
      // Redirect to login or handle auth failure
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
  }
  return response;
});
