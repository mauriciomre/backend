import { getUsersManager } from "../dao/daoManager.js";

export const userManager = new (await getUsersManager()).MongoDBUserModel();

export const createUser = async (req, res) => {
    res.render("register");
};

export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userManager.getElementById(id);
        if (user) {
            return res.status(200).json({
                message: user,
            });
        }
        return res.status(200).json({
            message: "Usuario no encontrado",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getUserByEmail = async (email) => {
    try {
        const user = await userManager.getElementByEmail(email);
        if (user) {
            return user;
        }
        return "Usuario no encontrado";
    } catch (error) {
        return error;
    }
};
