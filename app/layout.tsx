import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/styles/globals.css";

const galmuri = localFont({
  src: [
    {
      path: "../public/fonts/Galmuri-v2.40.3/Galmuri11.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Galmuri-v2.40.3/Galmuri11-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--next-font-galmuri",
  display: "swap",
  preload: false,
});

const galmuriCondensed = localFont({
  src: "../public/fonts/Galmuri-v2.40.3/Galmuri11-Condensed.woff2",
  variable: "--next-font-galmuri-condensed",
  display: "swap",
  preload: false,
});

const kimdaegeon = localFont({
  src: [
    {
      path: "../public/fonts/font_kdg/solmoe-kimdaegeon-otf-light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/font_kdg/solmoe-kimdaegeon-otf-medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--next-font-kimdaegeon",
  display: "swap",
});

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
    <html
      lang="ko"
      className={`${galmuri.variable} ${galmuriCondensed.variable} ${kimdaegeon.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-kimdaegeon font-light">
        {children}
      </body>
    </html>
  );
}
