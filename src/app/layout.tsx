// src/app/layout.tsx
import React from "react";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import clsx from "clsx";
import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { PrismicPreview } from "@prismicio/next";
import { createClient, repositoryName } from "@/prismicio";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

import { SpeedInsights } from "@vercel/speed-insights/next";
import HotjarInit from "@/components/HotjarInit";
import { Toaster } from "react-hot-toast";

const urbanist = Urbanist({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return {
    title: settings.data.meta_title,
    description: settings.data.meta_description,
    // openGraph: {
    //   images: [settings.data.og_image?.url ?? ""],
    // },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="">
      <body className={clsx(urbanist.className)}>
        <SpeedInsights />
        <HotjarInit />
        <Analytics />
        <Header />
        {children}
        { <div className="background-gradient absolute inset-0 -z-50 max-h-screen" /> }
        {<div className="pointer-events-none absolute inset-0 -z-40 h-full bg-[url('/noisetexture.jpg')] opacity-20 mix-blend-soft-light"></div> }
        <Toaster position="bottom-center" reverseOrder={false} />
        <PrismicPreview repositoryName={repositoryName} />
        <Footer />
      </body>
    </html>
  );
}

