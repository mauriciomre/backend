import { Router } from "express";
//import ProductManager from "../controllers/ProductManager.js";
import { productManager } from "../index.js";
import { messageManager } from "../index.js";

//const productManager = new ProductManager("src/models/products.json");
const routerHbs = Router();

routerHbs.get("/", async (req, res) => {
    const products = await productManager.getProducts();
    res.render("home", { products });
});

routerHbs.get("/realtimeproducts", async (req, res) => {
    let products = await productManager.getElements();
    products = products.map((product) => product.toJSON());
    res.render("realtimeProducts", { products });
});

routerHbs.get("/chat", async (req, res) => {
    let messages = await messageManager.getElements();
    messages = messages.map((message) => message.toJSON());
    res.render("chat", { messages });
});

routerHbs.get("/login", async (req, res) => {
    res.render("login");
});

export default routerHbs;
