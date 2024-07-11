let numeroSecreto = 0;//variable de alcance global
let intentos = 0;// contador
let listaNumerosSorteado = [];
let numeroMaximo = 10;
let numeroMaximoIntentos = 3;

//console.log(numeroSecreto);

function insertarTextoElemento(elemento, texto) { //colocamos los parametros que necesita la función para cuando se vaya a ejecutar
    let elementoHTML = document.querySelector(elemento);//nos permite acceder a cada elementos del HTML y con el metodo query selector seleccionar los elementos del HTML
    elementoHTML.innerHTML = texto;//metodo innerHTML que permite reemplazar el contenido HTML con el texto que le indiquemos
    return;//retornar
}

function verificarIntento() { //Función es un evento o una acción que encapsula un bloque de codigo

    if(intentos >=numeroMaximoIntentos){
        insertarTextoElemento('p',`Superastes el número maximo de intentos, el número secreto era ¡${numeroSecreto}!`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        listaNumerosSorteado = [];
        return;
    }
    let numeroDeUsuario = parseInt(document.getElementById("valorIntento").value);//toma el valor del elemento ID entre el rango

    if (numeroDeUsuario === numeroSecreto) {
        insertarTextoElemento('p', `Acertaste al número secreto en ${intentos} ${intentos === 1 ? 'vez' : 'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (numeroDeUsuario > numeroSecreto) {
            insertarTextoElemento('p', `El número secreto es menor, te quedan ${numeroMaximoIntentos - intentos} ${intentos === 1 ? 'intentos' : 'intento'}`);
        } else {
            insertarTextoElemento('p', `El número secreto es mayor, te quedan ${numeroMaximoIntentos - intentos} ${intentos === 1 ? 'intentos' : 'intento'}`);
        }
        intentos++;//forma abreviada del contador sumandole 1   
        limpiarCaja();
    }
    return;
}
//Función que limpia el contenido del input
function limpiarCaja() {
    document.querySelector('#valorIntento').value = '';// se puede ingresar el ID con querySelector colocando el '#'
}

function generarNumeroRandomico() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;//operación para sacar el número randomico
    //console.log(numeroGenerado);
    //console.log(listaNumerosSorteado);
    //si el numero generado esta incluido en la lista
    if (listaNumerosSorteado.length == numeroMaximo) {
        insertarTextoElemento('p', 'Ya se sortearon todos los números posibles');
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if (listaNumerosSorteado.includes(numeroGenerado)) {//includes sirve para verificar si el elemento esta en el arreglo
            return generarNumeroRandomico();//recursividad, la función se llama a si misma para generar un nuevo número
        } else {
            listaNumerosSorteado.push(numeroGenerado);//si no existe en la lista entonces se agrega.
            return numeroGenerado;
        }
    }
}
//funcion con las condiciones de inicio del juego
function condicionesDeInicio() {
    insertarTextoElemento('h1', 'Juego del número secreto!');//le pasamos el contenido de los parametros
    insertarTextoElemento('p', `Ingresa un número entre 1 y ${numeroMaximo}!`);//
    numeroSecreto = generarNumeroRandomico();
    intentos = 1;
}
condicionesDeInicio();

function reiniciarJuego() {
    //Limpiar caja
    limpiarCaja();
    //Indicar mensajes de intervalos
    //Inicializar los intentos
    condicionesDeInicio();
    //Deshabilitar el boton de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');//con setAtribute le indicamos que coloca disabled con un valor de true que seria encendido
}