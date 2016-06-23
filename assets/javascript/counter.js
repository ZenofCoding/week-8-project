// Link to Firebase
var viewerData = new Firebase("https://fleddit.firebaseio.com/");

// Link to Firebase Database for viewer tracking
var connectedData = new Firebase("https://fleddit.firebaseio.com/viewers");
var userData = connectedData.push();

// Link for counter for total views
var totalViewers = new Firebase("https://fleddit.firebaseio.com/totalViewers");

// Add ourselves to presence list when online.
var presenceRef = new Firebase("https://fleddit.firebaseio.com/.info/connected");

// Add user when they connect and remove user when they disconnect
presenceRef.on("value", function(snapshot) {
  if (snapshot.val()) {
    // Remove ourselves when we disconnect.
    userData.onDisconnect().remove();
    userData.set(true);
    // Increment total viewers by one
	  viewerData.once("value", function(snapshot) {
	  	// Set total views as variable
	  	var totalViews = snapshot.child("totalViewers").val();
	  	// Increment by one
	  	totalViews++;
	  	// Update total views on firebase
	  	totalViewers.set(totalViews);
	  	// Display the total viewers in html
			$("#total-viewers").html(totalViews);
	  });
  }
});

// Number of online users is the number of objects in the presence list.
connectedData.on("value", function(snapshot) {
	var num = snapshot.numChildren();
	// Display the number of current online users in the html
	$("#online-users").html(num);
});

/*
// Number of total viewers
totalViewers.on("value", function(snapshot) {
	
});

*/