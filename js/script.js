/*
	This code has been designed with efficiency and performance in mind. Special attention has been paid to the readability of the script and attempts have been made to make it easy (and quick) to understand.

	The intention is for adding extra functionality to be easy due to the flexibility of the functions presented.
*/

// An event ready function wraps the code
$($ => {

	/* Debugging mode --> set the value to TRUE for debugging console messages, or FALSE if not testing.
	This was designed to be a development aid in identifying from where problems originated. */
	const debugMode = true;
				debug = (message) => debugMode ? console.log(message) : null;


	// Setting up the global variables
	const container = $(".js__wrapper"),
				entrySection = $(".js__entry-section"),
				detailsSection = $(".js__details-section"),
				detailsContainer = $(".js__player-details-container"),
				trackerSection = $(".js__tracker-section");

	let errorEntry = $(".js__error-number-input"),
			errorDetail = $(".js__error-text-input");

	/* This variable includes the main state variables for the app. It is populated from the reset() function except for numberOfPlayers which is only reset on a page reload. It is designed to separate state variables from local variables, with readability as a consideration. */
	let state = {
			numberOfPlayers: '',
	};

	// Initialising function establishing the state and main events in the app
	let init = () => {
		reset();

		entrySection.on("click", "button", (e) => {
			e.preventDefault();
			entrySectionClick();
		});

		detailsSection.on("click", "button", (e) => {
			e.preventDefault();
			detailSectionClick();
		});
	};

	/* This function is used to reset variables affected by button clicks. It runs in the init() function to initialise the state, but is also called on a button click.
	It is included to allow functions to run with clean states and not accumulate redundant data. */
	let reset = () => {
		state.forenames = [];
		state.surnames = [];
		state.playerDetails = [];
		state.tempPlayerDetailsArray = [];
		state.valid = false;
		debug("values reset");
	};

// ********************************************************************
	
	// Initialising the app state
	init();

	/* These functions are used to add error classes to text blocks when error messages need to be shown.
	These functions are called throughout the script, so are sitting at a global level. */
	let addErrorTextClass = (errorBlockType) => errorBlockType.addClass("has-error");
	let removeErrorTextClass = (errorBlockType) => errorBlockType.removeClass("has-error");


	// Validation for the number of players inputted, called on a button click event
	let validateNumberInput = (numberEntered) => {
		
		/* These functions are only used at a local level.
		They check the value entered for even / odd, and toggle error classes for the number input and error text. */
		// triple equals has been used here to exact precision
		let isEven = (n) => n % 2 === 0;
		
		let addErrorClasses = (errorBlockType) => {
			let addErrorInputClass = () => entrySection.find($("input")).addClass("has-error");
			addErrorTextClass(errorBlockType);
		};

		let removeErrorClasses = (errorBlockType) => {
			let removeErrorInputClass = () => entrySection.find($("input")).removeClass("has-error");
			removeErrorTextClass(errorBlockType);
		};

		/* Validation checks to run on the number input.

		--> Conditional statements throughout have been coded defensively, guard statements are established before actions are outlined. This has been done for readability, so that the validation steps can be more easily identified. */
		if (numberEntered === "") {
			addErrorClasses(errorEntry);
			errorEntry.text("You can’t play a tournament without any players! Please enter an even number.");
			debug("number validation: input field is empty");

		} else {
			removeErrorClasses(errorEntry);
			debug("number validation: SUCCESS - field isn't empty");

			if (numberEntered < 4) {
				addErrorClasses(errorEntry);

				// Template literals have been used to increase readability in the script
				errorEntry.text(`You can't have a tournament with only ${numberEntered} players! Enter a number between 4 and 100.`);
				debug("number validation: input value is under 4");

			} else {
				removeErrorClasses(errorEntry);
				debug("number validation: SUCCESS - value is more than 4");

				if (numberEntered > 100) {
					addErrorClasses(errorEntry);
					errorEntry.text("Please enter a number under, or equal to, 100.");
					debug("number validation: input value is over 100");
				
				} else {
					removeErrorClasses(errorEntry);
					debug("number validation: SUCCESS - value is less than 100");

					if (!isEven(numberEntered)) {
					addErrorClasses(errorEntry);
					errorEntry.text("Your number needs to be even… no subs in this game!");
					debug("number validation: input value is an odd number");

					} else {
						removeErrorClasses(errorEntry);
						state.valid = true;
						debug("number validation: SUCCESS - value is even");

						return state.numberOfPlayers = numberEntered;
					}
				}
			}
		}
	};

	// Taking the validated number and using it to insert a corresponding number of inputs into the DOM.
	let generateTextInputs = (numberInputValue) => {

		// Looping over the number inputted to establish how many inputs are needed
		for (let i = 0; i < numberInputValue; i++) {
			let fieldContainer = $("<div />").addClass("form__block js__inputs-container").attr("id", i);

			let playerNumber = $("<h2 />").addClass("form__text form__text--details").text(i+1);

			let forename = $("<input />").attr("type", "text").attr("placeholder", "First Name").attr("maxlength", 12).addClass("form__input form__input--details js__forename-input");

			let surname = $("<input />").attr("type", "text").attr("placeholder", "Last Name").attr("maxlength", 12).addClass("form__input form__input--details js__surname-input");

			let completedTick = $("<img />").attr("src", "images/completed-tick.png").attr("alt", "completed tick").addClass("form--tick js__completed-tick");

			errorDetail.before(fieldContainer);
			fieldContainer.append(playerNumber, forename, surname, completedTick);
		}
	};

	/* These functions toggle section styling based on their active status. 
	They are sitting at a global level as they are used throughout the script. */
	let markSectionActive = (sectionName) => sectionName.addClass("section--active");
	let removeSectionActiveClass = (sectionName) => sectionName.removeClass("section--active");
	let markSectionCompleted = (sectionName) => sectionName.addClass("section--completed");


	// ********************************
	// LET'S GO BUTTON CLICK EVENT
	// ********************************

	//The event triggering the validation checks / input generation for the first page.
	let entrySectionClick = () => {
		let inputValue = container.find($(".js__entry-numbers")).val();
		validateNumberInput(inputValue);
		
		if (state.valid) {
			generateTextInputs(inputValue);
			markSectionCompleted(entrySection);
			markSectionActive(detailsSection);

			// This adds a styling class to the header to minimise it after the first page
			container.find($(".js__header")).addClass("header--minimise");

			debug(`valid status on entry button click: ${state.valid}`);
			state.valid = false;
			debug(`valid reset: ${state.valid}`);

		} else {
			debug("number validation failed");
		}
	};

	// ********************************
	// END CLICK EVENT
	// ********************************


	/* Finding the individual text inputs within each input container.
	This approach has been included to allow the inputs to be looped over in rows, rather than columns.	*/
	let findInputs = () => detailsContainer.find(".js__inputs-container input");
	

	// *** EMPTY TEXT INPUT VALIDATION FUNCTIONS ***


	// Toggling the error status of text inputs, based on whether they have a value entered or not.	
	let toggleErrorStatus = (textInput, errorBlockType) => {
		textInput.each((i, input) => {
			$(input).val() === "" ? $(input).addClass("has-error") : $(input).removeClass("has-error");
			debug("input styling toggled");
		});

		/* This function toggles the error status of the error text block. 
		Its status depends on the status of the text inputs, and runs at the same time, so it is sitting inside that function. */
		let toggleHelpBlockErrorStatus = (textInput, errorBlockType) => {
			let numberOfErrors = [];

			/* Looping over each of the text inputs to identify is the errors class is present. 
			Pushing error instances to an array avoids problems with the final input being the last to pass through the each() loop, thus setting the status for all inputs. */
			textInput.each((i, input) => $(input).hasClass("has-error") ? numberOfErrors.push(i) : null);

			numberOfErrors.length ? $(errorBlockType).addClass("has-error") : $(errorBlockType).removeClass("has-error");
			debug("input styling toggled");
		};

		toggleHelpBlockErrorStatus(textInput, errorBlockType);
	};

	let toggleCompletedTick = () => {
		let playerInputs = detailsContainer.find(".js__inputs-container");

		playerInputs.each((i, container) => {
			let forenameInput = $(container).find(".js__forename-input");
			let surnameInput = $(container).find(".js__surname-input");
			let completedTick = $(container).find(".js__completed-tick");

			if (forenameInput.hasClass("has-error") || surnameInput.hasClass("has-error")) {
				completedTick.addClass("form--tick--error");
			} else {
				completedTick.removeClass("form--tick--error").addClass("form--tick--completed");
			}
		});
	};

	// Finding the empty text inputs and pushing them to an array for use in the validateTextInput function.
	let findEmptyInputs = (textInputs) => {
		let emptyInputs = [];
		textInputs.each((i, textInput) => $(textInput).val() === "" ? emptyInputs.push(i) : null);
		return emptyInputs;
	};


	// Calling the validation functions for adding error classes to empty fields.
	let validateForEmptyInputs = () => {

		if (findEmptyInputs(findInputs()).length) {
			toggleErrorStatus(findInputs(), errorDetail);
			errorDetail.text("First name and surname are both required fields, please enter all player details.");
			debug(`text validation: at least one field is empty. Valid status: ${state.valid}`);

		} else {
			toggleErrorStatus(findInputs(), errorDetail);
			state.valid = true;
			debug(`inputs all filled. Valid status: ${state.valid}`);
		} 

		toggleCompletedTick();
	};


	// *** DUPLICATE VALIDATION FUNCTIONS ***

	// Function to visually highlight duplicate fields to help the user identify where they have errors.
	let highlightDuplicates = (duplicatesArray) => {
		
		// Mapping over the values found for duplicate entries. Index values used as per the findDuplicates() function below.
		duplicatesArray.map(val => {
			debug(`index = ${val}`);
			
			let containers = detailsContainer.find(".js__inputs-container");

			// Using each value to try and match the related id of the individual inputs containers.
			containers.each((i, container) => {
				debug(`current value = ${val}`);
				// parsing the container id into an integer for an exact comparison with the current value.
				let currentId = parseInt($(container).attr("id"));

				if (currentId === val) {
					$(container).find("input").addClass("has-error");
				}
			});
		}); 

		// Running this function again to update the completed status of the fields.
		toggleCompletedTick();
	};


	// Searching an array for duplicate entries using indexOf()
	let findDuplicates = (players) => {
		let fullNames = players.map(player => player.fullName);

		// Returning an array of objects showing which entries are duplicates.
		let fullNameIndex = fullNames.map((name, index) => {
			return {
				index: index,
				indexOf: fullNames.indexOf(name),
			}
		});

		let duplicates = fullNameIndex.filter(item => item.index !== item.indexOf);

		// Getting the index value of the duplicate entries into a separate array.
		let indexVals = duplicates.map(({ index }) => index);
		debug(`indexVals = ${indexVals}`);

		// Getting the index value of the first entered versions of duplicate entries and pushing to a new array.
		let indexOfVals = duplicates.map(({ indexOf }) => indexOf);
		debug(`indexOfVals = ${indexOfVals}`);

		highlightDuplicates(indexVals);
		highlightDuplicates(indexOfVals);

		debug(duplicates);
		return duplicates;
	};

	//Creating a temporary playerDetails array to use in validation checks.
	let populateTempPlayerDetailsArr = (forename, surname, numberOfEntries) => {
		storePlayerNames(forename, surname);
		pushPlayersToArray(numberOfEntries, state.tempPlayerDetailsArray);
		return state.tempPlayerDetailsArray;
	};

	// Main duplicate validation, calling the functions above.
	let validateForDuplicates = () => {
		populateTempPlayerDetailsArr(state.forenames, state.surnames, state.numberOfPlayers);
		let duplicates = findDuplicates(state.tempPlayerDetailsArray);

		// If there are items in the duplicates array, an error message is returned.
		if (duplicates.length) {

			addErrorTextClass(errorDetail);
			errorDetail.text("There are duplicate names in your player list. Please make each player uniquely identifiable.");
			state.valid = false;
			debug("duplicate values found");

		// If the duplicates array is empty, the app accepts the entries and ends the duplication validation process.
		} else {
			errorDetail.text("");
			state.valid = true;
			debug("no duplicate values found. Valid status: " + state.valid);
		}
	};


	// *** STORING PLAYER DETAILS FUNCTIONS ***


	// Capturing the first and last names inputted into the text inputs and storing them in separate arrays.
	let storePlayerNames = (forename, surname) => {
		let pushSeparateNamesToArray = (nameType, nameTextInput) => nameType.push(nameTextInput.val());

		findInputs().each((i, textInput) => {
			if ($(textInput).hasClass("js__forename-input")) {
				pushSeparateNamesToArray(forename, $(textInput));
				debug(`forename ${i} added to array`);

			}	else if ($(textInput).hasClass("js__surname-input")) {
				pushSeparateNamesToArray(surname, $(textInput));
				debug(`surname ${i} added to array`);

			} else {
				debug("no classes found on inputs");
			}
		});
	};

	// Pushing the player details to their final array, using the forename / surname arrays and concatenating to make a fullName property.
	let pushPlayersToArray = (numberOfCompetitors, players) => {
		let forenameFormatting = (forename) => forename.charAt(0).toUpperCase() + forename.slice(1);
		let surnameFormatting = (surname) => surname.charAt(0).toUpperCase() + surname.slice(1);

		// The fullName and (particulary) dispName properties have been included for UX purposes. 
		for (let i = 0; i < numberOfCompetitors; i++) {
			let player = {
				id: i,
				forename: state.forenames[i],
				surname: state.surnames[i],
				fullName: forenameFormatting(state.forenames[i]) + " " + surnameFormatting(state.surnames[i]),
			};

			players.push(player);
		}

		debug(players);
		return players;
	};

	// The Fisher-Yates (aka Knuth) Shuffle function, used to randomise the playerDetails array
	let shuffleArray = (players) => {
		let currentIndex = players.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = players[currentIndex];
		players[currentIndex] = players[randomIndex];
		players[randomIndex] = temporaryValue;
		}

		return players;
	};

	// Outputting the randomised array as pairs, and inserting them into the DOM as <li>s.
	let printRandomPairs = (players) => {
		let trackerHeading = $("<h1 />").addClass("section__heading section__heading--tracker").text("Tournament Tracker");
		trackerSection.append(trackerHeading);
		
		let playersRand = shuffleArray(players);
		let n = 1;

		for (let i = 0; i < playersRand.length; i += 2) {
			let pairContainer = $("<div />").addClass("block block--pairings");
			let gameNumber = $("<p />").addClass("block__text block__text--pairings game-number").text("Game " + n);
			let playerList = $("<ul />").addClass("list list--players");
			let player1 = $("<li />").addClass("list__item list__item--players").text(playersRand[i].fullName);
			let vs = $("<li />").addClass("list__item list__item--players list__item--versus").text("vs");
			let player2 = $("<li />").addClass("list__item list__item--players").text(playersRand[i+1].fullName);
			
			trackerSection.append(pairContainer); 
			pairContainer.append(gameNumber, playerList);
			playerList.append(player1, vs, player2);

			n++;
		}
	};


	// ********************************
	// LET'S PLAY BUTTON CLICK EVENT
	// ********************************

	//The event triggering the text input validation / random pairings for the second and final pages.
	let detailSectionClick = () => {
		// Resetting the state values on each button click so multiple entries aren't created.	
		reset();
		validateForEmptyInputs();

		if (!state.valid) {
			debug(`text input validation failed at first stage. Valid status: ${state.valid}`);
		
		} else {
			validateForDuplicates();

			if (!state.valid) {
				debug(`text duplicate validation failed at second stage. Valid status: ${state.valid}`);
			
			} else {
				storePlayerNames(state.forenames, state.surnames);
				pushPlayersToArray(state.numberOfPlayers, state.playerDetails);
				printRandomPairs(state.playerDetails);

				removeSectionActiveClass(detailsSection);
				markSectionCompleted(detailsSection);
				markSectionActive(trackerSection);

				debug(`valid status on player button click: ${state.valid}`);
				state.valid = false;
				debug(`valid reset: ${state.valid}`);
			}
		}
	};

	// ********************************
	// END CLICK EVENTS
	// ********************************

}); // document ready fn closing tag
