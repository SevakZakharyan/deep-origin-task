import { Typography, Spin } from 'antd';
const { Title } = Typography;

const LoadingSpinner = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <Title level={1} className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          📋 My Links
        </Title>
      </div>
      <div className="flex justify-center items-center min-h-[400px]">
        <Spin size="large" />
      </div>
    </div>
  );
}

export default LoadingSpinner;
