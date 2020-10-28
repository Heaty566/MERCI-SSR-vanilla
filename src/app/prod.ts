import helmet from "helmet";
import { Express } from "express";
import compression from "compression";

export const initProd = (app: Express) => {
        if (process.env.NODE_ENV === "production") {
                app.use(helmet());
                app.use(compression());
        }
};
