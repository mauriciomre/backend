import { Schema } from "mongoose";

let random = Math.random();
let date = Date.now();

const ticketSchema = new Schema({
    code: {
        type: String,
        default: random.toString() + date.toString(),
    },
    purchase_datetime: {
        type: Date,
        default: Date.now,
    },
    amount: {
        type: Number,
    },
    purchaser: {
        type: String,
    },
});

export default ticketSchema;
