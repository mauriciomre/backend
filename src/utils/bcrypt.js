import bcrypt from "bcrypt";

export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(parseInt(process.env.SALT)));

const validatePassword = (passwordSend, passwordBDD) => bcrypt.compareSync(passwordSend, passwordBDD);

const passCrypt = createHash("hola");
console.log(validatePassword("coder", passCrypt));
