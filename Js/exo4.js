const init = function () {

  console.log('init');

  const itemForm = document.querySelector('#colors-form');

  itemForm.addEventListener('submit', handleSubmit);
};

function handleSubmit(event) {

  // La fonction preventDefault ici appelée de mon evenement
  // permet de bloquer l'événement !
  // En bloquant l'événement, je bloque les conséquences de celui-ci
  // et donc j'empeche par conséquence, le rechargement de la page !
  event.preventDefault();

  // On commence par effacer les potentielles erreurs
  eraseErrors();

  const userValue = getInputValue();

  // On envoie la valeur dans une fonction qui se charge de tester si c'est une couleur valide
  const isValidColor = testColor(userValue);

  // Si la valeur inscrite est valable, alors on procède à la suite des opérations
  if (isValidColor) {
    // On envoie la valeur à la fonction addItem dont le but est de l'afficher sur la page.
    addItem(userValue);
    // On vide le champ
    eraseInput();
  }
}

function getInputValue() {

  const input = document.querySelector('#colors-input');

  // On récupère la valeur inscrite dans l'input
  let value = input.value;

  // On nettoie notre valeur en lui supprimant les espaces en début & fin de chaine
  value = value.trim();

  return value;
}

/**
 * Fonction qui permet de valider si le code entré par l'utilisateur est valide
 */
function testColor(color) {

  // On commence par tester si l'utilisateur a bien entré une valeur en vérifiant la longueur de la chaîne
  if (color.length === 0) {

    // On affiche un message d'erreur
    displayError('Vous devez remplir le champ !');

    // La couleur n'est pas valide, on renvoie false.
    return false;
  }


  // On vérifie que la chaîne commence par #
  // Une chaîne de caractères peut être parcourue comme un tableau : le premier caractère se trouve à l'index 0.
  if (color[0] !== '#') {
    // On affiche un message d'erreur
    displayError('Un code couleur doit commencer par # !');

    // La couleur n'est pas valide, on renvoie false.
    return false;
  }


  // On vérifie que la chaîne fasse soit 4, soit 7 caractères.
  if (color.length !== 4 && color.length !== 7) {
    // On affiche un message d'erreur
    displayError('Un code couleur doit faire 4 ou 7 caractères de long !');

    // La couleur n'est pas valide, on renvoie false.
    return false;
  }

  // Si aucune des erreurs n'a été levée, on indique que la chaîne est valide en retournant "true"
  return true;

}

/**
 * Fonction permettant d'ajouter un nouvel élément à la liste dans le DOM
 */
function addItem(color) {
  // On sélectionne notre liste
  const list = document.querySelector('#colors-list');

  // On crée un  nouvel élément de type li
  const newColorElement = document.createElement('li');

  // On ajoute le code couleur en contenu de ce nouvel élément
  newColorElement.textContent = color;

  // Et on applique la couleur au texte grâce à la propriété CSS color
  newColorElement.style.color = color;

  // Enfin, on ajoute ce nouvel élément au conteneur
  list.append(newColorElement);

}

/**
 * Fonction qui vide le champ du formulaire
 */
function eraseInput() {
  // On sélectionne notre champ
  const input = document.querySelector('#colors-input');

  // On définit la nouvelle de l'input comme étant une chaîne vide
  input.value = '';

  // On donne le focus au champ après l'avoir vidé
  input.focus();
}

/**
 * Fonction permettant d'afficher une erreur dans le conteneur
 */
function displayError(error) {
  // On sélectionne le conteneur des erreurs
  const errorsContainer = document.querySelector('#colors-error');

  // On ajoute l'erreur récupérée en paramètre dans le conteneur
  errorsContainer.textContent = error;
}

/**
 * Fonction qui sert à effacer les erreurs
 */
 function eraseErrors() {
  // On sélectionne le conteneur des erreurs
  const errorsContainer = document.querySelector('#colors-error');

  // Puis on redéfinit son contenu comme étant une chaîne vide
  errorsContainer.innerHTML = '';
}

document.addEventListener('DOMContentLoaded', init);