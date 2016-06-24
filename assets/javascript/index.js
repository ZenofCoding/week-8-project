$(document).on('ready', function() {
	// Link to Firebase
	var memes = new Firebase("https://fleddit.firebaseio.com/memes");
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
				$("#total-views").html(totalViews);
		  });
	  }
	});

	// Number of online users is the number of objects in the presence list.
	connectedData.on("value", function(snapshot) {
		var num = snapshot.numChildren();
		// Display the number of current online users in the html
		$("#current-page-viewers").html(num);
	});

	// Get saved memes
	var count = 0;
	memes.on('child_added', function(childSnapshot) {
		// Retrieve data from firebase
		var url = childSnapshot.child('url').val();
		var title = childSnapshot.child('title').val();
		var text = childSnapshot.child('text').val();
		var font = childSnapshot.child('font').val();
		var fontSize = childSnapshot.child('fontSize').val();
		var fontColor = childSnapshot.child('fontColor').val();
		var topText = childSnapshot.child('topText').val();
		var bottomText = childSnapshot.child('bottomText').val();
		var key = 'a' +childSnapshot.key(); // add a so its a legible id
		// Recreate image
		var top = $('<p>').addClass('top').text(title);
		var bottom = $('<p>').addClass('bottom').text(text);
		var img = $('<img>').attr('src', url);
		var $div = $('<div>').attr('id',key).addClass('image');
		var width, height;
		// Put div together
		$div.append(img);
		// Get image properties after load
		img.on('load', function() {
			// Get image width and height
			width = img.width();
			height = img.height();
			// Set div width and height to image and append words
			$div.width(width).height(height).append(top).append(bottom);
			// Add font properties to text
			$('#' + key + '>p').css({
				'font-family': font,
				'font-size': fontSize,
				'color': fontColor
			});
			$('#' + key + ' .top').css('top', topText);
			$('#' + key + ' .bottom').css('bottom', bottomText);
		});
		// Add div to panel body
		$panelBody = $('<div>').addClass('panel-body');
		$panelBody.append($div);
		// Add panel body to panel
		$panel = $('<div>').addClass('panel');
		$panel.append($panelBody);
		// Add panel to bootstrap col
		$col = $('<div>').addClass('col-md-offset-4 col-md-8');
		$col.append($panel);
		// Add col to recent memes
		$('#recent-memes').prepend($col);
		// Get length
		memes.once('value', function(snapshot) {
			// Incremement count
			count++;
			// Find number of memes
			var numOfMemes = snapshot.numChildren();
			if (count === numOfMemes) {
				$('.col-md-offset-4.col-md-8:first-child').attr('class','col-md-8');
				// Add header to recent memes
				var $h1 = $('<h1>').text('Recently Created Memes');
				var $col = $('<div>').addClass('col-md-8');
				$col.append($h1);
				$('#recent-memes').prepend($col);
			}
		});
	});

});