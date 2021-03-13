import { NextFunction, Request, Response } from "express";
import { UserService } from "../service/user.service";
import { getDb } from "../app/db";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.cookies["auth"]) {
                return res.status(401).redirect("/auth/login");
        }

        const db = getDb();
        const userService = new UserService(db.collection("user"));

        const user = await userService.findOneByField("_id", req.cookies["auth"]);
        if (user) req.user = user;
        else return res.status(401).cookie("auth", "", { maxAge: -999 }).redirect("/auth/login");
        next();
};
