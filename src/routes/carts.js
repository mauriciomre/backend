import { Router } from "express";
import CartManager from "../controllers/CartManager.js";

const cartManager = new CartManager("src/models/carts.json");
const routerCart = Router();

// routerCart.get("/", async (req, res) => {
//     const { limit } = req.query;
//     const carts = await cartManager.getCarts(limit);
//     res.send(JSON.stringify(carts));
// });

routerCart.get("/:cid", async (req, res) => {
    const cart = await cartManager.getElementById(req.params.cid);
    res.send(JSON.stringify(cart));
});

routerCart.post("/", async (req, res) => {
    let message = await cartManager.addElement();
    res.send(message);
});

routerCart.post("/:cid/product/:pid", async (req, res) => {
    //crear metodo propio para agregar producto al carrito
    let message = await cartManager.addToCart(req.params.cid, req.params.pid);
    res.send(message);
});

export default routerCart;
