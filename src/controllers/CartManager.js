import { promises as fs } from "fs";
import ProductManager from "../controllers/ProductManager.js";

const productManager = new ProductManager("src/models/products.json");

class CartManager {
    constructor(path) {
        this.path = path;
    }
    static id = 1;

    addCart = async () => {
        let cartsArray = await this.readCarts();

        while (cartsArray.some((cart) => cart.id === CartManager.id)) {
            CartManager.id++;
        }
        let cart = { id: CartManager.id, products: [] };

        cartsArray.push(cart);

        await fs.writeFile(this.path, JSON.stringify(cartsArray));
        return cartsArray;
    };

    readCarts = async () => {
        let cartsFile = await fs.readFile(this.path, "utf-8");
        return JSON.parse(cartsFile);
    };

    getCartById = async (id) => {
        let cartsArray = await this.readCarts();
        let found = cartsArray.find((element) => element.id == parseInt(id));
        return found ? found.products : `Cart ${id} not found`;
    };

    addToCart = async (cid, pid) => {
        const carts = await this.readCarts();
        const cartIndex = carts.findIndex((cart) => cart.id === parseInt(cid, 10));
        if (cartIndex === -1) {
            return `Cart ${cid} not found`;
        }

        const products = await productManager.readProducts();
        const product = products.find((product) => product.id === parseInt(pid, 10));
        if (!product) {
            return `Product ${pid} not found`;
        }

        const cart = carts[cartIndex];
        const productIndex = cart.products.findIndex((item) => item.id === product.id);
        if (productIndex === -1) {
            cart.products.push({ id: product.id, quantity: 1 });
        } else {
            cart.products[productIndex].quantity += 1;
        }

        await fs.writeFile(this.path, JSON.stringify(carts));
        return `Product ID: ${pid} added to cart ID: ${cid}`;
    };
}

export default CartManager;
