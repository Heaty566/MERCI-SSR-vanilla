import path from "path";
import dotenv from "dotenv";
import express from "express";

dotenv.config({
        path: path.resolve(__dirname, `./src/config/.env.${process.env.NODE_ENV}`),
});

import { initDb } from "./src/app/db";
import { initProd } from "./src/app/prod";
import { routers } from "./src/app/routes";
import { logger } from "./src/app/logging";
const app = express();

initDb();
initProd(app);
routers(app);
import "./src/service/passport.service";

const port = process.env.PORT || 3000;
app.listen(port, () => {
        logger.info(`Current mode: ${process.env.NODE_ENV}`);
        logger.info(`Listening on port ${port}`);
        logger.info("database: " + process.env.DB_URL);
});
