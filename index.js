class ProductManager {
    constructor() {
        this.products = [];
        this.id = 1;
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {
        const product = { id: this.id, title, description, price, thumbnail, code, stock };

        let hasValuesUndefined = Object.values(product).some((element) => element == undefined);
        let hasCodeRepeat = this.products.some((element) => element.code == product.code);

        hasValuesUndefined && console.log("Todos los campos del producto deben estar completos");
        hasCodeRepeat && console.log("El codigo asignado ya se ha utilizado en otro producto");

        if (!hasValuesUndefined && !hasCodeRepeat) {
            this.products.push(product);
            this.id++;
        }
    };

    getProducts = () => console.log(this.products);

    getProductsById = (id) => {
        let found = this.products.find((element) => element.id == id);
        found ? console.log(found) : console.log("Not found");
    };
}

let manager = new ProductManager();

manager.addProduct(
    "teclado",
    "esto es un teclado con teclas",
    3000,
    "https://http2.mlstatic.com/D_NQ_NP_944449-MLA50305077491_062022-O.jpg",
    "1234",
    25
);

manager.addProduct("mouse", "esto es un mouse", 2500, undefined, "1236", 25);

manager.addProduct(
    "mouse",
    "esto es un mouse",
    2500,
    "https://www.aikencomputacion.com.ar/bytedata/foto/G203L.JPG",
    "125123",
    45
);

manager.getProductsById(1);

manager.getProductsById(2054);

manager.getProducts();
