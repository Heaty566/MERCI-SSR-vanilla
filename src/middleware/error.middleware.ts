import { ApiError } from "../interfaces/apiError";
import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (error: ApiError, req: Request, res: Response, next: NextFunction) => {
        switch (error.type) {
                case "BadRequest":
                        return res.status(400).send({ message: error.message, details: error.data, data: null, status: 400 });
        }
};
