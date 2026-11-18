// =========================================================
// PIXELRIFT: algemene JavaScript voor de site
// - het menu op mobiel (alle pagina's)
// - de countdown en de wachtlijst (alleen op de homepage)
// =========================================================

// Wanneer komt de game uit? (jaar-maand-dag T uur:minuten:seconden)
const RELEASE_DATUM = "2027-06-26T12:00:00";


// === MENU OP MOBIEL ===
const menuKnop = document.getElementById("menu-knop");
const menu = document.getElementById("menu");

if (menuKnop && menu) {
  menuKnop.addEventListener("click", function () {
    const isOpen = menu.classList.toggle("open");
    menuKnop.setAttribute("aria-expanded", isOpen);
  });
}


// === COUNTDOWN ===
// Zet een getal om naar twee cijfers, bijvoorbeeld 7 wordt "07"
function tweeCijfers(getal) {
  return String(getal).padStart(2, "0");
}

function updateCountdown() {
  const countdown = document.getElementById("countdown");
  if (!countdown) return; // deze pagina heeft geen countdown

  const verschil = new Date(RELEASE_DATUM) - new Date(); // in milliseconden

  if (verschil <= 0) {
    countdown.innerHTML = '<div class="tijd-blok"><span>NU UIT!</span><small>speel de game</small></div>';
    return;
  }

  const seconden = Math.floor(verschil / 1000);
  document.getElementById("dagen").textContent = tweeCijfers(Math.floor(seconden / 86400));
  document.getElementById("uren").textContent = tweeCijfers(Math.floor((seconden % 86400) / 3600));
  document.getElementById("minuten").textContent = tweeCijfers(Math.floor((seconden % 3600) / 60));
  document.getElementById("seconden").textContent = tweeCijfers(seconden % 60);
}

updateCountdown();
setInterval(updateCountdown, 1000); // elke seconde bijwerken


// === WACHTLIJST ===
// Let op: dit stuurt niets naar internet, het laat alleen een bericht zien.
const wachtlijstForm = document.getElementById("wachtlijst-form");

if (wachtlijstForm) {
  wachtlijstForm.addEventListener("submit", function (event) {
    event.preventDefault(); // voorkom dat de pagina herlaadt

    const gamertag = document.getElementById("gamertag").value.trim();
    const bericht = document.getElementById("wachtlijst-bericht");

    bericht.textContent = "Je staat op de lijst, " + gamertag + "! 🎮";
    wachtlijstForm.reset();
  });
}
