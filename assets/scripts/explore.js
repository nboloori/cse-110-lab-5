// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const speechSynthesis = window.speechSynthesis;

  let voicesUpdated = false;

  speechSynthesis.onvoiceschanged = () => {
    voicesUpdated = true;
    addVoices(speechSynthesis);
  }

  // backup if onvoiceschanged does not fire (seems to not do so when liveserver first starts)
  setTimeout(() => {

    if(!voicesUpdated) {
      alert("HERE");
      addVoices(speechSynthesis);
    }
  }, 500);

  speakText(speechSynthesis);
}

function addVoices(speechSynthesis) {
  const voices = speechSynthesis.getVoices();
  const voiceSelect = document.getElementById("voice-select");

  for(let i = 0; i < voices.length; i++) {
    const voice = voices[i];
    const voiceOption = document.createElement("option");

    voiceOption.textContent = `${voice.name} (${voice.lang})`

    if(voice.default) {
      voiceOption.textContent += " - DEFAULT";
    }

    voiceOption.setAttribute("data-lang", voice.lang);
    voiceOption.setAttribute("data-name", voice.name);
    voiceSelect.append(voiceOption);
  }
}

function speakText(speechSynthesis) {
  const button = document.querySelector("#explore > button");

  button.onclick = function () {
    const text = document.getElementById("text-to-speak").value;
    const utterance = new SpeechSynthesisUtterance(text);
    const selectedVoice = document.getElementById("voice-select").selectedOptions[0].getAttribute("data-name");
    const voices = speechSynthesis.getVoices();

    for(let i = 0; i < voices.length; i++) {
      if(voices[i].name == selectedVoice) {
        utterance.voice = voices[i];
      }
    }

    speechSynthesis.speak(utterance);

    const faceImage = document.querySelector("#explore > img");

    utterance.onstart = () => {
      faceImage.src = "./assets/images/smiling-open.png";
    }

    utterance.onend = () => {
      faceImage.src = "./assets/images/smiling.png";
    }
  }
}