/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    FIREBASE_API_KEY: "AIzaSyAodpKv81I9DRKdi_BmBoC_Z42Tjz3f1VI",
    GOOGLE_CLIENT_ID: "633049463065-rcgvre0mk45lh6o12anj4d9fspi6enhu.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "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",
  },
}

module.exports = nextConfig
