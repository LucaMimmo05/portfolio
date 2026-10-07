import type { MetadataRoute } from "next";
import { translations } from "@/lib/translations";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Luca Mimmo — Portfolio",
    short_name: "Luca Mimmo",
    description: translations.it.seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#080808",
    theme_color: "#080808",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon", type: "image/png", sizes: "180x180" },
    ],
  };
}
