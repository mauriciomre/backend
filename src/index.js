import express from "express";
import ProductManager from "./components/app.js";

const app = express();

app.use(express.urlencoded({ extended: true }));

const manager = new ProductManager();

const readProducts = manager.readProducts();

app.get("/products", async (req, res) => {
    let limit = parseInt(req.query.limit);
    if (!limit) return res.send(await readProducts);
    let allProducts = await readProducts;
    let productLimit = allProducts.slice(0, limit);
    res.send(productLimit);
});

app.get("/products/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    let allProducts = await readProducts;
    let productById = allProducts.find((product) => product.id === id);
    res.send(productById);
});

const PORT = 5000;
const server = app.listen(PORT, () => {
    console.log(`Mi nuevo servidor en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Se produjo un error: \n${error}`));
