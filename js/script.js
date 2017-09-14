$($ => {

// ****************************
// 	VARIABLES
// ****************************

	let container = $(".js__wrapper");

	let inputEntry = $(".js__entry-numbers");
	let buttonEntry = $(".js__button-entry-numbers");
	let players = "";

	let inputsContainer = $(".js__player-details-container");
	let buttonPlayer = $(".js__button-players");

	let playerDetails = [];

// ****************************
// 	EVENTS
// ****************************

	buttonEntry.on("click", () => {
		// log the number of players in variable
		players = inputEntry.val();

		// output a corresponding number of inputs
		let i = 0;

		while (i < players) {
			let fieldContainer = $("<div />");
			fieldContainer.addClass("inputs-container js__inputs-container-" + i);

			let labelFor = $("<label />");
			labelFor.attr("id", "player-forename").text("First Name");

			let forename = $("<input />");
			forename.attr("id", "player-forename").attr("type", "text").attr("placeholder", "First Name").addClass("input-text js__forename-input");

			let labelSur = $("<label />");
			labelSur.attr("id", "player-surname").text("Last Name");

			let surname = $("<input />");
			surname.attr("id", "player-surname").attr("type", "text").attr("placeholder", "Last Name").addClass("input-text js__surname-input");

			inputsContainer.append(fieldContainer);
			fieldContainer.append(labelFor, forename, labelSur, surname);

			i ++;
		}
	});

});

