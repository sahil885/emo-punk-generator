import type { Metadata } from "next";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://texttoemo.com"),
  title: "Text to Emo — AI Emo & Pop Punk Song Generator",
  description:
    "Turn your words into a full emo pop punk song in minutes. AI writes the lyrics and the music — pick a male or female vocalist, then listen and download. Your first songs are free.",
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
    title: "Text to Emo — Turn Your Words Into an Emo Song",
    description:
      "Drop any words and get a full emo pop punk song with AI lyrics, vocals, and music in minutes. First songs free.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Text to Emo — AI Emo & Pop Punk Song Generator",
    description:
      "Turn your words into a full emo pop punk song in minutes. AI lyrics + music, your choice of vocalist. First songs free.",
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
