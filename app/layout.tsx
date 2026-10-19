import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import { Providers } from "@/app/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Most traffic is mobile: lock the layout to device width, allow pinch-zoom
// for accessibility, and colour the browser chrome to match the dark theme.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0208",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://texttoemo.com"),
  title: "Text To Emo — Turn Any Words Into an Emo Song",
  description:
    "Paste a text, a memory or a 2am thought and Text To Emo sings it back as a full pop punk track — written, performed and ready in about two minutes. First song free.",
  keywords: [
    "emo song generator",
    "AI song generator",
    "pop punk song generator",
    "text to emo",
    "AI emo song",
    "make a song from text",
    "AI lyrics generator",
    "emo music maker",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://texttoemo.com",
    siteName: "Text to Emo",
    title: "Text To Emo — Turn Any Words Into an Emo Song",
    description:
      "Drop any words and get a full emo pop punk song with AI lyrics, vocals, and music in minutes. First song free.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Text To Emo — Turn Any Words Into an Emo Song",
    description:
      "Type anything and hear it as a full emo pop punk song. AI lyrics + real vocals, about two minutes. First song free.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-[#0a0208]" suppressHydrationWarning>
        <Analytics />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
