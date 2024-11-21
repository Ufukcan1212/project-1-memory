// vraag hoeveel kaarten het gebruiker wilt
var nummer = prompt("Met heoveel kaarten wil je spelen? Kies uit 12, 18 of 24!");
// een reference naar onze gridcontainer
const gridContainer = document.querySelector(".grid-container");
let cards = [];
// kies de 2 kaarten (1ste ne 2de) en zorg ervoor dat de board een ander kaart niet laat flibben
let firstCard, secondCard;
let lockBoard = false;
// het scoren updaten en laten zien
let score = 0;

document.querySelector(".score").textContent = score;
// fetch laat zien waar onze data staat van de kaarten 12, 18, 24
if (nummer == 12) {
  fetch("./data/cards12.json")
  // elke then function pakt de argument voor de vorige then functie en gebruikt het als een input
  // vraag naar javascript om naar javascript te veranderen om met de data te kunnen werken
  .then((res) => res.json())
  // gebruik van es6 spread oparator en copieer het value op onze array cards en wee doen het 2 keer omdat we 2 kaarten van elke nodig hebben
  .then((data) => {
  cards = [...data, ...data];
  // we vragen voor de shuffle en generate cards functies
  shuffleCards();
  generateCards();
});}
if (nummer == 18) {
  fetch("./data/cards18.json")
  // elke then function pakt de argument voor de vorige then functie en gebruikt het als een input
  // vraag naar javascript om naar javascript te veranderen om met de data te kunnen werken
  .then((res) => res.json())
  // gebruik van es6 spread oparator en copieer het value op onze array cards en wee doen het 2 keer omdat we 2 kaarten van elke nodig hebben
  .then((data) => {
  cards = [...data, ...data];
  // we vragen voor de shuffle en generate cards functies
  shuffleCards();
  generateCards();
});}
if (nummer == 24) {
  fetch("./data/cards24.json")
  // elke then function pakt de argument voor de vorige then functie en gebruikt het als een input
  // vraag naar javascript om naar javascript te veranderen om met de data te kunnen werken
  .then((res) => res.json())
  // gebruik van es6 spread oparator en copieer het value op onze array cards en wee doen het 2 keer omdat we 2 kaarten van elke nodig hebben
  .then((data) => {
  cards = [...data, ...data];
  // we vragen voor de shuffle en generate cards functies
  shuffleCards();
  generateCards();
});}

function shuffleCards() {
  // gebruik het visueel reads algoritme. We laten onze variabelen zien. current index wordt gezet op de lengte van de kaarten
  // van onze array gaan we terug naar de front loop
  let currentIndex = cards.length,
    randomIndex,
    temporaryValue;
  // met elke loop pakken we een ander index van de blijvende indexen
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    // haal de index die we gebruikten eruit
    currentIndex -= 1;
    // een temorary value zodat we de value van de 1ste niet kwijtraken wanneer we het value van de 2de geven
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
}

function generateCards() {
  // om door de kaarten te loopen
  for (let card of cards) {
    // elke kaart een div element
    const cardElement = document.createElement("div");
    // en een class
    cardElement.classList.add("card");
    // we maken het data name hetzelfde als de card name die we maakten in het style css. Data word gebruit om de kaarten te vergelijken
    cardElement.setAttribute("data-name", card.name);
    // nu het struktuur in het kaart met 2 divs (voor en achter)
    // in het innerHTML word er javascript gebuikt bij card image zodat het image word geselecteerd bij het juiste image (bijv 1 is rode peper)
    cardElement.innerHTML = `
      <div class="front">
        <img class="front-image" src=${card.image} />
      </div>
      <div class="back"></div>
    `;
    // een child node toeveogen 
    gridContainer.appendChild(cardElement);
    // flipkaart word gebruikt wanneer er op een kaart word geclickt
    cardElement.addEventListener("click", flipCard);
  }
}

function flipCard() {
  // kijken of de boord dicht is. Is het zo dan ga terug
  if (lockBoard) return;
  // als het geflipte 1ste kaart weer geklikt word doen we niks
  if (this === firstCard) return;
// geeft het flipde kaar flipped class
  this.classList.add("flipped");
// we weten dat dit een 1ste kaart is en gaan terug
  if (!firstCard) {
    firstCard = this;
    return;
  }
// we weten het 2de kaart en geven het spelen een punt. we sluiten het boord om de kaarten te verglijken
  secondCard = this;
  score++;
  document.querySelector(".score").textContent = score;
  lockBoard = true;
// kijken of de kaarten hetzelfde zijn
  checkForMatch();
}

function checkForMatch() {
  // is het datasetnaam van de 1ste en de 2de kaart hetzelfde dan zet de kaarten uit en maak ze unflipped als we ze eerst niet uitdoen gaan ze weer naar achteren draaien
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;

  isMatch ? disableCards() : unflipCards();
}
// het click event listener van de 1ste en de 2de kaart weghalen zodat ze niet geclickt kunnen worden en ook niet flipped
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
// het boord weer aanzetten en de 2 kaarten weglaten
  resetBoard();
}
// als de kaarten niet hetzelde zijn worden ze unflipped zonder uit te doen zodat je ze weer kan draaien
function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
    // wacht een seconde zodat het animatie tijd heeft
  }, 1000);
}
// "verwijder" de kaarten 1 en 2 en doe de boord open
function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}
// restart alles de shuffle board score ALLES
function restart() {
  resetBoard();
  shuffleCards();
  score = 0;
  document.querySelector(".score").textContent = score;
  gridContainer.innerHTML = "";
  generateCards();
}
