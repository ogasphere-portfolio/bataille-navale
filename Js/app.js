console.log('Coucou je suis chargé & executé');

// Ici ma variable correspond à 1 ligne de ma grille
// je vais donc l'appeler row
// let row = ['', '', 'b', 'b', 'b', '', '', ''];
// console.log(row);

// Finalement je vais déclarer une variable "grid" qui va contenir TOUTES mes lignes
let grid = [
  [' ', ' ', 'b',  'b',  'b', ' ', ' ', ' '],
  [' ', ' ', ' ',  ' ',  ' ', ' ', ' ', ' '],
  [' ', ' ', ' ',  ' ',  'b', ' ', ' ', ' '],
  [' ', ' ', ' ',  ' ',  'b', ' ', ' ', ' '],
  [' ', ' ', ' ',  ' ',  'b', ' ', ' ', ' '],
  [' ', ' ', ' ',  ' ',  'b', ' ', ' ', ' '],
  [' ', ' ', 'b',  ' ',  ' ', ' ', ' ', ' '],
  [' ', ' ', 'b',  ' ',  ' ', 'b', 'b', 'b'],
];

// Ici je déclare ma fonction "displayLine"
// Celle-ci prend un argument/paramètre
// La valeur en argument/paramètre sera stockée dans ma variable "gridLineToDisplay"
// Ainsi concrétement si je fait un displayLine(row)
// Une COPIE du contenu de "row" sera faite et déposée dans ma variable "gridLineToDisplay"
// On parle bien de duplication de contenu.


// on envoie un missile en B3)
sendMissileAt(0,2)



function displayLine(gridLineToDisplay) {

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
  for (let index = 0; index < gridLineToDisplay.length; index++) {

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
    const currentChar = gridLineToDisplay[index];

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

  
  if (targetCell !='b' || targetCell !='~') {
    // La case visé à deja recu un missile 
    console.log ('Un missile a déjà été envoyé sur cette case');


  }

  
  
  // Si la valeur est un "b" c'est qu'il y a un bateau
  if (targetCell === 'b') {

    // J'affiche le résultat
    console.log('Touché !');

    // Je modifie la grille avec le "t" pour indiquer que le bateau est touché
    grid[rowIndex][columnIndex] = 't';

    // Réaffichage de la grille
    displayGrid();
    
    // J'arrete l'execution de ma fonction en indiquant "true" pour touché
    return true;

  // Sinon (= quelque soit la valeur autre)
  } else {

    // J'affiche le résultat
    console.log('Plouf !');

    // Je modifie la grille avec le "p" pour indiquer que j'ai tiré dans l'eau
    grid[rowIndex][columnIndex] = 'p';
    
    // Réaffichage de la grille
    displayGrid();

    // J'arrete l'execution de ma fonction en indiquant "false" pour raté
    return false;
  }
}

function displayGrid() {

  // On commence par afficher les 8 colonnes puis 2 espace au début (pour l'affichage du numero de ligne)
  // Evidement là c'est PAS top car ca impose d'avoir une grille de 8 colonnes...
  console.log('  A B C D E F G H');

  // On va boucler sur chaque line de ma grille
  // L'indexation commence à 0
  // Tant que mon index est plus petit que la taille totale de ma grille
  // J'incrémente l'index de 1
  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {

    // On souhaite afficher les ~~bb~ etc. pour chaque ligne
    // On doit donc parcourir les colonnes.

    // Je commence par initialiser la chaine de caractères qui va être affichée
    // Je commencer par écrire le numero de la ligne
    let stringLine = (rowIndex + 1) + ' ';

    // Puis je concatène la ligne par le résultat de displayLine
    // Je donne donc à ma fonction displayLine ma ligne courante
    // stringLine += displayLine(grid[rowIndex]);

    // On pourrait également faire :
    const currentLine = grid[rowIndex];

    stringLine += displayLine(currentLine);

    // Rappel += :
    // stringLine = stringLine + displayLine(currentLine);

    // On affiche la chaine de caractères qui représente la ligne courante de ma grille
    console.log(stringLine);
  }
}

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