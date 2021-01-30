import { NextFunction, Request, Response } from "express";
import { UserService } from "src/service/user.service";
const { getDB } = require("../app/db");

module.exports.updateUser = async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.cookies["auth"]);
        const db = getDB();
        const userService = new UserService(db.collection("user"));

        const user = await userService.findOneByField("_id", req.cookies("auth"));
        if (user) req.user = user;

        next();
};
