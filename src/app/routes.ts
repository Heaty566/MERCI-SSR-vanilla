import express, { Express, json, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongodbSession from "connect-mongodb-session";
import session from "express-session";
import authController from "../controller/auth.controller";
import passport from "passport";
import { config } from "../config";
import { errorMiddleware } from "../middleware/error.middleware";
import indexRouter from "../controller/index";
import morgan from "morgan";

const MongoDbStore = mongodbSession(session);
const sessionStore = new MongoDbStore({
        uri: config.DB_URL,
        collection: "session",
        expires: config.day * 30,
});

export const routers = (app: Express) => {
        app.use(json());
        app.use(cors({ origin: config.CLIENT_URL, credentials: true }));
        app.use(morgan("dev"));
        app.use(passport.initialize());
        app.use(bodyParser.json());
        app.set("view engine", "ejs");
        app.set("views", process.cwd() + "/src/views");
        app.use(express.static(process.cwd() + "/src/public"));
        app.use(bodyParser.urlencoded({ extended: true }));
        //main routers

        app.use(
                session({
                        secret: config.SESSION_SECRET,
                        name: "sessionId",
                        resave: true,
                        saveUninitialized: true,
                        store: sessionStore,
                        cookie: {
                                maxAge: config.day * 30,
                        },
                })
        );
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
