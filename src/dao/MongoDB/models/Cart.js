import { MongoDBManager } from "../../../db/MongoDBManager.js";
import mongoose from "mongoose";

const cartSchema = {
    products: [
        {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
            quantity: Number,
        },
    ],
};

export class MongoDBCartModel extends MongoDBManager {
    constructor() {
        super(process.env.MONGODBURL, "carts", cartSchema);
        // Atributos propios
    }
    // Metodos propios

    async existCart(cid) {
        let cartsAll = await this.getElements();
        return cartsAll.find((cart) => cart.id === cid);
    }

    async existProduct(pid) {
        let productsAll = await mongoose.model("products").find();
        return productsAll.find((product) => product.id === pid);
    }

    async addToCart(cid, pid) {
        let cart = await this.existCart(cid);
        if (!cart) return "Carrito no Encontrado";

        let product = await this.existProduct(pid);
        if (!product) return "Producto no Encontrado";

        let productInCart = cart.products.some((product) => product._id == pid);
        console.log(product.id, typeof product.id);
        console.log(pid, typeof pid);

        console.log(productInCart);

        if (!productInCart) {
            let addProduct = [{ _id: product.id, quantity: 1 }, ...cart.products];
            await this.model.findByIdAndUpdate(cid, { products: addProduct });
            return `Producto ${product.title} agregado al Carrito. Cantidad: 1`;
        } else {
            let indexProduct = cart.products.findIndex((product) => product._id == pid);
            cart.products[indexProduct].quantity++;
            let quantityProductInCart = cart.products[indexProduct].quantity;
            let updatedCart = await this.model.findByIdAndUpdate(cid, { products: cart.products });

            console.log(updatedCart);

            return `Producto ${product.title} agregado al Carrito. Cantidad: ${quantityProductInCart}`;
        }
    }
}
