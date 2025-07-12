import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/public/styles/global.css";
import Header from "@/app/_header/Header";
import {AntdRegistry} from "@ant-design/nextjs-registry";
import '@ant-design/v5-patch-for-react-19';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Awesome App",
  description: "Professional URL Shortener",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-slate-100 via-purple-50 to-pink-50 min-h-screen`}>
        <AntdRegistry>
          <Header />
          <main className="pt-[180px] px-4 sm:px-6 lg:px-8">{children}</main>
        </AntdRegistry>
      </body>
    </html>
  );
}
