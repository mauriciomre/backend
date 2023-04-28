import { Router } from "express";
import passport from "passport";
import { destroySession, getSession, testLogin } from "../controllers/session.controller.js";

const routerSession = Router();

routerSession.get("/login", getSession);
routerSession.get("/", getSession);

routerSession.post("/login", passport.authenticate("login"), testLogin);
routerSession.get("/logout", destroySession);

routerSession.get("/github", passport.authenticate("github", { scope: ["user:email"] }), async (req, res) => {});

routerSession.get("/githubcallback", passport.authenticate("github"), async (req, res) => {
    req.session.user = req.user;
    res.redirect("/api/product");
});

export default routerSession;
