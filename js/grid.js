const grid = {
    // La grille
    cells: [
        ['', '', 'b', 'b', 'b', '', '', ''],  // 0
        ['', '', '', '', '', '', '', ''],     // 1
        ['', '', '', '', '', '', '', ''],    // 2
        ['', '', '', '', '', '', '', ''],    // 3
        ['', '', '', '', '', '', '', ''],    // 4
        ['', '', '', '', '', '', '', ''],    // 5
        ['', '', 'b', '', '', '', '', ''],    // 6
        ['', '', 'b', '', '', '', '', ''], // 7
      ],
      headers: {
        rows: [1, 2, 3, 4, 5, 6, 7, 8],
        columns: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
      },
    displayLine: function(rowIndex) {

        const gridLineToDisplay = grid.cells[rowIndex];
        // On initialise la chaine de caractères qui sera affichée pour le moment à vide.
        let line = "";

        for (
            let columnIndex = 0; columnIndex < gridLineToDisplay.length; columnIndex++
        ) {
            const currentChar = gridLineToDisplay[columnIndex];
            let myCell = document.querySelector("#cell" + rowIndex + columnIndex);
            myCell.textContent = currentChar;
            if (currentChar === "t") {
                myCell.classList.add("hit");
            } else if (currentChar === "p") {
                myCell.classList.add("splash");
            }
            if (currentChar === "") {
                line += "~";
            } else {
                line += currentChar;
            }

            line += " ";
        }

	    return line;

    },
    displayGrid: function() {
        console.log("  " + grid.headers.columns.join(" "));

        for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
            let stringLine = grid.Headers.rows[rowIndex] + " ";

            stringLine += displayLine(rowIndex);

            console.log(stringLine);
        }

    },

    // Traduire les coordonnées utilisateur en coordonnées tableau
    getGridIndexes: function (cellName) {
        let aReturn = [];
        let columnName = cellName[0];
        let rowName = Number(cellName[1]);
    
        aReturn.push(
            grid.headers.rows.indexOf(rowName),
            grid.headers.columns.indexOf(columnName)
        );
        return aReturn;
    },

    checkCellName: function(coords) {

        let columnName = coords[0]; // Ex: A
        let rowName = Number(coords[1]); // Ex: 5
    
        // Il est possible de cibler l'element par son dataset...
        // const cellElement = document.querySelector('.cell[data-cell-name="'+coords+'"]');
        // if (cellElement === null) {
        //   return false
        // } else {
        //   return true;
        // }
    
        // Je regarde dans mon tableau qui contient les numéros de ligne si celle saisie par l'utilisateur existe
        // Je regarde dans mon tableau qui contient les numéros de colonnes si celle saisie par l'utilisateur existe
        if (grid.headers.rows.indexOf(rowName) === -1 || grid.headers.columns.indexOf(columnName) === -1) {
    
          return false;
    
        } else {
    
          return true;
        }
    },
  };
  
 