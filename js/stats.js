const stats = {
    updateLog: function(coords, hit) {
  
      let text = 'Tour#' + game.turn;
      text += ' tir en ' + coords;
  
      if (hit) {
  
        text += ' réussi';
      } else {
  
        text += ' manqué';
      }
  
      // Je cible mon element qui contient mes actions
      const historyElement = document.querySelector('#actions');
  
      // Je définit le nouveau contenu de mon element comme tel:
      //  nouveau texte puis ancien texte.
      // Ainsi pour nouveau contenu apparait bien en premier
      historyElement.innerHTML = text + '<br />' + historyElement.innerHTML;
    },
    handleClickStats: function() {
  
      // Si on a pas encore tiré...
      if (game.turn === 1) {
        window.alert('Il faut d\'abord tirer');
        return;
      }
  
      // Je cible les elements dans mon DOM, j'obtient des listes et je récupere leurs tailles
      const hits = document.querySelectorAll('.cell.hit').length;
      const splash = document.querySelectorAll('.cell.splash').length;
  
      // On calcule les pourcentages
      let hitPercent = hits / (hits+splash);
      let splashPercent = splash / (hits+splash);
  
      // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
      hitPercent = hitPercent.toFixed(2) * 100;
      splashPercent = splashPercent.toFixed(2) * 100;
  
      const hitLine = 'Pourcentage de tir réussis : ' + hitPercent + '%';
      const splashLine = 'Pourcentage de tir raté : ' + splashPercent + '%';
  
      // J'affiche les deux lignes dans une alert
      // Ici le \n permet d'indiquer le caractères "retour à la ligne"
      window.alert(hitLine + '\n' + splashLine);
    },
  };