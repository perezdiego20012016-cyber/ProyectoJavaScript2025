
let listaDeProductos = [];

fetch("assets/data/products.json")
  .then(response => response.json())
  .then(data => {
    listaDeProductos = data;
    mostrarProductos();
  })
  .catch(error => {
    console.error("Error cargando productos:", error);
  });




const contenedorProductos = document.getElementById("cards-row");
const listaCarrito = document.getElementById("lista-carrito");
const totalDOM = document.getElementById("total");
const zonaCarrito = document.getElementById("zona-carrito");
const botonVaciar = document.getElementById("vaciar-carrito");
const favoritosRow = document.getElementById("favoritos-row");


let carrito = [];
let favoritos = [];


const guardarStorage = (clave, valor) =>
  localStorage.setItem(clave, JSON.stringify(valor));

const cargarStorage = (clave) =>
  JSON.parse(localStorage.getItem(clave)) || [];


const mostrarToast = (texto, tipo = "success") => {
  const colores = {
    success: "linear-gradient(to right, #28a745, #198754)",
    danger: "linear-gradient(to right, #ff4c3b, #ff6f61)",
  };

  Toastify({
    text: texto,
    duration: 2000,
    gravity: "top",
    position: "right",
    backgroundColor: colores[tipo],
  }).showToast();
};


function actualizarLayout() {
  if (carrito.length > 0) {
    zonaCarrito.classList.add("activo");
    contenedorProductos.classList.remove("col-12");
    contenedorProductos.classList.add("col-8");
  } else {
    zonaCarrito.classList.remove("activo");
    contenedorProductos.classList.remove("col-8");
    contenedorProductos.classList.add("col-12");
  }
}

function actualizarCarrito() {
  listaCarrito.innerHTML = "";

  carrito.forEach(prod => {
    const li = document.createElement("li");
    li.className = "item-carrito";
    li.innerHTML = `
      ${prod.nombre} x${prod.cantidad} - $${prod.precio * prod.cantidad}
      <button>X</button>
    `;
    li.querySelector("button").addEventListener("click", () =>
      eliminarDelCarrito(prod.id)
    );
    listaCarrito.appendChild(li);
  });

  totalDOM.textContent = carrito.reduce(
    (acc, p) => acc + p.precio * p.cantidad,
    0
  );

  guardarStorage("carrito", carrito);
  actualizarLayout();
}

function agregarAlCarrito(e) {
  const id = Number(e.target.dataset.id);
  const producto = listaDeProductos.find(p => p.id === id);

  const existente = carrito.find(p => p.id === id);
  existente ? existente.cantidad++ : carrito.push({ ...producto, cantidad: 1 });

  actualizarCarrito();
  mostrarToast(`${producto.nombre} agregado`);
}

function eliminarDelCarrito(id) {
  carrito = carrito.filter(p => p.id !== id);
  actualizarCarrito();
  mostrarToast("Producto eliminado", "danger");
}

botonVaciar.addEventListener("click", () => {
  carrito = [];
  actualizarCarrito();
  mostrarToast("Carrito vaciado", "danger");
});


function actualizarFavoritosDOM() {
  document.querySelectorAll(".btn-favorito").forEach(btn => {
    const id = Number(btn.dataset.id);
    const activo = favoritos.includes(id);
    btn.textContent = activo ? "❤️" : "🤍";
    btn.classList.toggle("favorito", activo);
  });

  mostrarFavoritos();
}

function toggleFavorito(id) {
  const producto = listaDeProductos.find(p => p.id === id);

  if (favoritos.includes(id)) {
    favoritos = favoritos.filter(f => f !== id);
    guardarStorage("favoritos", favoritos);
    actualizarFavoritosDOM();
    mostrarToast(`${producto.nombre} eliminado`, "danger");
    return;
  }

  Swal.fire({
    title: "¿Agregar a favoritos?",
    text: producto.nombre,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Sí",
    cancelButtonText: "Cancelar",
  }).then(result => {
    if (result.isConfirmed) {
      favoritos.push(id);
      guardarStorage("favoritos", favoritos);
      actualizarFavoritosDOM();
      mostrarToast(`${producto.nombre} agregado`);
    }
  });
}


function mostrarProductos() {
  contenedorProductos.innerHTML = "";

  listaDeProductos.forEach(prod => {
    const col = document.createElement("div");
    col.className = "col-md-4 col-sm-6 mb-4";

    col.innerHTML = `
      <div class="card h-100 position-relative">
        <img src="${prod.imagen}" class="card-img-top" alt="${prod.nombre}">
        <button class="btn btn-favorito" data-id="${prod.id}">🤍</button>
        <div class="card-body d-flex flex-column">
          <h5>${prod.nombre}</h5>
          <p>$${prod.precio}</p>
          <button class="btn mt-auto boton-agregar" data-id="${prod.id}">
            Agregar al Carrito
          </button>
        </div>
      </div>
    `;

    col.querySelector(".boton-agregar").addEventListener("click", agregarAlCarrito);
    col.querySelector(".btn-favorito").addEventListener("click", () =>
      toggleFavorito(prod.id)
    );

    contenedorProductos.appendChild(col);
  });
}

function mostrarFavoritos() {
  if (!favoritosRow) return;
  favoritosRow.innerHTML = "";

  favoritos.forEach(id => {
    const prod = listaDeProductos.find(p => p.id === id);
    if (!prod) return;

    favoritosRow.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card h-100">
          <img src="${prod.imagen}" class="card-img-top">
          <div class="card-body">
            <h5>${prod.nombre}</h5>
            <p>$${prod.precio}</p>
          </div>
        </div>
      </div>
    `;
  });
}


carrito = cargarStorage("carrito");
favoritos = cargarStorage("favoritos");

actualizarCarrito();
actualizarFavoritosDOM();
