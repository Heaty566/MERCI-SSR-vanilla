import { User } from "../models/user";

import googleStrategy from "passport-google-oauth20";
import passport from "passport";
import { UserService } from "./user.service";
import { getDb } from "../app/db";

const GoogleStrategy = googleStrategy.Strategy;
passport.serializeUser(function (user, cb) {
        cb(null, user);
});

passport.use(
        new GoogleStrategy(
                {
                        clientID: "972210173226-10do0pkqfr57o43mku7047untfvshc1l.apps.googleusercontent.com",
                        clientSecret: "W8XHa4pXHVeCYmYtxgMruTt3",
                        callbackURL: `${process.env.CLIENT_URL}/api/auth/google/callback`,
                },
                async function (accessToken, refreshToken, profile, cb) {
                        const userService = new UserService(getDb().collection("user"));
                        const isUser = await userService.findOneByField("googleId", profile.id);

                        if (!isUser) {
                                const user = new User();
                                user.name = profile.displayName + "";
                                user.googleId = profile.id;
                                if (profile.emails) {
                                        user.email = profile.emails[0].value + "";
                                }
                                user.cart = [];

                                await userService.addUser(user);
                                const getUser = await userService.findOneByField("googleId", profile.id);

                                if (getUser) cb(undefined, getUser);
                        }
                        if (isUser) cb(undefined, isUser);
                }
        )
);
