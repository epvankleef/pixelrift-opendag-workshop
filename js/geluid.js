// =========================================================
// PIXELRIFT: geluidseffecten
// Alle geluiden worden gemaakt met code (de Web Audio API).
// Er zijn dus geen geluidsbestanden nodig.
// =========================================================

const GELUID = {
  aan: true,          // false = alles stil
  volume: 0.08,       // 0 = stil, 0.2 = hard (houd het rustig in een vol lokaal)
  golfvorm: "square"  // "square" = retro 8-bit, "sine" = zacht, "triangle" = rond, "sawtooth" = scherp
};

// Elk geluid is een rijtje tonen: [toonhoogte in Hz, duur in seconden]
// Hoe hoger het getal, hoe hoger de toon. 440 is de A die een stemvork maakt.
const GELUIDEN = {
  start:    [[440, 0.08], [660, 0.08], [880, 0.12]],
  kristal:  [[880, 0.05], [1320, 0.08]],
  geraakt:  [[180, 0.1], [90, 0.2]],
  levelUp:  [[523, 0.08], [659, 0.08], [784, 0.08], [1047, 0.2]],
  gameOver: [[392, 0.15], [330, 0.15], [262, 0.15], [196, 0.45]]
};

// Heeft iemand op deze computer het geluid eerder uitgezet? Dan blijft het uit.
if (localStorage.getItem("pixelrift-geluid") === "uit") GELUID.aan = false;

let audio = null;

// Browsers spelen pas geluid af nadat je ergens op hebt geklikt of een toets hebt ingedrukt.
// Daarom roept de game dit aan als je op Start drukt.
function startGeluid() {
  if (!audio) audio = new AudioContext();
  audio.resume();
}

// Speelt een geluid uit de lijst GELUIDEN af.
// toonhoogte: 1 = normaal, 2 = twee keer zo hoog
function speelGeluid(naam, toonhoogte = 1) {
  if (!GELUID.aan || !audio || !GELUIDEN[naam]) return;

  let tijd = audio.currentTime;
  for (const [hz, duur] of GELUIDEN[naam]) {
    const toon = audio.createOscillator();
    const volume = audio.createGain();
    toon.type = GELUID.golfvorm;
    toon.frequency.value = hz * toonhoogte;
    volume.gain.setValueAtTime(GELUID.volume, tijd);
    volume.gain.exponentialRampToValueAtTime(0.001, tijd + duur); // zacht laten uitsterven
    toon.connect(volume).connect(audio.destination);
    toon.start(tijd);
    toon.stop(tijd + duur);
    tijd += duur; // de volgende toon begint als deze klaar is
  }
}
