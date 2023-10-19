function procesarTexto() {
    var texto = document.getElementById('inputTexto').value;
    var fragmentos = splitTextIntoChunks(texto, 1000);
    var outputContainer = document.getElementById('outputContainer');
    outputContainer.innerHTML = '';

    fragmentos.forEach(function (fragmento, index) {
        var card = document.createElement('div');
        card.className = 'card mb-3';

        var cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        var cardText = document.createElement('p');
        cardText.className = 'card-text';
        cardText.textContent = fragmento;

        var buttonLeer = document.createElement('button');
        buttonLeer.className = 'btn btn-primary btn-leer';
        buttonLeer.textContent = 'Leer';
        
        cardBody.appendChild(cardText);
        cardBody.appendChild(buttonLeer);
        card.appendChild(cardBody);
        outputContainer.appendChild(card);

        // Agregar evento de clic para la lectura
        buttonLeer.addEventListener('click', function () {
            leerTexto(fragmento, "es-ES"); // Cambia "es-ES" al código de idioma deseado
        });
    });
}

// Función para dividir el texto en fragmentos de un tamaño dado
function splitTextIntoChunks(texto, chunkSize) {
    var result = [];
    for (var i = 0; i < texto.length; i += chunkSize) {
        result.push(texto.substring(i, i + chunkSize));
    }
    return result;
}

// Función para activar la lectura de un fragmento de texto
function leerTexto(fragmento, idioma) {
    var synth = window.speechSynthesis;
    var mensaje = new SpeechSynthesisUtterance(fragmento);

    // Configurar el idioma
    mensaje.lang = idioma;

    synth.speak(mensaje);
}
