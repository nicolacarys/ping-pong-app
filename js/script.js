$($ => {
	// 275 lines at beginning of refactor

	// debugging mode activate / deactivated
	const debugMode = true;
	let debug = (message) => debugMode ? console.log(message) : null;

	// initialising the state
	let players,
			forenames,
			surnames,
			playerDetails,
			valid;

	let init = () => {
		players = "";
		forenames = [];
		surnames = [];
		playerDetails = [];
		valid = false;

		// onclick events initialised here

		debug("state initialised");
	};

// ****************************

	init();

// ****************************
// 	VARIABLES
// ****************************

	const container = $(".js__wrapper");
	const entrySection = $(".js__entry-section");
	const detailsContainer = $(".js__player-details-container");

	let buttonEntry = $(".js__button-entry-numbers");
	let errorEntry = $(".js__error-number-input")

	let buttonPlayer = $(".js__button-players");
	let errorDetail = $(".js__error-text-input");

	let trackerSection = $(".js__tracker-section");

	// try to reduce the amount of global variables as there could be conflicts with browsers loading in other things and mistaking the $ signs for something else.

	// consistency throughout - check how functions are declared, fat arrow or not? Keep it consistent throughout.

// ****************************
// 	FUNCTIONS
// ****************************
	
	let storePlayerNames = () => {

		let findInputsContainer = () => detailsContainer.find(".js__inputs-container");
		let pushValToArray = (array, input) => array.push(input.val());

		findInputsContainer().find("input").each((i, input) => {

			if ($(input).hasClass("js__forename-input")) {
				pushValToArray(forenames, $(input));

				debug("forename " + i + " added to array");

			}	else if ($(input).hasClass("js__surname-input")) {
				pushValToArray(surnames, $(input));

				debug("surname " + i + " added to array");

			} else {
				debug("no classes found on inputs");
			}
		});
	};

	let pushPlayersToArray = (numOfPlayers) => {
		
		let forenameFormatting = (forename) => forename.charAt(0).toUpperCase() + forename.slice(1);
		let surnameFormatting = (surname) => surname.charAt(0).toUpperCase();

		for (let i = 0; i < numOfPlayers; i++) {
			let player = {
				id: i,
				forename: forenames[i],
				surname: surnames[i],
				fullName: forenames[i] + " " + surnames[i],
				dispName: forenameFormatting(forenames[i]) + " " + surnameFormatting(surnames[i]),
			};

			playerDetails.push(player);
		};

		debug("pushPlayersToArray = " + playerDetails);

		return playerDetails;
	};

// ****************************
// 	NUMBER OF PLAYERS SECTION
// ****************************

	// is there a maximum number of players?
	let numberInputValidChecks = (value) => {

		let isEven = (n) => n % 2 === 0;

		// starting the conditional with guard statements
		if (value === "") {
			errorEntry.text("You can’t play a tournament without any players! Please enter an even number.");

			debug("number validation: input field is empty");

		} else if (value !== "") {

			debug("number validation: SUCCESS - field isn't empty");

			if (!isEven(value)) {
				errorEntry.text("Your number needs to be even… no subs in this game!");

				debug("number validation: input value is an odd number");

			} else if (isEven(value)) {

				debug("number validation: SUCCESS - value is even");

				return valid = true;

			} else {
				debug("number validation: conditional has broken at even/odd stage");
			}

		} else {
			debug("number validation: conditional has broken at value/no value stage");

		};
	};

	let generateInputs = (value) => {
		// log the number of players in players variable
		players = value;

		// can this be simplified into functions to add inputs and labels?
		for (let i = 0; i < players; i++) {
			let fieldContainer = $("<div />").addClass("inputs-container js__inputs-container").attr("data-id", i);

			let labelFore = $("<label />").attr("id", "player-forename").text("First Name");

			let forename = $("<input />").attr("id", "player-forename").attr("type", "text").attr("placeholder", "First Name").attr("maxlength", 30).addClass("input-text js__forename-input");

			let labelSur = $("<label />").attr("id", "player-surname").text("Last Name");

			let surname = $("<input />").attr("id", "player-surname").attr("type", "text").attr("placeholder", "Last Name").attr("maxlength", 30).addClass("input-text js__surname-input");

			detailsContainer.append(fieldContainer);
			fieldContainer.append(labelFore, forename, labelSur, surname);

		}
	};

	// is event delegation more efficient here rather than specifying the button itself?
	entrySection.on("click", "button", () => {
		let value = container.find($(".js__entry-numbers")).val();
		
		numberInputValidChecks(value);
		valid ? generateInputs(value) : debug("number validation failed");

	});

// ****************************
// 	PLAYER DETAILS SECTION
// ****************************

	buttonPlayer.on("click", () => {

		let inputs = detailsContainer.find(".js__inputs-container input");

		// finding the values entered into each input
		let empty = inputs.filter(function() {
      return this.value === "";
    });

		// checking to see if the inputs have been filled
    if(empty.length) {
    	// if at least one input is empty
    	debug("input empty");

    	inputs.each(function() {
    		$(this).val() === "" ? $(this).addClass("empty-field") : $(this).removeClass("empty-field");
    	});

			errorDetail.text("First name and surname are both required fields, please enter all player details.");

    } else {
    	// no inputs are empty
    	debug("inputs all filled");

    	inputs.removeClass("empty-field");
			
			// init();
			storePlayerNames();
			pushPlayersToArray(players);

			debug(playerDetails);

	// ****************************
	// 	TRACKER SECTION  - - - - - - operating on previous section btn click for initial state
	// ****************************

			// playerDetails.map(({ fullName }, i) => debug(i + " " + fullName));

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
	};

			let fullNames = playerDetails.map(player => player.fullName);
			let duplicate = fullNames.some((name, i) => fullNames.indexOf(name) !== i);

// 			var fullNames = playerDetails.map(function(player) {
// 				return player.fullName;
// 			});
// [
// person a,
// person b,
// person a,
// person x
// ]
// 			var fullNameIndex = fullNames.map(function(name, index) {
// 				return {
// 					index: index,
// 					indexOf: fullNames.indexOf(name)
// 				};
// 			});
// [
// {index: 0, indexOf: 0},
// {index: 1, indexOf: 1},
// {index: 2, indexOf: 0}, *
// {index: 3, indexOf: 3},
// ]
// 			var duplicates = fullNameIndex.filter(function(item) {
// 				return item.index !== item.indexOf;
// 			});
// [
// {index: 2, indexOf: 0},
// ]

			// get array of full names of players (map)
			// get indexOf from full names of players (map)

			if (duplicate === true) {
				// duplicate full names found
				debug("duplicates found");

				errorDetail.text("There are duplicate names in your player list. Please make each player uniquely identifiable.");

				addPlayers();

			} else {
				// no duplicates have been found
				errorDetail.text("");

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
			};
		};
	});
}); // document ready fn

