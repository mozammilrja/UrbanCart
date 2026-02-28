import dynamic from 'next/dynamic';

export const CartPage = dynamic(
  () => import('../features/cart/pages/CartPage').then((mod) => mod.CartPage),
  {
    loading: () => <div className="animate-pulse min-h-screen bg-muted" />,
  }
);
