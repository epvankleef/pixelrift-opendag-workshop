// =========================================================
// PIXELRIFT: de mini-game
// Ontwijk de vijanden, verzamel de kristallen.
// Wil je het spel makkelijker of moeilijker maken?
// Verander de INSTELLINGEN hieronder.
// De geluiden staan in js/geluid.js.
// =========================================================

const INSTELLINGEN = {
  spelerSnelheid: 6,        // hoe snel je naar links en rechts beweegt
  startSnelheid: 2.5,       // hoe snel dingen vallen aan het begin
  versnelling: 0.0008,      // hoeveel sneller het spel steeds wordt
  levens: 3,                // aantal levens bij de start
  kristalPunten: 10,        // punten voor elk kristal
  maxCombo: 5,              // kristallen achter elkaar = punten x2, x3... tot maximaal dit getal
  kansOpKristal: 0.35,      // 0.35 = 35% van alles wat valt is een kristal
  tijdTussenObjecten: 45,   // hoe lager, hoe meer dingen er vallen
  levelDuur: 900,           // hoe lang een level duurt (60 = 1 seconde, dus 900 = 15 seconden)
  vijandEmoji: "👾",
  kristalEmoji: "💎",
  achtergrondKleur: "#0b0a12"
};


// === HET SPEELVELD ===
const canvas = document.getElementById("spel");
const ctx = canvas.getContext("2d");
const BREEDTE = canvas.width;
const HOOGTE = canvas.height;

// Het character dat je op de characters-pagina hebt gekozen
const character = CHARACTERS[gekozenCharacterIndex()];

// Heeft het character een plaatje? Dan tekenen we dat in plaats van de emoji.
const spelerAfbeelding = new Image();
if (character.afbeelding) spelerAfbeelding.src = character.afbeelding;


// === ALLES WAT HET SPEL MOET ONTHOUDEN ===
const spel = {
  status: "start",      // "start", "bezig" of "gameover"
  score: 0,
  levens: INSTELLINGEN.levens,
  combo: 0,             // hoeveel kristallen je achter elkaar hebt gepakt
  level: 1,
  levelTijd: 0,         // telt op tot het volgende level
  snelheid: INSTELLINGEN.startSnelheid,
  objecten: [],         // alles wat naar beneden valt
  deeltjes: [],         // pixels van explosies
  teksten: [],          // zwevende teksten zoals "+10" en "LEVEL 2"
  aftellen: 0,          // tijd tot het volgende vallende ding
  overleefd: 0,         // telt mee voor punten door te overleven
  geraakt: 0,           // even rood flitsen als je geraakt bent
  achtergrondY: 0,      // voor de bewegende achtergrond
  speler: {
    x: BREEDTE / 2,
    y: HOOGTE - 70,
    grootte: 48,
    kanteling: 0,       // de speler kantelt een beetje als je beweegt
    emoji: character.emoji || "❓",
    kleur: character.kleur || "#c6ff3d"
  }
};

// Welke knoppen worden nu ingedrukt?
const toetsen = { links: false, rechts: false };


// === SPEL STARTEN ===
function startSpel() {
  spel.status = "bezig";
  spel.score = 0;
  spel.levens = INSTELLINGEN.levens;
  spel.combo = 0;
  spel.level = 1;
  spel.levelTijd = 0;
  spel.snelheid = INSTELLINGEN.startSnelheid;
  spel.objecten = [];
  spel.deeltjes = [];
  spel.teksten = [];
  spel.aftellen = 0;
  spel.overleefd = 0;
  spel.geraakt = 0;
  spel.speler.x = BREEDTE / 2;

  startGeluid();
  speelGeluid("start");

  document.getElementById("start-scherm").hidden = true;
  document.getElementById("game-over").hidden = true;
  updateScorebord();
}

