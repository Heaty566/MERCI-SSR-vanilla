import { ObjectId } from "mongodb";

export class User {
        _id: ObjectId;
        name: string;
        googleId: string;
        email: string;
        cart: any[];
}
