import { promises as fs } from "fs";

class ProductManager {
    constructor() {
        this.path = "./data.txt";
        this.products = [];
    }

    static id = 0;

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        ProductManager.id++;

        const product = { id: ProductManager.id, title, description, price, thumbnail, code, stock };

        //let hasValuesUndefined = Object.values(product).some((element) => element == undefined);
        //let hasCodeRepeat = this.products.some((element) => element.code == product.code);

        //hasValuesUndefined && console.log("Todos los campos del producto deben estar completos");
        //hasCodeRepeat && console.log("El codigo asignado ya se ha utilizado en otro producto");

        this.products.push(product);

        await fs.writeFile(this.path, JSON.stringify(this.products));
    };

    readProducts = async () => {
        let productsFile = await fs.readFile(this.path, "utf-8");
        return JSON.parse(productsFile);
    };

    getProducts = async () => {
        let productsArray = await this.readProducts();
        console.log(productsArray);
    };

    getProductById = async (id) => {
        let productsArray = await this.readProducts();
        let found = productsArray.find((element) => element.id == id);
        found ? console.log(found) : console.log("Not found");
    };

    deleteProductById = async (id) => {
        let productsArray = await this.readProducts();
        let productsFilter = productsArray.filter((element) => element.id !== id);

        if (productsFilter.length == productsArray.length) {
            console.log("ID no encontrado");
        } else {
            await fs.writeFile(this.path, JSON.stringify(productsFilter));
            console.log(`Producto con ID ${id} eliminado satisfactoriamente!`);
        }
    };

    updateProduct = async ({ id, ...product }) => {
        let productsArray = await this.readProducts();
        if (productsArray.some((element) => element.id === id)) {
            await this.deleteProductById(id);
            productsArray = await this.readProducts();

            let updatedProducts = [{ id, ...product }, ...productsArray];

            await fs.writeFile(this.path, JSON.stringify(updatedProducts));
            console.log(`Producto con ID ${id} modificado satisfactoriamente!`);
        } else {
            console.log(`No se encuentra el producto con ID ${id}`);
        }
    };
}

let manager = new ProductManager();

// manager.addProduct(
//     "teclado",
//     "esto es un teclado con teclas",
//     3000,
//     "https://http2.mlstatic.com/D_NQ_NP_944449-MLA50305077491_062022-O.jpg",
//     "1234",
//     25
// );

//manager.addProduct("parlante", "esto es un parlante", 2500, "imagen", "1453453", 25);

//manager.addProduct("mouse", "esto es un mouse", 2500, "imagen2", "1236", 25);

// manager.addProduct(
//     "mouse2",
//     "esto es otro mouse",
//     2800,
//     "https://www.aikencomputacion.com.ar/bytedata/foto/G203L.JPG",
//     "125123",
//     45
// );

//manager.getProductById(1);

//manager.getProducts();

//manager.deleteProductById(1);

// let product = {
//     id: 1,
//     title: "parlante",
//     description: "esto es un parlante modificado",
//     price: 3500,
//     thumbnail: "imagen",
//     code: "1453453",
//     stock: 25,
// };
// manager.updateProduct(product);