function gameOver() {
  spel.status = "gameover";
  speelGeluid("gameOver");
  document.getElementById("eind-score").textContent = spel.score;
  document.getElementById("eind-level").textContent = spel.level;
  document.getElementById("game-over").hidden = false;
}


// === VALLENDE DINGEN ===
function maakObject() {
  const isKristal = Math.random() < INSTELLINGEN.kansOpKristal;
  // Vanaf level 2 gaan sommige vijanden zigzaggen
  const zigzag = !isKristal && spel.level >= 2 && Math.random() < 0.4;

  spel.objecten.push({
    soort: isKristal ? "kristal" : "vijand",
    x: 30 + Math.random() * (BREEDTE - 60),
    y: -30,
    grootte: 40,
    snelheid: spel.snelheid * (0.8 + Math.random() * 0.5),
    wiebel: zigzag ? 1 + Math.random() * 2 : 0
  });
}

// Raken twee dingen elkaar? (we kijken naar de afstand tussen de middens)
function raakt(a, b) {
  const afstand = Math.hypot(a.x - b.x, a.y - b.y);
  return afstand < (a.grootte + b.grootte) / 2 * 0.7;
}


// === EFFECTEN: explosies en zwevende teksten ===
function maakExplosie(x, y, kleur, aantal = 14) {
  for (let i = 0; i < aantal; i++) {
    const hoek = Math.random() * Math.PI * 2;
    const kracht = 1.5 + Math.random() * 3;
    spel.deeltjes.push({
      x: x,
      y: y,
      vx: Math.cos(hoek) * kracht,
      vy: Math.sin(hoek) * kracht,
      leven: 25 + Math.random() * 20,
      kleur: kleur
    });
  }
}

function maakTekst(tekst, x, y, kleur, grootte = 22, stijgen = 0.8, leven = 50) {
  spel.teksten.push({ tekst, x, y, kleur, grootte, stijgen, leven, maxLeven: leven });
}

function updateEffecten(dt) {
  for (const d of spel.deeltjes) {
    d.x += d.vx * dt;
    d.y += d.vy * dt;
    d.vy += 0.15 * dt; // zwaartekracht
    d.leven -= dt;
  }
  spel.deeltjes = spel.deeltjes.filter(d => d.leven > 0);

  for (const t of spel.teksten) {
    t.y -= t.stijgen * dt;
    t.leven -= dt;
  }
  spel.teksten = spel.teksten.filter(t => t.leven > 0);
}


