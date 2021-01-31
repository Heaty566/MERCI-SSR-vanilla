import { Router, NextFunction, Response, Request } from "express";
import { ApiError } from "../interfaces/apiError";
import passport from "passport";
import { User } from "../models/user";
import { validator } from "../middleware/validator.middleware";
import { joiSchemaGenerator, contactUsSchema } from "../common/validator";
import { ContactUsForm } from "../common/validator/contactUs.validator";
import Joi from "joi";
import { logger } from "../app/logging";

const { getJoiSchemas } = joiSchemaGenerator<ContactUsForm>(contactUsSchema);

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

router.post(
        "/comment",
        validator(
                Joi.object({
                        ...getJoiSchemas(["comment", "email", "name"]),
                })
        ),
        (req: Request, res: Response) => {
                logger.info(req.body);
                return res.send({ status: 200 });
        }
);

export default router;
