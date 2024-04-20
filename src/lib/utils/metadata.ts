import { Metadata } from "next";
import { createClient } from "@/prismicio";

export async function generatePageMetadata(): Promise<Metadata> {                           
    const client = createClient();
    const page = await client.getSingle("homepage");
  
    return {
      title: page.data.meta_title,
      description: page.data.meta_description,
    };
  }