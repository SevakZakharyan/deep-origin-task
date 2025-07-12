import { Result, Button } from 'antd';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the short URL you visited does not exist or has expired."
        extra={
          <div className="space-y-2">
            <div>
              <Link href="/" className="pb-4">
                <Button type="primary" size="large">
                  Create New Short URL
                </Button>
              </Link>
            </div>
            
            <div>
              <Link href="/links">
                <Button size="large">
                  View All Links
                </Button>
              </Link>
            </div>
          </div>
        }
      />
    </div>
  );
}
