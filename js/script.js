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

	let trackerSection = $(".js__tracker-section");


// ****************************
// 	FUNCTIONS
// ****************************

	// the Fisher-Yates (aka Knuth) Shuffle
	function shuffle(array) {
	  var currentIndex = array.length, temporaryValue, randomIndex;

	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {

	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }

	  return array;
	}


// ****************************
// 	NUMBER OF PLAYERS SECTION
// ****************************

	buttonEntry.on("click", () => {

		// log the number of players in variable
		players = inputEntry.val();

		let i = 0;

		// output a corresponding number of inputs
		while (i < players) {
			let fieldContainer = $("<div />").addClass("inputs-container js__inputs-container").attr("data-id", i);

			let labelFore = $("<label />").attr("id", "player-forename").text("First Name");

			let forename = $("<input />").attr("id", "player-forename").attr("type", "text").attr("placeholder", "First Name").addClass("input-text js__forename-input");

			let labelSur = $("<label />").attr("id", "player-surname").text("Last Name");

			let surname = $("<input />").attr("id", "player-surname").attr("type", "text").attr("placeholder", "Last Name").addClass("input-text js__surname-input");

			inputsContainer.append(fieldContainer);
			fieldContainer.append(labelFore, forename, labelSur, surname);

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
		for (let i = 0; i < players; i++){
			let player = {
				id: i,
				forename: forenames[i],
				surname: surnames[i],
				// concatenating the names for display purposes
				dispName: forenames[i].charAt(0).toUpperCase() + forenames[i].slice(1) + " " + surnames[i].charAt(0).toUpperCase(),
				playing: true,
			};

			playerDetails.push(player);

		};

		console.log(playerDetails);

// ****************************
// 	TRACKER SECTION  - - - - - - operating on previous section btn click for initial state
// ****************************

		// randomising the array
		let playersRand = shuffle(playerDetails);

		// output as pairs
		for (let i = 0; i < playersRand.length; i += 2) {
	    let playerList = $("<ul />").addClass("game-pairing js__round-1");
	    let playerItem1 = $("<li />").text(playersRand[i].dispName);
			let vs = $("<p />").text("vs");
			let playerItem2 = $("<li />").text(playersRand[i+1].dispName);
			
			trackerSection.append(playerList); 
			playerList.append(playerItem1, vs, playerItem2);
		};

	});

}); // document ready fn

