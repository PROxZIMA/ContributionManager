'use client';

import { useState } from 'react';
import { KeyRound, Loader2, Pencil, PlusCircle, Trash2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { CredentialDialog } from './credential-dialog';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/auth-context';
import { deleteProviderCredentials } from '@/lib/firebase/firestore';
import { type ProviderKey } from '@/lib/providers';

interface CredentialCardProps {
  serviceName: string;
  serviceKey: ProviderKey;
  icon: React.ReactNode;
  description: string;
  data: any;
  onUpdate: () => void;
}

export default function CredentialCard({
  serviceName,
  serviceKey,
  icon,
  description,
  data,
  onUpdate,
}: CredentialCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleDelete = async () => {
    if (!user) return;
    setIsDeleting(true);
    try {
      await deleteProviderCredentials(user.uid, serviceKey);
      toast({
        title: 'Success',
        description: `${serviceName} credentials have been deleted.`,
      });
      onUpdate();
    } catch (error) {
      toast({
        title: 'Error',
        description: `Could not delete credentials. Please try again.`,
        variant: 'destructive',
      });
      console.error('Delete error:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-start gap-4">
        {icon}
        <div className="flex-1">
          <CardTitle>{serviceName}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        {data ? (
          <div className="space-y-3 text-sm">
            {Object.entries(data).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="font-medium capitalize text-muted-foreground">
                  {key}
                </span>
                <span className="font-mono break-all text-right">
                  {key === 'pat' ? '••••••••••••••••' : String(value)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-full py-8">
            <KeyRound className="h-10 w-10 mb-2" />
            <p>No credentials saved for {serviceName}.</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {data ? (
          <>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" disabled={isDeleting}>
                  {isDeleting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="mr-2 h-4 w-4" />
                  )}
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your {serviceName} credentials.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDialogOpen(true)}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </>
        ) : (
          <Button size="sm" onClick={() => setIsDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Credentials
          </Button>
        )}
      </CardFooter>
      <CredentialDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        providerKey={serviceKey}
        initialData={data}
        onSuccess={() => {
          setIsDialogOpen(false);
          onUpdate();
        }}
      />
    </Card>
  );
}
