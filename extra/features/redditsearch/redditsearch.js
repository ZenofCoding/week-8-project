$(document).on('ready', function() {
	// When joke category is clicked
	$(document).on('click', 'a', function() {
		// Save this
		$this = this;
		// Get input
		display.input($this);
	});

	// Display content
	var display = {
		value: null,
		selection: null,
		before: null,
		after: null,
		firstPage: null,
		input: function($this) {
			// Get input and selection
			display.value = $($this).attr('data-search');
			display.selection = $($this).attr('class');
			// Clear before and after values if new joke selection
			if (display.selection === 'joke') {
				display.before = null;
				display.after = null;
			}
			// Start query
			display.queryString(display.value, display.selection);
		},
		queryString: function(value, selection) {
			var value = encodeURIComponent(value).replace(/%20/g, '+');
			var queryURL = 'https://www.reddit.com/r/' + value + '/.json?';
			// Add before if it exists
			if (display.before !== null && display.selection === 'before') {
				queryURL = queryURL + 'before=' + display.before;
			}
			// Add after if it exists
			if (display.after !== null && display.selection === 'after') {
				queryURL = queryURL + 'after=' + display.after;
			}
			display.ajaxCall(queryURL);
		},
		ajaxCall: function(queryURL) {
			$.ajax({
				url: queryURL,
				method: 'GET'
			}).done(display.ajaxDone);
		},
		ajaxDone: function(response) {
			// Collect data
			var data = response.data.children;
			var $div = $('<div>');
			for (i in data) {
				var title = data[i].data.title;
				var text = data[i].data.selftext;
				var $title = $('<p>').attr('data-num', i).text('Title: ' + title);
				var $text = $('<p>').attr('data-num', i).text('Text: ' + text);
				$div.append($title).append($text);
				// Update before and after
				if (i == 0) {
					display.before = data[i].data.name;
				}
				if (i == 24) {
					display.after = data[i].data.name;
				}
			}
			// Save first before if one of the jokes categories were selected
			if (display.selection === 'joke') {
				display.firstPage = display.before;
			// Only show before if its not the first page
			} else if (display.firstPage !== display.before) {
				var $prev = $('<a>').attr('data-search', display.value).attr('href','#top').addClass('before').text('prev');
				$div.append($prev);
			}
			var $next = $('<a>').attr('data-search', display.value).attr('href','#top').addClass('after').text('next');
			$div.append($next);
			// Show contents
			display.showContent($div);
		},
		showContent: function($div) {
			$('#content').empty();
			$('#content').append($div);
		}
	};

});