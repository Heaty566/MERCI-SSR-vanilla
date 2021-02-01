import { Router, Response, Request } from "express";
import passport from "passport";
import { User } from "../models/user";
import { validator } from "../middleware/validator.middleware";
import { joiSchemaGenerator, contactUsSchema } from "../validator";
import { ContactUsForm } from "../validator/contactUs.validator";
import Joi from "joi";
import { logger } from "../app/logging";
import { authMiddleware } from "../middleware/auth.middleware";
import { ObjectId } from "mongodb";
import { getDb } from "../app/db";

const { getJoiSchemas } = joiSchemaGenerator<ContactUsForm>(contactUsSchema);
const router = Router();

router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
        "/auth/google/callback",
        passport.authenticate("google", { failureRedirect: `${process.env.CLIENT_URL}/auth/login` }),
        (req: Request, res: Response) => {
                const user: User = { ...req.user } as User;
                return res.cookie("auth", user._id).redirect(`${process.env.CLIENT_URL}`);
        }
);

router.post("/remove/:id", authMiddleware, async (req: Request, res: Response) => {
        const id = req.params.id;

        const db = getDb().collection("user");
        if (!ObjectId.isValid(id)) return res.status(400).send({ status: 400 });
        const user = { ...req.user } as User;
        const getUser = await db.findOne({ _id: user._id });
        let cart = [...getUser.cart];

        for (let i = 0; i < cart.length; i++) {
                if (id === cart[i].itemId) {
                        cart.splice(i, 1);
                        break;
                }
        }

        await db.updateOne(
                { _id: user._id },
                {
                        $set: {
                                cart,
                        },
                }
        );
        return res.send({ status: 200 });
});
router.post("/add/:id", authMiddleware, async (req: Request, res: Response) => {
        const id = req.params.id;
        const db = getDb().collection("user");
        if (!ObjectId.isValid(id)) return res.status(400).send({ status: 400 });
        const user = { ...req.user } as User;

        await db.updateOne(
                { _id: user._id },
                {
                        $push: {
                                cart: {
                                        itemId: id,
                                        size: req.body.size,
                                        color: req.body.color,
                                },
                        },
                }
        );
        return res.send({ status: 200 });
});
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
