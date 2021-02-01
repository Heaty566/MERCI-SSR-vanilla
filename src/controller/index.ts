import { Router, Response, Request } from "express";
import { ObjectId } from "mongodb";
import { User } from "../models/user";
import { getDb } from "../app/db";
import { authMiddleware } from "../middleware/auth.middleware";
import { Product } from "../models/product";

const router = Router();

router.get("/", (req: Request, res: Response) => {
        return res.render("index.ejs", {
                page: { title: "MERCI", pageTitle: "", description: "hello", imageUrl: "/asset/images/banner-2.jpg" },
                env: process.env.NODE_ENV,
        });
});

router.get("/auth/login", (req: Request, res: Response) => {
        return res.render("login.ejs", {
                page: { title: "Login Your Merci Account", pageTitle: "Login |", description: "hello", imageUrl: "/asset/images/banner-2.jpg" },
                env: process.env.NODE_ENV,
        });
});
router.get("/contact", (req: Request, res: Response) => {
        return res.render("contact.ejs", {
                page: { title: "Contact To MERCI", pageTitle: "Contact Us |", description: "hello", imageUrl: "/asset/images/banner-2.jpg" },
                env: process.env.NODE_ENV,
        });
});
router.get("/show/:id", async (req: Request, res: Response) => {
        const db = getDb();
        const item = ObjectId.isValid(req.params.id) ? await db.collection<Product>("product").findOne({ _id: new ObjectId(req.params.id) }) : null;
        if (!item) return res.redirect("/404");
        const recommend = await db
                .collection<Product>("product")
                .aggregate([{ $sample: { size: 12 } }])
                .toArray();

        return res.render("show.ejs", {
                page: {
                        title: `${item.name}`,
                        pageTitle: `${item.name} | `,
                        description: `${item.name} - $${item.price}`,
                        imageUrl: item.imageUrl,
                },
                env: process.env.NODE_ENV,
                item,
                url: process.env.CLIENT_URL,
                recommend,
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
                page: { title: "Explore Merci Store", pageTitle: "Store |", description: "hello", imageUrl: "/asset/images/banner-2.jpg" },
                data: product,
                url: process.env.CLIENT_URL,
                env: process.env.NODE_ENV,
        });
});

router.get("/api/count", authMiddleware, async (req: Request, res: Response) => {
        const user = { ...req.user } as User;

        return res.send({ total: user.cart.length });
});

router.get("/checkout", authMiddleware, async (req: Request, res: Response) => {
        const user = { ...req.user } as User;

        const db = getDb().collection("product");

        const item = await Promise.all(
                user.cart.map(async (item) => {
                        const product = await db.findOne({ _id: new ObjectId(item.itemId) });

                        return {
                                name: product.name,
                                price: product.price,
                                _id: item.itemId,
                                color: item.color,
                                size: item.size,
                        };
                })
        );

        return res.render("checkout.ejs", {
                page: { title: "Check Out Order", pageTitle: "Checkout |", description: "hello", imageUrl: "/asset/images/banner-2.jpg" },
                env: process.env.NODE_ENV,
                item,
        });
});
router.get("/partnership", (req: Request, res: Response) => {
        return res.render("partner.ejs", {
                page: { title: "Become MERCI partner", pageTitle: "Partner |", description: "hello", imageUrl: "/asset/images/banner-2.jpg" },
                env: process.env.NODE_ENV,
        });
});
router.get("/aboutus", (req: Request, res: Response) => {
        return res.render("aboutus.ejs", {
                page: { title: "Contact To MERCI", pageTitle: "About Us |", description: "hello", imageUrl: "/asset/images/aboutus.jpg" },
                env: process.env.NODE_ENV,
        });
});

export default router;
