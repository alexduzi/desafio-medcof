import { ExtractJwt, Strategy, StrategyOptionsWithoutRequest } from "passport-jwt";
import passport from "passport";
import * as userRepository from "../repositories/userRepository";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_JWT,
} as StrategyOptionsWithoutRequest;

passport.use(
  new Strategy(opts, async (payload: any, done: any) => {
    try {
      const user = await userRepository.getUser(payload.id);
      console.log('passport', user);
      if (user) return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);