'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/header';
import { useAuth } from '@/contexts/auth-context';

// Modular home page components
import {
  HeroSection,
  APIOverview,
  GetEndpointDocs,
  PostEndpointDocs,
  SvgEndpointDocs,
  JsonApiBuilder,
  SvgApiBuilder,
  GettingStarted,
} from '@/components/home';

export default function HomePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <HeroSection />

        {/* API Documentation */}
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" id="overview">Overview</TabsTrigger>
            <TabsTrigger value="endpoint" id="endpoint">API Reference</TabsTrigger>
            <TabsTrigger value="demo" id="demo">Live Demo</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <APIOverview />
          </TabsContent>

          <TabsContent value="endpoint" className="mt-6">
            <div className="space-y-6">
              <GetEndpointDocs />
              <PostEndpointDocs />
              <SvgEndpointDocs />
            </div>
          </TabsContent>

          <TabsContent value="demo" className="mt-6">
            <div className="space-y-6">
              <SvgApiBuilder initialUserId={user?.uid || ''} />
              <JsonApiBuilder initialUserId={user?.uid || ''} />
            </div>
          </TabsContent>
        </Tabs>

        <GettingStarted />
      </main>
    </div>
  );
}
