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

let producto = "";
let precio = 0;
let cantidad = 0;
let cantidadTotal = 0;
let seguirComprando = false;
let precioTotal = 0; 

do {
    producto = prompt("¿Qué producto querés comprar? Ingresá: huerta, compostera o maceta.");
    cantidad = parseInt(prompt("¿Qué cantidad querés comprar? Ingresá un número."));

    while (Number.isNaN(cantidad) || cantidad <= 0) {
        alert("Debés ingresar una cantidad válida.");
        cantidad = parseInt(prompt("¿Qué cantidad querés comprar? Ingresá un número."));
    }

    switch (producto) {
        case "huerta":
            precio = 10000;
            break;
        case "compostera":
            precio = 20000;
            break;
        case "maceta":
            precio = 5000;
            break;
        default:
            alert("Algunos de los datos ingresados no son correctos.");
            precio = 0;
            cantidad = 0;
    }
precioTotal = precioTotal + calculadora(precio, cantidad, "*");
cantidadTotal = calculadora(cantidadTotal, cantidad, "+");

seguirComprando = confirm("¿Querés seguir comprando?");
} while (seguirComprando);

alert("Compraste " + cantidadTotal + " productos. El monto total de tu compra es $" + precioTotal);

let puntosAcumulados = Number(prompt("Ingresá tus puntos acumulados"));
let descuento = 0;

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

let precioFinal = calculadora(precioTotal, descuento, "-");

alert("Tu precio final es $" + precioFinal);
