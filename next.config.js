/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://localhost:4000/api/:path*"
            : "https://daler-course-project-server.herokuapp.com/api/:path*",
      },
      {
        source: "/uploads/:path*",
        destination: "http://localhost:4000/uploads/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
