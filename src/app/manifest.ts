import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "YESIR DESIGN",
    short_name: "YESIR",
    description: "Agence créative et digitale en Algérie.",
    start_url: "/fr",
    display: "standalone",
    background_color: "#04060c",
    theme_color: "#04060c",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
