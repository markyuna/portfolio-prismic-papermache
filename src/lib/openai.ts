// src/lib/

"use server";

import OpenAIApi from "openai";
import path from "path";
import fs from "fs";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("No OPENAI API Key");
}

const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getDalle3Image(prompt: string): Promise<string> {
  try {
    const imagePath = path.resolve("./public/tableau.png");
    const maskPath = path.resolve("./public/mask.png");

    const response = await openai.images.edit({
      image: fs.createReadStream(imagePath),
      mask: fs.createReadStream(maskPath),
      prompt,
      n: 1,
      size: "1024x1024",
    });

    if (!response.data || response.data.length === 0 || !response.data[0].url) {
      throw new Error("Failed to retrieve image from OpenAI");
    }

    return response.data[0].url;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
}
