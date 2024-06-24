import { config } from 'dotenv';
config();

const nextConfig = {
    output: 'export',
  env: {
    SMILE_CENTERS_API_URL: process.env.SMILE_CENTERS_API_URL,
  },
};

export default nextConfig;
