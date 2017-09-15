$($ => {

// ****************************
// 	VARIABLES
// ****************************

	let container = $(".js__wrapper");

	let inputEntry = $(".js__entry-numbers");
	let buttonEntry = $(".js__button-entry-numbers");
	let errorEntry = $(".js__error-number-input")
	let players = "";

	let detailsContainer = $(".js__player-details-container");
	let buttonPlayer = $(".js__button-players");
	let errorDetail = $(".js__error-text-input");
	
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
		
		// validation
		let valNum = /[0-9]/;
		let inputValue = inputEntry.val();
		
		if (valNum.test(inputValue) && inputValue !== "") {
			// passed the number-only / filled validation
	    console.log("passed number-only validation");

	    if (inputValue % 2 === 0 && inputValue <= 40) {
	    	// passed even number validation
	    	console.log("passed even number validation");
	    	errorEntry.text("");

				// log the number of players in variable
				players = inputValue;

				let i = 0;

				// output a corresponding number of inputs
				while (i < players) {
					let fieldContainer = $("<div />").addClass("inputs-container js__inputs-container").attr("data-id", i);

					let labelFore = $("<label />").attr("id", "player-forename").text("First Name");

					let forename = $("<input />").attr("id", "player-forename").attr("type", "text").attr("placeholder", "First Name").attr("maxlength", 30).addClass("input-text js__forename-input");

					let labelSur = $("<label />").attr("id", "player-surname").text("Last Name");

					let surname = $("<input />").attr("id", "player-surname").attr("type", "text").attr("placeholder", "Last Name").attr("maxlength", 30).addClass("input-text js__surname-input");

					detailsContainer.append(fieldContainer);
					fieldContainer.append(labelFore, forename, labelSur, surname);

					i++;
				}

	    } else {
	    	// failed even number validation
	    	console.log("failed even number validation");
	    	errorEntry.text("Your number needs to be 40 or less and even… no subs in this game!");
	    }

		} else {
			// failed the number-only / filled validation
			console.log("failed number-only / filled validation");
			errorEntry.text("You can’t play a tournament without any players! Please enter an even number.");
		};

	});

// ****************************
// 	PLAYER DETAILS SECTION
// ****************************

	buttonPlayer.on("click", () => {

		let inputs = detailsContainer.find(".js__inputs-container input");

		let empty = inputs.filter(function() {
      return this.value === "";
    });

    if(empty.length) {
    	console.log("input empty");

    	inputs.each(function() {
    		$(this).val() === "" ? $(this).addClass("empty-field") : $(this).removeClass("empty-field");
    	});

			errorDetail.text("First name and surname are both required fields, please enter all player details.");

    } else {
    	console.log("inputs all filled");

    	detailsContainer.find(".js__inputs-container .js__forename-input").each(function () {
				forenames.push($(this).val());
			});

			detailsContainer.find(".js__inputs-container .js__surname-input").each(function () {
				surnames.push($(this).val());
			});

			// storing the details as objects in an array
			for (let i = 0; i < players; i++){
				let player = {
					id: i,
					forename: forenames[i],
					surname: surnames[i],
					fullName: forenames[i] + " " + surnames[i],
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
    }

	});

}); // document ready fn

