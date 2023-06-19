const game = {
    score: 0,
    turn: 1,
    startTimestamp: 0,
    init: function() {
      game.startTimestamp = Date.now();
    },
    sendMissileAt: function(rowIndex, columnIndex) {
  
      // je récupère la valeur de la cellule dans la grille
      const targetCell = grid.cells[rowIndex][columnIndex];
  
      // Je déclare ma variable qui sera retournée par ma fonction
      // celle si va contenir un booleen
      let bReturn;
  
      // Si la valeur est un "b" c'est qu'il y a un bateau
      if (targetCell === 'b') {
  
        // J'affiche le résultat
        console.log('Touché !');
  
        // Je modifie la grille avec le "t" pour indiquer que le bateau est touché
        grid.cells[rowIndex][columnIndex] = 't';
  
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
        grid.cells[rowIndex][columnIndex] = 'p';
  
        // je met à jour ma variable en indiquant "false" pour raté
        bReturn = false;
      }
  
      // Si on a touché
      if (bReturn) {
  
        // J'ajoute 30k au score
        game.score += 30000;
  
      } else {
  
        // Je retire 9k au score
        game.score -= 9000;
      }
  
      // On retire les points liés au temps écoulé
      const nowTimestamp = Date.now();
  
      const duration = nowTimestamp - game.startTimestamp;
  
      console.log('Début (ms) : ' + game.startTimestamp);
      console.log('Fin (ms) : ' + nowTimestamp);
      console.log('Durée (ms) : ' + duration);
  
      // Je retire la durée au score
      game.score -= duration;
  
      // Je réinitialise le timestamp
      game.init();
  
      // Je réaffiche ma grille après que celle-ci ai été modifiée
      grid.displayGrid();
  
      return bReturn;
    },
    sendMissile: function(cellName) {
      // On utilise la fonction getGridIndexes qui traduit notre string (ex: A5) en index (Ex: A5 => row = 4 et column = 0)
      const result = grid.getGridIndexes(cellName);
      const rowIndex = result[0];
      const columnIndex = result[1];
  
      // Puis on appelle la fonction sendMissileAt
      // on prend soin de retourner la valeur de retour de sendMissileAt
      // (VRAI si touché, FALSE sinon)
      return game.sendMissileAt(rowIndex, columnIndex);
    },
    checkGameOver: function() {
      // J'initialise ma variable en partant du principe qu'il n'y a aucun bateau
      // dans ma grille
      let hasBoat = false;
  
      // Je commence par parcourir les lignes de ma grille
      for (let rowIndex = 0; rowIndex < grid.cells.length; rowIndex++) {
  
        // Dans la ligne actuellement parcourue par ma boucle
        // je vais chercher si il y a au moins 1 "b"
  
        // indexOf va me retourner "-1" si il ne trouve pas de "b"
        if (grid.cells[rowIndex].indexOf('b') !== -1) {
  
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
    },
    newTurn: function() {
  
      // On ajoute 1 au compteur de tours
      game.turn++;
  
      document.querySelector('#turn').textContent = game.turn;
    },
    startGame: function(username, nbrows) {
      // On revient au premier tour
      game.score = 0;
      game.turn = 1;
  
      grid.resetGrid();
  
      document.querySelector('#game .username').textContent = username;
  
      // On génère le code HTML de la grille
      // grid.createGrid(nbrows);
  
      // On affiche la grille
      grid.displayGrid();
  
      game.init();
  
      document.querySelector('#beforegame').classList.add('hide');
      document.querySelector('#game').classList.remove('hide');
    }
  };