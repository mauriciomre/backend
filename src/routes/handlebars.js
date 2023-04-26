import { Router } from "express";
import { productManager } from "../controllers/product.controller.js";
import { messageManager } from "../index.js";

const routerHbs = Router();

routerHbs.get("/", async (req, res) => {
    const products = await productManager.getElements();
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

export default routerHbs;
