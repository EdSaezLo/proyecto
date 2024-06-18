
    // Seleccionar el elemento que queremos animar
    var caja = document.getElementById('caja');
    var numero = document.getElementById('numero');

    // Definir la posición inicial y la dirección del movimiento
    var posX = 0;
    var posY = 0;
    var velocidadX = 5;
    var velocidadY = 5; 
    var direccionX = 1; 
    var direccionY = 1;

    var contador = 0;


    function animar() {
      
        posX += velocidadX * direccionX;
        posY += velocidadY * direccionY;

       
        caja.style.left = posX + 'px';
        caja.style.top = posY + 'px';

     
        if (posX >= window.innerWidth - 100 || posX <= 0) {
            direccionX *= -1;
            contador ++;
            numero.textContent = contador;
        }

    
        if (posY >= window.innerHeight - 150 || posY <= 0) {
            direccionY *= -1; 
            contador ++;
            numero.textContent = contador;
        }


        requestAnimationFrame(animar);
    }



    animar();

