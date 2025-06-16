// src/app/admin/commandes/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

type Commande = {
  id: string;
  data: {
    client_name: string;
    client_email: string;
    prompt: string;
    image_url?: string;
  };
};

export default function CommandeListPage() {
  const [commandes, setCommandes] = useState<Commande[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommandes = async () => {
      const res = await fetch("/api/get-commandes");
      const data = await res.json();
      setCommandes(data);
      setLoading(false);
    };

    fetchCommandes();
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Commandes IA reçues</h1>
      {loading ? (
        <p>Chargement...</p>
      ) : commandes.length === 0 ? (
        <p>Aucune commande reçue pour le moment.</p>
      ) : (
        <div className="grid gap-6">
          {commandes.map((commande) => (
            <div key={commande.id} className="border p-4 rounded-md bg-white shadow">
              <h2 className="text-xl font-semibold">
                {commande.data.client_name || "Nom non disponible"}
              </h2>
              <p>
                <strong>Email:</strong> {commande.data.client_email}
              </p>
              <p>
                <strong>Prompt:</strong> {commande.data.prompt}
              </p>
              {commande.data.image_url && (
                <Image
                  src={commande.data.image_url}
                  alt="Image IA"
                  width={300}
                  height={300}
                  className="rounded-md mt-4"
                  unoptimized // pour éviter problèmes de chargement externe
                />
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
