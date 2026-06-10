import type { Metadata } from "next";
import "@/app/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://haejillyeok.com"),
  title: "해질녘",
  description: "해질녘 사이트 준비중입니다.",
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
