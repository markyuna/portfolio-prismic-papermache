"use server";

import { OpenAI } from "openai";

// Verifica que la clave de la API esté disponible
if (!process.env.OPENAI_API_KEY) {
  throw new Error("No OPENAI API Key");
}

// Configuración de OpenAI
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

// Función para manejar solicitudes con tiempo de espera
async function fetchWithTimeout(url: string, options: RequestInit, timeout = 10000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    throw error;
  }
}

// Función para manejar reintentos con retroceso exponencial
async function fetchWithRetries(url: string, options: RequestInit, retries = 3, delay = 3000): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetchWithTimeout(url, options, 10000);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response;
    } catch (error) {
      if (i < retries - 1) {
        console.log(`Retrying... (${i + 1}/${retries})`);
        await new Promise(res => setTimeout(res, delay * Math.pow(2, i)));  // Retroceso exponencial
      } else {
        throw error;
      }
    }
  }
  throw new Error('All retries failed');
}

// Función para obtener la imagen generada por DALL-E 3
export async function getDalle3Image(prompt: string): Promise<string> {
  try {
    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "url",
    });

    const imageUrl = response?.data?.[0]?.url;
    if (imageUrl) {
      return imageUrl;
    } else {
      throw new Error("No image URL returned");
    }
  } catch (error) {
    console.error("Failed to fetch DALL-E image:", error);
    throw error;
  }
}


// "use server";

// import { OrcishOpenAIService } from "orcish-openai-connector";

// if (!process.env.OPENAI_API_KEY) {
//   throw new Error("No OPENAI API Key");
// }

// const orcishOpenAIService = new OrcishOpenAIService({
//   apiKey: process.env.OPENAI_API_KEY,
//   gptModel: "gpt-4",
//   gptTemperature: 0.7,
//   gptMaxTokens: 512,
//   imageModel: "dall-e-3",
// });

// async function fetchWithTimeout(url: string, options: RequestInit, timeout = 10000): Promise<Response> {
//   const controller = new AbortController();
//   const id = setTimeout(() => controller.abort(), timeout);
//   try {
//     const response = await fetch(url, {
//       ...options,
//       signal: controller.signal,
//     });
//     clearTimeout(id);
//     return response;
//   } catch (error) {
//     clearTimeout(id);
//     if (error instanceof Error && error.name === 'AbortError') {
//       throw new Error('Request timed out');
//     }
//     throw error;
//   }
// }

// async function fetchWithRetries(url: string, options: RequestInit, retries = 3, delay = 1000): Promise<Response> {
//   for (let i = 0; i < retries; i++) {
//     try {
//       const response = await fetchWithTimeout(url, options, 10000);
//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//       return response;
//     } catch (error) {
//       if (i < retries - 1) {
//         console.log(`Retrying... (${i + 1}/${retries})`);
//         await new Promise(res => setTimeout(res, delay * Math.pow(2, i)));  // Exponential backoff
//       } else {
//         throw error;
//       }
//     }
//   }
//   throw new Error('All retries failed');
// }

// export async function getDalle3Image(prompt: string) {
//   try {
//     const response = await fetchWithRetries(
//       "https://api.openai.com/v1/images/generations",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//         },
//         body: JSON.stringify({
//           prompt,
//           n: 1,
//           size: "1024x1024",
//           model: "dall-e-3",
//         }),
//       }
//     );
    
//     const data = await response.json();
//     if (data && data.data && data.data[0].url) {
//       return data.data[0].url;
//     } else {
//       throw new Error("No image URL returned");
//     }
//   } catch (error) {
//     console.error("Failed to fetch DALL-E image:", error);
//     throw error;
//   }
// }




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
