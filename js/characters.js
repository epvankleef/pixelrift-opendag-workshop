// =========================================================
// PIXELRIFT: de characters
// Wil je een nieuw character? Voeg een blok toe aan de lijst
// hieronder. Stats (kracht, snelheid, slimheid) gaan van 1 tot 10.
// =========================================================

const CHARACTERS = [
  {
    naam: "Vex",
    emoji: "🦊",
    rol: "Rift Runner",
    kleur: "#ff8a3d",
    kracht: 5,
    snelheid: 9,
    slimheid: 6,
    quote: "Ik ben al weg voordat je met je ogen knippert."
  },
  {
    naam: "Bolt",
    emoji: "🤖",
    rol: "Tank",
    kleur: "#4fd8ff",
    kracht: 9,
    snelheid: 3,
    slimheid: 5,
    quote: "Ik ben niet traag. Ik ben grondig."
  },
  {
    naam: "Luna",
    emoji: "🦉",
    rol: "Hacker",
    kleur: "#b98cff",
    kracht: 3,
    snelheid: 6,
    slimheid: 10,
    quote: "Elke glitch is gewoon een deur die nog niemand heeft gevonden."
  },
  {
    naam: "Inko",
    emoji: "🐙",
    rol: "Wildcard",
    kleur: "#ff4f7b",
    kracht: 6,
    snelheid: 7,
    slimheid: 4,
    quote: "Acht armen, nul plannen."
  }
];

// Hier wordt onthouden welk character je hebt gekozen (de game gebruikt dit ook)
const OPSLAG_SLEUTEL = "pixelrift-character";

// Geeft het nummer van het gekozen character (of 0 als er niets geldigs is gekozen)
function gekozenCharacterIndex() {
  const index = Number(localStorage.getItem(OPSLAG_SLEUTEL));
  if (index >= 0 && index < CHARACTERS.length) return index;
  return 0;
}


// Maakt van één character een kaart (HTML)
function maakKaart(character, index, gekozenIndex) {
  // Standaardwaarden voor als er iets ontbreekt
  const naam = character.naam || "Naamloos";
  const kleur = character.kleur || "#c6ff3d";
  const emoji = character.emoji || "❓";
  const rol = character.rol || "Nieuwkomer";
  const quote = character.quote || "";
  const stats = {
    kracht: character.kracht || 5,
    snelheid: character.snelheid || 5,
    slimheid: character.slimheid || 5
  };

  const isGekozen = index === gekozenIndex;

  const kaart = document.createElement("article");
  kaart.className = "kaart character-kaart" + (isGekozen ? " gekozen" : "");
  kaart.style.setProperty("--character-kleur", kleur);

  let statsHtml = "";
  for (const naam in stats) {
    statsHtml += `
      <div class="stat">
        <span>${naam}</span>
        <div class="stat-balk"><div style="width: ${stats[naam] * 10}%"></div></div>
      </div>`;
  }

  kaart.innerHTML = `
    <div class="character-avatar">${emoji}</div>
    <p class="rol">${rol}</p>
    <h3>${naam}</h3>
    <p class="quote">${quote}</p>
    ${statsHtml}
    <button class="knop knop-klein kies-knop">${isGekozen ? "Gekozen ✓" : "Kies"}</button>
  `;

  kaart.querySelector(".kies-knop").addEventListener("click", function () {
    localStorage.setItem(OPSLAG_SLEUTEL, index);
    toonCharacters(); // opnieuw tekenen zodat de keuze zichtbaar is
  });

  return kaart;
}


// Zet alle characters op de pagina
function toonCharacters() {
  const lijst = document.getElementById("character-lijst");
  if (!lijst) return; // deze pagina heeft geen characterlijst

  const gekozenIndex = gekozenCharacterIndex();

  lijst.innerHTML = "";
  CHARACTERS.forEach(function (character, index) {
    lijst.appendChild(maakKaart(character, index, gekozenIndex));
  });
}

toonCharacters();
