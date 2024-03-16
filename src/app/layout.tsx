// src/app/layout.tsx

import "./globals.css";
import clsx from "clsx";
import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { PrismicPreview } from "@prismicio/next";
import { createClient, repositoryName } from "@/prismicio";

import Debug from "@/components/Debug";
import Cookie from "@/components/Cookie";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Dalle3Image from "@/components/Dalle3Image";

export const siteTitle = "Next.js + Prismic";

import { CookieContextProvider } from '../context/CookieContext';


const urbanist = Urbanist({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return {
    title: settings.data.meta_title,
    description: settings.data.meta_description,
    // openGraph: {
    //   images: [settings.data.og_image?.url || ""],
    // },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CookieContextProvider> 
    <html lang="en" className="bg-slate-900">
      <body className={clsx(urbanist.className, "relative min-h-screen")}>
        <Header />
        {children}
        
        <div className="background-gradient absolute inset-0 -z-50 max-h-screen" />
        <div className="pointer-events-none absolute inset-0 -z-40 h-full bg-[url('/noisetexture.jpg')] opacity-20 mix-blend-soft-light"></div>
        <div className="page">
          {/* <h1 className="page-title">Cookie Banner with React and TypeScript</h1> */}
          {/* <Debug /> */}
          <Cookie />
        </div>
        <Dalle3Image />
        <Footer />
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
    </CookieContextProvider>
  
  );
}