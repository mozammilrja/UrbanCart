import { Sidebar, Header } from '@/components/layout';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64">
        <Header />
        <main className="p-6 pt-20 lg:pt-6">{children}</main>
      </div>
    </div>
  );
}
