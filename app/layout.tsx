import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hanni & Lilly — A Valentine's Day Love Story",
  description:
    "A Valentine's Day love story. 3 years of us—told through a phone screen. Share it with someone you love.",
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
