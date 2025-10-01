'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { getCompleteCredentials, TCompleteCredentials } from '@/lib/firebase/firestore';
import CredentialCard from './credential-card';
import { Cloud, Github, Loader2 } from 'lucide-react';
import type { AzureFormValues, GitHubFormValues } from '@/lib/schemas';

type ServiceName = 'azure' | 'github';

export default function DashboardClient() {
  const { user } = useAuth();
  const [credentials, setCredentials] = useState<TCompleteCredentials | null>(null);
  const [loading, setLoading] = useState(true);

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

  const azureFields: (keyof AzureFormValues)[] = ['email', 'organization', 'pat'];
  const githubFields: (keyof GitHubFormValues)[] = ['username', 'pat'];

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        <CredentialCard
          serviceName="Azure DevOps"
          serviceKey="azure"
          icon={<Cloud className="h-8 w-8 text-primary" />}
          description="Manage your credentials for Azure DevOps API."
          data={credentials?.azure}
          fields={azureFields}
          onUpdate={onCredentialUpdate}
        />
        <CredentialCard
          serviceName="GitHub"
          serviceKey="github"
          icon={<Github className="h-8 w-8 text-primary" />}
          description="Manage your credentials for GitHub API."
          data={credentials?.github}
          fields={githubFields}
          onUpdate={onCredentialUpdate}
        />
      </div>
    </>
  );
}
