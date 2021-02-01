import express, { Express, json, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authController from "../controller/api.controller";
import passport from "passport";
import { errorMiddleware } from "../middleware/error.middleware";
import indexRouter from "../controller/index";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";

export const routers = (app: Express) => {
        app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
        app.use(morgan("tiny"));
        app.use(passport.initialize());
        app.use(cookieParser());
        app.use(helmet({ contentSecurityPolicy: false }));
        app.use(compression());
        app.use(bodyParser.json());
        app.set("view engine", "ejs");
        app.set("views", process.cwd() + "/src/views");
        app.use(express.static(process.cwd() + "/src/public"));
        app.use(bodyParser.urlencoded({ extended: true }));
        //main routers

        app.use(indexRouter);
        app.use("/api", authController);
        app.use(errorMiddleware);
        app.use((req: Request, res: Response) => {
                return res.render("404.ejs", {
                        page: {
                                title: "Not Found",
                                pageTitle: "Not Found |",
                                description: "hello",
                                imageUrl: "./asset/images/banner-2.png",
                        },
                });
        });
};
