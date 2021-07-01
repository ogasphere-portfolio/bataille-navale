console.log('Coucou je suis chargé & executé');

// Ici ma variable correspond à 1 ligne de ma grille
// je vais donc l'appeler row
// let row = ['', '', 'b', 'b', 'b', '', '', ''];
// console.log(row);

// Finalement je vais déclarer une variable "grid" qui va contenir TOUTES mes lignes
let grid = [
  ['', '', 'b', 'b', 'b', '', '', ''],  // 0
  ['', '', '', '', '', '', '', ''],     // 1
  ['', '', '', '', '', '', '', ''],    // 2
  ['', '', '', '', '', '', '', ''],    // 3
  ['', '', '', '', '', '', '', ''],    // 4
  ['', '', '', '', '', '', '', ''],    // 5
  ['', '', 'b', '', '', '', '', ''],    // 6
  ['', '', 'b', '', '', '', '', ''], // 7
];

// On se créé un tableau associatif pour stocker nos entêtes de lignes & de colonnes
let gridHeaders = {
  rows: [1, 2, 3, 4, 5, 6, 7, 8],
  columns: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
};

// Ici je déclare ma fonction "displayLine"
// Celle-ci prend un argument/paramètre
// La valeur en argument/paramètre sera stockée dans ma variable "gridLineToDisplay"
// Ainsi concrétement si je fait un displayLine(row)
// Une COPIE du contenu de "row" sera faite et déposée dans ma variable "gridLineToDisplay"
// On parle bien de duplication de contenu.
function displayLine(rowIndex) {

  // Comme ma fonction ne recoi plus la ligne au complet mais le numero de celle-ci
  // j'isole dans une constante ma ligne à partir de son numero
  const gridLineToDisplay = grid[rowIndex];

  // On initialise la chaine de caractères qui sera affichée pour le moment à vide.
  let line = '';

  // On parcourt le tableau qui contient la ligne

  /*
  Rappel :
  La boucle FOR se compose de 3 instructions:
  1 => L'initialisation de la boucle
    Ex ici: Je déclare une variable "index" à 0
    Ex ici : let index = 0
  2 => La condition "tant que"
    Ex ici: tant que index plus petit que 8
    Ex ici: index < 8
  3 => L'intération
    Ex ici: j'augmente la valeur de index de 1 à chaque passage dans ma boucle
    Ex ici: index++
  */

  /* Il est possible d'écrire ceci : mais ca ne sert à rien
  var index = 99;

  for (index = 0; index < 8; index++)

  Le for l'interet est de n'avoir qu'une seule ligne !
  */

  // Tips: Je sais que mon tableau à 8 entrées
  // donc je peut écrire ceci comme boucle:
  // for (let index = 0; index < 8; index++)

  // Mais est ce que demain mon tableau aura toujours 8 entrées ??
  // Ba au final je n'en sais rien...
  // Du coup je ne vais pas mettre un nombre en dur mais plutot demander à mon tableau
  // quelle taille il fait !
  for (let columnIndex = 0; columnIndex < gridLineToDisplay.length; columnIndex++) {

    // La variable index en soit, ne nous interesse pas !
    // par contre elle va nous être utilse pour acceder aux valeurs de notre tableau
    // gridLineToDisplay

    // Je récupère la valeur de chaque element de mon tableau dans ma variable
    // Une const = constante à la même portée (= durée de vie) que let
    // la différence entre let & const est que le contenu n'est pas modifiable par la suite
    // le contenu est "constant"
    // Ici, la valeur de ma variable ne sera pas ammenée à changer.
    // Du coup pour garder une cohérence dans mon code je déclare la variable comme étant une constante
    // ainsi je verrouille son contenu et je ne prend pas le risque de faire une "bétise" plus tard dans mon code
    const currentChar = gridLineToDisplay[columnIndex];

    // Je viens inscrire dans ma cellule, le contenu de la case de ma grille
    // document.getElementById('cell' + rowIndex + columnIndex).textContent = currentChar;

    // Méthode un peu plus cool avec le principe des selecteurs CSS
    let myCell = document.querySelector('#cell' + rowIndex + columnIndex);

    // Je m'occupe de mondifier le contenu de la case
    myCell.textContent = currentChar;

    // Je peut également modifier la/les classe CSS de ma case
    if (currentChar === 't') {

      myCell.classList.add('hit');

    } else if (currentChar === 'p') {

      myCell.classList.add('splash');
    }

    // Si le caractère est vide
    if (currentChar === '') {

      // alors je concatère sur ma variable "line" un "~"
      line += '~';

    // Sinon
    } else {

      // je concatère sur ma variable "line" le caractère contenu dans "currentChar"
      line += currentChar;
    }

    // On ajoute un espace vide à "line" afin d'aérer l'affichage
    line += ' ';

    // On arrive à la fin de la boucle, javascript va donc détruire les variables/constantes
    // qui ont une portée limitée (let/const) à ce block.
  }

  // console.log(line);
  return line;
}

