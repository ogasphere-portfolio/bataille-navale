const game = {
    turn: 1,
    sendMissileAt: function(rowIndex, columnIndex) {

            // je récupère la valeur de la cellule dans la grille
        const targetCell = grid.cells[rowIndex][columnIndex];

        // Je déclare ma variable qui sera retournée par ma fonction
        // celle si va contenir un booleen
        let bReturn;

        // Si la valeur est un "b" c'est qu'il y a un bateau
        if (targetCell === "b") {
            // J'affiche le résultat
            console.log("Touché !");
            // Je modifie la grille avec le "t" pour indiquer que le bateau est touché
            grid.cells[rowIndex][columnIndex] = "t";

            // je met à jour ma variable en indiquant "true" pour touché
            bReturn = true;

            // Sinon si, on a déjà tiré ici...
        } else if (targetCell === "t" || targetCell === "p") {
            console.log(
                "Allooo! Allooooo! Y'a personne au bout du fil ? Faut réfléchir McFly. Faut réfléchir !"
            );
            // je met à jour ma variable en indiquant "false" pour raté
            bReturn = false;

            // Sinon (= quelque soit la valeur autre)
        } else {
            // J'affiche le résultat
            console.log("Plouf !");

            // Je modifie la grille avec le "p" pour indiquer que j'ai tiré dans l'eau
            grid.cells[rowIndex][columnIndex] = "p";

            // je met à jour ma variable en indiquant "false" pour raté
            bReturn = false;
        }
        // Je réaffiche ma grille après que celle-ci ai été modifiée
        displayGrid();
        displayHits();
        return bReturn;
    },
    sendMissile: function(cellName) {
        const result = getGridIndexes(cellName);
        console.log(result);
        const rowIndex = result[0];
        const columnIndex = result[1];
        return sendMissileAt(rowIndex, columnIndex);
    }
};

  