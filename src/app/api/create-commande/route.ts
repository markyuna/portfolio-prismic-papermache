// src/app/api/create-commande/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const body = await req.json();
  const { client_name, client_email, prompt, image_url } = body;

  if (!client_name || !client_email || !prompt || !image_url) {
    return NextResponse.json({ success: false, message: "Champs manquants" });
  }

  const { error } = await supabase.from("commandes").insert([
    {
      client_name,
      client_email,
      prompt,
      image_url,
      created_at: new Date().toISOString(),
    },
  ]);

  if (error) {
    console.error("Erreur Supabase:", error);
    return NextResponse.json({ success: false, message: "Erreur Supabase" });
  }

  return NextResponse.json({ success: true });
}
