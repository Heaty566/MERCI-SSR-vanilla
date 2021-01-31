import path from "path";
import dotenv from "dotenv";
import express from "express";

dotenv.config({
        path: path.resolve(__dirname, `./src/config/.env.${process.env.NODE_ENV}`),
});

import { initDb } from "./src/app/db";
import { initProd } from "./src/app/prod";
import { routers } from "./src/app/routes";
const app = express();

initDb();
initProd(app);
routers(app);
import "./src/service/passport.service";

const port = process.env.PORT || 3000;
app.listen(port, () => {
        console.log(`-------------------------------------- Current mode: ${process.env.NODE_ENV}`);
        console.log(`-------------------------------------- Listening on port ${port}`);
        console.log("-------------------------------------- database: " + process.env.DB_URL);
});
