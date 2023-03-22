import dotenv from "dotenv";
dotenv.config();
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
import { getMessagesManager } from "./dao/daoManager.js";
import { getProductsManager } from "./dao/daoManager.js";
import { getCartsManager } from "./dao/daoManager.js";
//import { MongoDBUserModel } from "./dao/MongoDB/models/User.js";
//import multer from "multer";
//import { create } from "express-handlebars";

//const productManager = new ProductManager("src/models/products.json");

export const productManager = new (await getProductsManager()).MongoDBProductModel();
export const messageManager = new (await getMessagesManager()).MongoDBMessageModel();
export const cartManager = new (await getCartsManager()).MongoDBCartModel();

//const userManager = new MongoDBUserModel();

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

io.on("connection", async (socket) => {
    console.log("Un cliente se ha conectado");

    // socket.on("tryLogin", (user) => {
    // });

    socket.on("newMessage", async (info) => {
        messageManager.addElements([info]).then(() => {
            console.log(`El mensaje se guardo en la DB correctamente`);

            messageManager.getElements().then((allMessages) => {
                //console.log(`TODOS LOS MENSAJES ${allMessages}`);
                io.emit("allMessages", allMessages);
            });
        });
    });

    socket.on("newProduct", (product) => {
        productManager.addElements(product).then((products) => {
            io.emit("allProducts", products);
        });
    });

    socket.on("deleteProduct", (id) => {
        //const id = mongoose.Types.ObjectId(idString);
        productManager.deleteElement(id).then((products) => {
            io.emit("allProducts", products);
        });
    });
});
