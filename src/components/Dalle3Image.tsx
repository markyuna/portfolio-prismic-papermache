"use client";

import { getDalle3Image } from '../../lib/openai';
import Image from 'next/image';
import React, {useState} from 'react'
import Button from './Button';

export default function Dalle3Image() {
  const [prompt, setPrompt] = useState<string>("");
  const [aiResult, setAiResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleDalle3 = async () => {
    setLoading(true);
    const result = await getDalle3Image(prompt);
    setLoading(false);
    if (!result) {
      return;
    }

    setAiResult(result);
  }

  return (
    <div className='flex flex-col gap-3 justify-center items-center'>
        <h1 className="text-2xl font-bold" style={{color: "#fff"}}>Créez votre propre sculpture</h1>
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
        {loading && 
        (
          <div className="flex flex-col gap-3 justify-center items-center">
            <h2 className="text-2xl font-bold" style={{color: "#fff"}}>Loading ..</h2>
            <Image 
              src={"/Spinner.gif"} 
              width={50} 
              height={50}
              className="rounded-lg" 
              alt="Loading" 
            />
          </div>
          )}
        {aiResult && (
          <>
          <Image 
            width={500} 
            height={500} 
            className="rounded-lg" 
            src={aiResult} 
            alt="Dalle3Image" 
            />
          <button 
            type="button"
            className="p-3 bg-blue-500 text-white rounded-lg" 
            style={{marginTop: "1rem"}}
            onClick={() => setAiResult("")}>Commander</button>
          </>
        )} 
    </div>
  )
}
