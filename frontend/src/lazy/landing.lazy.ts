import dynamic from 'next/dynamic';

export const LandingPage = dynamic(
  () => import('../features/landing/pages/LandingPage').then((mod) => mod.LandingPage),
  {
    loading: () => <div className="animate-pulse min-h-screen bg-muted" />,
  }
);
