import { MongoDBManager } from "../../../db/MongoDBManager.js";
const messageSchema = {
    name: String,
    email: { type: String, unique: true },
    message: String,
};

export class MongoDBMessageModel extends MongoDBManager {
    constructor() {
        super(process.env.MONGODBURL, "messages", messageSchema);
        // Atributos propios
    }
    // Metodos propios
}
