import {
  ExtractJwt,
  Strategy as JwtStrategy,
  VerifiedCallback,
} from "passport-jwt";
import { doesUserExistByEmail, getUserByEmail } from "../services/user.service";

const secret = process.env.JWT_SECRET || "SECRET";

export interface JwtPayload {
  email: string;
}

export const jwtStrategyCallback = async (
  payload: JwtPayload,
  done: VerifiedCallback
) => {
  try {
    const email = payload.email;
    const userExists = await doesUserExistByEmail(email);
    if (userExists) {
      const user = await getUserByEmail(email);
      return done(null, user);
    }
    return done(null, false);
  } catch (err) {
    return done(err, false);
  }
};

export const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret,
  },
  jwtStrategyCallback
);
