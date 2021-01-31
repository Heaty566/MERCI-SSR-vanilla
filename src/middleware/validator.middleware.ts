import { Request, Response, NextFunction } from "express";
import Joi, { ObjectSchema } from "joi";
import { JoiErrorMapper } from "../common/validator/messageErrorMapper.joi";
import { ApiError } from "../interfaces/apiError";

export function validator(validatorObject: ObjectSchema) {
        return (req: Request, res: Response, next: NextFunction) => {
                console.log(req.body);
                const { value, error } = validatorObject.validate(req.body, { abortEarly: false });
                if (error) throw new ApiError("Invalid Input", JoiErrorMapper(error), "BadRequest");

                req.body = value;
                return next();
        };
}
