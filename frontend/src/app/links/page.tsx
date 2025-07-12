'use client';

import { useState, useEffect } from 'react';
import { Card, Typography, Space, Button, Tooltip, message, Tag, Empty } from 'antd';
import { LinkOutlined, CopyOutlined, EyeOutlined, CalendarOutlined, ArrowRightOutlined } from '@ant-design/icons';
import LoadingSpinner from "@/components/LoadingSpinner";

const { Title, Text } = Typography;

interface UrlItem {
  id: string;
  originalUrl: string;
  shortUrl: string;
  isCustomSlug: boolean;
  slug: string;
  clickCount: number;
  createdAt: string;
  updatedAt: string;
}

interface ListUrlsResponse {
  success: boolean;
  data: {
    urls: UrlItem[]
  };
}

const LinksPage = () => {
  const [urls, setUrls] = useState<UrlItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchUrls = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/url/list`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ListUrlsResponse = await response.json();
      
      if (data.success) {
        setUrls(data.data.urls);
      } else {
        throw new Error('Failed to fetch URLs');
      }
      
    } catch (error) {
      setError('Failed to load URLs. Please try again.');
      message.error('Failed to load URLs');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchUrls();
  }, []);
  
  const handleCopy = async (shortUrl: string) => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      message.success('URL copied to clipboard!');
    } catch (error) {
      message.error('Failed to copy URL');
    }
  };
  
  const handleRedirectClick = async (slug: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/url/redirect/${slug}`);
      
      const data = await response.json();
      
      if (response.ok && data.success && data.data.originalUrl) {
        window.open(data.data.originalUrl, '_blank', 'noopener,noreferrer');
        setTimeout(() => {
          fetchUrls();
        }, 500);
      } else {
        const errorMessage = data.error || 'Failed to redirect to original URL';
        message.error(errorMessage);
      }
    } catch (error) {
      message.error('Network error: Unable to connect to server');
    }
  };
  
  const extractSlug = (shortUrl: string): string => {
    const url = new URL(shortUrl);
    return url.pathname.substring(1);
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const truncateUrl = (url: string, maxLength: number = 50) => {
    return url.length > maxLength ? `${url.substring(0, maxLength)}...` : url;
  };
  
  if (isLoading) {
    return <LoadingSpinner />
  }
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <Title level={1} className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          📋 My Links
        </Title>
        <Text className="text-gray-600 text-lg">Manage and track your shortened URLs</Text>
      </div>
      
      {error && (
        <Card className="mb-6 border-red-200 bg-red-50">
          <Text className="text-red-600">{error}</Text>
          <Button type="link" onClick={fetchUrls} className="ml-4">
            Retry
          </Button>
        </Card>
      )}
      
      {urls.length === 0 && !isLoading && !error ? (
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm" style={{ borderRadius: '20px' }}>
          <Empty
            description={
              <Space direction="vertical" size="middle">
                <Text className="text-gray-500 text-lg">No URLs found</Text>
                <Text className="text-gray-400">Start by creating your first shortened URL!</Text>
              </Space>
            }
          />
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
          {urls.map((url) => (
            <Card
              key={url.id}
              className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-3xl transition-all duration-300"
              style={{ borderRadius: '20px' }}
            >
              <Space direction="vertical" size="middle" className="w-full">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <Text strong className="text-lg text-gray-800">
                      {url.isCustomSlug ? url.slug : 'Untitled Link'}
                    </Text>
                    <div className="flex items-center space-x-4 mt-2">
                      <Tag icon={<EyeOutlined />} color="blue">
                        {url.clickCount} clicks
                      </Tag>
                      <Tag icon={<CalendarOutlined />} color="green">
                        {formatDate(url.createdAt)}
                      </Tag>
                    </div>
                  </div>
                </div>
                
                <div
                  className="bg-gray-50 p-4 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => handleRedirectClick(url.slug || extractSlug(url.shortUrl))}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Text className="text-gray-600 text-sm block mb-1">Original URL:</Text>
                      <Tooltip title={`Click to open via short URL (counts clicks): ${url.originalUrl}`}>
                        <Text className="text-gray-800 break-all hover:text-blue-600 transition-colors">
                          <LinkOutlined className="mr-2 text-gray-500" />
                          {truncateUrl(url.originalUrl, 80)}
                        </Text>
                      </Tooltip>
                    </div>
                    <Tooltip title="Open via short URL (counts clicks)">
                      <ArrowRightOutlined className="ml-2 text-gray-500 hover:text-blue-600 transition-colors" />
                    </Tooltip>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                  <Text className="text-blue-800 text-sm block mb-2">Shortened URL:</Text>
                  <div className="flex items-center justify-between">
                    <Text className="text-blue-600 font-mono text-lg flex-1 break-all">
                      {url.shortUrl}
                    </Text>
                    <Tooltip title="Copy to clipboard">
                      <Button
                        type="primary"
                        icon={<CopyOutlined />}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(url.shortUrl);
                        }}
                        className="ml-4 bg-blue-600 hover:bg-blue-700 border-0"
                      >
                        Copy
                      </Button>
                    </Tooltip>
                  </div>
                </div>
              </Space>
            </Card>
          ))}
        </div>
      )}
      
      <div className="text-center mt-8">
        <Button
          type="default"
          size="large"
          onClick={fetchUrls}
          loading={isLoading}
          className="rounded-xl px-8"
        >
          Refresh List
        </Button>
      </div>
    </div>
  );
};

export default LinksPage;
