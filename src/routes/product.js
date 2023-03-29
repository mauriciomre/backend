import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";
import { productManager } from "../index.js";

//const productManager = new ProductManager("src/models/products.json");
const routerProduct = Router();

routerProduct.get("/", async (req, res) => {
    const { limit, page, sort, filter } = req.query;
    const products = await productManager.getProducts(limit, page, sort, filter);
    res.send(JSON.stringify(products));
});

routerProduct.get("/:pid", async (req, res) => {
    const product = await productManager.getElementById(req.params.pid);
    res.send(JSON.stringify(product));
});

routerProduct.post("/", async (req, res) => {
    let message = await productManager.addElements(req.body);
    res.send(message);
});

routerProduct.delete("/:pid", async (req, res) => {
    let message = await productManager.deleteElement(req.params.pid);
    res.send(message);
});

routerProduct.put("/:pid", async (req, res) => {
    let updatedProduct = await productManager.updateElement(req.params.pid, req.body);
    res.send(updatedProduct);
});

export default routerProduct;
