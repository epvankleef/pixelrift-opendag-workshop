# 🎮 PIXELRIFT: bouw mee aan een game-website!

Welkom bij **Nightbyte Studio**! Onze nieuwe game PIXELRIFT komt bijna uit, maar de website is nog niet af. Vandaag ben **jij** onze nieuwe developer.

Je werkt samen met een **AI-assistent** (opencode). Jij bedenkt wat er moet gebeuren, de AI schrijft de code. Jij bent dus de baas. 😎

---

## 🚀 Zo werkt het

1. De website staat open in je browser. Zie je hem niet? Klik dan rechtsonder in VS Code op **Go Live**.
2. Typ in **opencode** wat je wilt veranderen (dat heet een *prompt*) en druk op **Enter**.
3. Kijk in je browser. Je aanpassing verschijnt vanzelf. ✨

Je hebt **15 minuten**. Volg **de route** hieronder: 5 opdrachten, van de website tot de game. Nog tijd over? Kies dan een **bonusopdracht**.

---

## 💡 Spiekbriefje: zo schrijf je een goede prompt

| ❌ Te vaag | ✅ Zo werkt het beter |
|---|---|
| "Maak het mooier" | "Maak de knoppen op de homepage roze met witte tekst" |
| "Verander de game" | "Maak de vijanden in de game twee keer zo snel" |

- **Wat + waar:** zeg wat je wilt én op welke pagina.
- **Wees specifiek:** noem kleuren, teksten en getallen.
- **Niet helemaal goed? Stuur bij:** "Bijna! Maak de tekst iets groter."

## 🆘 Kapot? Geen paniek!

- Typ: *"Sinds je laatste aanpassing werkt de game niet meer. Kun je dat repareren?"*
- Of: *"Draai je laatste wijziging terug."*
- Kom je er niet uit? Vraag het aan de begeleider. 🙋

> **Goed om te weten:** de AI maakt geen dingen die kwetsend, eng of onveilig zijn, en niets over echte personen. Zet alleen je **voornaam of gamertag** op de site, nooit je achternaam of andere gegevens.

---

## 🗺️ De route (15 minuten)

### 1. Jouw kleur 🎨

Geef de website een andere hoofdkleur.

**Voorbeeldprompt:**
> Verander de hoofdkleur van de website van lime-groen naar oranje.

**💡 Prompttip:** "Maak het mooier" is te vaag. Noem een echte kleur, of een kleurcode zoals `#ff8800`. (De hoofdkleur heet `--kleur-accent` en staat bovenaan in `css/style.css`.)

**✅ Gelukt als:** de titel, de knoppen en de countdown jouw kleur hebben.

### 2. Jij bent de lead developer 🧑‍💻

Zet jezelf in het team op de homepage. Daar staat nu nog `[JOUW NAAM]`.

**Voorbeeldprompt:**
> Vervang [JOUW NAAM] op de homepage door "Sam". Verander de tekst eronder in "Bouwde deze site op de opendag".

**💡 Prompttip:** Zeg **wat** er moet veranderen en **waar** het staat. Dan hoeft de AI niet te zoeken of te gokken.

**✅ Gelukt als:** jouw naam in het team staat.

### 3. Jouw eigen character 🐉

Voeg een vijfde character toe en speel er daarna mee.

**Voorbeeldprompt:**
> Voeg een nieuw character toe aan de lijst CHARACTERS: naam "Blaze", emoji 🐉, rol "Vuurspuwer", kleur oranjerood, kracht 8, snelheid 5, slimheid 6 en een stoere quote.

**💡 Prompttip:** Geef de details die jij belangrijk vindt. De rest (zoals de quote) mag de AI verzinnen. (De characters staan in `js/characters.js`.)

**✅ Gelukt als:** je nieuwe character op de characters-pagina staat. Klik op **Kies** en open **Speel nu**: je speelt nu met jouw character!

### 4. Maak de game van jou 🕹️

Verander hoe de game eruitziet en hoe snel hij gaat.

**Voorbeeldprompt:**
> Verander in de game de vijanden in meteorieten ☄️ en de kristallen in sterren ⭐, en maak alles twee keer zo snel.

**💡 Prompttip:** Kleine aanpassingen aan **hetzelfde onderdeel** mag je in één prompt combineren. Wil je weten hoe het werkt? Vraag: *"Waar staan de instellingen van de game?"* (Spoiler: bij `INSTELLINGEN` in `js/game.js`.)

**✅ Gelukt als:** er sneller meteorieten en sterren uit de lucht vallen.

### 5. Highscore 🏆

Laat de game je beste score onthouden. Wie haalt de hoogste score: jij of je buurman of buurvrouw?

**Voorbeeldprompt:**
> Voeg een highscore toe aan de game. Laat "Highscore: ..." naast de score zien en onthoud de hoogste score, ook als ik de pagina herlaad.

**💡 Prompttip:** Beschrijf wat de speler moet **zien** en wat er moet **gebeuren**. Benieuwd hoe het werkt? Vraag dan: *"Hoe onthoudt de site mijn highscore?"*

**⏳ Even geduld:** dit is een grotere klus. De AI past meerdere bestanden aan en is er 1 tot 3 minuten mee bezig. Speel ondertussen een potje!

**✅ Gelukt als:** je highscore er na het herladen van de pagina nog steeds staat.

---

## ⚡ Nog tijd over? Bonusopdrachten

Kies wat je leuk vindt. De volgorde maakt niet uit.

### Jouw eigen geluid 🔊

