import "dotenv/config";
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import passport from "passport";
import router from "./routes/routes.js";
import { __dirname } from "./path.js";
import { engine } from "express-handlebars";
import initializePassport from "./config/passport.js";

import * as path from "path";
import { Server } from "socket.io";
import { getMessagesManager } from "./dao/daoManager.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

export const messageManager = new (await getMessagesManager()).MongoDBMessageModel();

const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Mi nuevo servidor en el puerto ${PORT}`);
    // console.log(path.resolve(__dirname, "./views"));
});

console.log(__dirname);

export const io = new Server(server);

const swaggerOption = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de Ecommerce",
            description: "Esta API permite realizar CRUD (crear, leer, actualizar y borrar) datos de un Ecommerce",
        },
    },
    apis: [`${__dirname}/docs/**/*.yaml`],
};

const specs = swaggerJSDoc(swaggerOption);

//Middlewares
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.use(cookieParser(process.env.PRIVATE_KEY_JWT));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        name: "mawe-session-cookie",
        store: MongoStore.create({
            mongoUrl: process.env.MONGODBURL,
            mongoOption: { useNewUrlParser: true, useUnifiedTopology: true },
            ttl: 2100,
        }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        rolling: true,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 10 },
    })
);

//Routes
app.use("/", router);

app.get("/", (req, res) => {
    req.logger.warn("Alerta!");
    res.send({ message: "Test logger" });
});

//Passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

//Socket
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
        productManager.deleteElement(id).then((products) => {
            io.emit("allProducts", products);
        });
    });
});
