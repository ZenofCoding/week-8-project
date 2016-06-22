

				//Link to Firebase
				var viewerData = new Firebase("https://fleddit.firebaseio.com/");


				// Link to Firebase Database for viewer tracking
				var connectedData 	= new Firebase("https://fleddit.firebaseio.com/viewers");
				var userData 		= connectedData.push();

				// counter for views
				var viewCounter = 0;

				// --------------------------------------------------------------

				// Add ourselves to presence list when online.
				var presenceRef = new Firebase("https://fleddit.firebaseio.com/.info/connected");
				
					presenceRef.on("value", function(snapshot) {
					  if (snapshot.val()) {

					    // Remove ourselves when we disconnect.
					    userData.onDisconnect().remove();
					    userData.set(true);
					  }
					});

				// Number of online users is the number of objects in the presence list.
				connectedData.on("value", function(snapshot) {

					// Display the viewer count in the html
					$("#online-users").html(snapshot.numChildren());
				  	console.log("# of online users = " + snapshot.numChildren());

				});