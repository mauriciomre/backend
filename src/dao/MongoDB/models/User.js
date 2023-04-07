import { MongoDBManager } from "../../../db/MongoDBManager.js";
import { Schema } from "mongoose";

const userSchema = new Schema({
    first_name: {
        type: String,
        requered: true,
    },
    last_name: {
        type: String,
        requered: true,
    },
    email: {
        type: String,
        unique: true,
        index: true,
    },
    age: {
        type: Number,
        requered: true,
    },
    rol: {
        type: String,
        default: "User",
    },
    password: {
        type: String,
        requered: true,
    },
    id_cart: {
        type: Schema.Types.ObjectId,
        ref: carts,
    },
});

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
