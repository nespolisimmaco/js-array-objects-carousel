// Inserisco tutte le immagini dinamicamente servendomi di un array con le immagini e un ciclo for che concatena un template literal.
// Array con immagini
const images = ["img/01.jpg", "img/02.jpg", "img/03.jpg", "img/04.jpg", "img/05.jpg"];
// Contenitore delle immagini dello slider
const sliderItems = document.querySelector(".slider-items");
console.log(sliderItems);
const thumbnailItems = document.querySelector(".images-list");
// Ciclo for per inserire dinamicamente gli item (immagini)
for (let i = 0; i < images.length; i++ ) {
    sliderItems.innerHTML += `
    <div class="item">
        <img src="${images[i]}" alt="Landscape">
    </div>`  
    thumbnailItems.innerHTML += `
    <div class="thumbnail">
        <img src="${images[i]}" alt="Landscape">
    </div>`                           
}

// Stato iniziale
// Prendo gli elementi con classe "item"
const items = document.querySelectorAll(".item");
console.log(items);
// Prendo gli elementi con classe "thumbnail"
const thumbnails = document.querySelectorAll(".thumbnail");
// Prendo i bottoni dello slider
const nextButton = document.querySelector(".next");
const previousButton = document.querySelector(".previous");
// Indice dell'item Visibile
let activeItemIndex = 0;
items[activeItemIndex].classList.add("active-item");
// Thumbnail attiva (luminosa con bordo)
thumbnails[activeItemIndex].classList.add("active-thumbnail");
// Aggiungo l'event listener ai bottoni
// Bottone "precedente"
previousButton.addEventListener("click", previousImage);
// Bottone "successivo"
nextButton.addEventListener("click", nextImage);

// *************** AUTOPLAY ***************
// ** DESCRIZIONE **
// Aggiungere al carousel funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) l’immagine attiva dovrà cambiare alla successiva.

// Ogni tre secondi passo all'imagine successiva
let myInterval = setInterval(nextImage, 3000);
// Al click dell'utente sul bottone "successivo", blocco interval e lo avvio di nuovo
nextButton.addEventListener("click", () => {
    clearInterval(myInterval);
    // myInterval = setInterval(nextImage, 3000); set interval viene ripreso da mouseout()
});
// Al click dell'utente sul bottone "precedente", blocco interval e lo avvio di nuovo
previousButton.addEventListener("click", () => {
    clearInterval(myInterval);
    // myInterval = setInterval(nextImage, 3000); set interval viene ripreso da mouseout()
});
// Stoppare autoplay all'hover sullo slider e farlo ripartire al togliere dell'hover
const mySlider = document.querySelector(".slider");
mySlider.addEventListener("mouseover", mouseOver);
mySlider.addEventListener("mouseout", mouseOut);

//////////////////////////
// FUNCTIONS

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
        activeItemIndex = 0;
        console.log(activeItemIndex);
        items[activeItemIndex].classList.add("active-item");
        thumbnails[activeItemIndex].classList.add("active-thumbnail");
    } else {
        // Quando clicco su questo bottone, tolgo active all'elemento corrente
        // Immagine
        items[activeItemIndex].classList.remove("active-item");
        // Thumbnail
        thumbnails[activeItemIndex].classList.remove("active-thumbnail");
        // Aumento l'indice
        activeItemIndex++;
        console.log(activeItemIndex);
        // E assegno active all'elemento successivo
        items[activeItemIndex].classList.add("active-item");
        thumbnails[activeItemIndex].classList.add("active-thumbnail");
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
        activeItemIndex = items.length - 1;
        console.log(activeItemIndex);
        items[activeItemIndex].classList.add("active-item");
        thumbnails[activeItemIndex].classList.add("active-thumbnail");
    } else {
        // Immagini
        // Quando clicco su questo bottone, tolgo active all'elemento corrente
        items[activeItemIndex].classList.remove("active-item");
        // Thumbnail
        thumbnails[activeItemIndex].classList.remove("active-thumbnail");
        // Diminusico l'indice
        activeItemIndex--;
        console.log(activeItemIndex);
        // E assegno active all'elemento successivo
        items[activeItemIndex].classList.add("active-item");
        thumbnails[activeItemIndex].classList.add("active-thumbnail");
    }
}

// Funzioni per bloccare l'autoplay all'hover sullo slider e per riprenderlo al togliere dell'hover
function mouseOver() {
    clearInterval(myInterval);
}

function mouseOut() {
  myInterval = setInterval(nextImage, 3000);
}