export const getSession = (req, res) => {
    //req.session.destroy();
    //console.log(`session ${req.session}`);
    if (req.session.passport?.user) {
        //Si la sesion esta activa en la BDD
        res.redirect("/api/product", 200, {
            message: "Bienvenido/a a mi tienda",
        });
    }
    //No esta activa la sesion
    res.render("login", { message: "Ingrese su email y contraseña" });
};

export const testLogin = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).send({ status: "error", error: "Invalidate User" });
        }
        //Genero la session de mi usuario
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
        };
        res.redirect("/api/product", 200, { status: "success", payload: req.user });
    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
};

export const destroySession = (req, res) => {
    req.session.destroy();
    //console.log(`DESTROY ${req.session}`);
    return res.status(200).redirect("/api/session");
};
