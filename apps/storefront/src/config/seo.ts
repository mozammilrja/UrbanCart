/**
 * Default SEO Configuration
 */

import { APP_NAME, APP_DESCRIPTION, APP_URL } from './constants';

export const defaultSEO = {
  title: APP_NAME,
  titleTemplate: `%s | ${APP_NAME}`,
  defaultTitle: `${APP_NAME} - ${APP_DESCRIPTION}`,
  description: 'Discover premium Indian streetwear at APOSTLE. Exclusive drops, limited editions, and community-driven fashion.',
  canonical: APP_URL,
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: APP_URL,
    siteName: APP_NAME,
    title: `${APP_NAME} - ${APP_DESCRIPTION}`,
    description: 'Discover premium Indian streetwear at APOSTLE. Exclusive drops, limited editions, and community-driven fashion.',
    images: [
      {
        url: `${APP_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: APP_NAME,
      },
    ],
  },
  twitter: {
    handle: '@apostle_in',
    site: '@apostle_in',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'theme-color',
      content: '#000000',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
  ],
};

/**
 * Generate page SEO
 */
export function generatePageSEO(
  title: string,
  description?: string,
  image?: string
) {
  return {
    title,
    description: description || defaultSEO.description,
    openGraph: {
      ...defaultSEO.openGraph,
      title: `${title} | ${APP_NAME}`,
      description: description || defaultSEO.description,
      images: image
        ? [{ url: image, width: 1200, height: 630, alt: title }]
        : defaultSEO.openGraph.images,
    },
  };
}

/**
 * Generate product SEO
 */
export function generateProductSEO(product: {
  name: string;
  description?: string;
  images: string[];
  price: number;
  stock: number;
}) {
  return {
    title: product.name,
    description: product.description || `Shop ${product.name} at ${APP_NAME}`,
    openGraph: {
      type: 'product',
      title: product.name,
      description: product.description || `Shop ${product.name} at ${APP_NAME}`,
      images: product.images.slice(0, 4).map((url) => ({
        url,
        width: 800,
        height: 1000,
        alt: product.name,
      })),
    },
    additionalMetaTags: [
      { property: 'product:price:amount', content: product.price.toString() },
      { property: 'product:price:currency', content: 'INR' },
      {
        property: 'product:availability',
        content: product.stock > 0 ? 'in stock' : 'out of stock',
      },
    ],
  };
}
