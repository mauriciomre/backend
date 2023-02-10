import express from "express";
import routerProducts from "./routes/product.js";
import routerCarts from "./routes/carts.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
//import multer from "multer";

//import { create } from "express-handlebars";

const app = express();
const PORT = 8080;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.engine("handlebars", engine());
//app.set("view engine", "handlebars");
//app.set("views", path.resolve(__dirname, "./views"));

//Routes
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);
// app.get("/static", (req, res) => {
//     res.render("home", {
//         titulo: "Coder",
//         mensaje: "mundo",
//     });
// });

app.listen(PORT, () => {
    console.log(`Mi nuevo servidor en el puerto ${PORT}`);
});
