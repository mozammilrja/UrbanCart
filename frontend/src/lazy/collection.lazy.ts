import dynamic from 'next/dynamic';

export const CollectionPage = dynamic(
  () => import('../features/collection/pages/CollectionPage').then((mod) => mod.CollectionPage),
  {
    loading: () => <div className="animate-pulse min-h-screen bg-muted" />,
  }
);
