import { Router } from "express";
import {
    getProducts,
    getProduct,
    addProduct,
    deleteProduct,
    updateProduct,
} from "../controllers/product.controller.js";

const routerProduct = Router();

routerProduct.get("/", getProducts);

routerProduct.get("/:pid", getProduct);

routerProduct.post("/", addProduct);

routerProduct.delete("/:pid", deleteProduct);

routerProduct.put("/:pid", updateProduct);

export default routerProduct;
