// src/app/api/generate-image/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  if (!prompt) {
    return NextResponse.json({ error: "Prompt manquant" }, { status: 400 });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt,
        n: 1,
        size: "1024x1024",
        model: "dall-e-3",
        response_format: "url",
        style: "natural",
        quality: "hd",
      }),
    });

    const data = await response.json();

    if (!data?.data?.[0]?.url) {
      return NextResponse.json({ error: "Image non générée" }, { status: 500 });
    }

    return NextResponse.json({
      url: data.data[0].url,
      width: 1024,
      height: 1024,
    });
  } catch (err) {
    console.error("Erreur API OpenAI:", err);
    return NextResponse.json({ error: "Erreur serveur OpenAI" }, { status: 500 });
  }
}
