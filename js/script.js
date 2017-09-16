$($ => {
	// 275 lines at beginning of refactor

	// debugging mode activate / deactivated
	const debugMode = true;
	let debug = (message) => debugMode ? console.log(message) : null;
	// ## DEBUG ## // 

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

	let reset = () => {
		forenames = [];
		surnames = [];
		playerDetails = [];
		valid = false;

		debug("values reset");
	};

// ****************************

	const container = $(".js__wrapper");
	const entrySection = $(".js__entry-section");
	const detailsSection = $(".js__details-section");
	const detailsContainer = $(".js__player-details-container");

	let errorEntry = $(".js__error-number-input")
	let errorDetail = $(".js__error-text-input");

// ******************************************************************************************************

	init();

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
				
				valid = true;

				debug("number validation: SUCCESS - value is even");

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
		let inputVal = container.find($(".js__entry-numbers")).val();
		
		numberInputValidChecks(inputVal);

		valid ? generateInputs(inputVal) : debug("number validation failed");

		debug("valid status on entry button click: " + valid);

		valid = false;

		debug("valid reset: " + valid);

	});

// **************************************************************************************

	let findInputs = () => detailsContainer.find(".js__inputs-container input");
		
	let toggleInputStyling = (textInput) => {
		textInput.each((i, input) => {
			$(input).val() === "" ? $(input).addClass("empty-field") : $(input).removeClass("empty-field");
		
			debug("input styling toggled");
		});
	};

	let textInputValidChecks = () => {

		let emptyInputs = [];

		let findEmptyInputs = () => {
			findInputs().each((i, input) => {
				$(input).val() === "" ? emptyInputs.push(i) : null;

			});
		};

		findEmptyInputs();

		if (emptyInputs.length) {
			
			toggleInputStyling(findInputs());
			errorDetail.text("First name and surname are both required fields, please enter all player details.");

			debug("text validation: at least one field is empty");
			debug("valid status when fields are empty: " + valid);

		} else if (!emptyInputs.length) {
				
    	toggleInputStyling(findInputs());

    	valid = true;

    	debug("inputs all filled");
			debug("valid status when fields are completed: " + valid);

		} else {
				debug("text validation: conditional has broken at finding empty fields stage");

		};
	};

	let populateTempPlayerArr = () => {
		let tempPlayerArray = [];

		storePlayerNames();
		pushPlayersToArray(players, tempPlayerArray);

		return tempPlayerArray;
	};

	let duplicates = [];

	let findDuplicates = () => {
		let fullNames = tempPlayerArray.map(player => player.fullName);

		let fullNameIndex = fullNames.map((name, index) => {
			return {
				index: index,
				indexOf: fullNames.indexOf(name),
			}
		});

		duplicates = fullNameIndex.filter(item => item.index !== item.indexOf);
		
		debug("duplicates");
		debug(duplicates);
	};

	let duplicateValidation = () => {

		populateTempPlayerArr();
		findDuplicates();

		// if there are no empty input fields
		if (valid) {
			if (duplicates.length) {

				// can I map over the duplicates array, and then map over the details array and find the entry/ies with matching index values, push those into a new array, then each over the inputs and if the forename and surname match, highlight the box??

				valid = false;

				errorDetail.text("There are duplicate names in your player list. Please make each player uniquely identifiable.");

				debug("duplicate values found");

			} else if (!duplicates.length) {

				errorDetail.text("");
				valid = true;

				debug("no duplicate values found");
				debug("valid status at duplicate validation: " + valid);

			} else {

				debug("duplicates conditional broken");
			};
		} else {
		
			debug("text input validation not passed, duplicate validation not run");
		};
	};

	let printRandomPairs = () => {

		let playersRand = shuffle(playerDetails);

		// output as pairs
		for (let i = 0; i < playersRand.length; i += 2) {
	    let playerList = $("<ul />").addClass("game-pairing js__round-1");
	    let playerItem1 = $("<li />").text(playersRand[i].dispName);
			let vs = $("<p />").text("vs");
			let playerItem2 = $("<li />").text(playersRand[i+1].dispName);
			
			container.find($(".js__tracker-section")).append(playerList); 
			playerList.append(playerItem1, vs, playerItem2);
		};
	};

	let storePlayerNames = () => {

		let pushValToArray = (array, input) => array.push(input.val());

		findInputs().each((i, input) => {

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

	let pushPlayersToArray = (numOfPlayers, array) => {
		
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

			array.push(player);
		};

		debug(array);

		return array;
	};

	// the Fisher-Yates (aka Knuth) Shuffle
	let shuffle = (array) => {
	  let currentIndex = array.length, temporaryValue, randomIndex;

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

	detailsSection.on("click", "button", () => {
		reset();
		textInputValidChecks();

		if (valid) {
			duplicateValidation();

			if (valid) {
				storePlayerNames();
				pushPlayersToArray(players, playerDetails);
				printRandomPairs();

				debug("valid status on player button click: " + valid);
				valid = false;
				debug("valid reset: " + valid);

			} else {
				debug("text duplicate validation failed");
				debug("valid status at failed duplicate validation: " + valid);
			}

		} else {
			debug("text input validation failed");
			debug("valid status at failed input validation: " + valid);
		}

	});

}); // document ready fn

