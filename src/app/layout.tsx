"use client";

import React from "react";
import "./globals.css";
import clsx from "clsx";
import { Urbanist } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "react-hot-toast";
import { createClient, repositoryName } from "@/prismicio";
import { PrismicPreview } from "@prismicio/next";

import HotjarInit from "@/components/HotjarInit";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const urbanist = Urbanist({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = createClient();
  const settings = await client.getSingle("settings");

  const header = await Header();
  const footer = await Footer();
  const prismicPreview = await PrismicPreview({ repositoryName });

  return (
    <html lang="fr">
      <body className={clsx(urbanist.className)}>
        <SpeedInsights />
        <HotjarInit />
        <Analytics />
        {header}
        {children}
        <div className="background-gradient absolute inset-0 -z-50 max-h-screen" />
        <div className="pointer-events-none absolute inset-0 -z-40 h-full bg-[url('/noisetexture.jpg')] opacity-20 mix-blend-soft-light" />
        <Toaster position="bottom-center" reverseOrder={false} />
        {prismicPreview}
        {footer}
      </body>
    </html>
  );
}