// Fonction qui va envoyer le missile
// la fonction prend en paramètre les coordonnées cible du missile
// pour le moment je ne travail que sur une seule ligne, donc je n'ai qu'un seul
// paramètre: le numero de la colonne
// Edit Etape 7
// J'ai désormais 2 arguments:
// Le numero de ligne => rowIndex
// Le numero de colonne => columnIndex
function sendMissileAt(rowIndex, columnIndex) {

  // je récupère la valeur de la cellule dans la grille
  const targetCell = grid[rowIndex][columnIndex];

  // Je déclare ma variable qui sera retournée par ma fonction
  // celle si va contenir un booleen
  let bReturn;

  // Si la valeur est un "b" c'est qu'il y a un bateau
  if (targetCell === 'b') {

    // J'affiche le résultat
    console.log('Touché !');

    // Je modifie la grille avec le "t" pour indiquer que le bateau est touché
    grid[rowIndex][columnIndex] = 't';

    // je met à jour ma variable en indiquant "true" pour touché
    bReturn = true;

  // Sinon si, on a déjà tiré ici...
  } else if (targetCell === 't' || targetCell === 'p') {

    console.log('Allooo! Allooooo! Y\'a personne au bout du fil ? Faut réfléchir McFly. Faut réfléchir !');

    // je met à jour ma variable en indiquant "false" pour raté
    bReturn = false;

  // Sinon (= quelque soit la valeur autre)
  } else {

    // J'affiche le résultat
    console.log('Plouf !');

    // Je modifie la grille avec le "p" pour indiquer que j'ai tiré dans l'eau
    grid[rowIndex][columnIndex] = 'p';

    // je met à jour ma variable en indiquant "false" pour raté
    bReturn = false;
  }

  // Je réaffiche ma grille après que celle-ci ai été modifiée
  displayGrid();

  return bReturn;
}

function displayGrid() {

  // On commence par afficher les 8 colonnes puis 2 espace au début (pour l'affichage du numero de ligne)
  // Evidement là c'est PAS top car ca impose d'avoir une grille de 8 colonnes...
  // console.log('  A B C D E F G H');
  // Ici désormais je me base sur gridHeaders
  // j'utilise la fonction join afin de rassembler les valeurs de mon tableau
  // dans une chaine de caractères.
  // join prend en paramètre le/les caractères qui viendront s'intercaller entre les valeurs
  console.log('  ' + gridHeaders.columns.join(' '));

  // On va boucler sur chaque line de ma grille
  // L'indexation commence à 0
  // Tant que mon index est plus petit que la taille totale de ma grille
  // J'incrémente l'index de 1
  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {

    // On souhaite afficher les ~~bb~ etc. pour chaque ligne
    // On doit donc parcourir les colonnes.

    // Je commence par initialiser la chaine de caractères qui va être affichée
    // Je commencer par écrire le numero de la ligne
    // let stringLine = (rowIndex + 1) + ' ';

    let stringLine = gridHeaders.rows[rowIndex] + ' ';

    // Puis je concatène la ligne par le résultat de displayLine
    // Je donne donc à ma fonction displayLine ma ligne courante
    stringLine += displayLine(rowIndex);

    // On pourrait également faire :
    // const currentLine = grid[rowIndex];

    // stringLine += displayLine(currentLine);

    // Rappel += :
    // stringLine = stringLine + displayLine(currentLine);

    // On affiche la chaine de caractères qui représente la ligne courante de ma grille
    console.log(stringLine);
  }
}

