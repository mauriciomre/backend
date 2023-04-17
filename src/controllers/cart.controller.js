import { getCartsManager } from "../dao/daoManager.js";

export const cartManager = new (await getCartsManager()).MongoDBCartModel();

// OBTENER TODOS LOS CARRITOS
export const getCarts = async (req, res) => {
    const carts = await cartManager.getElements();
    res.send(JSON.stringify(carts));
};

// OBTENER TODOS LOS PRODUCTOS DEL CARRITO (CID)
export const getProductsFromCart = async (req, res) => {
    const products = await cartManager.getProductsFromCart(req.params.cid);
    res.send(JSON.stringify(products));
};

// NUEVO CARRITO
export const newCart = async (req, res) => {
    let message = await cartManager.addElements();
    res.send(message);
};

// AGREGAR PRODUCTO (PID) EN EL CARRITO (CID)
export const addToCart = async (req, res) => {
    let message = await cartManager.addToCart(req.params.cid, req.params.pid);
    res.send(message);
};

// ELIMINAR PRODUCTO (PID) DEL CARRITO (CID)
export const deleteFromCart = async (req, res) => {
    let message = await cartManager.deleteFromCart(req.params.cid, req.params.pid);
    res.send(message);
};

// ELIMINAR TODOS LOS PRODUCTOS DEL CARRITO (CID)
export const deleteAllFromCart = async (req, res) => {
    let message = await cartManager.deleteAllFromCart(req.params.cid);
    res.send(message);
};

// ACTUALIZAR EL CARRITO (CID)
export const updateCart = async (req, res) => {
    let updatedCart = await cartManager.updateCart(req.params.cid, req.body);
    res.send(updatedCart);
};

// ACTUALIZAR QUANTITY DEL PRODUCTO (PID) EN EL CARRITO (CID)
export const updateQuantityCart = async (req, res) => {
    let updatedCart = await cartManager.updateQuantityCart(req.params.cid, req.params.pid, req.body);
    res.send(updatedCart);
};
