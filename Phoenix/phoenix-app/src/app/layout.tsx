import type { Metadata } from "next";
import { Michroma, Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import { RootLayoutWrapper } from "@/components";
import ScrollProgressBar from "@/components/ui/scroll-progress-bar";

const michroma = Michroma({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-michroma",
});

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Project Phoenix - Cervical Cancer Cell Classification",
  description: "Explainable AI Classification System for cervical cancer cell detection. Explore different types of cervical cells identified through microscopic analysis.",
  keywords: ["cervical cancer", "AI classification", "medical imaging", "explainable AI", "cell detection"],
  authors: [{ name: "Meet Patel" }],
  icons: {
    icon: '/Phoenix_Logo_ICO.ico',
    shortcut: '/Phoenix_Logo_ICO.ico',
    apple: '/Phoenix_Logo_ICO.ico',
  },
  openGraph: {
    title: "Project Phoenix - Cervical Cancer Cell Classification",
    description: "Explainable AI Classification System for cervical cancer cell detection",
    type: "website",
    images: [
      {
        url: '/Phoenix_logo.png',
        width: 1200,
        height: 1200,
        alt: 'Project Phoenix Logo',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Project Phoenix - Cervical Cancer Cell Classification",
    description: "Explainable AI Classification System for cervical cancer cell detection",
    images: ['/Phoenix_logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden max-w-full">
      <body
        suppressHydrationWarning
        className={`${michroma.variable} ${poppins.variable} ${playfair.variable} antialiased overflow-x-hidden max-w-full scrollbar-hide`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <ScrollProgressBar type="bar" color="#ffffff" strokeSize={3} />
        <RootLayoutWrapper>
          {children}
        </RootLayoutWrapper>
      </body>
    </html>
  );
}
