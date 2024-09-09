"use client";

import React, { useState } from "react";
import { getDalle3Image } from "../lib/openai";
import Image from "next/image";

export default function Dalle3Image() {
  const [prompt, setPrompt] = useState("");
  const [aiResult, setAiResult] = useState<{ url: string; width: number; height: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleDalle3 = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await getDalle3Image(prompt);
      setAiResult(result as unknown as { url: string; width: number; height: number });
    } catch (error) {
      setError(`Error al generar la imagen: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-4">
      <h1 className="mt-5 p-2 text-2xl font-bold text-white text-center">
        Créez votre propre sculpture
      </h1>
      <div className="flex w-full max-w-md flex-col items-center gap-4">
        <input
          type="text"
          className="w-full rounded-lg p-3 text-black"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a prompt"
        />
        <button
          type="button"
          className="w-full rounded-lg bg-blue-500 p-3 text-white disabled:opacity-50"
          onClick={handleDalle3}
          disabled={loading}
        >
          Generate
        </button>
      </div>
      {loading && (
        <div className="flex flex-col items-center justify-center gap-3">
          <h2 className="text-2xl font-bold text-white">Loading...</h2>
          {error && <p className="text-red-500">{error}</p>}
          <Image
            src={"/Spinner.gif"}
            width={50}
            height={50}
            className="rounded-lg"
            alt="Loading"
            unoptimized
          />
        </div>
      )}
      {aiResult && (
        <div className="flex flex-col items-center gap-4 mt-6">
          <Image
            className="rounded-lg"
            alt="AI Image"
            src={aiResult.url}
            width={aiResult.width}
            height={aiResult.height}
          />
          <button
            type="button"
            className="rounded-lg bg-blue-500 p-3 text-white"
            onClick={() => setAiResult(null)}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
