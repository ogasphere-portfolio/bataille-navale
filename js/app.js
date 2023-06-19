// Finalement je vais déclarer une variable "grid" qui va contenir TOUTES mes lignes
const app = {

	init: function () {
		console.log("Coucou je suis chargé & executé");

		// declaration des constantes pour le branchement des évenements
		const itemForm = document.querySelector("#game .form");
		const btnStats = document.querySelector("#stats");
		const btnScores = document.querySelector('#scores');
		const btnHisto = document.querySelector("#toggle-actions");
		const beforeGameForm = document.querySelector("#beforegame .form");
		const themesBtnElement = document.querySelector('#theme');
		// On branche les mouchards

		// branchement sur l'envoi du premier formulaire : nom et nombre de colonnes 
		beforeGameForm.addEventListener("submit", app.handleBeforeGame); 

		// Branchement sur l'envoi du second formulaire 
		itemForm.addEventListener("submit", app.handleSubmit);

		// branchement sur le click du bouton statistiques
		btnStats.addEventListener('click', stats.handleClickStats);

		btnScores.addEventListener('click', score.handleClickScores);


		// branchement sur le click du bouton historique
		btnHisto.addEventListener("click", app.handleAfficheHisto);

		// Branchement sur le select pour changer le theme
    	themesBtnElement.addEventListener("change", themes.handleSelectTheme);

		// Je cible toutes les cellules (div qui ont la classe cell)
		const allCells = document.querySelectorAll('div.cell');
		// Je boucle sur chaque cellule
		// for (let index = 0; index < allCells.length; index++) {
		for (const cellElement of allCells) {
	
		  cellElement.addEventListener('click', app.handleClickOnCell);
		}
		// recuperation du cookie pour l'affichage du theme
		const monBody = document.querySelector('body')
        monBody.className=''
        monBody.classList.add(themes.getCookie('theme'));
		
	},

	// fonction permettant de gérer le premier formulaire
	handleBeforeGame: function(event) {

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
		app.eraseInput() ;
	},


	// fonction permettant de gérer le second formulaire
	handleSubmit: function(event) {

		// on bloque le submit du formulaire pour empecher le rechargement de la page
		event.preventDefault();

		// On récupere la valeur saisie par l'utilisateur
		const value = app.getInputValue();
		
		// Vérification de la validité de la saisie 
		const isValid = grid.checkCellName(value);
		
		if (isValid === true) {	
			
			// Si la saisie est valide, on envoie le missile
			// et on met à jour l'historique
			app.majHistorique(value,game.sendMissile(value));
			
			// On incremente le nombre de tours
			app.increment();
		} else { 
			// Sinon oon affiche un message 
			console.log("La case ciblée n'est pas valide");
		}
		// On efface le champ de saisie et on lui redonne le focus 
		// pour une nouvelle sasie
		app.eraseInput();
	},

	
	getInputValue: function() {
		const inputValue = document.querySelector("#cellToHit").value;
		return inputValue;
	},
	checkInput: function (inputValue) {
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
	},
	handleAfficheHisto: function () {

		// Affichage et masquage de l'historique
		const listeAction = document.querySelector("#actions");
		if (listeAction.style.display == "block") {
			listeAction.style.display = "none";
		} else {
			listeAction.style.display = "block";
		}
	},
	// Mise à jour de l'historique 
	// bValue : tir reussi=true, tir raté=false
	// InputValue: case saisie par l'utilisateur
	majHistorique: function(inputValue,bValue) {
		
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
	},
	displayHits: function() {
		const hitCell = document.querySelectorAll(".hit");
		let hits = [];

		for (const currentElement of hitCell) {
			hits.push(currentElement.dataset.cellName);
		}
		console.log("Cases touchées: " + hits.join(", "));
	},
	eraseInput: function() {
		// On sélectionne notre champ
		const input = document.querySelector("#cellToHit");

		// On définit la nouvelle de l'input comme étant une chaîne vide
		input.value = "";

		// On donne le focus au champ après l'avoir vidé
		input.focus();
	},
	// On incrémente le nombre de tours
	increment: function() {
		const nbTour = document.querySelector("h3 #tourNb");
		nbTour.textContent++;
	},
}

document.addEventListener("DOMContentLoaded", app.init);


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