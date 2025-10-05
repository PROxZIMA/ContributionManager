import Link from 'next/link';
import { Key, Users, Clock, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HeroSection() {
  return (
    <>
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Contribution Hub API
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
          Aggregate and visualize your contributions across multiple version control platforms
          with our powerful API service.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/dashboard">
            <Button size="lg">
              <Key className="mr-2 h-4 w-4" />
              Set Up Credentials
            </Button>
          </Link>
          <Button variant="outline" size="lg" asChild>
            <a href="#demo" className="scroll-smooth">
              View Demo
            </a>
          </Button>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader>
            <Users className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Multi-Platform</CardTitle>
            <CardDescription>
              Supports GitHub, Azure DevOps, and more platforms
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <Clock className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Real-Time Data</CardTitle>
            <CardDescription>
              Get up-to-date contribution metrics with caching for performance
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <Database className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Rich Analytics</CardTitle>
            <CardDescription>
              Detailed breakdowns by activity type and time periods
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </>
  );
}
