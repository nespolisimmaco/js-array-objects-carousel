// Array di oggetti con: url dell'imagine, titolo, descrizione
const sliderElements = [
    {
        immagine: "img/01.webp",
        titolo: "Marvel's Spiderman Miles Morales",
        descrizione: "Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man."
    },
    {
        immagine: "img/02.webp",
        titolo: "Rachet & Clank: Rift Apart",
        descrizione: "Blast your way through an interdimensional adventure."
    },
    {
        immagine: "img/03.webp",
        titolo: "Fortnite",
        descrizione: "Drop into a modern gaming phenomenon."
    },
    {
        immagine: "img/04.webp",
        titolo: "Stray",
        descrizione: "Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city."
    },
    {
        immagine: "img/05.webp",
        titolo: "Marvel's Avengers",
        descrizione: "Live out your Super Hero dreams in an epic action-adventure"
    },
];

// Inserisco tutte le immagini dinamicamente servendomi di un array con le immagini e un ciclo for che concatena un template literal.
// Array con immagini
const images = [];
for (let i = 0; i < sliderElements.length; i++) {
    const game = sliderElements[i];
    images.push(game.immagine);
}
console.log(images);
// Contenitore delle immagini dello slider
const sliderItems = document.querySelector(".slider-items");
console.log(sliderItems);
const thumbnailItems = document.querySelector(".images-list");
// Ciclo for per inserire dinamicamente gli item (immagini)
for (let i = 0; i < images.length; i++ ) {
    createImages(images[i]);                     
}
sliderItems.innerHTML += createGame();

// Stato iniziale
// Prendo gli elementi con classe "item"
const items = document.querySelectorAll(".item");
console.log(items);
// Prendo gli elementi con classe "thumbnail"
const thumbnails = document.querySelectorAll(".thumbnail");
// Prendo gli elementi con classe "game"
const games = document.querySelectorAll(".game");
// Prendo i bottoni dello slider
const nextButton = document.querySelector(".next");
const previousButton = document.querySelector(".previous");
// Indice dell'item Visibile
let activeItemIndex = 0;
items[activeItemIndex].classList.add("active-item");
// Thumbnail attiva (luminosa con bordo)
thumbnails[activeItemIndex].classList.add("active-thumbnail");
// Gioco attivo
games[activeItemIndex].classList.add("active-game");
// Aggiungo l'event listener ai bottoni
// Bottone "precedente"
previousButton.addEventListener("click", previousImage);
// Bottone "successivo"
nextButton.addEventListener("click", nextImage);

// *************** AUTOPLAY ***************
// ** DESCRIZIONE **
// Aggiungere al carousel funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) l’immagine attiva dovrà cambiare alla successiva.

// Al click dell'utente sul bottone "successivo", blocco interval e lo avvio di nuovo
nextButton.addEventListener("click", () => {
    clearInterval(myInterval);
    myInterval = setInterval(nextImage, 3000);
});
// Al click dell'utente sul bottone "precedente", blocco interval e lo avvio di nuovo
previousButton.addEventListener("click", () => {
    clearInterval(myInterval);
    myInterval = setInterval(nextImage, 3000);
});
// Al click sulla thumbnail, questa diventa attiva
// thumbnails.addEventListener("click", function () {
//     clearInterval(myInterval);
//     this.classList.add("active-thumbnail");
// })

// Ogni tre secondi passo all'imagine successiva (Autoplay)
let myInterval = setInterval(nextImage, 3000);
// Blocco l'autoplay al click su 'stop button' e lo riavvio al click su 'start button'
document.querySelector(".start-button").addEventListener("click", startAutoplay);
document.querySelector(".stop-button").addEventListener("click", stopAutoplay);
// Inverto la direzione dell'autoplay
let reverse = -1;
document.querySelector(".reverse-button").addEventListener("click", reverseDirection);

//////////////////////////
// FUNCTIONS

/**
 * Description Aggiungo immagini allo slider
 * @param {string} image
 */
function createImages(image) {
    sliderItems.innerHTML += `
    <div class="item">
        <img src="${image}" alt="Game">
    </div>`  
    thumbnailItems.innerHTML += `
    <div class="thumbnail">
        <img src="${image}" alt="Game">
    </div>`
}

