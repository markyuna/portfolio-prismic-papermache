// src/lib/openai.ts (frontend)
export async function getDalle3Image(prompt: string): Promise<{ url: string, width: number, height: number }> {
  const res = await fetch("/api/generate-image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Erreur inconnue");
  }

  return res.json();
}
