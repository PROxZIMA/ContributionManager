'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { getCompleteCredentials, TCompleteCredentials } from '@/lib/firebase/firestore';
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
              fields={provider.fieldsOrder as any}
              onUpdate={onCredentialUpdate}
            />
          );
        })}
      </div>
    </>
  );
}
