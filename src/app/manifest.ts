import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "aiWEB by aiNOW",
    short_name: "aiWEB",
    description:
      "Business websites and web products with clear scope, owner review and agreed ongoing care.",
    start_url: "/",
    display: "standalone",
    background_color: "#fbfcfc",
    theme_color: "#18181b",
    icons: [
      { src: "/icon.svg?v=17-20260811", type: "image/svg+xml", sizes: "any" },
    ],
  };
}
