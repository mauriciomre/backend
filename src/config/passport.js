import local from "passport-local";
import passport from "passport";
import { userManager } from "../controllers/user.controller.js";
import { createHash, validatePassword } from "../utils/bcrypt.js";

//Passport se va a trabajar como un middleware
const LocalStrategy = local.Strategy; //Defino mi estrategia

const initializePassport = () => {
    //Definir donde se aplican mis estrategias
    passport.use(
        "register",
        new LocalStrategy(
            { passReqToCallback: true, usernameField: "email" },
            async (req, username, password, done) => {
                const { first_name, last_name, email, age } = req.body;
                try {
                    const user = await userManager.getElementByEmail(username);
                    if (user) {
                        return done(null, false);
                    }
                    const passwordHash = createHash(password);

                    const userCreated = await userManager.addElements([
                        {
                            first_name: first_name,
                            last_name: last_name,
                            email: email,
                            password: passwordHash,
                        },
                    ]);
                    console.log(userCreated);
                    return done(null, userCreated);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    //Inicializar la session del user
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    //Eliminar la session del user
    passport.deserializeUser(async (id, done) => {
        const user = userManager.getElementById(id);
        done(null, user);
    });

    passport.use(
        "login",
        new LocalStrategy({ usernameField: "email" }, async (username, password, done) => {
            try {
                const user = await userManager.getElementByEmail(username);

                if (!user) {
                    //Usuario no encontrado
                    return done(null, false);
                }
                if (validatePassword(password, user.password)) {
                    //Usuario y contraseña validos
                    return done(null, user);
                }

                return done(null, false); //Contraseña no valida
            } catch (error) {
                return done(error);
            }
        })
    );
};

export default initializePassport;
