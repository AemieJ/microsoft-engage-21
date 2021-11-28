const dev = "production"

export const uri =
  dev == "development"
    ? "http://localhost:4000"
    : "http://ec2-13-232-90-241.ap-south-1.compute.amazonaws.com:4000"
