import { MongoDBMessageModel } from "./MongoDB/models/Message.js";
//import { PostgresMessageModel } from "./Postgresql/models/Message.js";

const selectedBDD = parseInt(process.env.SELECTEDBDD);

export const getManagerMessages = () => {
    switch (selectedBDD) {
        case 1:
            return MongoDBMessageModel;
        case 2:
            return MongoDBMessageModel;
        default:
            console.log("SELECTEDBDD debe ser un número entre 1 y 2");
    }
};

export const getManagerProducts = async () => {
    const modelProduct =
        selectedBDD == 1 ? await import("./MongoDB/models/Product.js") : await import("./Postgresql/models/Product.js");

    return modelProduct;
};
