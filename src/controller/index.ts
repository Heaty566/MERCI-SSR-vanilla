import { Router, Response, Request } from "express";
import { getDb } from "../app/db";
import { FilterQuery } from "mongodb";
import { Product } from "../models/product";

const router = Router();

router.get("/", (req: Request, res: Response) => {
        return res.render("index.ejs", {
                page: { title: "MERCI", pageTitle: "", description: "hello", imageUrl: "/asset/images/banner-2.png" },
        });
});

router.get("/auth/login", (req: Request, res: Response) => {
        return res.render("login.ejs", {
                page: { title: "Login Your Merci Account", pageTitle: "Login |", description: "hello", imageUrl: "/asset/images/banner-2.png" },
        });
});
router.get("/contact", (req: Request, res: Response) => {
        return res.render("contact.ejs", {
                page: { title: "Contact To MERCI", pageTitle: "Contact Us |", description: "hello", imageUrl: "/asset/images/banner-2.png" },
        });
});
router.get("/show", (req: Request, res: Response) => {
        return res.render("show.ejs", {
                page: { title: "Contact To MERCI", pageTitle: "| Contact", description: "hello", imageUrl: "/asset/images/banner-2.png" },
        });
});

type Sex = "male" | "female" | "unisex" | "";
interface ProductQuery {
        skip: number;
        name: string;
        price: number;
}

router.get("/store", async (req: Request, res: Response) => {
        const db = getDb();
        const query = req.query;
        const formatQuery: ProductQuery = {
                skip: query.skip ? Number(query.skip) : 0,
                name: query.name ? String(query.name) : "",
                price: query.price ? Number(query.price) : 1,
        };
        console.log(req.query);
        const filter: any = {};
        const sort: any = {};
        if (query.sex) {
                filter.sex = String(query.sex) as Sex;
        }

        if (query.price) {
                sort.price = Number(query.price) === -1 ? -1 : 1;
        } else {
                sort.name = 1;
        }

        const product = await db
                .collection<Product>("product")
                .find({ name: { $regex: `.*${formatQuery.name}.*`, $options: "i" }, ...filter })
                .limit(20)
                .skip(formatQuery.skip * 20)
                .sort({ ...sort })
                .toArray();

        return res.render("store.ejs", {
                page: { title: "Contact To MERCI", pageTitle: "Store |", description: "hello", imageUrl: "/asset/images/banner-2.png" },
                data: product,
        });
});
router.get("/checkout", (req: Request, res: Response) => {
        return res.render("checkout.ejs", {
                page: { title: "Contact To MERCI", pageTitle: "| Contact", description: "hello", imageUrl: "/asset/images/banner-2.png" },
        });
});
router.get("/aboutus", (req: Request, res: Response) => {
        return res.render("aboutus.ejs", {
                page: { title: "Contact To MERCI", pageTitle: "Contact Us |", description: "hello", imageUrl: "/asset/images/banner-2.png" },
        });
});

export default router;
