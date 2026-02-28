import dynamic from 'next/dynamic';

export const ShopPage = dynamic(
  () => import('../features/shop/pages/ShopPage').then((mod) => mod.ShopPage),
  {
    loading: () => <div className="animate-pulse min-h-screen bg-muted" />,
  }
);
