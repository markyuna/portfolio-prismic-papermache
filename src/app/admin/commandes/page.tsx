// src/app/admin/commandes/page.tsx
"use client";

import { createClient } from "@/prismicio";
import { PrismicRichText } from "@prismicio/react";
import { RichTextField } from "@prismicio/client";

import Image from "next/image";
import React from "react";

export default async function CommandeListPage() {
  const client = createClient();
  const commandes = await client.getAllByType("commande");

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Commandes IA reçues</h1>
      {commandes.length === 0 ? (
        <p>Aucune commande reçue pour le moment.</p>
      ) : (
        <div className="grid gap-6">
          {commandes.map((commande) => (
            <div key={commande.id} className="border p-4 rounded-md bg-white shadow">
            <h2 className="text-xl font-semibold">
              {Array.isArray(commande.data.client_name) && commande.data.client_name.length > 0 ? (
                <span>{commande.data.client_email}</span>
              ) : (
                <span>Nom non disponible</span>
              )}
            </h2>
              <p>
                <strong>Email:</strong>{" "}
                <span>{commande.data.client_email}</span>
              </p>
              <p>
                <strong>Prompt:</strong>{" "}
                <span>{commande.data.prompt}</span>
              </p>
              {commande.data.image_url && (
                <Image
                  src={commande.data.image_url}
                  alt="Image IA"
                  width={400}
                  height={400}
                  className="rounded-md mt-4"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