// === ELKE FRAME: ALLES BIJWERKEN ===
// dt = hoeveel tijd er voorbij is (1 = één frame op 60 fps)
function update(dt) {
  const speler = spel.speler;

  // Speler bewegen
  if (toetsen.links) speler.x -= INSTELLINGEN.spelerSnelheid * dt;
  if (toetsen.rechts) speler.x += INSTELLINGEN.spelerSnelheid * dt;
  // Niet van het scherm af lopen
  speler.x = Math.max(speler.grootte / 2, Math.min(BREEDTE - speler.grootte / 2, speler.x));
  // Een beetje kantelen in de richting waarin je beweegt
  const doelKanteling = (toetsen.rechts - toetsen.links) * 0.25;
  speler.kanteling += (doelKanteling - speler.kanteling) * 0.2;

  // Het spel wordt steeds sneller
  spel.snelheid += INSTELLINGEN.versnelling * dt;

  // Volgend level?
  spel.levelTijd += dt;
  if (spel.levelTijd >= INSTELLINGEN.levelDuur) {
    spel.levelTijd = 0;
    spel.level += 1;
    maakTekst("LEVEL " + spel.level, BREEDTE / 2, HOOGTE / 2, "#c6ff3d", 52, 0.2, 90);
    speelGeluid("levelUp");
  }

  // Af en toe een nieuw vallend ding (in hogere levels vaker)
  spel.aftellen -= dt;
  if (spel.aftellen <= 0) {
    maakObject();
    spel.aftellen = Math.max(12, INSTELLINGEN.tijdTussenObjecten - (spel.level - 1) * 5);
  }

  // Alles laten vallen en kijken of het de speler raakt
  for (const object of spel.objecten) {
    object.y += object.snelheid * dt;

    // Zigzaggende vijanden bewegen ook heen en weer
    if (object.wiebel) {
      object.x += Math.sin(object.y / 35) * object.wiebel * dt;
      object.x = Math.max(20, Math.min(BREEDTE - 20, object.x));
    }

    if (raakt(object, speler)) {
      object.weg = true;
      if (object.soort === "kristal") {
        spel.combo = Math.min(spel.combo + 1, INSTELLINGEN.maxCombo);
        const punten = INSTELLINGEN.kristalPunten * spel.combo;
        spel.score += punten;
        maakExplosie(object.x, object.y, "#4fd8ff");
        maakTekst("+" + punten + (spel.combo > 1 ? "  x" + spel.combo : ""), object.x, object.y - 20, "#4fd8ff");
        speelGeluid("kristal", 1 + (spel.combo - 1) * 0.15); // hogere combo = hoger piepje
      } else {
        spel.levens -= 1;
        spel.combo = 0;
        spel.geraakt = 20;
        maakExplosie(speler.x, speler.y, "#ff4f7b", 24);
        speelGeluid("geraakt");
      }
    }
    if (object.y > HOOGTE + 40) object.weg = true;
  }
  spel.objecten = spel.objecten.filter(object => !object.weg);

  // Elke seconde overleven = 1 punt
  spel.overleefd += dt;
  if (spel.overleefd >= 60) {
    spel.overleefd = 0;
    spel.score += 1;
  }

  if (spel.geraakt > 0) spel.geraakt -= dt;

  updateScorebord();
  if (spel.levens <= 0) gameOver();
}

function updateScorebord() {
  document.getElementById("score").textContent = spel.score;
  document.getElementById("level").textContent = spel.level;
  document.getElementById("levens").textContent = "❤️".repeat(Math.max(spel.levens, 0)) || "💀";
}


// === ELKE FRAME: ALLES TEKENEN ===
function tekenEmoji(emoji, x, y, grootte) {
  ctx.font = grootte + 'px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(emoji, x, y);
}

function teken() {
  // Achtergrond
  ctx.fillStyle = INSTELLINGEN.achtergrondKleur;
  ctx.fillRect(0, 0, BREEDTE, HOOGTE);

  // Bewegende rasterlijnen, zodat het lijkt alsof je door de rift vliegt
  spel.achtergrondY = (spel.achtergrondY + spel.snelheid * 0.5) % 40;
  ctx.strokeStyle = "rgba(198, 255, 61, 0.07)";
  ctx.lineWidth = 1;
  for (let y = spel.achtergrondY; y < HOOGTE; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(BREEDTE, y);
    ctx.stroke();
  }
  for (let x = 0; x < BREEDTE; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, HOOGTE);
    ctx.stroke();
  }

  // Vallende dingen
  for (const object of spel.objecten) {
    const emoji = object.soort === "kristal" ? INSTELLINGEN.kristalEmoji : INSTELLINGEN.vijandEmoji;
    tekenEmoji(emoji, object.x, object.y, object.grootte);
  }

  // Pixels van explosies
  for (const d of spel.deeltjes) {
    ctx.globalAlpha = Math.min(d.leven / 25, 1);
    ctx.fillStyle = d.kleur;
    ctx.fillRect(d.x - 3, d.y - 3, 6, 6);
  }
  ctx.globalAlpha = 1;

  // De speler (knippert als je net geraakt bent)
  const speler = spel.speler;
  if (spel.geraakt <= 0 || Math.floor(spel.geraakt / 4) % 2 === 0) {
    ctx.save();
    ctx.translate(speler.x, speler.y);
    ctx.rotate(speler.kanteling);
    ctx.shadowColor = speler.kleur;
    ctx.shadowBlur = 25;
    if (spelerAfbeelding.complete && spelerAfbeelding.naturalWidth > 0) {
      // Plaatje met een rand in de kleur van het character
      const maat = speler.grootte + 8;
      ctx.drawImage(spelerAfbeelding, -maat / 2, -maat / 2, maat, maat);
      ctx.shadowBlur = 0;
      ctx.strokeStyle = speler.kleur;
      ctx.lineWidth = 3;
      ctx.strokeRect(-maat / 2, -maat / 2, maat, maat);
    } else {
      tekenEmoji(speler.emoji, 0, 0, speler.grootte);
    }
    ctx.restore();
  }

  // Zwevende teksten
  for (const t of spel.teksten) {
    ctx.globalAlpha = Math.min(t.leven / 20, 1);
    ctx.font = "bold " + t.grootte + 'px "Pixelify Sans", "Courier New", monospace';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = t.kleur;
    ctx.fillText(t.tekst, t.x, t.y);
  }
  ctx.globalAlpha = 1;

  // Rode flits als je geraakt bent
  if (spel.geraakt > 0) {
    ctx.fillStyle = "rgba(255, 79, 123, " + (spel.geraakt / 60) + ")";
    ctx.fillRect(0, 0, BREEDTE, HOOGTE);
  }
}


