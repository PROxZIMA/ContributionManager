import AuthGuard from '@/components/auth-guard';
import Header from '@/components/header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1 p-4 sm:p-6 md:p-8">{children}</main>
      </div>
    </AuthGuard>
  );
}
