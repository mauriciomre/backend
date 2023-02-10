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
        let cartsArray = await this.readCarts();
        let productsArray = await productManager.readProducts();
        let foundCartIndex = cartsArray.findIndex((element) => element.id == parseInt(cid));
        let foundProduct = productsArray.find((element) => element.id == parseInt(pid));
        if (!foundCartIndex) {
            return `Cart ${cid} not found`;
        }

        if (!foundProduct) {
            return `Product ${pid} not found`;
        }

        if (foundCartIndex && foundProduct) {
            cartsArray[foundCartIndex].products.push({ product: foundProduct.id });
            await fs.writeFile(this.path, JSON.stringify(cartsArray));
            return `Producto ${pid} agregado al carrito ${cid}`;
        }
    };
}

export default CartManager;