// Aggiungo il titolo del gioco e la descrizione
function createGame() {
    let gameInfos = "";
    for (let i = 0; i < sliderElements.length; i++ ) {
        const curGame = sliderElements[i];
        gameInfos += `
        <div class="game">
            <h2 class="game-title">${curGame.titolo}</h2>
            <p class="game-description">${curGame.descrizione}</p>
        </div>` 
    }
    return gameInfos;
}

/**
 * Description Passaggio alla immagine succesiva
 */
function nextImage() {
    // SE siamo all'ultimo elemento
    //  dobbiamo andare al primo elemento
    // ALTRIMENTI
    //  si sale a partire dall'elemento corrente
    if (activeItemIndex === items.length - 1) {
        // Immagine
        items[activeItemIndex].classList.remove("active-item");
        // Thumbnail
        thumbnails[activeItemIndex].classList.remove("active-thumbnail");
        // Videogioco
        games[activeItemIndex].classList.remove("active-game");
        activeItemIndex = 0;
        console.log(activeItemIndex);
        items[activeItemIndex].classList.add("active-item");
        thumbnails[activeItemIndex].classList.add("active-thumbnail");
        games[activeItemIndex].classList.add("active-game");
    } else {
        // Quando clicco su questo bottone, tolgo active all'elemento corrente
        // Immagine
        items[activeItemIndex].classList.remove("active-item");
        // Thumbnail
        thumbnails[activeItemIndex].classList.remove("active-thumbnail");
        // Videogioco
        games[activeItemIndex].classList.remove("active-game");
        // Aumento l'indice
        activeItemIndex++;
        // E assegno active all'elemento successivo
        items[activeItemIndex].classList.add("active-item");
        thumbnails[activeItemIndex].classList.add("active-thumbnail");
        games[activeItemIndex].classList.add("active-game");
    }
}

/**
 * Description Passaggio alla immagine precedente
 */
function previousImage() {
    // SE siamo al primo elemento
    //  dobbiamo andare all'ultimo elemento
    // ALTRIMENTI
    //  si scende a partire dall'elemento corrente
    if (activeItemIndex === 0) {
        // Immagine
        items[activeItemIndex].classList.remove("active-item");
        // Thumbnail
        thumbnails[activeItemIndex].classList.remove("active-thumbnail");
        // Videogioco
        games[activeItemIndex].classList.remove("active-game");
        activeItemIndex = items.length - 1;
        console.log(activeItemIndex);
        items[activeItemIndex].classList.add("active-item");
        thumbnails[activeItemIndex].classList.add("active-thumbnail");
        games[activeItemIndex].classList.add("active-game");
    } else {
        // Immagini
        // Quando clicco su questo bottone, tolgo active all'elemento corrente
        items[activeItemIndex].classList.remove("active-item");
        // Thumbnail
        thumbnails[activeItemIndex].classList.remove("active-thumbnail");
        // Videogioco
        games[activeItemIndex].classList.remove("active-game");
        // Diminusico l'indice
        activeItemIndex--;
        console.log(activeItemIndex);
        // E assegno active all'elemento successivo
        items[activeItemIndex].classList.add("active-item");
        thumbnails[activeItemIndex].classList.add("active-thumbnail");
        games[activeItemIndex].classList.add("active-game");
    }
}

// Funzioni per bloccare l'autoplay al click su 'stop button', per riprenderlo al click su 'start button', e per invertire la sua direzione

/**
 * Description start autoplay
 */
function startAutoplay() {
    if(myInterval === -1) {
        myInterval = setInterval(nextImage, 3000);
        console.log(myInterval);
    }
}

/**
 * Description stop autoplay
 */
function stopAutoplay() {
    clearInterval(myInterval);
    myInterval = -1;
}

/**
 * Description inverto direzione
 */
function reverseDirection() {
    if (reverse === -1) {
        reverse = 1;
        clearInterval(myInterval);
        myInterval = setInterval(previousImage, 3000);
    } else {
        reverse = -1;
        clearInterval(myInterval); 
        myInterval = setInterval(nextImage, 3000);
    }  
}