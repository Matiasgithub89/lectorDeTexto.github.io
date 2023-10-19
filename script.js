let speechUtterance;

function speakText() {
  const textToRead = document.getElementById('textToRead').value;
  speechUtterance = new SpeechSynthesisUtterance(textToRead);
  window.speechSynthesis.speak(speechUtterance);
}

function pauseSpeech() {
  window.speechSynthesis.pause();
}

function resumeSpeech() {
  window.speechSynthesis.resume();
}

function increaseSpeed() {
  if (speechUtterance) {
    speechUtterance.rate += 0.1;
  }
}

function decreaseSpeed() {
  if (speechUtterance) {
    speechUtterance.rate -= 0.1;
  }
}
