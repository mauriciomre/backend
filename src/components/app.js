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

export default ProductManager;
