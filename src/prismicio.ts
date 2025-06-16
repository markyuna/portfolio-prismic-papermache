import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";
import smConfig from "../slicemachine.config.json";

export const repositoryName = smConfig.repositoryName;

const routes: prismic.ClientConfig["routes"] = [
  {
    type: "homepage",
    path: "/",
  },
  {
    type: "page",
    path: "/:uid",
  },
  // Agrega aquí más rutas si tienes otros tipos de documentos
];

export function createClient(config: prismicNext.CreateClientConfig = {}) {
  const client = prismic.createClient(repositoryName, {
    routes,
    fetchOptions:
      process.env.NODE_ENV === "production"
        ? { next: { tags: ["prismic"] }, cache: "force-cache" }
        : { next: { revalidate: 5 } },
    ...config,
  });

  prismicNext.enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  });

  return client;
}
