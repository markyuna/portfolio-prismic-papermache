"use client";

import React, {useState} from 'react'
import { getDalle3Image } from '../lib/openai';
import Image from 'next/image';

export default function Dalle3Image() {
  const [prompt, setPrompt] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // const handleDalle3 = async () => {
  //   setLoading(true);
  //   const result = await getDalle3Image(prompt);
  //   setLoading(false);
  //   if (!result) {
  //     return;
  //   }
  //   setAiResult(result);
  //   console.log("setResult", result);
  // }
  const handleDalle3 = async () => {
    setLoading(true);
    setError(""); // Reiniciar el error
    try {
      const result = await getDalle3Image(prompt);
      setAiResult(result);
    } catch (error) {
      setError("Error al generar la imagen. Por favor, inténtalo de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex flex-col gap-3 justify-center items-center'>
        <h1 className="p-5 text-2xl font-bold" style={{color: "#fff"}}>Créez votre propre sculpture</h1>
        <div className="flex flex-wrap gap-3 justify-center items-center">
          <input 
            type="text" 
            className="p-3 w-96 rounded-lg" 
            value={prompt} 
            onChange={(e) => setPrompt(e.target.value)} 
            placeholder="Enter a prompt" 
          />
          <button 
            type="button" 
            className="p-3 bg-blue-500 text-white rounded-lg" 
            onClick={handleDalle3} 
            disabled={loading}>
              Generate
          </button>
        </div> n
        {loading && 
        (
          <div className="flex flex-col gap-3 justify-center items-center">
            <h2 className="text-2xl font-bold" style={{color: "#fff"}}>Loading ..</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
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
            <Image className="rounded-lg" alt={"AI Image"} height={800} width={500} src={aiResult} />
           
            <button 
              type="button"
              className="p-3 bg-blue-500 text-white rounded-lg" 
              style={{marginTop: "1rem"}}
              onClick={() => setAiResult("")}>Commander
            </button>
          </>
        )} 
    </div>
  )
}
