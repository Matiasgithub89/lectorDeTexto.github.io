document.addEventListener('DOMContentLoaded', function () {
    var voiceSelect = document.getElementById('voiceSelect');
    var synth = window.speechSynthesis;

    // Función para llenar el selector de voces
    function loadVoices() {
        var voices = synth.getVoices();

        // Limpia el selector de voces
        voiceSelect.innerHTML = '';

        // Llena el selector con las voces disponibles
        voices.forEach(function (voz, index) {
            var option = document.createElement('option');
            option.value = index;
            option.textContent = voz.name;
            voiceSelect.appendChild(option);
        });
    }

    // Esperar a que las voces se carguen antes de llenar el selector
    synth.onvoiceschanged = loadVoices;
});

var textoCompleto = "";
var synth = window.speechSynthesis;
var currentUtterance = null;
var fragmentos = []; // Almacenar fragmentos de texto

function leerTextoAutomatico() {
    textoCompleto = document.getElementById('inputTexto').value;
    fragmentos = splitTextIntoChunks(textoCompleto, 200); // Dividir en fragmentos de 200 caracteres
    leerSiguienteFragmento();
}

function splitTextIntoChunks(texto, chunkSize) {
    var palabras = texto.split(' '); // Dividir el texto en palabras
    var result = [];
    var currentChunk = '';

    for (var i = 0; i < palabras.length; i++) {
        if ((currentChunk + palabras[i]).length <= chunkSize) {
            currentChunk += palabras[i] + ' ';
        } else {
            result.push(currentChunk.trim()); // Agregar fragmento anterior
            currentChunk = palabras[i] + ' '; // Comenzar un nuevo fragmento
        }
    }

    // Agregar el último fragmento si no está vacío
    if (currentChunk.trim() !== '') {
        result.push(currentChunk.trim());
    }

    return result;
}

function leerSiguienteFragmento() {
    if (fragmentos.length > 0) {
        var fragmento = fragmentos.shift();
        var mensaje = new SpeechSynthesisUtterance(fragmento);
        var voiceSelect = document.getElementById('voiceSelect');
        var selectedVoice = synth.getVoices()[voiceSelect.value];
        mensaje.voice = selectedVoice;
        currentUtterance = mensaje;

        // Configurar un evento de finalización para continuar con el siguiente fragmento
        mensaje.onend = function () {
            leerSiguienteFragmento();
        };

        synth.speak(mensaje);
    }
}

function detenerLectura() {
    if (currentUtterance) {
        synth.cancel();
        fragmentos = []; // Detener y borrar fragmentos restantes
    }
}

var lecturaPausada = false;

function pausarLectura() {
    if (currentUtterance && synth.speaking) {
        synth.pause();
        lecturaPausada = true;
        console.log('Lectura en pausa');
    }
}

function reanudarLectura() {
    console.log('Intentando reanudar lectura');
    if (currentUtterance) {
        if (lecturaPausada) {
            synth.resume();
            lecturaPausada = false;
            console.log('Lectura reanudada');
        } else if (synth.speaking) {
            // Si no se ha pausado previamente y quedan fragmentos, continuar con el siguiente fragmento
            console.log('Continuando con el siguiente fragmento');
            leerSiguienteFragmento();
        }
    }
}
function aumentarVelocidadLectura() {
    if (currentUtterance) {
        currentUtterance.rate += 0.5;
    }
}
