import { getProductsManager } from "../dao/daoManager.js";

export const productManager = new (await getProductsManager()).MongoDBProductModel();

export const getProducts = async (req, res) => {
    const { limit, page, sort, category } = req.query;
    let products = await productManager.getProducts(limit, page, sort, category);
    products = products.docs.map((product) => product.toJSON());
    res.render("products", { products, user: req.session.user });
    console.log(products);
};

export const getProduct = async (req, res) => {
    const product = await productManager.getElementById(req.params.pid);
    res.send(JSON.stringify(product));
};

export const addProduct = async (req, res) => {
    let message = await productManager.addElements(req.body);
    res.send(message);
};

export const deleteProduct = async (req, res) => {
    let message = await productManager.deleteElement(req.params.pid);
    res.send(message);
};

export const updateProduct = async (req, res) => {
    let updatedProduct = await productManager.updateElement(req.params.pid, req.body);
    res.send(updatedProduct);
};
