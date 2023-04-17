import { MongoDBManager } from "../../MongoDB/db/MongoDBManager.js";
const messageSchema = {
    name: String,
    email: { type: String, unique: true },
    message: String,
};

export class MessageDaoMongoDB extends MongoDBManager {
    constructor() {
        super(process.env.MONGODBURL, "messages", messageSchema);
        // Atributos propios
    }
    // Metodos propios
}
