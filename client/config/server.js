const dev = "production"

export const server =
  dev == "development"
    ? "http://localhost:3000"
    : "https://microsoft-engage-21.vercel.app"
