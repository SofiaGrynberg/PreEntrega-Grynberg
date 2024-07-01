const productos = [
    { id: 1, nombre: "Huerta", precio: 10000},
    { id: 2, nombre: "Compostera", precio: 20000},
    { id: 3, nombre: "Maceta", precio: 5000}
];

let productoAgregado = "";
let precio = 0;
let cantidad = 0;
let cantidadTotal = 0;
let precioTotal = 0; 
let seguirComprando = false;
let descuento = 0;

let botonAgregar = document.getElementById("agregarProducto");

botonAgregar.addEventListener("click", agregarProducto);

let botonComprar = document.getElementById("comprarProductos");

botonComprar.addEventListener("click", comprarProductos);

function agregarProducto() {
    let producto = document.getElementById("producto").value;
    pedirProducto(producto);
    let cantidadIngresada = document.getElementById("cantidad").value;
    pedirCantidad(cantidadIngresada);
    if(precio==0 || cantidad==0){
        return;
    }
    mostrarProductosComprados();
    calcularTotales();
}

function comprarProductos () {
    calcularDescuentoPorPuntosAcumulados();
    if(puntos==0){
        return;
    }
    calcularPrecioFinal();
}

const pedirProducto = (producto) => {
        switch (producto.toLowerCase()) {
            case productos[0].nombre.toLowerCase():
                precio = productos[0].precio;
                productoAgregado = productos[0].nombre;
                break;
            case productos[1].nombre.toLowerCase():
                precio = productos[1].precio;
                productoAgregado = productos[1].nombre;
                break;
            case productos[2].nombre.toLowerCase():
                precio = productos[2].precio;
                productoAgregado = productos[2].nombre;
                break;
            default:
                precio = 0;
                mostrarError("El producto ingresado no es válido, intente nuevamente.");
                break;
        }
}

const pedirCantidad = (cantidadIngresada) => {
    if (cantidadIngresada != null && (Number.isNaN(parseInt(cantidadIngresada)) || parseInt(cantidadIngresada) <= 0)) {
        mostrarError("Debés ingresar una cantidad válidan intente nuevamente.");
        cantidad = 0;
        return;
    }
    cantidad = parseInt(cantidadIngresada);
}

function calcularTotales(){
    precioTotal = precioTotal + calculadora(precio, cantidad, "*");
    cantidadTotal = calculadora(cantidadTotal, cantidad, "+");
    document.getElementById("producto").value="";
    document.getElementById("cantidad").value="";
}

function calcularDescuentoPorPuntosAcumulados() 
{
    if(precioTotal<=0) {
        mostrarError("Debés agregar al menos un producto al carrito.");
        puntos=0;
        return;
    }
    let puntos = document.getElementById("puntos").value;
    let puntosAcumulados = parseInt(puntos);
    if (Number.isNaN(puntosAcumulados) || puntosAcumulados <= 0) {
        mostrarError("Debés ingresar una cantidad de puntos válida de puntos acumulados, intente nuevamente.");
        puntos=0;
        return;
    }
    if ((puntosAcumulados >=100) && (puntosAcumulados <500)) {
        descuento = calculadora(precioTotal, 0.10, "*");
    } else if ((puntosAcumulados >=500) && (puntosAcumulados <1000)) {
        descuento = calculadora(precioTotal, 0.20, "*");
    } else if (puntosAcumulados >=1000) {
        descuento = calculadora(precioTotal, 0.40, "*");
    } else {
        descuento = calculadora(precioTotal, 0, "*");
    }
    document.getElementById("descuento").value = "$" + descuento;
}

function calcularPrecioFinal()  { 
    if(descuento==0){
        return;
    }
    let precioFinal = calculadora(precioTotal, descuento, "-");
    let fechaActual= obtenerFechaFormateada(new Date())
    let ultimaCompra = {precio : precioFinal, fecha : fechaActual };
    let ultimaCompraJson = JSON.stringify(ultimaCompra);
    localStorage.setItem('ultimaCompra',ultimaCompraJson);
    document.getElementById("valor").value = "$" + precioFinal;
    document.getElementById('ultima').innerHTML = "Su ultima compra fue de $"+ precioFinal + " el dia "+ fechaActual;
}

function calculadora (numero1, numero2, operacion) {
    switch (operacion) {
        case "+":
            return numero1 + numero2;
        case "-":
            return numero1 - numero2;
        case "*":
            return numero1 * numero2;
        case "/":       
            return numero1 / numero2;
        default:
            return 0; 
    }
}

function mostrarProductosComprados(){
    const ul = document.getElementById('produtosCarrito');

    let li = document.createElement('li');
    li.textContent = productoAgregado + " - " + cantidad;
    ul.appendChild(li);
}

function obtenerFechaFormateada(fechaActual) {
    let dia = fechaActual.getDate().toString().padStart(2, '0');
    let mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Los meses comienzan desde 0
    let año = fechaActual.getFullYear();

    let horas = fechaActual.getHours().toString().padStart(2, '0');
    let minutos = fechaActual.getMinutes().toString().padStart(2, '0');

    let fechaFormateada = `${dia}/${mes}/${año} ${horas}:${minutos}`;

    return fechaFormateada;
}

function mostrarError(mensaje){
    Swal.fire({
        title: 'Error',
        text: mensaje,
        icon: 'error',
        confirmButtonText: 'OK'
    });
}


function cargarDatosPrevios() {
    var ultimaCompraGetJson= localStorage.getItem('ultimaCompra');
    var ultimaCompra= JSON.parse(ultimaCompraGetJson)
    console.log(ultimaCompra)
    console.log(ultimaCompra.precio)
    if (ultimaCompra.precio == null || (Number.isNaN(parseInt(ultimaCompra.precio)) || parseInt(ultimaCompra.precio) <= 0)) {
        document.getElementById('ultima').innerHTML = "No se registra compra anterior";
    }
    else{
        document.getElementById('ultima').innerHTML =  "Su ultima compra fue de $"+ ultimaCompra.precio + " el dia "+ ultimaCompra.fecha;
    }
}

productos.map(p => p.nombre + " $" + p.precio).join("\n")

const ul = document.getElementById('listado');

productos.map(producto => {
    let li = document.createElement('li');
    li.textContent = producto.nombre + " $" + producto.precio;
    ul.appendChild(li);
});

cargarDatosPrevios();