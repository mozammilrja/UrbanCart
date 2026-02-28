import dynamic from 'next/dynamic';

export const ProductPage = dynamic(
  () => import('../features/product/pages/ProductPage').then((mod) => mod.ProductPage),
  {
    loading: () => <div className="animate-pulse min-h-screen bg-muted" />,
  }
);
