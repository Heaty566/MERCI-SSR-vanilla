import { Request, Response, NextFunction } from "express";
import Joi, { ObjectSchema } from "joi";
import { ApiError } from "../interfaces/apiError";

export function validator(validatorObject: ObjectSchema) {
        return (req: Request, res: Response, next: NextFunction) => {
                const { value, error } = validatorObject.validate(req.body, { abortEarly: false });
                if (error) throw new ApiError("Invalid Input", error.details, "BadRequest");

                req.body = value;
                return next();
        };
}
