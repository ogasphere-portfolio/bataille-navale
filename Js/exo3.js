const init = function() {

  console.log('init');

  const itemForm = document.querySelector('#shop-item-form');

  itemForm.addEventListener('submit', handleSubmit);
};

function handleSubmit(event) {

  // Ici j'ai décidé de récuperer mon evenement déclencheur
  // je l'ai stocké dans une variable nommée event

  console.log('mon formulaire a été submit');

  // La fonction preventDefault ici appelée de mon evenement
  // permet de bloquer l'événement !
  // En bloquant l'événement, je bloque les conséquences de celui-ci
  // et donc j'empeche par conséquence, le rechargement de la page !
  event.preventDefault();

  console.log(event);

  const inputValue = getInputValue();

  // Todo (dans une nouvelle fonction):
  // Si j'ai bien une valeur dans inputValue alors je l'ajoute dans mon DOM
  //  Je cible mon OL puis j'ajoute un element HTML (=innerHTML) dedans

  // Si la valeur est bien suppérieur à 0 alors je l'ajoute
  if (inputValue.length > 0) {

    // Je lance la fonction qui va ajouter la valeur dans la liste
    addItem(inputValue);

    // Bonus : je vide le champ input
    eraseInput();
  }
}

function getInputValue() {

  const input = document.querySelector('#shop-item-input');

  // On récupère la valeur inscrite dans l'input
  let value = input.value;

  // On nettoie notre valeur en lui supprimant les espaces en début & fin de chaine
  value = value.trim();

  console.log(value);

  // Todo:
  // tester si la valeur est vide
  // Si vide, on affiche un message dans la console
  // si plein on return la value

  // Je regarde la longeur de ma valeur
  // Si elle est à 0 j'affiche le message d'erreur
  if (value.length === 0) {
    console.error('Il faut remplir le champ, pardi !');
  }

  return value;
}

function addItem(item) {

  // On sélectionne notre liste
  const list = document.querySelector('#shop-items');

  // On ajoute à la fin de notre ol, une balise li qui contient la valeur entrée par l'utilisateur.
  list.innerHTML += "<li>" + item + "</li>";
}

function eraseInput(){
  // On sélectionne notre champ
  const input = document.querySelector('#shop-item-input');

  // On définit la nouvelle de l'input comme étant une chaîne vide
  input.value = '';

  // On donne le focus au champ après l'avoir vidé
  input.focus();
}

document.addEventListener('DOMContentLoaded', init);