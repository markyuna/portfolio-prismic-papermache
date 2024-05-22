"use client";

import React, { useState } from "react";
import { getDalle3Image } from "../lib/openai";
import Image from "next/image";

export default function Dalle3Image() {
  const [prompt, setPrompt] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDalle3 = async () => {
    setLoading(true);
    setError(""); // Reiniciar el error
    try {
      const result = await getDalle3Image(prompt);
      setAiResult(result);
      console.log("setAiResult", result);
    } catch (error) {
      setError(
        "Error al generar la imagen. Por favor, inténtalo de nuevo más tarde.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <h1 className="p-5 text-2xl font-bold text-white">
        Créez votre propre sculpture
      </h1>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <input
          type="text"
          className="w-96 rounded-lg p-3"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a prompt"
        />
        <button
          type="button"
          className="rounded-lg bg-blue-500 p-3 text-white"
          onClick={handleDalle3}
          disabled={loading}
        >
          Generate
        </button>
      </div>
      {loading && (
        <div className="flex flex-col items-center justify-center gap-3">
          <h2 className="text-2xl font-bold" style={{ color: "#fff" }}>
            Loading ..
          </h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Image
            src={"/Spinner.gif"}
            width={50}
            height={50}
            className="rounded-lg"
            alt="Loading"
            unoptimized={true}
          />
        </div>
      )}
      {aiResult && (
        <>
          <Image
            className="rounded-lg"
            alt={"AI Image"}
            height={800}
            width={500}
            src={aiResult}
          />

          <button
            type="button"
            className="rounded-lg bg-blue-500 p-3 text-white"
            style={{ marginTop: "1rem" }}
            onClick={() => setAiResult("")}
          >
            Commander
          </button>
        </>
      )}
    </div>
  );
}
