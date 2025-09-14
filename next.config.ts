import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Disable development overlays that might show the N icon
  devIndicators: {
    buildActivity: false,
    position: 'bottom-right',
  },
  // Disable source maps in development to reduce overlays
  productionBrowserSourceMaps: false,
};

export default nextConfig;
