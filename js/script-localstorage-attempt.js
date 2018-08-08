$($ => {


	let container = $(".container");
	let inputEntry = $(".js__entry-numbers");
	let buttonEntry = $(".js__button-entry-numbers");

	// allowing data to be stored across HTML windows
	let myStorage = window.localStorage;
	
	let buttonPlayer = $(".js__button-players");

	var array = [];
	array.push(JSON.parse(localStorage.getItem('session')));
	localStorage.setItem('session', JSON.stringify(array));

	function SaveDataToLocalStorage(data) {
	    var array = [];
	    // Parse the serialized data back into an aray of objects
	    array = JSON.parse(localStorage.getItem('session'));
	    // Push the new data (whether it be an object or anything else) onto the array
	    array.push(data);
	    // Alert the array value
	    alert(array);  // Should be something like [Object array]
	    // Re-serialize the array back into a string and store it in localStorage
	    localStorage.setItem('session', JSON.stringify(array));
	}

// ****************************
// 	NUMBER OF ENTRANTS PAGE
// ****************************

	// storing the number of players inputted on the first page
	buttonEntry.on("click", e => {
		// e.preventDefault();

		myStorage.setItem("players", inputEntry.val());

		let players = myStorage.getItem("players");
		let i = 0;

		while (i < players) {
			let forename = $("<input />");
			forename.attr("type", "text").attr("placeholder", "First Name").addClass("input-text js__forename-input");

			let surname = $("<input />");
			surname.attr("type", "text").attr("placeholder", "Last Name").addClass("input-text js__surname-input");

			buttonPlayer.prepend(forename, surname);

			let object = { id: i, playerForename: "someone", playerSurname: "somewhere" };
			// myStorage.setItem("object", JSON.stringify(object));

			SaveDataToLocalStorage(JSON.stringify(object));

			i ++;
		}

	});


// ****************************
// 	PLAYER INFORMATION PAGE
// ****************************

	// generating inputs corresponding to the number of players
	buttonPlayer.on("click", () => {
		console.log(myStorage.getItem("players"));

		// let playerObject = myStorage.getItem("object");
		console.log(array);

		// let newInput = $("<input />");
		// buttonPlayer.prepend(newInput); 


	});

});

