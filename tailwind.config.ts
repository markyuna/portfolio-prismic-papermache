/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography"; // Import the 'typography' package

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/slices/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // Aquí puedes añadir cualquier personalización de tema que necesites
  },
  plugins: [
    typography, // Incluye el plugin de tipografía
  ],
};

export default config;
