import { MongoDBManager } from "../../../db/MongoDBManager.js";
import { Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
        index: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        index: true,
    },
    thumbnails: [],
});

productSchema.plugin(paginate);
export class MongoDBProductModel extends MongoDBManager {
    constructor() {
        super(process.env.MONGODBURL, "products", productSchema);
        // Atributos propios
    }
    // Metodos propios

    async getProducts(limit, page, sort, filter) {
        this.setConnection();

        const limitQ = limit ? limit : 10;
        const pageQ = page ? page : 1;
        const sortQ = sort == "asc" ? 1 : -1;

        try {
            const productos = await this.model.paginate({ limit: limit, page: page });
            //FALTA FILTER
            return productos;
        } catch (error) {
            console.log(`Error al obtener productos ${error}`);
        }
    }
}
