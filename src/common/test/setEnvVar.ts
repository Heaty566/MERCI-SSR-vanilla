import path from "path";
import dotenv from "dotenv";

export = async () => {
        dotenv.config({
                path: path.resolve(__dirname, "../../config/.env.test"),
        });
};
