import express from "express";
import routerProducts from "./routes/product.js";
import routerCarts from "./routes/carts.js";
import routerHbs from "./routes/handlebars.js";
import { fileURLToPath } from "url";
import { __dirname } from "./path.js";
import { engine } from "express-handlebars";
import * as path from "path";
import { Server } from "socket.io";
import ProductManager from "./controllers/ProductManager.js";
//import multer from "multer";
//import { create } from "express-handlebars";

const productManager = new ProductManager("src/models/products.json");

const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Mi nuevo servidor en el puerto ${PORT}`);
    console.log(path.resolve(__dirname, "./views"));
});

export const io = new Server(server);

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

//Routes
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);
app.use("/", express.static(__dirname + "/public"));
app.use("/", routerHbs);

io.on("connection", (socket) => {
    console.log("Un cliente se ha conectado");

    socket.on("eliminar-producto", (eliminarId) => {
        productManager.deleteProductById(eliminarId).then((productsArray) => {
            io.emit("todos-los-productos", productsArray);
        });
    });

    socket.on("nuevo-producto", (nuevoProducto) => {
        productManager.addProduct(nuevoProducto).then((productsArray) => {
            io.emit("todos-los-productos", productsArray);
        });
    });
});
