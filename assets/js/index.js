//Tienda de juegos de caja


const catalogo = [
    { id: 1, nombre: "Catan", precio: 3800 },
    { id: 2, nombre: "Click", precio: 900 },
    { id: 3, nombre: "The mind", precio: 1400 },
    { id: 4, nombre: "Monopoly", precio: 1900 }
];

let carrito = [];
let total = 0;


function mostrarCatalogo() {
    console.log("Catálogo de juegos disponibles:");
    catalogo.forEach(juego => {
        console.log(`${juego.id}. ${juego.nombre} - $${juego.precio}`);
    });
}


//Agregar juegos al carrito

function agregarAlCarrito() {
    let idSeleccionado = parseInt(prompt("Ingrese el número del juego que desea comprar:"));
    let juego = catalogo.find(item => item.id === idSeleccionado);

    if (juego) {
        carrito.push(juego);
        total += juego.precio;
        alert(`Agregaste "${juego.nombre}" al carrito. Total parcial: $${total}`);
    } else {
        alert("No se encontró el juego. Intenta nuevamente.");
    }
}



function iniciarSimulador() {
    alert("¡Bienvenido a Tienda Lúdica!");
    let nombreUsuario = prompt("¿Cómo te llamás?");
    alert(`Hola ${nombreUsuario}, te mostraremos nuestro catálogo.`);

    let seguirComprando = true;

    while (seguirComprando) {
        mostrarCatalogo();
        agregarAlCarrito();
        seguirComprando = confirm("¿Deseás agregar otro juego?");
    }

    mostrarResumen(nombreUsuario);
}


//Resumen final

function mostrarResumen(nombre) {
  console.log(`Resumen de compra para ${nombre}:`);
  carrito.forEach(item => console.log(`- ${item.nombre}: $${item.precio}`));
  console.log(`Total final: $${total}`);
  alert(`Gracias por tu compra, ${nombre}! Tu total es $${total}.`);
}

iniciarSimulador();