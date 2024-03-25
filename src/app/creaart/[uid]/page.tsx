import { Metadata } from "next";
import { notFound } from "next/navigation";

import { createClient } from "@/prismicio";

import Dalle3Image from "@/components/Dalle3Image";
import { formatDate } from "@/utils/formatDate";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page = await client
    .getByUID("creaart", params.uid)
    .catch(() => notFound());

  return <Dalle3Image />;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("creaart", params.uid)
    .catch(() => notFound());

  return {
    title: page.data.heading,
    description: page.data.meta_image,
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("creaart");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}