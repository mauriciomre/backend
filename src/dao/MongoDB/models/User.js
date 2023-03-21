import { MongoDBManager } from "../../../db/MongoDBManager.js";
const userSchema = {
    email: String,
    password: String,
};

export class MongoDBUserModel extends MongoDBManager {
    constructor() {
        super(process.env.MONGODBURL, "users", userSchema);
        // Atributos propios
    }
    // Metodos propios
}
