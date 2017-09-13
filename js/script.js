$($ => {

// ****************************
// 	NUMBER OF ENTRANTS PAGE
// ****************************

	// storing the number of players inputted on the first page
	let inputEntry = $(".js__entry-numbers");
	let buttonEntry = $(".js__button-entry-numbers");

	// allowing data to be stored across HTML windows
	let myStorage = window.localStorage;

	buttonEntry.on("click", e => {
		// e.preventDefault();

		players = inputEntry.val();
		myStorage.setItem("players", inputEntry.val());
		
	});
// ****************************
// 	PLAYER INFORMATION PAGE
// ****************************

	// console-logging the number inputted from the first page
	let buttonPlayer = $(".js__button-players");
	let container = $(".container");

	buttonPlayer.on("click", () => console.log(myStorage.getItem("players")));

});

