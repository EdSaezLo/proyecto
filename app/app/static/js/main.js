const text = document.getElementById('texto');


function guardarNombre() {
    var nombre = document.getElementById("nombreInput").value;
    if(nombre == ''){
        text.innerHTML = 'No has introducido ningún nombre'

    }
    else{
        text.innerHTML = 'El nombre que has introducido és:  ' + nombre;
    }
}