De game heeft al retro 8-bit geluiden. Maak er je eigen geluiden van!

**Voorbeeldprompt:**
> Speel een vrolijk melodietje van 5 tonen als ik game over ga, en maak alle geluiden zachter en ronder.

**💡 Prompttip:** Beschrijf hoe het moet **klinken**: hoog of laag, vrolijk of zielig, kort of lang. (De geluiden staan in `js/geluid.js`. Daar zie je ook dat elk geluid gewoon een rijtje tonen is.)

**✅ Gelukt als:** je je nieuwe geluid hoort. (Hoor je niets? Kijk of de 🔊-knop boven de game aan staat.)

### Power-up ❤️

**Voorbeeldprompt (stap 1):**
> Laat in de game af en toe een hartje ❤️ naar beneden vallen.

**Voorbeeldprompt (stap 2):**
> Als de speler een hartje pakt, krijgt hij een extra leven. Maximaal 5 levens.

**💡 Prompttip:** Is een opdracht groot? **Knip hem in stukjes** en kijk na elke stap of het werkt.

**✅ Gelukt als:** je een extra hartje krijgt als je er een vangt.

### Schudden 📳

**Voorbeeldprompt:**
> Laat het speelveld kort schudden als ik geraakt word door een vijand.

**💡 Prompttip:** Beschrijf het **gevoel** dat je wilt ("schudden", "flitsen", "stuiteren"). De AI weet hoe je dat in code maakt.

**✅ Gelukt als:** het scherm schudt als je een leven verliest.

### Confetti 🎉

**Voorbeeldprompt:**
> Als iemand zich aanmeldt voor de wachtlijst, laat dan 3 seconden lang confetti in de kleuren van de site vallen. Gebruik geen externe library.

**💡 Prompttip:** Beschrijf **wanneer** het moet gebeuren en **wat** er dan gebeurt.

**✅ Gelukt als:** er confetti valt nadat je je gamertag hebt ingevuld.

### Een betere slogan ✍️

**Voorbeeldprompt:**
> Bedenk 3 spannende slogans voor de game, van maximaal 15 woorden. Verander nog niets aan de site.

En daarna: *"Zet slogan 2 onder de titel op de homepage."*

**💡 Prompttip:** Laat de AI eerst **opties** geven en kies dan zelf.

**✅ Gelukt als:** jouw favoriete slogan onder PIXELRIFT staat.

### Knoppen met karakter 🕹️

**Voorbeeldprompt:**
> Laat alle knoppen op de site een beetje wiebelen als je er met je muis overheen gaat.

**💡 Prompttip:** Te veel of te weinig? **Stuur bij** met een vervolgprompt: *"Het wiebelen is te heftig, maak het rustiger."*

**✅ Gelukt als:** de knoppen precies zo bewegen als jij wilt.

### Veelgestelde vragen ❓

**Voorbeeldprompt:**
> Voeg op de homepage, boven de wachtlijst, een sectie "Veelgestelde vragen" toe met 4 vragen over de game. Het antwoord verschijnt pas als je op de vraag klikt. Gebruik dezelfde stijl als de rest van de site.

**💡 Prompttip:** Zeg **waar** het nieuwe blok moet komen en vraag om **dezelfde stijl**.

**✅ Gelukt als:** je op een vraag klikt en het antwoord openklapt.

### Een nieuwe pagina 🛍️

**Voorbeeldprompt:**
> Maak een nieuwe pagina shop.html met merch van PIXELRIFT: een hoodie, een pet, een mok en stickers, met verzonnen prijzen. Gebruik dezelfde stijl als characters.html en zet de shop in het menu op alle pagina's.

**💡 Prompttip:** Verwijs naar een **bestaand voorbeeld** ("dezelfde stijl als characters.html"). Dan hoeft de AI niet te raden.

**✅ Gelukt als:** je via het menu op elke pagina bij de shop komt.

### Licht en donker 🌗

**Voorbeeldprompt:**
> Voeg een knop toe aan het menu waarmee je wisselt tussen de donkere stijl en een lichte stijl. Onthoud de keuze als je naar een andere pagina gaat.

**💡 Prompttip:** Denk aan wat er **daarna** moet gebeuren en zeg het erbij. Anders weet de AI het niet.

**✅ Gelukt als:** de site licht wordt en dat ook blijft op de andere pagina's.

### Nieuwe release-datum 📅

**Voorbeeldprompt:**
> Zet de release-datum van de game op 1 januari 2027 om 00:00.

**💡 Prompttip:** Geef de **precieze waarde**: een datum én een tijd. (De datum staat in `js/main.js`, bij `RELEASE_DATUM`.)

**✅ Gelukt als:** de countdown andere getallen laat zien.

### Bedenk het zelf 🧠

Een baas-vijand, een geheime code, een tweede level: jij bent de game designer!

**Voorbeeldprompt:**
> Ik wil dat er na 30 seconden een grote baas-vijand verschijnt. Maak eerst een plan in 3 stappen en verander nog niets.

**💡 Prompttip:** Bij een groot idee laat je de AI eerst een **plan** maken. Daarna zeg je: *"Voer stap 1 uit."*

**✅ Gelukt als:** jij trots bent op het resultaat. 😎

---

## 🏁 Klaar?

Super gedaan! Laat je game even zien aan de begeleider of aan je buurman of buurvrouw. Zo voelt het om **developer** te zijn: jij bedenkt het, de AI helpt je het te bouwen. 🚀

Wil je hier meer van leren? Dat kan bij de opleiding **Software Development – Applied AI** van **Aventus**.
