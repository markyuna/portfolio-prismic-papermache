"use client";

import React, { useState } from "react";
import Image from "next/image";
import { getDalle3Image } from "../lib/openai";
import CommandeForm from "./CommandeForm";

export default function Dalle3Image() {
  const [prompt, setPrompt] = useState("");
  const [aiResult, setAiResult] = useState<{
    url: string;
    width: number;
    height: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDalle3 = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await getDalle3Image(prompt);
      setAiResult(result as { url: string; width: number; height: number });
    } catch (error) {
      setError(`Erreur lors de la génération: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-4">
      <h1 className="mt-5 p-2 text-2xl font-bold text-white text-center">
        Créez votre propre sculpture
      </h1>

      {/* Prompt input */}
      <div className="flex w-full max-w-md flex-col items-center gap-4">
        <input
          type="text"
          className="w-full rounded-lg p-3 text-black"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Décrivez votre sculpture idéale..."
        />
        <button
          type="button"
          className="w-full rounded-lg bg-blue-500 p-3 text-white disabled:opacity-50"
          onClick={handleDalle3}
          disabled={loading}
        >
          Générer l'image
        </button>
      </div>

      {/* Loading spinner */}
      {loading && (
        <div className="flex flex-col items-center justify-center gap-3">
          <h2 className="text-2xl font-bold text-white">Chargement...</h2>
          {error && <p className="text-red-500">{error}</p>}
          <Image
            src="/Spinner.gif"
            width={50}
            height={50}
            alt="Chargement"
            className="rounded-lg"
            unoptimized
          />
        </div>
      )}

      {/* Image + Formulaire */}
      {aiResult && (
        <div className="flex flex-col items-center gap-4 mt-6">
          <Image
            className="rounded-lg"
            alt="Résultat IA"
            src={aiResult.url}
            width={aiResult.width}
            height={aiResult.height}
          />

          {/* Formulaire d’envoi de commande */}
          <CommandeForm prompt={prompt} imageUrl={aiResult.url} />

          {/* Bouton pour effacer */}
          <button
            type="button"
            className="rounded-lg bg-blue-500 p-3 text-white"
            onClick={() => setAiResult(null)}
          >
            Effacer
          </button>
        </div>
      )}
    </div>
  );
}
