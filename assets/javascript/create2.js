$(document).on('ready', function() {
	// Allows user to press enter for searching
	$('#step2 .form-control').keypress(function(e){
    if (e.keyCode==13)
    	display.input();
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
			var value = input.val().trim();
			// Save value
			display.value = value;
			// Show loading in input
			input.val('');
			input.attr('placeholder','Loading images...');
			// Change border color back
			$('#step2 .form-control').css('border-color','');
			// Clear pictures
			$('#pictures').remove();
			// Start query
			display.queryString(value, true);
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
				// Pagination update
				display.paginationUpdate(display.page);
				// Show loading in input
				var input = $('#search-input');
				input.val('');
				input.attr('placeholder','Loading images...');
				// Start query
				display.queryString(display.value, false);
			}
		},
		apiKey: '96ded4dd9f53989e6fb829fa7a5e6b9e',
		perPage: 20,
		page: 1,
		queryURL:'',
		queryString: function(value, firstLoad) {
			var value = encodeURIComponent(value).replace(/%20/g, '+');
			queryURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + display.apiKey + '&tags=' + value + '&per_page=' + display.perPage + '&page=' + display.page +'&format=json&nojsoncallback=1';
			display.ajaxCall(firstLoad);
		},
		ajaxCall: function(firstLoad) {
			$.ajax({
				url: queryURL,
				method: 'GET'
			}).done(function(response) {
				var photos = response.photos.photo;
				// Check if search has no response
				if (photos.length === 0) {
					// Change border color to red
					$('#step2 .form-control').css('border-color','red');
					// No results
					$('#search-input').attr('placeholder','No results. Please search again.');
				}
				if (firstLoad) {
					display.firstLoad(photos);
				} else {
					display.load(photos);
				}
			});
		},
		firstLoad: function(photos) {
			// Make pagination
			display.paginationCreate();
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
					$img = $('<img>').attr('src', URL).attr('id', i);
					// Append each image to the dom to load
					$load.append($img);
					// Wait for last image to load then show
					if (i == display.perPage-1) {
						$img.on('load', function() {
							// Clear input
							$('#search-input').attr('placeholder','Search flickr');
							// Show photos
							$load.show();
							// Scroll to top of page
							window.scrollTo(0,0);
						});
					}
				}
			}
			// Add pagination to end
			$pagination.clone().appendTo($load);
		},
		load: function(photos) {
			for (i in photos) {
				if (photos[i].ispublic === 1) {
					var farmID = photos[i].farm;
					var serverID = photos[i].server;
					var ID = photos[i].id;
					var secret = photos[i].secret;
					var size = 'q';
					var URL = 'https://farm' + farmID + '.staticflickr.com/' + serverID + '/' + ID + '_' + secret + '_' + size +'.jpg'
					// Find each img url and replace with new URL
					$('#' + i).attr('src', URL);
					// Scroll to top of page
					window.scrollTo(0,0);
				}
			}
		},
		paginationCreate: function() {
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
		},
		paginationUpdate: function(page) {
			// Remove disabled and active from all pages
			$('.pagination>*').removeClass('disabled').removeClass('active');
			// Add active class to current page
			var num = page+1; // Account for back page
			$('.pagination>li:nth-child(' + num + ')').addClass('active');
			// Disable prev if page 1
			if (page === 1) {
				$('.pagination>li:nth-child(1)').addClass('disabled');
			}
			// Disable next if page 5
			if (page === 5) {
				$('.pagination>li:nth-child(7)').addClass('disabled');
			}
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