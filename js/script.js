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
			duplicates,
			testPlayerArray,
			valid;

	let init = () => {
		players = "";
		forenames = [];
		surnames = [];
		playerDetails = [];
		duplicates = [];
		testPlayerArray = [];
		valid = false;

		// onclick events initialised here

		debug("state initialised");
	};

	let reset = () => {
		forenames = [];
		surnames = [];
		playerDetails = [];
		duplicates = [];
		testPlayerArray = [];
		valid = false;
		debug("values reset");
	};

	const container = $(".js__wrapper");
	const entrySection = $(".js__entry-section");
	const detailsSection = $(".js__details-section");
	const detailsContainer = $(".js__player-details-container");

	let errorEntry = $(".js__error-number-input")
	let errorDetail = $(".js__error-text-input");

// ********************************************************************

	init();

	let hasErrorTextClass = (errorBlockType) => errorBlockType.addClass("has-error");
	let removeErrorTextClass = (errorBlockType) => errorBlockType.removeClass("has-error");

	// is there a maximum number of players?
	let validateNumberInput = (value) => {
		let isEven = (n) => n % 2 === 0;
		let addErrorInputClass = () => entrySection.find($("input")).addClass("has-error");

		// starting the conditional with guard statements
		if (value === "") {
			hasErrorInputClass();
			hasErrorTextClass(errorEntry);
			errorEntry.text("You can’t play a tournament without any players! Please enter an even number.");
			debug("number validation: input field is empty");

		} else if (value !== "") {
			removeErrorTextClass(errorEntry);
			debug("number validation: SUCCESS - field isn't empty");

			if (!isEven(value)) {
				hasErrorInputClass();
				hasErrorTextClass(errorEntry);
				errorEntry.text("Your number needs to be even… no subs in this game!");
				debug("number validation: input value is an odd number");

			} else if (isEven(value)) {
				removeErrorTextClass(errorEntry);
				valid = true;
				debug("number validation: SUCCESS - value is even");

			} else {
				debug("number validation: conditional has broken at even/odd stage");
			}

		} else {
			debug("number validation: conditional has broken at value/no value stage");
		};
	};

	let generateTextInputs = (value) => {
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

	// ********************************
	// BUTTON CLICK EVENT
	// ********************************

	// is event delegation more efficient here rather than specifying the button itself?
	entrySection.on("click", "button", () => {
		let inputVal = container.find($(".js__entry-numbers")).val();
		validateNumberInput(inputVal);
		
		if (valid) {
			generateTextInputs(inputVal);
			entrySection.addClass("section-completed");
			detailsSection.addClass("section-active");

			debug("valid status on entry button click: " + valid);
			valid = false;
			debug("valid reset: " + valid);

		} else {
			debug("number validation failed");
		}

	});

	// ********************************
	// END CLICK EVENT
	// ********************************

	let findInputs = () => detailsContainer.find(".js__inputs-container input");
		
	let toggleInputStyling = (textInput) => {
		textInput.each((i, input) => {
			$(input).val() === "" ? $(input).addClass("has-error") : $(input).removeClass("has-error");
			debug("input styling toggled");
		});
	};

	let toggleErrorTextStyling = (textInput, errorBlockType) => {
		textInput.each((i, input) => {
			$(input).hasClass("has-error") ? $(errorBlockType).addClass("has-error") : $(errorBlockType).removeClass("has-error");
			debug("input styling toggled");
		});
	};

	let textInputValidChecks = () => {
		let emptyInputs = [];

		let findEmptyInputs = () => {
			findInputs().each((i, input) => {
				$(input).val() === "" ? emptyInputs.push(i) : null;
			});

			return emptyInputs;
		};

		findEmptyInputs();

		if (emptyInputs.length) {
			toggleInputStyling(findInputs());
			toggleErrorTextStyling(findInputs(), errorDetail);
			errorDetail.text("First name and surname are both required fields, please enter all player details.");
			debug("text validation: at least one field is empty. Valid status: " + valid);

		} else if (!emptyInputs.length) {
    	toggleInputStyling(findInputs());
			toggleErrorTextStyling(findInputs(), errorDetail);
    	valid = true;
    	debug("inputs all filled. Valid status: " + valid);

		} else {
				debug("text validation: conditional has broken at finding empty fields stage");
		};
	};

	let populateTestPlayerArr = () => {
		storePlayerNames();
		pushPlayersToArray(players, testPlayerArray);
		return testPlayerArray;
	};

	let findDuplicates = () => {
		let fullNames = testPlayerArray.map(player => player.fullName);

		let fullNameIndex = fullNames.map((name, index) => {
			return {
				index: index,
				indexOf: fullNames.indexOf(name),
			}
		});

		duplicates = fullNameIndex.filter(item => item.index !== item.indexOf);
		debug(duplicates);
		return duplicates;
	};

	let duplicateValidation = () => {
		populateTestPlayerArr();
		findDuplicates();

		// if there are no empty input fields
		if (valid) {
			if (duplicates.length) {
				hasErrorTextClass(errorDetail);
				errorDetail.text("There are duplicate names in your player list. Please make each player uniquely identifiable.");
				valid = false;
				debug("duplicate values found");

				// an additional step here would be to highlight the duplicates in the input fields along with the help text to help the user identify what they need to correct

			} else if (!duplicates.length) {
				errorDetail.text("");
				valid = true;
				debug("no duplicate values found. Valid status: " + valid);

			} else {
				debug("duplicates conditional broken");
			};

		} else {
			debug("text input validation not passed, duplicate validation not run");
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

	let printRandomPairs = () => {
		let playersRand = shuffle(playerDetails);

		for (let i = 0; i < playersRand.length; i += 2) {
	    let playerList = $("<ul />").addClass("game-pairing js__round-1");
	    let playerItem1 = $("<li />").text(playersRand[i].dispName);
			let vs = $("<p />").text("vs");
			let playerItem2 = $("<li />").text(playersRand[i+1].dispName);
			
			container.find($(".js__tracker-section")).append(playerList); 
			playerList.append(playerItem1, vs, playerItem2);
		};
	};

	// ********************************
	// BUTTON CLICK EVENT
	// ********************************

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
				debug("text duplicate validation failed. Valid status: " + valid);
			}

		} else {
			debug("text input validation failed. Valid status: " + valid);
		}
	});

	// ********************************
	// END CLICK EVENT
	// ********************************

}); // document ready fn

