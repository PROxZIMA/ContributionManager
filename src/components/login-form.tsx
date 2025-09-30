'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import {
  signInWithGitHub,
  signInWithGoogle,
  signInWithMicrosoft,
  signInWithEmail,
  signUpWithEmail,
  resetPassword
} from '@/lib/firebase/auth';
import { EmailAuthSchema, EmailSignUpSchema } from '@/lib/schemas';
import { GithubIcon, GoogleIcon, MicrosoftIcon } from './icons';

export default function LoginForm() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  const handleSocialSignIn = async (provider: 'google' | 'github' | 'microsoft') => {
    setIsSigningIn(true);
    try {
      if (provider === 'google') {
        await signInWithGoogle();
      } else if (provider === 'github') {
        await signInWithGitHub();
      } else if (provider === 'microsoft') {
        await signInWithMicrosoft();
      }
      // The useEffect will handle the redirection
    } catch (error: any) {
      console.error('Sign-in error:', error);
      let errorMessage = 'Could not sign in. Please try again.';

      if (error.code === 'auth/account-exists-with-different-credential') {
        errorMessage = 'An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.';
      } else if (error.code === 'auth/cancelled-popup-request') {
        errorMessage = 'Sign-in was cancelled. Please try again.';
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = 'Popup was blocked by your browser. Please allow popups and try again.';
      } else if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign-in popup was closed. Please try again.';
      } else if (error.code === 'auth/unauthorized-domain') {
        errorMessage = 'This domain is not authorized for authentication. Please contact support.';
      }

      toast({
        title: 'Authentication Failed',
        description: errorMessage,
        variant: 'destructive',
      });
      setIsSigningIn(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSigningIn(true);

    try {
      if (isSignUp) {
        const validation = EmailSignUpSchema.safeParse({
          email,
          password,
          confirmPassword,
        });

        if (!validation.success) {
          toast({
            title: 'Validation Error',
            description: validation.error.errors[0].message,
            variant: 'destructive',
          });
          setIsSigningIn(false);
          return;
        }

        await signUpWithEmail(email, password);
        toast({
          title: 'Account Created',
          description: 'Your account has been created successfully!',
        });
      } else {
        const validation = EmailAuthSchema.safeParse({ email, password });

        if (!validation.success) {
          toast({
            title: 'Validation Error',
            description: validation.error.errors[0].message,
            variant: 'destructive',
          });
          setIsSigningIn(false);
          return;
        }

        await signInWithEmail(email, password);
      }
      // The useEffect will handle the redirection
    } catch (error: any) {
      console.error('Email auth error:', { ...error });
      let errorMessage = 'Authentication failed. Please try again.';

      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email address.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password.';
      } else if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'An account with this email already exists.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak.';
      } else if (error.code === 'auth/invalid-credential' || error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid credentials provided.';
      }

      toast({
        title: 'Authentication Failed',
        description: errorMessage,
        variant: 'destructive',
      });
      setIsSigningIn(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      toast({
        title: 'Email Required',
        description: 'Please enter your email address first.',
        variant: 'destructive',
      });
      return;
    }

    setIsResettingPassword(true);
    try {
      await resetPassword(email);
      toast({
        title: 'Password Reset Email Sent',
        description: 'Check your email for password reset instructions.',
      });
    } catch (error: any) {
      console.error('Password reset error:', error);
      let errorMessage = 'Failed to send password reset email.';

      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email address.';
      }

      toast({
        title: 'Password Reset Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    }
    setIsResettingPassword(false);
  };

  if (loading || user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card className="w-full max-w-sm shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold tracking-tight">
          Contribution Token Manager
        </CardTitle>
        <CardDescription>
          {isSignUp ? 'Create an account' : 'Sign in to manage your API credentials'}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {/* Email/Password Form */}
        <form onSubmit={handleEmailAuth} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          {isSignUp && (
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          )}
          <Button type="submit" className="w-full" disabled={isSigningIn}>
            {isSigningIn ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {isSignUp ? 'Create Account' : 'Sign In'}
          </Button>
        </form>

        {!isSignUp && (
          <div className="flex justify-center">
            <Button
              variant="link"
              className="text-sm"
              onClick={handlePasswordReset}
              disabled={isResettingPassword}
            >
              {isResettingPassword ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Forgot your password?
            </Button>
          </div>
        )}

        <div className="flex justify-center">
          <Button
            variant="link"
            className="text-sm"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setPassword('');
              setConfirmPassword('');
            }}
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        {/* Social Sign-in Buttons */}
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleSocialSignIn('github')}
          disabled={isSigningIn}
        >
          {isSigningIn ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <GithubIcon className="mr-2 h-5 w-5" />
          )}
          Sign in with GitHub
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleSocialSignIn('google')}
          disabled={isSigningIn}
        >
          {isSigningIn ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <GoogleIcon className="mr-2 h-5 w-5" />
          )}
          Sign in with Google
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleSocialSignIn('microsoft')}
          disabled={isSigningIn}
        >
          {isSigningIn ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <MicrosoftIcon className="mr-2 h-5 w-5" />
          )}
          Sign in with Microsoft
        </Button>
      </CardContent>
    </Card>
  );
}
