import { Router, NextFunction, Response, Request } from "express";
import { ApiError } from "../interfaces/apiError";
import passport from "passport";
import { User } from "src/models/user";

const router = Router();

router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
        "/auth/google/callback",
        passport.authenticate("google", { failureRedirect: `${process.env.CLIENT_URL}/home` }),
        (req: Request, res: Response) => {
                const user: User = { ...req.user } as User;

                res.cookie("auth", user._id).redirect(`${process.env.CLIENT_URL}`);
        }
);

export default router;
