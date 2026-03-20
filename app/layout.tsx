// =============================================================
// ShopBook - Root Layout
// =============================================================

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Sách Nhà Giang - Sách hay mỗi ngày",
    template: "%s | Nhà Giang",
  },
  description:
    "Sách Nhà Giang - Khám phá hàng ngàn đầu sách chất lượng với giá tốt nhất Việt Nam",
};

import { Providers } from "@/components/providers";
import { PageLoader } from "@/components/ui/page-loader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={inter.variable}>
      <body className="min-h-screen bg-gray-50 font-sans antialiased">
        <Providers>
          <PageLoader>
            {children}
          </PageLoader>
        </Providers>
      </body>
    </html>
  );
}
