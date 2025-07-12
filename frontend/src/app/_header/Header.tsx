'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { RocketOutlined, BarChartOutlined, LinkOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

const Header = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'pt-4' : 'pt-[60px]'
    } px-4 sm:px-6 lg:px-8`}>
      <header className={`mx-auto max-w-6xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl shadow-purple-500/25 transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-md bg-opacity-95' : ''
      }`}>
        <div className="px-6 lg:px-8">
          <nav className={`flex items-center justify-between transition-all duration-300 ${
            isScrolled ? 'h-16' : 'h-20'
          }`}>
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-4">
                <div className={`bg-gradient-to-br from-white/30 to-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl border-2 border-white/35 transition-all duration-300 ${
                  isScrolled ? 'w-10 h-10' : 'w-14 h-14'
                }`}>
                  <div className={`bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 ${
                    isScrolled ? 'w-6 h-6' : 'w-9 h-9'
                  }`}>
                    <LinkOutlined style={{
                      color: '#fff',
                      fontSize: isScrolled ? '16px' : '24px',
                      transition: 'font-size 0.3s ease'
                    }} />
                  </div>
                </div>
                <div className={`transition-all duration-300 ${isScrolled ? 'scale-90' : 'scale-100'}`}>
                  <span className={`text-white font-bold tracking-tight transition-all duration-300 ${
                    isScrolled ? 'text-xl' : 'text-2xl'
                  }`}>
                    Awesome App
                  </span>
                  <div className={`text-white/70 text-xs font-medium transition-all duration-300 ${
                    isScrolled ? 'opacity-0 h-0' : 'opacity-100 h-auto'
                  }`}>
                    Professional URLs
                  </div>
                </div>
              </Link>
            </div>
            
            <div className="flex items-center space-x-6">
              <Link
                href="/"
                className={`flex items-center space-x-2 px-6 rounded-xl text-base font-semibold transition-all duration-200 ${
                  isScrolled ? 'py-2' : 'py-3'
                } ${
                  pathname === '/'
                    ? 'text-white bg-white/20 shadow-lg backdrop-blur-sm'
                    : 'text-white/80 hover:text-white hover:bg-white/10 focus:text-white'
                }`}
              >
                <RocketOutlined className="text-lg" />
                <span>Create Link</span>
              </Link>
              <Link
                href="/links"
                className={`flex items-center space-x-2 px-6 rounded-xl text-base font-semibold transition-all duration-200 ${
                  isScrolled ? 'py-2' : 'py-3'
                } ${
                  pathname === '/links'
                    ? 'text-white bg-white/20 shadow-lg backdrop-blur-sm'
                    : 'text-white/80 hover:text-white hover:bg-white/10 focus:text-white'
                }`}
              >
                <BarChartOutlined className="text-lg" />
                <span>Created Links</span>
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
