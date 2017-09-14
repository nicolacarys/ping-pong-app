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
	
	let forenames = [];
	let surnames = [];
	let playerDetails = [];

	let trackerPage = $(".js__tracker-page");


// ****************************
// 	NUMBER OF PLAYERS SECTION
// ****************************

	buttonEntry.on("click", () => {

		// log the number of players in variable
		players = inputEntry.val();

		let i = 0;

		// output a corresponding number of inputs
		while (i < players) {
			let fieldContainer = $("<div />");
			fieldContainer.addClass("inputs-container js__inputs-container").attr("data-id", i);

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

			i++;
		}
	});

// ****************************
// 	PLAYER DETAILS SECTION
// ****************************

	buttonPlayer.on("click", () => {

		inputsContainer.find(".js__inputs-container .js__forename-input").each(function () {
			forenames.push($(this).val());
		});

		inputsContainer.find(".js__inputs-container .js__surname-input").each(function () {
			surnames.push($(this).val());
		});

		// storing the details as objects in an array
		for (let i = 0; i < forenames.length; i++){
			let player = {
				id: i,
				forename: forenames[i],
				surname: surnames[i],
			};

			playerDetails.push(player);
			// console.log(playerDetails);

		};

// ****************************
// 	TRACKER SECTION  - - - - - - but currently operating on previous section click
// ****************************

		// concatenating the names for display purposes
		let fullName = playerDetails.map(({ forename, surname}) => forename + " " + surname.charAt(0));

		let playerList = $("<ul />");
		trackerPage.append(playerList);

		// outputting an individual <li> for each player name
		fullName.map(player => {
			let listItem = $("<li />").text(player);
			playerList.append(listItem);
		})

		// console.log(fullName);

	});

});

