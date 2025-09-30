import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/contexts/auth-context';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Contribution Token Manager',
  description: 'Manage your API credentials for your version control services.'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
          key="viewport"
          maximum-scale="1"
        />
        <title>Contribution Token Manager</title>
        <meta name="author" content="Pratik Pingale" />
        <meta name="description" content="Manage your API credentials for your version control services." />

        <meta property="og:title" content="Contribution Token Manager" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://proxzima.dev" />
        <meta property="og:description" content="Manage your API credentials for your version control services." />
        {/* <meta
          property="og:image"
          content="https://raw.githubusercontent.com/PROxZIMA/proxzima.github.io/gh-pages/ogImage.png"
        /> */}

        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="./apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="./apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="./apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="./apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="./apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="./apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="./apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="./apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="./apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="./android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="./favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="./favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="./favicon-16x16.png"
        />
        <link rel="manifest" href="./manifest.json" />
        <meta name="msapplication-TileColor" content="#282A36" />
        <meta name="msapplication-TileImage" content="./ms-icon-144x144.png" />
        <meta name="theme-color" content="#282A36" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
