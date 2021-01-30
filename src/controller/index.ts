import { Router, Response, Request } from "express";
import { getDb } from "../app/db";

import { Product } from "../models/product";

const router = Router();

router.get("/", (req: Request, res: Response) => {
        return res.render("index.ejs", {
                page: { title: "MERCI", pageTitle: "", description: "hello", imageUrl: "/asset/images/banner-2.png" },
                env: process.env.NODE_ENV,
        });
});

router.get("/auth/login", (req: Request, res: Response) => {
        return res.render("login.ejs", {
                page: { title: "Login Your Merci Account", pageTitle: "Login |", description: "hello", imageUrl: "/asset/images/banner-2.png" },
                env: process.env.NODE_ENV,
        });
});
router.get("/contact", (req: Request, res: Response) => {
        return res.render("contact.ejs", {
                page: { title: "Contact To MERCI", pageTitle: "Contact Us |", description: "hello", imageUrl: "/asset/images/banner-2.png" },
                env: process.env.NODE_ENV,
        });
});
router.get("/show/:id", (req: Request, res: Response) => {
        return res.render("show.ejs", {
                page: { title: "Contact To MERCI", pageTitle: "| Contact", description: "hello", imageUrl: "/asset/images/banner-2.png" },
                env: process.env.NODE_ENV,
        });
});

type Sex = "male" | "female" | "unisex" | "";
interface ProductQuery {
        skip: number;
        name: string;
        price: number;
}

router.get("/api/more", async (req: Request, res: Response) => {
        const db = getDb();
        const query = req.query;
        const formatQuery: ProductQuery = {
                skip: query.skip ? Number(query.skip) : 0,
                name: query.name ? String(query.name) : "",
                price: query.price ? Number(query.price) : 1,
        };

        const filter: any = {};

        if (query.sex) {
                filter.sex = String(query.sex) as Sex;
        }

        const product = await db
                .collection<Product>("product")
                .find({ name: { $regex: `.*${formatQuery.name}.*`, $options: "i" }, ...filter })
                .skip(20)
                .sort({ [query.sortBy ? `${query.sortBy}` : "name"]: query.sortOrder && Number(query.sortOrder) === -1 ? -1 : 1 })
                .toArray();

        return res.send(product);
});

router.get("/store", async (req: Request, res: Response) => {
        const db = getDb();
        const query = req.query;
        const formatQuery: ProductQuery = {
                skip: query.skip ? Number(query.skip) : 0,
                name: query.name ? String(query.name) : "",
                price: query.price ? Number(query.price) : 1,
        };

        const filter: any = {};

        if (query.sex) {
                filter.sex = String(query.sex) as Sex;
        }

        const product = await db
                .collection<Product>("product")
                .find({ name: { $regex: `.*${formatQuery.name}.*`, $options: "i" }, ...filter })
                .limit(20)
                .skip(formatQuery.skip * 20)
                .sort({ [query.sortBy ? `${query.sortBy}` : "name"]: query.sortOrder && Number(query.sortOrder) === -1 ? -1 : 1 })
                .toArray();

        return res.render("store.ejs", {
                page: { title: "Explore Merci Store", pageTitle: "Store |", description: "hello", imageUrl: "/asset/images/banner-2.png" },
                data: product,
                env: process.env.NODE_ENV,
        });
});

router.get("/checkout", (req: Request, res: Response) => {
        return res.render("checkout.ejs", {
                page: { title: "Check Out Order", pageTitle: "Checkout |", description: "hello", imageUrl: "/asset/images/banner-2.png" },
                env: process.env.NODE_ENV,
        });
});
router.get("/aboutus", (req: Request, res: Response) => {
        return res.render("aboutus.ejs", {
                page: { title: "Contact To MERCI", pageTitle: "Contact Us |", description: "hello", imageUrl: "/asset/images/banner-2.png" },
                env: process.env.NODE_ENV,
        });
});

export default router;
