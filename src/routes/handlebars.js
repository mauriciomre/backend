import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const productManager = new ProductManager("src/models/products.json");
const routerHbs = Router();

routerHbs.get("/", async (req, res) => {
    const products = await productManager.getProducts();
    res.render("home", { products });
});

routerHbs.get("/realtimeproducts", async (req, res) => {
    const products = await productManager.getProducts();
    res.render("realtimeProducts", { products });
});

export default routerHbs;
