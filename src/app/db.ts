import { MongoClient, Db } from "mongodb";
import mongodbURI from "mongodb-uri";
import { config } from "../config";
import { logger } from "./logging";

let db: Db;

export const initDb = () => {
        MongoClient.connect(config.DB_URL, { useUnifiedTopology: true }, (error, result) => {
                if (error) return logger.error(`Connect to mongodb failed: ${error.message}`);

                const dbInfo = mongodbURI.parse(config.DB_URL);
                db = result.db("appName");

                console.log(`Connect to ${dbInfo.database} database successfully on host: ${dbInfo.hosts[0].host}`);
        });
};

export const getDb = () => {
        if (!db) {
                logger.error("You have to initialized DB");
        }

        return db;
};
