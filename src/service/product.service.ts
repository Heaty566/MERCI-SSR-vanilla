import { Collection, Db } from "mongodb";
import { Product } from "src/models/product";
import { logger } from "../app/logging";

export class ProductService {
        constructor(private repository: Collection<Product>) {}

        public async addNewItem(product: Product) {
                const newProduct = await this.repository.insertOne(product);
                logger.info(`new product with ID ${newProduct.insertedId} is added`);
                return newProduct;
        }
}