/*
Fonction qui recoit les coordonnées au format "humain" (ex "E4")
et qui les transformes en coordonnées compréhensible par notre script (ex : grid[4][1])
 */
function sendMissile(cellName) {
  // On utilise la fonction getGridIndexes qui traduit notre string (ex: A5) en index (Ex: A5 => row = 4 et column = 0)
  const result = getGridIndexes(cellName);
  const rowIndex = result[0];
  const columnIndex = result[1];

  // Puis on appelle la fonction sendMissileAt
  // on prend soin de retourner la valeur de retour de sendMissileAt
  // (VRAI si touché, FALSE sinon)
  return sendMissileAt(rowIndex, columnIndex);
}

// Fonction qui va retourner les indexes de la ligne & de la colonne correspondant
function getGridIndexes(cellName) {

  // J'initialise mon tableau de résultat à retourner
  let aReturn = [];

  // cellName est une string contennant par exemple : A5
  // J'isole donc les 2 valeurs dans des variables adaptées

  let columnName = cellName[0]; // Ex: A
  let rowName = Number(cellName[1]); // Ex: 5

  // Je demande à mon tableau de nom de lignes de me donner
  // l'index de la ligne concernée
  aReturn.push(gridHeaders.rows.indexOf(rowName)); // Ex: 4

  // Je demande à mon tableau de nom de colonnes de me donner
  // l'index de la colonne concernée
  // pour finir j'ajoute à mon tableau à retourner l'index trouvé
  aReturn.push(gridHeaders.columns.indexOf(columnName)); // Ex: 0

  // console.log(aReturn);

  return aReturn;
}

// Fonction qui permet de savoir si le jeu est terminé
// On va se baser sur la présence ou non de "b" dans notre grille
function checkGameOver()
{
  // J'initialise ma variable en partant du principe qu'il n'y a aucun bateau
  // dans ma grille
  let hasBoat = false;

  // Je commence par parcourir les lignes de ma grille
  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {

    // Dans la ligne actuellement parcourue par ma boucle
    // je vais chercher si il y a au moins 1 "b"

    // indexOf va me retourner "-1" si il ne trouve pas de "b"
    if (grid[rowIndex].indexOf('b') !== -1) {

      // Puisque indexOf à trouvé un bateau
      // je met à jour ma variable
      hasBoat = true;

      // Puisque j'ai trouvé au moins 1 bateau
      // je n'ai plus besoin de continuer d'en chercher
      // je vais donc arreter ma boucle ici !
      // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/break
      break;
    }
  }

  // Ma fonction doit me dire si oui ou non la partie est terminée
  // la condition de terminer la partie ou non est en fonction de si il y a un bateau ou non
  // Donc si il y a un bateau la partie n'est PAS terminée
  // Donc si il n'y a pas de bateau la partie EST terminée
  // La valeur à retourner est donc l'inverse de la présence de bateau
  return !hasBoat;
}

function displayHits() {

  // Je demande à mon DOM de me fournir la liste des elements qui ont la classe "hit"
  const hitElements = document.querySelectorAll('.hit');

  // On va lister les cases touchées
  // Pour le moment c'est vide !
  let hits = [];

  // Puisque ma constante est un tableau je vais boucler dessus !
  for (let currentElement of hitElements) {

    // Je push dans mon tableau, l'ID de l'élément du DOM
    // parcouru dans ma boucle
    hits.push(currentElement.id);

    // console.log(currentElement);
    // console.log(currentElement.id);
  }

  console.warn('Les cases touchées sont: '+hits.join(', '));
}

function promptMissileCell()
{
  // Je demande au navigateur web de créer une boite de dialogue pour que
  // l'utilisateur saisisse les coordonnées.
  let coords = window.prompt('Merci de saisir les coordonnées d\'envoi du missile');

  // Je transmet à sendMissile les coordonnées saisies par l'utilisateur
  sendMissile(coords);
}

// tant que le jeu n'est pas terminé
// while (checkGameOver() === false) {
  // on affiche la grille
  displayGrid();

  // puis on demande au joueur de donner une case
  // promptMissileCell();
// }