import * as Joi from "joi";

//* Internal import
import { errorMsg } from "./messageErrorMapper.joi";
export interface AddCart {
        color: string;
        size: string;
}

export function addCartSchema(field: keyof AddCart) {
        switch (field) {
                case "color":
                        return Joi.string().min(1).max(100).trim().required().messages(errorMsg());
                case "size":
                        return Joi.string().max(100).min(1).trim().required().messages(errorMsg());
        }
}
