import { MongoDBManager } from "../db/MongoDBManager.js";
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

    async getProducts(limit, page, sort, category) {
        this.setConnection();

        const limitQ = limit ? limit : 10;
        const pageQ = page ? page : 1;
        const categoryQ = category ? { category: category } : {};
        let sortQ = {};

        if (sort == "asc") {
            sortQ = { price: 1 };
        }
        if (sort == "desc") {
            sortQ = { price: -1 };
        }

        console.log(`limitQ ${limitQ}`);
        console.log(`pageQ ${pageQ}`);
        console.log(`sortQ ${sortQ}`);
        console.log(`categoryQ ${categoryQ}`);

        try {
            const productos = await this.model.paginate(categoryQ, {
                limit: limitQ,
                page: pageQ,
                sort: sortQ,
            });
            return productos;
        } catch (error) {
            console.log(`Error al obtener productos ${error}`);
        }
    }
}
