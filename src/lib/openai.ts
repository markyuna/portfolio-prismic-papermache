// src/lib/openai.ts

"use server";

import { OrcishOpenAIService } from "orcish-openai-connector";

// Asegúrate de tener la clave API
if (!process.env.OPENAI_API_KEY) {
  throw new Error("No OPENAI API Key");
}

// Configura el servicio de OpenAI
const orcishOpenAIService = new OrcishOpenAIService({
  apiKey: process.env.OPENAI_API_KEY,
  gptModel: "gpt-4",
  gptTemperature: 0.7,
  gptMaxTokens: 512,
  imageModel: "dall-e-3",
});

// Simple caché en memoria
const cache = new Map<string, string>();

// Función para obtener la imagen de DALL-E 3 con caché y reintentos
export async function getDalle3Image(prompt: string): Promise<string> {
  // Intenta obtener la imagen de la caché
  const cacheKey = `dalle3_${prompt}`;
  const cachedImage = cache.get(cacheKey);

  if (cachedImage) {
    return cachedImage;
  }

  // Si no está en la caché, haz la solicitud
  try {
    const response = await orcishOpenAIService.getDalle3Image(prompt);
    
    // Guarda la respuesta en la caché antes de devolverla
    cache.set(cacheKey, response);

    return response;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
}


// "use server";

// import OpenAIApi from "openai";
// import path from "path";
// import fs from "fs";

// if (!process.env.OPENAI_API_KEY) {
//   throw new Error("No OPENAI API Key");
// }

// const openai = new OpenAIApi({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function getDalle3Image(prompt: string): Promise<string> {
//   try {
//     const imagePath = path.resolve("./public/tableau.png");
//     const maskPath = path.resolve("./public/mask.png");

//     if (!fs.existsSync(imagePath) || !fs.existsSync(maskPath)) {
//       throw new Error("Image or mask file not found");
//     }

//     const response = await openai.images.edit({
//       image: fs.createReadStream(imagePath),
//       mask: fs.createReadStream(maskPath),
//       prompt,
//       n: 1,
//       size: "1024x1024",
//       model: "dall-e-3",
//     });

//     if (!response.data || response.data.length === 0 || !response.data[0].url) {
//       throw new Error("Failed to retrieve image from OpenAI");
//     }

//     return response.data[0].url;
//   } catch (error) {
//     console.error("Error generating image:", error);
//     throw error;
//   }
// }
