import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: import.meta.env.VITE_sanity_projectId,
  dataset: import.meta.env.VITE_sanity_dataset,
  apiVersion: import.meta.env.VITE_sanity_apiVersion,
  useCdn: import.meta.env.VITE_sanity_useCdn === 'true',
  token: import.meta.env.VITE_sanity_token,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
