import { MongoDBManager } from "../db/MongoDBManager.js";
import userSchema from "../models/User.js";

export class MongoDBUserModel extends MongoDBManager {
    constructor() {
        super(process.env.MONGODBURL, "users", userSchema);
    }

    async getElementByEmail(email) {
        super.setConnection();
        try {
            return await this.model.findOne({ email: email });
        } catch (error) {
            return error;
        }
    }
}