// === DE SPEL-LUS: draait ongeveer 60 keer per seconde ===
let vorigeTijd = performance.now();

function lus(tijd) {
  const dt = Math.min((tijd - vorigeTijd) / (1000 / 60), 3);
  vorigeTijd = tijd;

  if (spel.status === "bezig") update(dt);
  updateEffecten(dt); // explosies gaan ook na game over nog even door
  teken();

  requestAnimationFrame(lus);
}


// === BESTURING ===
// Toetsenbord: pijltjes of A en D
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") toetsen.links = true;
  if (event.key === "ArrowRight" || event.key === "d" || event.key === "D") toetsen.rechts = true;

  // Spatie of Enter start het spel
  if ((event.key === " " || event.key === "Enter") && spel.status !== "bezig") startSpel();

  // Voorkom dat de pagina gaat scrollen
  if (["ArrowLeft", "ArrowRight", " "].includes(event.key)) event.preventDefault();
});

document.addEventListener("keyup", function (event) {
  if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") toetsen.links = false;
  if (event.key === "ArrowRight" || event.key === "d" || event.key === "D") toetsen.rechts = false;
});

// Knoppen op het scherm (voor telefoon en tablet)
function koppelKnop(id, richting) {
  const knop = document.getElementById(id);
  knop.addEventListener("pointerdown", () => toetsen[richting] = true);
  knop.addEventListener("pointerup", () => toetsen[richting] = false);
  knop.addEventListener("pointerleave", () => toetsen[richting] = false);
  knop.addEventListener("pointercancel", () => toetsen[richting] = false);
}
koppelKnop("knop-links", "links");
koppelKnop("knop-rechts", "rechts");

document.getElementById("start-knop").addEventListener("click", startSpel);
document.getElementById("opnieuw-knop").addEventListener("click", startSpel);

// Geluid aan/uit (wordt onthouden op deze computer)
const geluidKnop = document.getElementById("geluid-knop");
function updateGeluidKnop() {
  geluidKnop.textContent = GELUID.aan ? "🔊" : "🔇";
}
geluidKnop.addEventListener("click", function () {
  GELUID.aan = !GELUID.aan;
  localStorage.setItem("pixelrift-geluid", GELUID.aan ? "aan" : "uit");
  updateGeluidKnop();
  geluidKnop.blur(); // zodat de spatiebalk niet nog een keer op deze knop drukt
});


// === KLAAR VOOR DE START ===
document.getElementById("start-character").textContent = spel.speler.emoji + " " + (character.naam || "Naamloos");
updateGeluidKnop();
updateScorebord();
requestAnimationFrame(lus);
