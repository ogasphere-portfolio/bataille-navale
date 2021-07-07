// Finalement je vais déclarer une variable "grid" qui va contenir TOUTES mes lignes
let grid = [
	["", "", "b", "b", "b", "", "", ""], // 0
	["", "", "", "", "", "", "", ""], // 1
	["", "", "", "", "b", "", "", ""], // 2
	["", "", "", "", "b", "", "", ""], // 3
	["", "", "", "", "b", "", "", ""], // 4
	["", "", "", "", "b", "", "", ""], // 5
	["", "", "b", "", "", "", "", ""], // 6
	["", "", "b", "", "", "b", "b", "b"], // 7
];

// On se créé un tableau associatif pour stocker nos entêtes de lignes & de colonnes
let gridHeaders = {
	rows: [1, 2, 3, 4, 5, 6, 7, 8],
	columns: ["A", "B", "C", "D", "E", "F", "G", "H"],
};


const init = function () {

	// declaration des constantes pour le branchement des évenements
	const itemForm = document.querySelector("#game .form");
	const btnStats = document.querySelector("#stats");
	const btnHisto = document.querySelector("#toggle-actions");
	const beforeGameForm = document.querySelector("#beforegame .form");

	// On branche les mouchards

	// branchement sur l'envoi du premier formulaire : nom et nombre de colonnes 
	beforeGameForm.addEventListener("submit", handleBeforeGame); 

	// Branchement sur l'envoi du second formulaire 
	itemForm.addEventListener("submit", handleSubmit);

	// branchement sur le click du bouton statistiques
	btnStats.addEventListener("click", handleStats);

	// branchement sur le click du bouton historique
	btnHisto.addEventListener("click", handleAfficheHisto);
	
};

console.log("Coucou je suis chargé & executé");

// fonction permettant de gérer le premier formulaire
function handleBeforeGame(event) {

	// on bloque le submit du formulaire pour empecher le rechargement de la page
	event.preventDefault();
	
	// On récupére les données du premier formulaire
	const formElement = event.currentTarget;

	const username = formElement.querySelector('#username').value;
	const nbLigne = formElement.querySelector('#nbrows').value;

	// On affecte la constante username à la classe .username
	//pour afficher le nom dans le H3
	const putUsername = document.querySelector(".username");
	putUsername.textContent = username;

	// On masque le premier formulaire
	const beforeGameForm = document.querySelector("#beforegame");
	beforeGameForm.style.display = "none";

	// on affiche la partie aprés la soumission du premier formulaire
	const game = document.querySelector("#game");
	game.style.display = "block";

	// On donne le focus sur le champ input pour 
	// que l'utilisateur puisse saisir une case
	eraseInput() ;
}


// fonction permettant de gérer le second formulaire
function handleSubmit(event) {

	// on bloque le submit du formulaire pour empecher le rechargement de la page
	event.preventDefault();

	// On récupere la valeur saisie par l'utilisateur
	const value = getInputValue();
	
	// Vérification de la validité de la saisie 
	const isValid = checkInput(value);
	 
	if (isValid === true) {	
		
		// Si la saisie est valide, on envoie le missile
		// et on met à jour l'historique
		majHistorique(value,sendMissile(value));
		
		// On incremente le nombre de tours
		increment();
	} else { 
		// Sinon oon affiche un message 
		console.log("La case ciblée n'est pas valide");
	}
	// On efface le champ de saisie et on lui redonne le focus 
	// pour une nouvelle sasie
	eraseInput();
}

function handleStats() {

	
	
	// Affichages des statistiques 
	const nbTirReussi = document.querySelectorAll(".cell.hit").length;
	const nbTirRate = document.querySelectorAll(".cell.splash").length;
	const totalTirs = nbTirReussi + nbTirRate;

	// Si on a pas encore tiré...
	if (totalTirs === 0) {
		window.alert('Il faut d\'abord tirer');
		return;
	  }

	const tauxTirReussi = (nbTirReussi / totalTirs).toFixed(2) * 100;  // toFixed : permet de limiter à 2 chiffres
	const tauxTirRate = (nbTirRate / totalTirs).toFixed(2) * 100;
	window.alert(
		"Taux de tir reussi :" +
		tauxTirReussi +
		"%  \n Taux de tirs raté : " +   //  \n retour à la ligne
		" %  \n Nombre total de tirs : " +
		totalTirs
	);
}



