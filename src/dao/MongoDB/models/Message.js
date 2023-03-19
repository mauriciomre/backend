import { MongoDBManager } from "../../../db/MongoDBManager.js";
const messageSchema = {
    name: String,
    //email: { type: String, unique: true },
    email: String,
    message: String,
};

export class MongoDBMessageModel extends MongoDBManager {
    constructor() {
        super(process.env.MONGODBURL, "messages", messageSchema);
        // Atributos propios
    }
    // Metodos propios
}
