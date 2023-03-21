import { MongoDBManager } from "../../../db/MongoDBManager.js";
const productSchema = {
    title: String,
    category: String,
    description: String,
    price: Number,
    thumbnail: String,
    code: String,
    stock: Number,
};

export class MongoDBProductModel extends MongoDBManager {
    constructor() {
        super(process.env.MONGODBURL, "products", productSchema);
        // Atributos propios
    }
    // Metodos propios
}
