import { Router } from "express";
import CartManager from "../controllers/CartManager.js";
import { cartManager } from "../index.js";

//const cartManager = new CartManager("src/models/carts.json");
const routerCart = Router();

// routerCart.get("/", async (req, res) => {
//     const { limit } = req.query;
//     const carts = await cartManager.getCarts(limit);
//     res.send(JSON.stringify(carts));
// });

// OBTENER TODOS LOS CARRITOS
routerCart.get("/", async (req, res) => {
    const carts = await cartManager.getElements();
    res.send(JSON.stringify(carts));
});

// OBTENER TODOS LOS PRODUCTOS DEL CARRITO (CID)
routerCart.get("/:cid", async (req, res) => {
    const products = await cartManager.getProductsFromCart(req.params.cid);
    res.send(JSON.stringify(products));
});

// NUEVO CARRITO
routerCart.post("/", async (req, res) => {
    let message = await cartManager.addElements();
    res.send(message);
});

// AGREGAR PRODUCTO (PID) EN EL CARRITO (CID)
routerCart.post("/:cid/products/:pid", async (req, res) => {
    let message = await cartManager.addToCart(req.params.cid, req.params.pid);
    res.send(message);
});

// ELIMINAR PRODUCTO (PID) DEL CARRITO (CID)
routerCart.delete("/:cid/products/:pid", async (req, res) => {
    let message = await cartManager.deleteFromCart(req.params.cid, req.params.pid);
    res.send(message);
});

// ELIMINAR TODOS LOS PRODUCTOS DEL CARRITO (CID)
routerCart.delete("/:cid", async (req, res) => {
    let message = await cartManager.deleteAllFromCart(req.params.cid);
    res.send(message);
});

// ACTUALIZAR EL CARRITO (CID)
routerCart.put("/:cid", async (req, res) => {
    let updatedCart = await cartManager.updateCart(req.params.cid, req.body);
    res.send(updatedCart);
});

// ACTUALIZAR QUANTITY DEL PRODUCTO (PID) EN EL CARRITO (CID)
routerCart.put("/:cid/products/:pid", async (req, res) => {
    let updatedCart = await cartManager.updateQuantityCart(req.params.cid, req.params.pid, req.body);
    res.send(updatedCart);
});

export default routerCart;
