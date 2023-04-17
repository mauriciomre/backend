import { Router } from "express";
import {
    getCarts,
    getProductsFromCart,
    newCart,
    addToCart,
    deleteFromCart,
    deleteAllFromCart,
    updateCart,
    updateQuantityCart,
} from "../controllers/cart.controller.js";

const routerCart = Router();

// OBTENER TODOS LOS CARRITOS
routerCart.get("/", getCarts);

// OBTENER TODOS LOS PRODUCTOS DEL CARRITO (CID)
routerCart.get("/:cid", getProductsFromCart);

// NUEVO CARRITO
routerCart.post("/", newCart);

// AGREGAR PRODUCTO (PID) EN EL CARRITO (CID)
routerCart.post("/:cid/products/:pid", addToCart);

// ELIMINAR PRODUCTO (PID) DEL CARRITO (CID)
routerCart.delete("/:cid/products/:pid", deleteFromCart);

// ELIMINAR TODOS LOS PRODUCTOS DEL CARRITO (CID)
routerCart.delete("/:cid", deleteAllFromCart);

// ACTUALIZAR EL CARRITO (CID)
routerCart.put("/:cid", updateCart);

// ACTUALIZAR QUANTITY DEL PRODUCTO (PID) EN EL CARRITO (CID)
routerCart.put("/:cid/products/:pid", updateQuantityCart);

export default routerCart;
