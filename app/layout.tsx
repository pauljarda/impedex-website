import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "IMPEDEX | Reparații Electronice Profesionale",
  description: "Service autorizat pentru televizoare, laptopuri și echipamente industriale.",
  // This section links all the files you moved to /public
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ro"
      className={`${jakarta.variable} h-full antialiased`}
    >
      <body className={`${jakarta.className} flex min-h-full flex-col bg-[#07111f] text-[#FFFFFF]`}>
        {children}
      </body>
    </html>
  );
}
