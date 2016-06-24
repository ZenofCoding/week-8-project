$(document).on('ready', function() {
	// Start button click
	$('#search').one('click',function() {
		display.input();
		return false;
	});

	// Display pictures
	var display = {
		input: function() {
			// Get input
			var input = $('#search-input');
			var value = input.val();
			// Clear input
			input.val('');
			// Clear pictures
			$('#pictures').empty();
			// Start query
			display.queryString(value);
		},
		apiKey: '96ded4dd9f53989e6fb829fa7a5e6b9e',
		perPage: 10,
		page: 2,
		queryURL:'',
		queryString: function(value) {
			var value = encodeURIComponent(value).replace(/%20/g, '+');
			queryURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + display.apiKey + '&tags=' + value + '&per_page=' + display.perPage + '&page=' + display.page +'&format=json&nojsoncallback=1';
			display.ajaxCall();
		},
		ajaxCall: function() {
			$.ajax({
				url: queryURL,
				method: 'GET'
			}).done(display.ajaxDone);
		},
		ajaxDone: function(response) {
			console.log(response);
			var photos = response.photos.photo;
			var photoURLS = [];
			for (i in photos) {
				if (photos[i].ispublic === 1) {
					var farmID = photos[i].farm;
					var serverID = photos[i].server;
					var ID = photos[i].id;
					var secret = photos[i].secret;
					var size = 'n';
					var URL = 'https://farm' + farmID + '.staticflickr.com/' + serverID + '/' + ID + '_' + secret + '_' + size +'.jpg'
					display.showPhoto(URL);
				}
			}
		},
		showPhoto: function(URL) {
			$img = $('<img>').attr('src', URL);
			$('#pictures').append($img);
		}
	};

});