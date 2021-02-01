import { MongoClient, Db } from "mongodb";
import { logger } from "./logging";

let db: Db;

export const initDb = () => {
        MongoClient.connect(process.env.DB_URL + "", { useUnifiedTopology: true }, (error, result) => {
                if (error) return logger.error(`Connect to mongodb failed: ${error.message}`);

                db = result.db("appName");
        });
};

export const getDb = () => {
        if (!db) {
                logger.error("You have to initialized DB");
        }

        return db;
};
