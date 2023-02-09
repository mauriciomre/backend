import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const productManager = new ProductManager("src/models/data.txt");
const routerProduct = Router();

routerProduct.get("/", async (req, res) => {
    const { limit } = req.query;
    const products = await productManager.getProducts(limit);
    res.send(JSON.stringify(products));
});

routerProduct.get("/:pid", async (req, res) => {
    const product = await productManager.getProductById(req.params.pid);
    res.send(JSON.stringify(product));
});

routerProduct.post("/", async (req, res) => {
    let message = await productManager.addProduct(req.body);
    res.send(message);
});

routerProduct.delete("/:pid", async (req, res) => {
    let message = await productManager.deleteProductById(req.params.id);
    res.send(message);
});

routerProduct.put("/:pid", async (req, res) => {
    let message = await productManager.updateProduct(req.params.id);
    res.send(message);
});

export default routerProduct;
