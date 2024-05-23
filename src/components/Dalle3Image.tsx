"use client";

// Importamos los módulos necesarios
import React, { useState } from "react";
import { getDalle3Image } from "../lib/openai";
import Image from "next/image";

export default function Dalle3Image() {
  // Definimos los estados para el prompt, resultado, carga y errores
  const [prompt, setPrompt] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Función para manejar la generación de imágenes
  const handleDalle3 = async () => {
    // Activamos el indicador de carga y limpiamos cualquier error previo
    setLoading(true);
    setError("");

    try {
      // Obtenemos la imagen generada por la IA utilizando el prompt proporcionado
      const result = await getDalle3Image(prompt);
      // Establecemos el resultado de la IA y desactivamos el indicador de carga
      setAiResult(result);
    } catch (error) {
      // En caso de error, mostramos un mensaje de error
      setError(
        "Error al generar la imagen. Por favor, inténtalo de nuevo más tarde.",
      );
    } finally {
      // Desactivamos el indicador de carga después de completar la operación
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <h1 className="mt-5 p-2 text-2xl font-bold text-white">
        Créez votre propre sculpture
      </h1>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <input
          type="text"
          className="w-full rounded-lg p-2"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a prompt"
        />
        <button
          type="button"
          className="w-40 rounded-lg bg-blue-500 p-2 text-white"
          onClick={handleDalle3}
          disabled={loading}
        >
          Generate
        </button>
      </div>
      {loading && (
        <div className="flex flex-col items-center justify-center gap-3">
          <h2 className="text-2xl font-bold" style={{ color: "#fff" }}>
            Loading ...
          </h2>
          {/* Mostramos cualquier error */}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {/* Mostramos un indicador de carga */}
          <Image
            src={"/Spinner.gif"}
            width={80}
            height={80}
            className="rounded-lg"
            alt="Loading"
            unoptimized={true}
          />
        </div>
      )}
      {/* Mostramos la imagen generada por la IA */}
      {aiResult && (
        <>
          <Image
            className="rounded-lg"
            alt={"AI Image"}
            height={800}
            width={500}
            src={aiResult}
          />
          {/* Botón para limpiar la imagen generada */}
          <button
            type="button"
            className="rounded-lg bg-blue-500 p-3 text-white"
            style={{ marginTop: "1rem" }}
            onClick={() => setAiResult("")}
          >
            Clear
          </button>
        </>
      )}
    </div>
  );
}
