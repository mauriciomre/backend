const socket = io();

// LOGIN
const login = (user) => {
    console.log(`Intento de login con los siguientes datos:
    email: ${user.email}
    password: ${user.password}`);

    socket.emit("tryLogin", user);
};

// CHAT
const messageList = document.getElementById("messageList");

const sendMessage = (msg) => {
    const data = { name: "Nombre", email: "hola@hola6.com", message: msg };
    socket.emit("newMessage", data);
};

socket.on("allMessages", async (dataMessages) => {
    messageList.innerHTML = "";
    await dataMessages.forEach((dataMessage) => {
        messageList.innerHTML += `
        <div class="d-flex justify-content-between">
        <p class="small mb-1 text-muted">23 Jan 2:05 pm</p>
        <p class="small mb-1">${dataMessage.name}</p>
        </div>
        <div class="d-flex flex-row justify-content-end mb-4">
            <div class="p-3 me-3 border" style="border-radius: 15px; background-color: #fbfbfb;">
            <p class="small mb-0">${dataMessage.message}</p>
            </div>
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
        alt="avatar 1" style="width: 45px; height: 100%;">
        </div>      
        `;
    });
});

// PRODUCTOS
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
