import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HanniNLilly — 3 Years of Us",
  description:
    "An immersive, cinematic love story told through a phone screen. A Valentine's Day experience.",
};

export const viewport: Viewport = {
  themeColor: "#1A0810",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-body antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
