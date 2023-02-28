const socket = io();

// Obtener referencia al formulario
const formProducto = document.getElementById("form-producto");
const listaProductos = document.getElementById("lista-productos");

formProducto.addEventListener("submit", (event) => {
    event.preventDefault();

    // Obtener los detalles del producto del formulario
    const nuevoProducto = {
        title: formProducto.elements.title.value,
        category: formProducto.elements.category.value,
        description: formProducto.elements.description.value,
        price: formProducto.elements.price.value,
        thumbnail: formProducto.elements.thumbnail.value,
        code: formProducto.elements.code.value,
        stock: formProducto.elements.stock.value,
    };

    // Emitir los datos del formulario al servidor
    socket.emit("nuevo-producto", nuevoProducto);

    // Limpiar los campos del formulario
    formProducto.reset();
});

const eliminarProducto = (id) => {
    socket.emit("eliminar-producto", id);
};

socket.on("todos-los-productos", (productos) => {
    //console.log(`aca estan los productos ${productos}`);
    listaProductos.innerHTML = "";
    productos.forEach((producto) => {
        listaProductos.innerHTML += `
        <div class="row mb-2">

                    <svg class="col-4" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail"
                        preserveAspectRatio="xMidYMid slice" focusable="false">
                        <title>Placeholder</title>
                        <rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef"
                            dy=".3em">Thumbnail</text>
                    </svg>
                    <div class="col-8">
                        <div class="container">
                            <div class="">

                                <span class="col text-uppercase"> ${producto.title}</span>
                                <p class="col">Precio: $${producto.price}</p>
                            </div>
                            <div class="">

                                <div class="">
                                    <span>Stock: ${producto.stock}</span>
                                </div>
                                <div class="">
                                    <i class="btn btn-danger bi bi-trash-fill" id="eliminar${producto.id}" onclick="eliminarProducto(${producto.id})">ELIMINAR</i>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
        `;
    });
});
