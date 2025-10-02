import LoginForm from '@/components/login-form';
import Header from '@/components/header';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center p-4">
        <LoginForm />
      </div>
    </div>
  );
}