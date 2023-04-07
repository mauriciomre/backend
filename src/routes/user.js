import { Router } from "express";
import { userManager } from "../index.js";

const routerUser = Router();

routerUser.post("/", async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;

    try {
        const userInDB = await userManager.getElementByEmail(email);
        if (userInDB) {
            res.redirect("/api/users/login", {
                message: "El email ya está registrado.",
            });
        } else {
            await userManager.addElements([{ first_name, last_name, email, age, password }]);

            res.redirect("/api/users/login", {
                message: "El usuario se creó correctamente.",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

export default routerCart;
