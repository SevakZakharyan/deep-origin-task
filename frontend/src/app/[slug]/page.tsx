import { redirect, notFound } from 'next/navigation';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getOriginalUrl(slug: string): Promise<string | null> {
  try {
    const backendUrl = process.env.SERVER_API_URL || 'http://backend:3005/api'
    
    console.log(`Backend API URL test -- : ${backendUrl}`);
    
    if (!backendUrl) {
      console.error('Backend API URL is not defined');

      return null;
    }
    
    const url = `${backendUrl}/url/redirect/${slug}`;
    
    const response = await fetch(url, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(10000),
    });
    
    console.log(`Response status: ${response.status}`);
    console.log(`Response ok: ${response.ok}`);
    
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      const errorText = await response.text();
      console.error(`Error response: ${errorText}`);
      return null;
    }
    
    const data = await response.json();
    
    if (data.success && data.data.originalUrl) {
      return data.data.originalUrl;
    }
    
    return null;
  } catch (error) {
    console.error('Redirect error:', error);
    
    return null;
  }
}


export default async function SlugPage({ params }: PageProps) {
  const { slug } = await params;
  
  const originalUrl = await getOriginalUrl(slug);
  if (!originalUrl) {
    notFound();
  }

  redirect(originalUrl);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  return {
    title: `Redirecting ${slug}`,
    description: `Redirecting to the original URL for ${slug}`,
  };
}
