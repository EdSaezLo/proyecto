let historial = document.getElementById('historial');
let resultado = document.getElementById('resultado');
let operacionActual = '';
let operadorSeleccionado = '';
let primerOperando = '';
let segundoOperando = '';
let resultadoAnterior = '';

function operador(valor) {
    operacionActual += valor;
    resultado.innerText = operacionActual;
}

function operacion(operador) {
    if (resultado.innerText !== '0') {
        operadorSeleccionado = operador;
        primerOperando = resultado.innerText;
        operacionActual += operadorSeleccionado;
        resultado.innerText = operacionActual;
        resultadoAnterior = parseFloat(resultado.innerText);
    }
}

function limpiar() {
    operacionActual = '';
    operadorSeleccionado = '';
    primerOperando = '';
    segundoOperando = '';
    historial.innerText = '0';
    resultado.innerText = '0';
    resultadoAnterior = '';
}

function calcular() {
    let resultadoCalculado;
    segundoOperando = operacionActual.split(operadorSeleccionado)[1];
    switch (operadorSeleccionado) {
        case '+':
            resultadoCalculado = parseFloat(primerOperando) + parseFloat(segundoOperando);
            break;
        case '-':
            resultadoCalculado = parseFloat(primerOperando) - parseFloat(segundoOperando);
            break;
        case '*':
            resultadoCalculado = parseFloat(primerOperando) * parseFloat(segundoOperando);
            break;
        case '/':
            resultadoCalculado = parseFloat(primerOperando) / parseFloat(segundoOperando);
            break;
        default:
            return;
    }
    historial.innerText = operacionActual;
    resultado.innerText = resultadoCalculado;
    resultadoAnterior = resultadoCalculado;
}

function Igual() {
    if (operadorSeleccionado !== '' && operacionActual.includes(operadorSeleccionado)) {
        calcular();
        operacionActual = '';
        operadorSeleccionado = '';
        primerOperando = '';
        segundoOperando = '';
    }
}

