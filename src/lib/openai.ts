// src/lib/
"use server";

import { OrcishOpenAIService } from "orcish-openai-connector";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("No OPENAI API Key");
}

const orcishOpenAIService = new OrcishOpenAIService({
  apiKey: process.env.OPENAI_API_KEY,
  gptModel: "gpt-3.5-turbo",
  gptTemperature: 0.7,
  gptMaxTokens: 712,
  imageModel: "dall-e-3",
});

export async function getDalle3Image(prompt: string) {
  return await orcishOpenAIService.getDalle3Image(prompt);
}
