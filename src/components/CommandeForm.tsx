"use client";

import React, { useState } from "react";

export default function CommandeForm({ prompt, imageUrl }: { prompt: string; imageUrl: string }) {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitted(false);

    const res = await fetch("/api/create-commande", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_name: clientName,
        client_email: clientEmail,
        prompt,
        image_url: imageUrl,
      }),
    });

    const data = await res.json();
    if (data.success) {
      setSubmitted(true);
      setClientName("");
      setClientEmail("");
    } else {
      setError("Erreur lors de l'envoi.");
    }
  };

  return (
    <div className="w-full max-w-md mt-6">
      <h3 className="text-xl font-semibold text-white mb-2">Envoyez votre projet à Marcos</h3>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
        <input
          type="text"
          placeholder="Votre nom"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Votre email"
          value={clientEmail}
          onChange={(e) => setClientEmail(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <button type="submit" className="bg-green-600 text-white font-bold py-2 rounded hover:bg-green-700">
          Envoyer
        </button>
      </form>
      {submitted && <p className="mt-3 text-green-400">Commande envoyée avec succès !</p>}
      {error && <p className="mt-3 text-red-500">{error}</p>}
    </div>
  );
}
