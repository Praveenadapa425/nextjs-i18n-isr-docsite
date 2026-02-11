import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  i18n: {
    locales: ["en", "es", "fr", "de"],
    defaultLocale: "en",
  },
};

export default nextConfig;
