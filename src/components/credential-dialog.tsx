'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Eye, EyeOff } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  AzureCredentialsSchema,
  GitHubCredentialsSchema,
  type AzureFormValues,
  type GitHubFormValues,
} from '@/lib/schemas';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/hooks/use-toast';
import { setAzureCredentials, setGithubCredentials } from '@/lib/firebase/firestore';
import { z } from 'zod';

type ServiceKey = 'azure' | 'github';

interface CredentialDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  serviceName: string;
  serviceKey: ServiceKey;
  initialData?: AzureFormValues | GitHubFormValues;
  onSuccess: () => void;
}

const formSchemas = {
  azure: AzureCredentialsSchema,
  github: GitHubCredentialsSchema,
};

const formFieldsConfig = {
    azure: {
        email: { label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
        organization: { label: 'Organization', type: 'text', placeholder: 'Your Azure DevOps Org' },
        pat: { label: 'Personal Access Token (PAT)', type: 'password', placeholder: 'Enter new PAT to update' },
    },
    github: {
        username: { label: 'Username', type: 'text', placeholder: 'Your GitHub username' },
        pat: { label: 'Personal Access Token (PAT)', type: 'password', placeholder: 'Enter new PAT to update' },
    },
};

export function CredentialDialog({
  isOpen,
  setIsOpen,
  serviceName,
  serviceKey,
  initialData,
  onSuccess,
}: CredentialDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPat, setShowPat] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  
  const isEditing = !!initialData;
  const currentSchema = formSchemas[serviceKey];
  const updateSchema = currentSchema.partial().extend({
    pat: currentSchema.shape.pat.optional().or(z.literal('')),
  });
  
  const resolver = zodResolver(isEditing ? updateSchema : currentSchema);

  const form = useForm<AzureFormValues | GitHubFormValues>({
    resolver,
    defaultValues: initialData || {},
  });

  const onSubmit = async (values: AzureFormValues | GitHubFormValues) => {
    if (!user) {
      toast({
        title: 'Authentication Error',
        description: 'You must be logged in to save credentials.',
        variant: 'destructive',
      });
      return;
    }
    setIsSubmitting(true);

    let finalValues = { ...values };
    if (isEditing && initialData) {
        finalValues = { ...initialData, ...values };
        if (!values.pat) {
            finalValues.pat = initialData.pat;
        }
    }

    try {
      if (serviceKey === 'azure') {
        await setAzureCredentials(user.uid, finalValues as AzureFormValues);
      } else {
        await setGithubCredentials(user.uid, finalValues as GitHubFormValues);
      }
      toast({
        title: 'Success!',
        description: `Your ${serviceName} credentials have been saved.`,
      });
      onSuccess();
      form.reset();
    } catch (error) {
      console.error('Failed to save credentials:', error);
      toast({
        title: 'Save Failed',
        description: 'Could not save credentials. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const fieldsForService = formFieldsConfig[serviceKey];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit' : 'Add'} {serviceName} Credentials</DialogTitle>
          <DialogDescription>
            Enter your credentials below. Your sensitive information will be stored securely.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            {Object.entries(fieldsForService).map(([key, config]) => (
              <FormField
                key={key}
                control={form.control}
                name={key as any}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{config.label}</FormLabel>
                    <FormControl>
                      {key === 'pat' ? (
                        <div className="relative">
                          <Input
                            type={showPat ? 'text' : 'password'}
                            placeholder={config.placeholder}
                            className="pr-10"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent hover:text-foreground"
                            onClick={() => setShowPat(!showPat)}
                          >
                            {showPat ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      ) : (
                        <Input
                          type={config.type}
                          placeholder={config.placeholder}
                          {...field}
                        />
                      )}
                    </FormControl>
                    {key === 'pat' && isEditing && (
                        <FormDescription>Leave blank to keep current PAT.</FormDescription>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
