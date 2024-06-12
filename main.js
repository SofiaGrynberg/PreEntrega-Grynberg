const productos = [
    { id: 1, nombre: "Huerta", precio: 10000},
    { id: 2, nombre: "Compostera", precio: 20000},
    { id: 3, nombre: "Maceta", precio: 5000}
];

let producto = "";
let precio = 0;
let cantidad = 0;
let cantidadTotal = 0;
let precioTotal = 0; 
let seguirComprando = false;
let descuento = 0;

function GenerarCompra ()
{
    alert(productos.map(p => p.nombre + " $" + p.precio).join("\n"));

    do {
        pedirProducto();
        if (producto===null) {
            alert("Cancelaste la operación. Gracias por visitarnos.");
            return;
        }

        pedirCantidad();
        if (Number.isNaN(cantidad)) {
            alert("Cancelaste la operación. Gracias por visitarnos.");
            return;
        }

        calcularTotales();
        seguirComprando = confirm("¿Querés seguir comprando?");
    } while (seguirComprando);

    alert("Compraste " + cantidadTotal + " productos. El monto total de tu compra es $" + precioTotal);

    calcularDescuentoPorPuntosAcumulados();
    
    calcularPrecioFinal();
}

const pedirProducto = () => {
    let productoValido = false;
    producto = prompt("¿Qué producto querés comprar?");

    while(productoValido === false && producto != null) {
        switch (producto.toLowerCase()) {
            case productos[0].nombre.toLowerCase():
                precio = productos[0].precio;
                productoValido = true;
                break;
            case productos[1].nombre.toLowerCase():
                precio = productos[1].precio;
                productoValido = true;
                break;
            case productos[2].nombre.toLowerCase():
                precio = productos[2].precio;
                productoValido = true;
                break;
            default:
                alert("El producto ingresado no es válido.");
                producto = prompt("¿Qué producto querés comprar?");
                break;
        }
    }
}

const pedirCantidad = () => {
    cantidad = prompt("¿Qué cantidad querés comprar? Ingresá un número.");

    while (cantidad != null && (Number.isNaN(parseInt(cantidad)) || parseInt(cantidad) <= 0)) {
        alert("Debés ingresar una cantidad válida.");
        cantidad = prompt("¿Qué cantidad querés comprar? Ingresá un número.");
    }
    cantidad = parseInt(cantidad);
}

function calcularTotales(){
    precioTotal = precioTotal + calculadora(precio, cantidad, "*");
    cantidadTotal = calculadora(cantidadTotal, cantidad, "+");
}

function calcularDescuentoPorPuntosAcumulados() 
{
    let puntosAcumulados = parseInt(prompt("Ingresá tus puntos acumulados"));
    while (Number.isNaN(puntosAcumulados) || puntosAcumulados <= 0) {
        alert("Debés ingresar una cantidad de puntos válida.");
        puntosAcumulados = parseInt(prompt("Ingresá tus puntos acumulados."));
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

    alert("Tu descuento es $" + descuento);
}

function calcularPrecioFinal()  { 
    let precioFinal = calculadora(precioTotal, descuento, "-");
    alert("Tu precio final es $" + precioFinal);
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

if (confirm("¿Te gustaría conocer nuestros productos?")) {
    GenerarCompra()
} else {
    alert("Gracias por visitarnos.");
}