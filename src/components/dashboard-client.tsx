'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { getCompleteCredentials } from '@/lib/firebase/firestore';
import CredentialCard from './credential-card';
import { Loader2 } from 'lucide-react';
import { getAllProviders, type ProviderData } from '@/lib/providers';

export default function DashboardClient() {
  const { user } = useAuth();
  const [credentials, setCredentials] = useState<ProviderData | null>(null);
  const [loading, setLoading] = useState(true);
  const providers = getAllProviders();

  const fetchCredentials = async () => {
    if (!user) return;
    setLoading(true);
    const creds = await getCompleteCredentials(user.uid);
    setCredentials(creds);
    setLoading(false);
  };

  useEffect(() => {
    fetchCredentials();
  }, [user]);

  const onCredentialUpdate = () => {
    fetchCredentials();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      {/* User ID Section */}
      {user && (
        <div className="mb-6">
          <div className="bg-muted/50 border rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Your API User ID</h3>
                <p className="text-sm text-muted-foreground">
                  Use this Firebase User ID when making API calls to retrieve your contribution data.
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <code className="bg-background px-3 py-2 rounded border text-sm font-mono select-all">
                    {user.uid}
                  </code>
                  <button
                    onClick={() => navigator.clipboard.writeText(user.uid)}
                    className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded hover:bg-primary/90"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid gap-6 md:grid-cols-2">
        {providers.map((provider) => {
          const IconComponent = provider.icon;
          return (
            <CredentialCard
              key={provider.key}
              serviceName={provider.name}
              serviceKey={provider.key}
              icon={<IconComponent className="h-8 w-8 text-primary" />}
              description={provider.description}
              data={credentials?.[provider.key]}
              onUpdate={onCredentialUpdate}
            />
          );
        })}
      </div>
    </>
  );
}
