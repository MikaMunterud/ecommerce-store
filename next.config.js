/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["media.istockphoto.com"],
    domains: ["res.cloudinary.com"], // Add the domain(s) you want to allow
  },
};

module.exports = nextConfig;
