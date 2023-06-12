import { Schema } from "mongoose";
import productSchema from "./Product.js";

const cartSchema = new Schema({
    products: [
        {
            product: { type: Schema.Types.ObjectId, ref: "products" },
            quantity: Number,
        },
    ],
});

export default cartSchema;
