"use client";
import { createClient } from "@/prismicio";
import Link from "next/link";

export default async function CommandesPage() {
  const client = createClient();
  const commandes = await client.getAllByType("commande", {
    orderings: [{ field: "document.first_publication_date", direction: "desc" }],
  });

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">Liste des Commandes</h1>
    <ul className="space-y-4">
        {commandes.map((commande) => {
            const data = commande.data as unknown as { client_name: string; client_email: string; prompt: string; image_url?: string };
            return (
                <li key={commande.id} className="p-4 border rounded text-white bg-gray-800">
                    <p><strong>Nom :</strong> {data.client_name}</p>
                    <p><strong>Email :</strong> {data.client_email}</p>
                    <p><strong>Prompt :</strong> {data.prompt}</p>
                    {data.image_url && (
                        <img
                            src={data.image_url}
                            alt=""
                            className="mt-2 max-w-full rounded"
                        />
                    )}
                </li>
            );
        })}
    </ul>
      <Link href="/" className="inline-block mt-6 text-blue-400 hover:underline">
        ← Retour à l’accueil
      </Link>
    </main>
  );
}
