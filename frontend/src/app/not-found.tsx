import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h2 className="text-4xl font-semibold">404</h2>
      <p className="text-muted-foreground">Could not find the requested resource</p>
      <Link
        href="/"
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
