import express from "express";
import { __dirname } from "../path.js";
import routerProducts from "./product.js";
import routerCarts from "./carts.js";
import routerUsers from "./users.js";
import routerSessions from "./sessions.js";
import routerHbs from "./handlebars.js";

const { Router } = express;
const router = Router();

router.use("/api/product", routerProducts);
router.use("/api/cart", routerCarts);
router.use("/api/user", routerUsers);
router.use("/api/session", routerSessions);
router.use("/", express.static(__dirname + "/public"));
router.use("/", routerHbs);

export default router;
