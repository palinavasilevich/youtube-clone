import type { NextConfig } from "next";
import { schema } from "@/shared/lib/env";

schema.parse(process.env);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://img.youtube.com/vi/**"),
      new URL("https://yt3.ggpht.com/**"),
    ],
  },
};

export default nextConfig;
