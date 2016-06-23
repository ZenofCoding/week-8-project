$(document).on('ready', function() {
	// Allows user to press enter for searching
	$('#step2 .form-control').keypress(function(e){
    if(e.keyCode==13)
    $('#search').click();
  });
	// Search button click
	$('#search').on('click',function() {
		display.input();
		return false;
	});

	// Pagination click
	$(document).on('click','li',function() {
		// Save this
		$this = $(this);
		display.getPage($this);
	});

	// Display pictures
	var display = {
		value: null,
		input: function() {
			// Get input
			var input = $('#search-input');
			var value = input.val();
			// Save value
			display.value = value;
			// Show loading in input
			input.val('Loading images...');
			// Clear pictures
			$('#pictures').empty();
			// Start query
			display.queryString(value);
		},
		getPage: function($this) {
			var noClick = $this.attr('class');
			if (noClick !== 'disabled' && noClick !== 'active') {
				var page = $this.attr('data-page');
				if (page === 'prev') {
					display.page -= 1;
				} else if (page === 'next') {
					display.page += 1;
				} else {
					display.page = Number(page);
				}
				// Show loading in input
				$('#search-input').val('Loading images...');
				// Clear pictures
				$('#pictures').empty();
				// Start query
				display.queryString(display.value);
			}
		},
		apiKey: '96ded4dd9f53989e6fb829fa7a5e6b9e',
		perPage: 20,
		page: 1,
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
			var photos = response.photos.photo;
			var photoURLS = [];
			// Make pagination
			display.pagination();
			// Hide loading div and add pagination
			$load = $('<div>').attr('id','pictures').hide().append($pagination);
			$('.panel-body').append($load);
			for (i in photos) {
				if (photos[i].ispublic === 1) {
					var farmID = photos[i].farm;
					var serverID = photos[i].server;
					var ID = photos[i].id;
					var secret = photos[i].secret;
					var size = 'q';
					var URL = 'https://farm' + farmID + '.staticflickr.com/' + serverID + '/' + ID + '_' + secret + '_' + size +'.jpg'
					$img = $('<img>').attr('src', URL);
					// Append each image to the dom to load
					$load.append($img);
					// Wait for last image to load then show
					if (i == display.perPage-1) {
						$img.on('load', function() {
							// Add pagination to end
							$pagination.clone().appendTo($load);
							// Clear input
							$('#search-input').val('');
							// Show photos
							$load.show();
							// Scroll to top of page
							window.scrollTo(0,0);
						});
					}
				}
			}
		},
		pagination: function() {
			var pages = ['\u00AB', '1', '2', '3', '4', '5', '\u00BB'];
			var $ui = $('<ui>').addClass('pagination');
			for (var i=0; i<pages.length; i++) {
				var $a = $('<a>').attr('href','#page-top').text(pages[i]);
				var $li = $('<li>');
				if (pages[i] === '\u00AB') {
					$li.attr('data-page', 'prev');
					if (display.page == 1) {
						$li.addClass('disabled');
					}
				} else if (pages[i] === '\u00BB') {
					$li.attr('data-page', 'next');
					if (display.page == 5) {
						$li.addClass('disabled');
					}
				} else {
					$li.attr('data-page', pages[i]);
					if (display.page == pages[i]) {
						$li.addClass('active');
					}
				}
				$li.append($a);
				$ui.append($li);
			}
			return $pagination = $('<div>').addClass('text-center').append($ui);
		}
	};

	// Listen for a picture clicked and save to local storage
	$(document).one('click','#pictures img', function() {
		// Get user selected picture url
		var url = $(this).attr('src');
		// Save user choice to local storage
		localStorage.setItem('url', url);
		// Redirect to next page
		window.location.href = 'create3.html';
	});

});