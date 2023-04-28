import local from "passport-local";
import passport from "passport";
import GitHubStrategy from "passport-github2";
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
                const { first_name, last_name, email } = req.body;
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
                    //console.log(`USUARIO CREADO ${userCreated}`);
                    return done(null, userCreated[0]);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

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

    passport.use(
        "github",
        new GitHubStrategy(
            {
                clientID: process.env.GITHUB_CLIENT_ID,
                clientSecret: process.env.GITHUB_CLIENT_SECRET,
                callbackURL: process.env.GITHUB_CALLBACK_URL,
                scope: ["user:email"],
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    console.log(profile.emails[0].value);
                    const user = await userManager.getElementByEmail(profile.emails[0].value);
                    //console.log(user);
                    if (user) {
                        //Si existe user en la bdd
                        done(null, user);
                    } else {
                        const userCreated = await userManager.addElements([
                            {
                                first_name: profile._json.login,
                                last_name: " ", //Por que github no posee nombre y apellido
                                email: profile.emails[0].value,
                                password: " ", //No puedo asignar una contraseña por que github ya me ofrece una
                            },
                        ]);
                        done(null, userCreated);
                    }
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
};

export default initializePassport;
