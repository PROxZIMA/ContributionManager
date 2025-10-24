'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Eye, EyeOff, HelpCircle, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
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

// Helper component for PAT generation instructions
interface PATHelpProps {
  providerKey: ProviderKey;
}

function PATHelp({ providerKey }: PATHelpProps) {
  const helpContent = {
    github: {
      title: 'GitHub Personal Access Token',
      steps: [
        {
          step: 1,
          text: 'Go to GitHub Settings → Developer settings → Personal access tokens',
          url: 'https://github.com/settings/tokens/new?scopes=read:user&description=Credential%20Manager%20Token&default_expires_at=none'
        },
        {
          step: 2,
          text: 'Generate new token (classic) with these minimal scopes:',
          items: ['read:user (Read ALL user profile data)']
        }
      ],
      images: [
        '/setup/github/gh-token-creation.png'
      ]
    },
    azure: {
      title: 'Azure DevOps Personal Access Token',
      steps: [
        {
          step: 1,
          text: 'Go to Azure DevOps → User Settings → Personal access tokens'
        },
        {
          step: 2,
          text: 'Create new token with these minimal permissions:',
          items: [
            'Code: Read',
            'Identity: Read', 
            'Work Items: Read'
          ]
        }
      ],
      images: [
        '/setup/azure/az-pat-location.png',
        '/setup/azure/az-token-creation.png'
      ]
    },
    gitlab: {
      title: 'GitLab Personal Access Token',
      steps: [
        {
          step: 1,
          text: 'Go to GitLab Settings → Access Tokens',
          url: 'https://gitlab.com/-/user_settings/personal_access_tokens?name=Credential%20Manager%20Token&description=Credential%20Manager%20Token&scopes=read_user'
        },
        {
          step: 2,
          text: 'Create new token with these minimal scopes:',
          items: [
            'read_user (Read user profile)'
          ]
        }
      ]
    }
  };

  const config = helpContent[providerKey];
  if (!config) return null;

  return (
    <div className="space-y-4 text-sm">
      <h4 className="font-semibold text-foreground">{config.title}</h4>
      
      {config.steps.map((step) => (
        <div key={step.step} className="space-y-2">
          <div className="flex items-start gap-2">
            <span className="flex-shrink-0 w-5 h-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center font-medium">
              {step.step}
            </span>
            <div className="flex-1">
              <p className="text-muted-foreground">{step.text}</p>
              {'url' in step && (
                <a
                  href={step.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-1"
                >
                  Open GitHub Settings <ExternalLink className="h-3 w-3" />
                </a>
              )}
              {step.items && (
                <ul className="mt-2 ml-4 space-y-1">
                  {step.items.map((item, index) => (
                    <li key={index} className="text-muted-foreground flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full flex-shrink-0" />
                      <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{item}</code>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      ))}

      <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-md border-l-2 border-primary/20">
        <p className="font-medium mb-1">Security Best Practice:</p>
        <p>Only grant the minimal required permissions listed above. This follows the principle of least privilege and keeps your account secure.</p>
      </div>
    </div>
  );
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
  const [showHelp, setShowHelp] = useState(false);
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
        
        {/* PAT Generation Help Section */}
        <Collapsible open={showHelp} onOpenChange={setShowHelp}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-between h-auto p-3 text-left border border-dashed border-muted-foreground/30 hover:border-muted-foreground/50"
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Need help generating a PAT?</span>
              </div>
              {showHelp ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3">
            <div className="border rounded-md p-4 bg-muted/20">
              <PATHelp providerKey={providerKey} />
            </div>
          </CollapsibleContent>
        </Collapsible>

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
