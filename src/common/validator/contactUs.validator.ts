import * as Joi from "joi";

//* Internal import
import { errorMsg } from "./messageErrorMapper.joi";
export interface ContactUsForm {
        name: string;
        email: string;
        comment: string;
}

export function contactUsSchema(field: keyof ContactUsForm) {
        switch (field) {
                case "name":
                        return Joi.string().min(2).max(100).trim().required().messages(errorMsg());
                case "comment":
                        return Joi.string().max(10000).min(1).trim().required().messages(errorMsg());
                case "email":
                        return Joi.string().max(100).min(2).trim().email().required().messages(errorMsg());
        }
}
