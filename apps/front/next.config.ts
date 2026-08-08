import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL("https://picsum.photos/**"),
      new URL(
        "https://dcdkpkwifzjvhhwbzyhb.supabase.co/storage/v1/object/public/images/users/**",
      ),
    ],
  },
};

export default nextConfig;
