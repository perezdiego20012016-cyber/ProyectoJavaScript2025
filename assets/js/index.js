
const listaDeProductos = [
  { id: 1, nombre: "Monopoly", precio: 3500, imagen: "./assets/Imagenes/monopoly.webp" },
  { id: 2, nombre: "Risk", precio: 4200, imagen: "./assets/Imagenes/risk.jpg" },
  { id: 3, nombre: "Virus", precio: 1500, imagen: "./assets/Imagenes/virus.jpg" },
  { id: 4, nombre: "The Mind", precio: 1800, imagen: "./assets/Imagenes/themind.png" },
  { id: 5, nombre: "Scrabble", precio: 3200, imagen: "./assets/Imagenes/SCRABBLE.jpg" },
  { id: 6, nombre: "Cluedo", precio: 3800, imagen: "./assets/Imagenes/CLUEDO.jpg" },
  { id: 7, nombre: "Trivial Pursuit", precio: 4500, imagen: "./assets/Imagenes/Trivial Pursuit.jpg" },
  { id: 8, nombre: "Jenga", precio: 1700, imagen: "./assets/Imagenes/JENGA.jpg" }
];

const contenedorProductos = document.getElementById("lista-productos");
const listaCarrito = document.getElementById("lista-carrito");
const totalDOM = document.getElementById("total");
const zonaCarrito = document.getElementById("zona-carrito");
const botonVaciar = document.getElementById("vaciar-carrito");

let carrito = [];
function cargarCarritoGuardado() {
  const guardado = localStorage.getItem("carrito");

  if (guardado) {
    carrito = JSON.parse(guardado);
    actualizarCarrito();
  }
}
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarProductos() {
  listaDeProductos.forEach(producto => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta-producto");

    tarjeta.innerHTML = `
            <img src="${producto.imagen}" class="imagen-producto" alt="${producto.nombre}">
            <div class="info-producto">
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio}</p>
                <button class="boton-agregar" data-id="${producto.id}">Agregar</button>
            </div>
        `;

    contenedorProductos.appendChild(tarjeta);
  });

  const botones = document.querySelectorAll(".boton-agregar");
  botones.forEach(boton =>
    boton.addEventListener("click", agregarAlCarrito)
  );
}

function agregarAlCarrito(e) {
  const idProducto = Number(e.target.dataset.id);
  const producto = listaDeProductos.find(item => item.id === idProducto);

  carrito.push(producto);
  actualizarCarrito();
  guardarCarrito();
}

function eliminarDelCarrito(indice) {
  carrito.splice(indice, 1);
  actualizarCarrito();
  guardarCarrito();
}

function actualizarCarrito() {
  listaCarrito.innerHTML = "";
  if (carrito.length > 0) {
    zonaCarrito.classList.remove("oculto");
  } else {
    zonaCarrito.classList.add("oculto");
  }

  carrito.forEach((producto, indice) => {
    const item = document.createElement("li");
    item.classList.add("item-carrito");

    item.innerHTML = `
            ${producto.nombre} - $${producto.precio}
            <button class="boton-eliminar" data-indice="${indice}">X</button>
        `;

    listaCarrito.appendChild(item);
  });

  const btnEliminar = document.querySelectorAll(".boton-eliminar");
  btnEliminar.forEach(btn =>
    btn.addEventListener("click", (e) => {
      eliminarDelCarrito(e.target.dataset.indice);
    })
  );

  const total = carrito.reduce((acc, item) => acc + item.precio, 0);
  totalDOM.textContent = total;
}
botonVaciar.addEventListener("click", () => {
  carrito = [];
  actualizarCarrito();
  guardarCarrito();
});

mostrarProductos();
cargarCarritoGuardado();