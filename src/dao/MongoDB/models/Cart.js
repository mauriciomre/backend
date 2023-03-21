import { MongoDBManager } from "../../../db/MongoDBManager.js";
const cartSchema = {
    products: Array,
};

export class MongoDBCartModel extends MongoDBManager {
    constructor() {
        super(process.env.MONGODBURL, "carts", cartSchema);
        // Atributos propios
    }
    // Metodos propios
}
