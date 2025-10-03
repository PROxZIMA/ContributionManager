import DashboardClient from '@/components/dashboard-client';

export default function DashboardPage() {
  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your API credentials for Azure DevOps and GitHub.
        </p>
      </div>
      <DashboardClient />
    </div>
  );
}
