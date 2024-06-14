const productos = [
    { id: 1, imagen: "./gorin.jpg", nombre: "Gorin Bross Cabllo", precio: 60000, categoria: "casual" },
    { id: 2, imagen: "./gorin5.jpg", nombre: "Gorin Bross Perro", precio: 50000, categoria: "casual" },
    { id: 3, imagen: "./gorin3.jpg", nombre: "Gorin Bross Caballo", precio: 85000, categoria: "casual" },
    { id: 4, imagen: "./gorin7.jpg", nombre: "Gorin Broos Panda", precio: 70000, categoria: "casual" },
    { id: 5, imagen: "./gorin8.webp", nombre: "Gorin Broos Gallo", precio: 60000, categoria: "casual" },
    { id: 6, imagen: "./gorin9.webp", nombre: "Gorin Broos Bufalo", precio: 90000, categoria: "casual" },
    { id: 7, imagen: "./9830479_1_800x.jpg", nombre: "Gorin Broos Gallo", precio: 80000, categoria: "casual" },
    { id: 8, imagen: "./imagen4.webp", nombre: "Gorin Broos Leon", precio: 120000, categoria: "casual" },
    { id: 9, imagen: "./imagen2.webp", nombre: "Gorin Broos Pantera", precio: 80000, categoria: "casual" },
    // Agregar más productos aquí
];

let carrito = [];

const mostrarProductos = () => {
    const contenedorProductos = document.querySelector(".productos-grid");
    contenedorProductos.innerHTML = "";

    productos.forEach(producto => {
        const divProducto = document.createElement("div");
        divProducto.classList.add("producto");
        divProducto.dataset.id = producto.id;
        divProducto.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <button data-id="${producto.id}">Agregar al Carrito</button>
        `;

        contenedorProductos.appendChild(divProducto);
    });

    // Agregar eventos de clic a los botones "Agregar al Carrito"
    const botonesAgregar = document.querySelectorAll(".producto button");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", () => {
            const idProducto = parseInt(boton.dataset.id);
            const producto = productos.find(producto => producto.id === idProducto);

            if (producto) {
                agregarAlCarrito(producto);
            }
        });
    });
};

const mostrarCarrito = () => {
    const tbodyCarrito = document.querySelector(".carrito-tabla tbody");
    tbodyCarrito.innerHTML = "";

    carrito.forEach(productoCarrito => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td><img src="${productoCarrito.producto.imagen}" alt="${productoCarrito.producto.nombre}" width="50"></td>
            <td>${productoCarrito.producto.nombre}</td>
            <td>$${productoCarrito.producto.precio}</td>
            <td><input type="number" value="${productoCarrito.cantidad}" min="1" max="10" data-id="${productoCarrito.producto.id}"></td>
            <td>$${productoCarrito.producto.precio * productoCarrito.cantidad}</td>
            <td><button data-id="${productoCarrito.producto.id}">Eliminar</button></td>
        `;

        tbodyCarrito.appendChild(fila);
    });

    calcularTotalCarrito();

    // Event listeners para botones de eliminar del carrito
    const botonesEliminar = document.querySelectorAll(".carrito-tabla button");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", () => {
            const idProducto = parseInt(boton.dataset.id);
            eliminarDelCarrito(idProducto);
        });
    });

    // Event listeners para actualizar cantidad en el carrito
    const inputsCantidad = document.querySelectorAll(".carrito-tabla input[type='number']");

    inputsCantidad.forEach(input => {
        input.addEventListener("change", () => {
            const idProducto = parseInt(input.dataset.id);
            const cantidad = parseInt(input.value);

            const productoEnCarrito = carrito.find(productoCarrito => productoCarrito.producto.id === idProducto);

            if (productoEnCarrito) {
                productoEnCarrito.cantidad = cantidad;

                // Actualizar tabla del carrito
                mostrarCarrito();
            }
        });
    });
};

const agregarAlCarrito = (producto) => {
    const productoEnCarrito = carrito.find(productoCarrito => productoCarrito.producto.id === producto.id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({ producto: producto, cantidad: 1 });
    }

    mostrarCarrito();
    actualizarProductoSeleccionado(producto.id, true);
};

const eliminarDelCarrito = (idProducto) => {
    carrito = carrito.filter(productoCarrito => productoCarrito.producto.id !== idProducto);
    mostrarCarrito();
    actualizarProductoSeleccionado(idProducto, false);
};

const calcularTotalCarrito = () => {
    const total = carrito.reduce((total, productoCarrito) => total + (productoCarrito.producto.precio * productoCarrito.cantidad), 0);
    document.getElementById("total-carrito").textContent = `$ ${total}`;
};

const actualizarProductoSeleccionado = (idProducto, seleccionado) => {
    const productosDOM = document.querySelectorAll(".producto");
    productosDOM.forEach(productoDOM => {
        const productoId = parseInt(productoDOM.dataset.id);
        if (productoId === idProducto) {
            productoDOM.classList.toggle("seleccionado", seleccionado);
        }
    });
};

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
    mostrarProductos();
});
