import { Cloud, Github } from 'lucide-react';
import { 
  AzureCredentialsSchema, 
  GitHubCredentialsSchema,
  type AzureFormValues,
  type GitHubFormValues 
} from '@/lib/schemas';
import { setProviderCredentials } from '@/lib/firebase/firestore';

// Provider configuration types
export type ProviderKey = 'azure' | 'github';

export interface FieldConfig {
  label: string;
  type: 'text' | 'email' | 'password';
  placeholder: string;
}

export interface ProviderConfig {
  key: ProviderKey;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  schema: any; // Zod schema
  fields: Record<string, FieldConfig>;
  fieldsOrder: string[];
  saveCredentials: (userId: string, providerKey: ProviderKey, data: any) => Promise<void>;
}

// Centralized provider configurations
export const PROVIDERS: Record<ProviderKey, ProviderConfig> = {
  azure: {
    key: 'azure',
    name: 'Azure DevOps',
    description: 'Manage your credentials for Azure DevOps API.',
    icon: Cloud,
    schema: AzureCredentialsSchema,
    fields: {
      email: {
        label: 'Email Address',
        type: 'email',
        placeholder: 'you@example.com'
      },
      organization: {
        label: 'Organization',
        type: 'text',
        placeholder: 'Your Azure DevOps Org'
      },
      pat: {
        label: 'Personal Access Token (PAT)',
        type: 'password',
        placeholder: 'Enter new PAT to update'
      }
    },
    fieldsOrder: ['email', 'organization', 'pat'],
    saveCredentials: setProviderCredentials
  },
  github: {
    key: 'github',
    name: 'GitHub',
    description: 'Manage your credentials for GitHub API.',
    icon: Github,
    schema: GitHubCredentialsSchema,
    fields: {
      username: {
        label: 'Username',
        type: 'text',
        placeholder: 'Your GitHub username'
      },
      pat: {
        label: 'Personal Access Token (PAT)',
        type: 'password',
        placeholder: 'Enter new PAT to update'
      }
    },
    fieldsOrder: ['username', 'pat'],
    saveCredentials: setProviderCredentials
  }
};

// Helper functions
export const getProvider = (key: ProviderKey): ProviderConfig => {
  return PROVIDERS[key];
};

export const getAllProviders = (): ProviderConfig[] => {
  return Object.values(PROVIDERS);
};

export const getProviderKeys = (): ProviderKey[] => {
  return Object.keys(PROVIDERS) as ProviderKey[];
};

export const isValidProviderKey = (key: string): key is ProviderKey => {
  return key in PROVIDERS;
};

// Type helpers for credentials
export type ProviderCredentials = AzureFormValues | GitHubFormValues;

export type ProviderData = {
  azure?: AzureFormValues;
  github?: GitHubFormValues;
};