$($ => {

// ****************************
// 	NUMBER OF ENTRANTS PAGE
// ****************************

	// storing the number of players inputted on the first page
	let inputEntry = $(".js__entry-numbers");
	let buttonEntry = $(".js__button-entry-numbers");
	let players = "";

	buttonEntry.on("click", () => players = inputEntry.val());

// ****************************
// 	PLAYER INFORMATION PAGE
// ****************************

	// console-logging the number inputted from the first page
	let buttonPlayer = $(".js__button-players");

	buttonPlayer.on("click", () => console.log(players));


});

