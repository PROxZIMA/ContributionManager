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
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/hooks/use-toast';
import {
  getProvider,
  type ProviderKey,
  type ProviderCredentials
} from '@/lib/providers';
import { z } from 'zod';

interface CredentialDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  providerKey: ProviderKey;
  initialData?: ProviderCredentials;
  onSuccess: () => void;
}

// All configuration now comes from the centralized providers config

export function CredentialDialog({
  isOpen,
  setIsOpen,
  providerKey,
  initialData,
  onSuccess,
}: CredentialDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPat, setShowPat] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const provider = getProvider(providerKey);
  const isEditing = !!initialData;
  const currentSchema = provider.schema;
  const updateSchema = currentSchema.partial().extend({
    pat: currentSchema.shape.pat.optional().or(z.literal('')),
  });

  const resolver = zodResolver(isEditing ? updateSchema : currentSchema);

  const form = useForm({
    resolver,
    defaultValues: initialData || {},
  });

  const onSubmit = async (values: any) => {
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
      // Only include PAT if it's different from the initial data or if there's no initial PAT
      if (!values.pat || values.pat === initialData.pat) {
        delete finalValues.pat;
      }
    }

    try {
      await provider.saveCredentials(user.uid, providerKey, finalValues);
      toast({
        title: 'Success!',
        description: `Your ${provider.name} credentials have been saved.`,
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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit' : 'Add'} {provider.name} Credentials</DialogTitle>
          <DialogDescription>
            Enter your credentials below. Your sensitive information will be stored securely.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            {provider.fieldsOrder.map((fieldKey) => {
              const config = provider.fields[fieldKey];
              return (
                <FormField
                  key={fieldKey}
                  control={form.control}
                  name={fieldKey as any}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{config.label}</FormLabel>
                      <FormControl>
                        {fieldKey === 'pat' ? (
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
                      {fieldKey === 'pat' && isEditing && (
                        <FormDescription>Leave blank to keep current PAT.</FormDescription>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            })}
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
