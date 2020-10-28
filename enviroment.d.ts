declare global {
        namespace NodeJS {
                interface ProcessEnv {
                        SESSION_SECRET: string;
                        NODE_ENV: "development" | "production";
                        DB_URL: string;
                        CLIENT_URL: string | string[];
                }
        }
}

export {};
