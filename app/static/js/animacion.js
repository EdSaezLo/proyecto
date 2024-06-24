document.addEventListener("DOMContentLoaded", function() {
    // Variables para el juego
    var caja = document.getElementById('caja');
    var numero = document.getElementById('numero');
    var contador = 0;
    var posX = 0;
    var posY = 0;
    var velocidadX = 5;
    var velocidadY = 5;
    var direccionX = 1;
    var direccionY = 1;
    var maxVelocidad = 20;
    var objetivoRebotes = 1000; // Cambiar este valor según sea necesario
    var tiempo = 0;
    var intervaloTiempo;

    // Sonidos
    var reboteSound = new Audio('/static/sounds/rebote.mp3');
    var mejoraSound = new Audio('/static/sounds/mejora.mp3');

    // Mejoras del juego con precios e incrementos personalizados
    var mejoras = {
        velocidad: {
            nombre: "Velocidad",
            precioBase: 10,
            incremento: 5,
            cantidad: 0,
            multiplicador: 1
        },
        rebotes: {
            nombre: "Rebotes",
            precioBase: 20,
            incremento: 20,
            cantidad: 0,
            multiplicador: 2
        },
        clicks: {
            nombre: "Clicks",
            precioBase: 30,
            incremento: 15,
            cantidad: 0,
            multiplicador: 1
        }
    };

    // Función para reiniciar el juego
    function reiniciarJuego() {
        alert("¡Objetivo alcanzado en " + tiempo + " segundos! El juego se reiniciará.");
        clearInterval(intervaloTiempo);
        contador = 0;
        tiempo = 0;
        posX = 0;
        posY = 0;
        velocidadX = 5;
        velocidadY = 5;
        direccionX = 1;
        direccionY = 1;
        mejoras.velocidad.cantidad = 0;
        mejoras.rebotes.cantidad = 0;
        mejoras.clicks.cantidad = 0;
        mejoras.velocidad.precioBase = 10;
        mejoras.rebotes.precioBase = 20;
        mejoras.clicks.precioBase = 30;
        mejoras.rebotes.multiplicador = 2;
        mejoras.clicks.multiplicador = 1;
        actualizarContador();
        actualizarPrecios();
        iniciarContadorTiempo();
        animar();
    }

    // Función para animar la caja y manejar rebotes
    function animar() {
        posX += velocidadX * direccionX;
        posY += velocidadY * direccionY;

        // Mantener la caja dentro de la pantalla
        posX = Math.max(0, Math.min(window.innerWidth - 100, posX));
        posY = Math.max(0, Math.min(window.innerHeight - 150, posY));

        caja.style.left = posX + 'px';
        caja.style.top = posY + 'px';

        // Control de rebotes y mejoras
        if (posX >= window.innerWidth - 100 || posX <= 0) {
            direccionX *= -1;
            reboteSound.play();
            contador += mejoras.rebotes.multiplicador;
            actualizarContador();
            if (contador >= objetivoRebotes) {
                reiniciarJuego();
                return;
            }
        }

        if (posY >= window.innerHeight - 150 || posY <= 0) {
            direccionY *= -1;
            reboteSound.play();
            contador += mejoras.rebotes.multiplicador;
            actualizarContador();
            if (contador >= objetivoRebotes) {
                reiniciarJuego();
                return;
            }
        }

        requestAnimationFrame(animar);
    }

    // Función para actualizar el contador de puntos
    function actualizarContador() {
        numero.textContent = contador;
    }

    // Función para comprar mejoras
    function comprarMejora(tipo) {
        var mejora = mejoras[tipo];
        var precioActual = mejora.precioBase; // Incremento del 10%

        if (contador >= precioActual) {
            contador -= precioActual;
            mejora.cantidad++;
            mejora.precioBase += mejora.incremento;
            mejoraSound.play();
            if (tipo === 'velocidad') {
                if (velocidadX < maxVelocidad && velocidadY < maxVelocidad) {
                    velocidadX += 1; // Aumento de la velocidad
                    velocidadY += 1;
                }
            } else if (tipo === 'rebotes') {
                mejoras.rebotes.multiplicador = Math.floor(mejoras.rebotes.multiplicador * 2); // Aumento del multiplicador de rebotes
            } else if (tipo === 'clicks') {
                mejoras.clicks.multiplicador *= 2; // Aumento del multiplicador de clicks
            }
            actualizarContador();
            actualizarPrecios(); // Actualizar precios de los botones
        } else {
            alert("No tienes suficientes puntos para comprar esta mejora.");
        }
    }

    // Función para actualizar los precios de los botones
    function actualizarPrecios() {
        document.getElementById('precioVelocidad').textContent = Math.ceil(mejoras.velocidad.precioBase);
        document.getElementById('precioRebotes').textContent = Math.ceil(mejoras.rebotes.precioBase);
        document.getElementById('precioClicks').textContent = Math.ceil(mejoras.clicks.precioBase);
    }

    // Función para mostrar pop-ups de power-ups
    function mostrarPopUp() {
        var popUp = document.createElement('div');
        popUp.className = 'power-up';
        
        // Generar posición aleatoria asegurando que no esté sobre la barra de navegación
        do {
            var left = Math.random() * (window.innerWidth - 50);
            var top = Math.random() * (window.innerHeight - 100);
        } while (top < 80); // Asegurar que no esté encima de la barra de navegación

        popUp.style.left = left + 'px';
        popUp.style.top = top + 'px';
        document.body.appendChild(popUp);

        popUp.addEventListener('click', function() {
            contador += 10; // Aumenta puntos al recoger el power-up
            actualizarContador();
            popUp.remove();
        });

        setTimeout(function() {
            if (document.body.contains(popUp)) {
                popUp.remove();
            }
        }, 5000); // Elimina el pop-up después de 5 segundos
    }

    // Función para iniciar el contador de tiempo
    function iniciarContadorTiempo() {
        clearInterval(intervaloTiempo); // Clear any existing interval to avoid multiple intervals
        intervaloTiempo = setInterval(function() {
            tiempo++;
            document.getElementById('tiempo').textContent = tiempo;
        }, 1000);
    }

    // Event listeners para los botones de compra de mejoras
    document.getElementById('comprarVelocidad').addEventListener('click', function() {
        comprarMejora('velocidad');
    });

    document.getElementById('comprarRebotes').addEventListener('click', function() {
        comprarMejora('rebotes');
    });

    document.getElementById('comprarClicks').addEventListener('click', function() {
        comprarMejora('clicks');
    });

    // Event listener para aumentar puntos al hacer clic en cualquier lugar de la pantalla
    document.addEventListener('click', function(event) {
        if (event.target.tagName !== 'BUTTON' && event.target.className !== 'power-up') {
            contador += mejoras.clicks.multiplicador;
            actualizarContador();
        }
    });

    // Iniciar la animación y el contador de tiempo
    animar();
    iniciarContadorTiempo();

    // Mostrar pop-ups de power-ups cada intervalo aleatorio entre 7 y 12 segundos
    setInterval(function() {
        var tiempoAparicion = Math.random() * (12000 - 7000) + 7000;
        setTimeout(mostrarPopUp, tiempoAparicion);
    }, 12000); // Ejecutar cada 12 segundos para permitir variabilidad en la aparición
});
