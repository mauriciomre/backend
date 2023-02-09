import { promises as fs } from "fs";

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.status = true;
    }

    static id = 0;

    addProduct = async (title, category, description, price, thumbnail, code, stock) => {
        ProductManager.id++;

        const product = { id: ProductManager.id, title, category, description, price, thumbnail, code, stock };

        this.products.push(product);

        await fs.writeFile(this.path, JSON.stringify(this.products));
    };

    readProducts = async () => {
        let productsFile = await fs.readFile(this.path, "utf-8");
        return JSON.parse(productsFile);
    };

    getProducts = async (limit) => {
        let productsArray = await this.readProducts();

        if (parseInt(limit)) {
            return productsArray.slice(0, limit);
        } else {
            return productsArray;
        }
    };

    getProductById = async (id) => {
        let productsArray = await this.readProducts();
        let found = productsArray.find((element) => element.id == parseInt(id));
        return found ? found : "Not found";
    };

    deleteProductById = async (id) => {
        let productsArray = await this.readProducts();
        let productsFilter = productsArray.filter((element) => element.id !== parseInt(id));

        if (productsFilter.length == productsArray.length) {
            return "ID no encontrado";
        } else {
            await fs.writeFile(this.path, JSON.stringify(productsFilter));
            return `Producto con ID ${id} eliminado satisfactoriamente!`;
        }
    };

    updateProduct = async (id, { title, category, description, price, thumbnail, code, stock }) => {
        let productsArray = await this.readProducts();
        if (productsArray.some((element) => element.id === parseInt(id))) {
            let index = productsArray.findIndex((product) => product.id === parseInt(id));

            productsArray[index].title = title ?? productsArray[index].title;
            productsArray[index].category = category ?? productsArray[index].category;
            productsArray[index].description = description ?? productsArray[index].description;
            productsArray[index].price = price ?? productsArray[index].price;
            productsArray[index].thumbnail = thumbnail ?? productsArray[index].thumbnail;
            productsArray[index].code = code ?? productsArray[index].code;
            productsArray[index].stock = stock ?? productsArray[index].stock;

            await fs.writeFile(this.path, JSON.stringify(productsArray));
            return `Producto con ID ${id} modificado satisfactoriamente!`;
        } else {
            return `No se encuentra el producto con ID ${id}`;
        }
    };
}

export default ProductManager;
