import { MongoDBManager } from "../db/MongoDBManager.js";
import cartSchema from "../models/Cart.js";

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

    async getProductsFromCart(cid) {
        this.setConnection();

        let cart = await this.existCart(cid);
        if (!cart) return "Carrito no encontrado";

        try {
            const products = await this.model.findById(cid).populate("products.product");
            return products;
        } catch (error) {
            console.log("Error en obtener productos del carrito", error);
            return false;
        }
    }

    async addToCart(cid, pid) {
        this.setConnection();
        let cart = await this.existCart(cid);
        if (!cart) return "Carrito no encontrado";

        let product = await this.existProduct(pid);
        if (!product) return "Producto no encontrado";

        let productInCart = cart.products.some((product) => product.product == pid);

        if (!productInCart) {
            let addProduct = [{ product: product.id, quantity: 1 }, ...cart.products];
            await this.model.findByIdAndUpdate(cid, { products: addProduct });
            return `Producto ${product.title} agregado al carrito. Cantidad: 1`;
        } else {
            let indexProduct = cart.products.findIndex((product) => product.product == pid);
            cart.products[indexProduct].quantity++;
            let quantityProductInCart = cart.products[indexProduct].quantity;
            let updatedCart = await this.model.findByIdAndUpdate(cid, { products: cart.products });

            console.log(updatedCart);

            return `Producto ${product.title} agregado al carrito. Cantidad: ${quantityProductInCart}`;
        }
    }

    async deleteFromCart(cid, pid) {
        this.setConnection();
        let cart = await this.existCart(cid);
        if (!cart) return "Carrito no encontrado";

        console.log(`cid ${cid}`);
        console.log(`pid ${pid}`);
        console.log(`cart ${cart}`);

        let productInCart = cart.products.some((product) => product._id == pid);

        console.log(`productInCart ${productInCart}`);

        if (productInCart) {
            let allProductsCart = await this.model.findOneAndUpdate(
                { _id: cid },
                { $pull: { products: { _id: pid } } },
                { new: true }
            );

            return allProductsCart;
        } else {
            return `El producto ${pid} no se encuentra en el carrito ${cid}`;
        }
    }

    async deleteAllFromCart(cid) {
        this.setConnection();

        let cart = await this.existCart(cid);
        if (!cart) return "Carrito no encontrado";

        try {
            let cleanCart = await this.model.findOneAndUpdate({ _id: cid }, { products: [] }, { new: true });

            return cleanCart;
        } catch (error) {
            console.log("Error en limpiar el carrito", error);
        }
    }

    async updateCart(cid, info) {
        this.setConnection();

        let cart = await this.existCart(cid);
        if (!cart) return "Carrito no encontrado";

        try {
            let updatedCart = await this.model.findOneAndUpdate({ _id: cid }, { products: info }, { new: true });

            return updatedCart;
        } catch (error) {
            console.log("Error en update de carrito", error);
        }
    }

    async updateQuantityCart(cid, pid, info) {
        this.setConnection();

        let cart = await this.existCart(cid);
        if (!cart) return "Carrito no encontrado";

        let productInCart = cart.products.some((product) => product._id == pid);

        if (productInCart) {
            try {
                let updatedCart = await this.model.findOneAndUpdate(
                    { _id: cid, "products._id": pid },
                    { $set: { "products.$.quantity": parseInt(info.quantity) } },
                    { new: true }
                );

                return updatedCart;
            } catch (error) {
                console.log("Error en update de quantity", error);
            }
        } else {
            return `El producto ${pid} no se encuentra en el carrito ${cid}`;
        }
    }
}
