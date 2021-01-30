import { ObjectId } from "mongodb";

export class Product {
        _id: ObjectId;
        name: string;
        price: number;
        sex: "male" | "female" | "unisex";
        size: string[];
        color: string[];
}
