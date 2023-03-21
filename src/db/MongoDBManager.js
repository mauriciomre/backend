import mongoose from "mongoose";

export class MongoDBManager {
    #url;
    constructor(url, collection, schema) {
        this.#url = url;
        this.collection = collection;
        this.schema = new mongoose.Schema(schema);
        this.model = mongoose.model(this.collection, this.schema);
    }

    async #setConnection() {
        try {
            await mongoose.connect(this.#url);
            console.log("MongoDB está conectado");
        } catch (error) {
            console.log("Error en conexión MongoDB", error);
        }
    }

    async getElements() {
        this.#setConnection();
        try {
            const elements = await this.model.find();
            //console.log(`dentro de getElements ${typeof elements}`);
            //console.log(elements);
            return elements;
        } catch (error) {
            console.log("Error en consulta de todos los elementos en MongoDB", error);
        }
    }

    async getElementById(id) {
        this.#setConnection();
        try {
            const element = await this.model.findById(id);
            return element;
        } catch (error) {
            console.log("Error en consulta de elemento en MongoDB", error);
        }
    }

    async addElements(elements) {
        this.#setConnection();
        try {
            const message = await this.model.insertMany(elements);
            return message;
        } catch (error) {
            console.log("Error en insertar elemento en MongoDB", error);
        }
    }

    async updateElement(id, info) {
        this.#setConnection();
        try {
            const message = await this.model.findByIdAndUpdate(id, info);
            return message;
        } catch (error) {
            console.log("Error en update de elemento en MongoDB", error);
        }
    }

    async deleteElement(id) {
        this.#setConnection();
        try {
            const response = await this.model.findByIdAndDelete(id);
            return response;
        } catch (error) {
            console.log("Error en delete de elemento en MongoDB", error);
        }
    }
}
