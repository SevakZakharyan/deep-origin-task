
'use client';

import { useState } from 'react';
import { Input, Button, Card, message, Typography, Space, Divider, Tooltip } from 'antd';
import { LinkOutlined, CopyOutlined, CheckCircleOutlined, ExclamationCircleOutlined, ScissorOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface ShortenedUrl {
  original: string;
  shortened: string;
  title?: string;
}

export interface ShortenUrlResponse {
  success: boolean;
  data: {
    shortUrl: string;
  };
}

const UrlShortener = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState<ShortenedUrl | null>(null);
  const [status, setStatus] = useState<'success' | 'error' | null>(null);
  
  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };
  
  const validateCustomSlug = (slug: string) => {
    if (!slug) return true; // Optional field
    
    if (slug.length < 5) {
      return false;
    }
    
    // Additional validation: only alphanumeric characters and hyphens
    const slugRegex = /^[a-zA-Z0-9-]+$/;
    return slugRegex.test(slug);
  };
  
  const handleShorten = async () => {
    if (!originalUrl.trim()) {
      message.error('Please enter a URL');
      return;
    }
    
    if (!validateUrl(originalUrl)) {
      message.error('Please enter a valid URL');
      return;
    }
    
    if (customSlug && !validateCustomSlug(customSlug)) {
      if (customSlug.length < 5) {
        message.error('Custom slug must be at least 5 characters long');
      } else {
        message.error('Custom slug can only contain letters, numbers, and hyphens');
      }
      return;
    }
    
    setIsLoading(true);
    setStatus(null);
    
    try {
      const request = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/url/shorten`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: originalUrl,
          customSlug: customSlug || null,
        }),
      });
      
      const response: ShortenUrlResponse = await request.json();
      
      if (!response?.data) {
        message.error('Failed to shorten URL. Please try again.');
        return;
      }
      
      setShortenedUrl({
        original: originalUrl,
        shortened: response.data.shortUrl,
        title: customSlug || 'Untitled Link'
      });
      
      setStatus('success');
      message.success('URL shortened successfully!');
    } catch (error) {
      setStatus('error');
      message.error('Failed to shorten URL. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCopy = async () => {
    if (shortenedUrl) {
      try {
        await navigator.clipboard.writeText(shortenedUrl.shortened);
        message.success('Copied to clipboard!');
      } catch (error) {
        message.error('Failed to copy');
      }
    }
  };
  
  const handleReset = () => {
    setOriginalUrl('');
    setCustomSlug('');
    setShortenedUrl(null);
    setStatus(null);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <Title level={1} className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          ✨ URL Shortener
        </Title>
        <Text className="text-gray-600 text-lg">Transform your long URLs into short, shareable links</Text>
      </div>
      
      <Card
        className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm"
        style={{ borderRadius: '20px' }}
      >
        <Space direction="vertical" size="large" className="w-full">
          <div>
            <Text strong className="text-gray-700 mb-2 block">
              <LinkOutlined className="mr-2" />
              Enter your long URL
            </Text>
            <Input
              size="large"
              placeholder="https://example.com/very-long-url..."
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              className="rounded-xl"
              prefix={<LinkOutlined className="text-gray-400" />}
            />
          </div>
          
          <div>
            <Text strong className="text-gray-700 mb-2 block">
              📝 Custom Slug (Optional) - Min 5 characters
            </Text>
            <Input
              size="large"
              placeholder="my-awesome-link (min 5 chars)"
              value={customSlug}
              onChange={(e) => setCustomSlug(e.target.value)}
              className="rounded-xl"
              maxLength={50}
              status={customSlug && customSlug.length > 0 && customSlug.length < 5 ? 'error' : ''}
            />
            {customSlug && customSlug.length > 0 && customSlug.length < 5 && (
              <Text type="danger" className="text-sm mt-1">
                Custom slug must be at least 5 characters long
              </Text>
            )}
          </div>
          
          <Button
            type="primary"
            size="large"
            onClick={handleShorten}
            loading={isLoading}
            className="w-full h-14 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 border-0 font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            icon={<ScissorOutlined />}
          >
            {isLoading ? 'Shortening...' : 'Shorten URL'}
          </Button>
          
          {status && (
            <div className="text-center">
              {status === 'success' ? (
                <Text className="text-green-600 font-semibold flex items-center justify-center">
                  <CheckCircleOutlined className="mr-2" />
                  URL shortened successfully!
                </Text>
              ) : (
                <Text className="text-red-600 font-semibold flex items-center justify-center">
                  <ExclamationCircleOutlined className="mr-2" />
                  Failed to shorten URL. Please try again.
                </Text>
              )}
            </div>
          )}
          
          {shortenedUrl && (
            <>
              <Divider />
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                <Space direction="vertical" size="middle" className="w-full">
                  <Text strong className="text-green-800 text-lg">🎉 Your shortened URL is ready!</Text>
                  
                  {shortenedUrl.title && (
                    <Text className="text-gray-600">
                      <strong>Title:</strong> {shortenedUrl.title}
                    </Text>
                  )}
                  
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <Space className="w-full justify-between items-center">
                      <Text copyable={false} className="text-blue-600 font-mono text-lg flex-1">
                        {shortenedUrl.shortened}
                      </Text>
                      <Tooltip title="Copy to clipboard">
                        <Button type="primary" icon={<CopyOutlined />} onClick={handleCopy}
                                className="bg-green-600 hover:bg-green-700 border-0"
                        >
                          Copy
                        </Button>
                      </Tooltip>
                    </Space>
                  </div>
                  
                  <Button type="default" onClick={handleReset} className="w-full rounded-lg">
                    Shorten Another URL
                  </Button>
                </Space>
              </div>
            </>
          )}
        </Space>
      </Card>
    </div>
  );
};

export default UrlShortener;
