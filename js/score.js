const score = {
    history: [],
    getHistory: function(){
  
      const scoresJson = localStorage.getItem('scores');
  
      if (scoresJson !== null) {
  
        score.history = JSON.parse(scoresJson);
      }
    },
    add: function(usernameToAdd, userscoreToAdd){
  
      // On créé notre objet qui va contenir le score
      const newScore = {
        username: usernameToAdd,
        userscore: userscoreToAdd,
      };
  
      // Je demande à ma fonction d'aller chercher les scores
      // dans le localStorage et de mettre à jour
      // score.history
      score.getHistory();
  
      // J'ajoute mon score à mon tableau qui contient tout les scores
      score.history.push(newScore);
  
      // Je transforme mon tableau score.history en JSON
      const scoresJson = JSON.stringify(score.history);
  
      // Je stock dans mon localStorage mon json
      localStorage.setItem('scores', scoresJson);
    },
    handleClickScores: function(){
  
      score.getHistory();
  
      let alertString = '';
  
      for (const currentScore of score.history) {
  
        alertString += currentScore.username + ' ' + currentScore.userscore + '\n';
      }
  
      window.alert(alertString);
    }
  };