function getInputValue() {
	const inputValue = document.querySelector("#cellToHit").value;
	return inputValue;
}

function checkInput(inputValue) {
	if (
		// On verifie que la saisie coorrespond à une case de la grille
		inputValue.length === 2 &&
		gridHeaders["rows"].indexOf(Number(inputValue[1])) !== -1 &&
		gridHeaders["columns"].indexOf(inputValue[0]) !== -1
	) {
		return true;
	} else {
		return false;
	}
}

function sendMissile(cellName) {
	const result = getGridIndexes(cellName);
	console.log(result);
	const rowIndex = result[0];
	const columnIndex = result[1];
	return sendMissileAt(rowIndex, columnIndex);
}

function sendMissileAt(rowIndex, columnIndex) {
	// je récupère la valeur de la cellule dans la grille
	const targetCell = grid[rowIndex][columnIndex];

	// Je déclare ma variable qui sera retournée par ma fonction
	// celle si va contenir un booleen
	let bReturn;

	// Si la valeur est un "b" c'est qu'il y a un bateau
	if (targetCell === "b") {
		// J'affiche le résultat
		console.log("Touché !");
		// Je modifie la grille avec le "t" pour indiquer que le bateau est touché
		grid[rowIndex][columnIndex] = "t";

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
		grid[rowIndex][columnIndex] = "p";

		// je met à jour ma variable en indiquant "false" pour raté
		bReturn = false;
	}
	// Je réaffiche ma grille après que celle-ci ai été modifiée
	displayGrid();
	displayHits();
	return bReturn;
}

function handleAfficheHisto() {

	// Affichage et masquage de l'historique
	const listeAction = document.querySelector("#actions");
	if (listeAction.style.display == "block") {
		listeAction.style.display = "none";
	} else {
		listeAction.style.display = "block";
	}
}

// Mise à jour de l'historique 
 // bValue : tir reussi=true, tir raté=false
 // InputValue: case saisie par l'utilisateur
 function majHistorique(inputValue,bValue) {
	
	const listeActions = document.querySelector("#actions");
	const action = document.createElement("p");
	const nbTour = document.querySelector("h3 #tourNb").textContent;
	action.textContent = "Tour n° : " + nbTour + "  en " + inputValue
	
	if (bValue) {
		action.textContent += " reussi";
		
	}else{
		action.textContent += " raté";
	}
	listeActions.prepend(action);
}


// Affichage de la grille dans la console 
function displayGrid() {
	console.log("  " + gridHeaders.columns.join(" "));

	for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
		let stringLine = gridHeaders.rows[rowIndex] + " ";

		stringLine += displayLine(rowIndex);

		console.log(stringLine);
	}
}

function displayLine(rowIndex) {
	const gridLineToDisplay = grid[rowIndex];
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
}

// Montrer les cellules touchées
function displayHits() {
	const hitCell = document.querySelectorAll(".hit");
	let hits = [];

	for (const currentElement of hitCell) {
		hits.push(currentElement.dataset.cellName);
	}
	console.log("Cases touchées: " + hits.join(", "));
}

function eraseInput() {
	// On sélectionne notre champ
	const input = document.querySelector("#cellToHit");

	// On définit la nouvelle de l'input comme étant une chaîne vide
	input.value = "";

	// On donne le focus au champ après l'avoir vidé
	input.focus();
}

// On incrémente le nombre de tours
function increment() {
	const nbTour = document.querySelector("h3 #tourNb");
	nbTour.textContent++;
}


// Traduire les coordonnées utilisateur en coordonnées tableau

function getGridIndexes(cellName) {
	let aReturn = [];
	let columnName = cellName[0];
	let rowName = Number(cellName[1]);

	aReturn.push(
		gridHeaders.rows.indexOf(rowName),
		gridHeaders.columns.indexOf(columnName)
	);
	return aReturn;
}




 
document.addEventListener("DOMContentLoaded", init);


/**
 Demander les coordonnées de missile utilisateur

 function promptMissileCell() {
	let coord = window.prompt("Donnez des coordonnées : ");
	sendMissile(coord);
} 
 */

// Fonction qui permet de savoir si le jeu est terminé
// On va se baser sur la présence ou non de "b" dans notre grille

/* function checkGameOver() {
	let hasBoat = false;
	for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
		if (grid[rowIndex].indexOf("b") !== -1) {
			hasBoat = true;
		}
		break;
	}
	return !hasBoat;
}
 */