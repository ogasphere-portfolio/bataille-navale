
// Mon nombre de clics
let nbClicks = 0;

// Je créé ma fonction qui fera des choses...
function updateCounter() {

  // J'incrémente mon nombre de clicks
  nbClicks++;

  document.querySelector('#counter').textContent = nbClicks;
}

// je cible mon bouton dans le DOM afin de pouvoir le surveiller par la suite...
const button = document.querySelector('#button');

// Je demande à mon bouton
// de surveiller/écouter les evenements
// de type click
// en cas de déclenchement de l'evenement, il devra executer updateCounter
button.addEventListener('click', updateCounter);
