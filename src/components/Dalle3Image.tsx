"use client";

import { getDalle3Image } from '../lib/openai';
import Image from 'next/image';
import React, {useState} from 'react'

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
    console.log(result);
    setAiResult(result);
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
        </div>
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
              unoptimized={true}
            />
          </div>
          )}
        {aiResult && (
          <>
          {/* <iframe 
            width={500} 
            height={500} 
            className="rounded-lg" 
            src={aiResult} 
            title="Dalle3Image" 
            /> */}
          <Image className="rounded-lg" alt={"AI Image"} height={500} width={500} src={aiResult} />
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
