import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import passport from "passport";
import { jwtStrategy } from "./config/passport.config";
import sequelize from "./db";
import authRouter from "./routes/auth.route";
import profileRouter from "./routes/profile.route";
// import userRouter from "./routes/user.route";
import cors from "cors";
import classRoomRouter from "./routes/classroom.route";
import lectureRouter from "./routes/lecture.route";

// Constants
const IS_PRODUCTION = process.env.NODE_ENV == "production";

// sync database
(async () => {
  await sequelize.sync();
  console.log("All models were synchronized successfully.");
})();

// Express config
const app = express();
app.use(cors());
app.use(morgan(IS_PRODUCTION ? "combined" : "dev"));
app.use(express.json());

// Passport setup
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/classroom", classRoomRouter);
app.use("/api/lecture", lectureRouter);

app.get("/", async (_, res) => {
  res.send("Hello World!");
});

export default app;
