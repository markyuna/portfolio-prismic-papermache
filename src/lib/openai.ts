// src/lib/openai.ts

"use server";

import { OrcishOpenAIService } from "orcish-openai-connector";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("No OPENAI API Key");
}

const orcishOpenAIService = new OrcishOpenAIService({
  apiKey: process.env.OPENAI_API_KEY,
  gptModel: "gpt-4",
  gptTemperature: 0.7,
  gptMaxTokens: 512,
  imageModel: "dall-e-3",
});

export async function getDalle3Image(prompt: string) {
  return await orcishOpenAIService.getDalle3Image(prompt);
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
