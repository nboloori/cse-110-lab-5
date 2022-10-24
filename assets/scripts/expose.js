// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const jsConfetti = new JSConfetti();

  setHorn();
  setVolume();
  playSound(jsConfetti);
}

function setHorn() {
  const selected = document.getElementById("horn-select");

  selected.onchange = () => {
    const hornType = selected.value;
    const altText = hornType.replace("-", " ");
    const hornImage = document.querySelector("#expose > img");

    hornImage.src = `assets/images/${hornType}.svg`;
    hornImage.alt = altText;

    const audioPlayer = document.querySelector("#expose > audio");

    audioPlayer.src = `assets/audio/${hornType}.mp3`;
  }
}

function setVolume() {
  const volume = document.getElementById("volume");

  volume.oninput = function () {
    const volumeLevel = volume.value;
    const volumeImage = document.querySelector("#volume-controls > img");

    if(volumeLevel == 0) {
      volumeImage.src = `assets/icons/volume-level-0.svg`;
      volume.alt = "Volume level 0";
    }
    else if (volumeLevel >= 1 && volumeLevel < 33) {
      volumeImage.src = `assets/icons/volume-level-1.svg`;
      volume.alt = "Volume level 1";
    }
    else if (volumeLevel >= 33 && volumeLevel < 67) {
      volumeImage.src = `assets/icons/volume-level-2.svg`;
      volume.alt = "Volume level 2";
    }
    else {
      volumeImage.src = `assets/icons/volume-level-3.svg`;
      volume.alt = "Volume level 3";
    }

    const audioPlayer = document.querySelector("#expose > audio");

    audioPlayer.volume = volumeLevel / 100;
  }
}

function playSound(jsConfetti) {
  const playButton = document.querySelector("#expose > button");
  const audioPlayer = document.querySelector("#expose > audio");

  playButton.onclick = function () {
    audioPlayer.play();

    const hornType = document.getElementById("horn-select").value;

    if(hornType == "party-horn") {
      jsConfetti.addConfetti();
    }
  };
}