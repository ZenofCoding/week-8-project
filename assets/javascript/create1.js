$(document).on('ready', function() {
	// When joke category is clicked
	$(document).on('click', '#step1 a', function() {
		// Save this
		$this = $(this);
		// Get input
		display.input($this);
		return false;
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
			display.value = $this.attr('data-search');
			display.selection = $this.attr('data-type');
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
			var $content = $('<div>');
			for (i in data) {
				// Get title and text data
				var title = data[i].data.title;
				var text = data[i].data.selftext;
				// Create panels with heading and body
				var $panelHeading = $('<div>').addClass('panel-heading').text(title);
				var $panelBody = $('<div>').addClass('panel-body').text(text);
				var $panel = $('<div>').addClass('panel panel-default');
				// Put panel together
				$panel.append($panelHeading).append($panelBody);
				// Append panel to body
				$content.append($panel);
				// Update before and after
				if (i == 0) {
					display.before = data[i].data.name;
				}
				if (i == 24) {
					display.after = data[i].data.name;
				}
			}
			// Create pager
			$pager = $('<ul>').addClass('pager');
			// Save first before if one of the jokes categories were selected
			if (display.selection === 'joke') {
				display.firstPage = display.before;
			// Only show before if its not the first page
			} else if (display.firstPage !== display.before) {
				var $prev = $('<a>').attr('data-search', display.value).attr('href','#page-top').attr('data-type','before').text('Previous');
				var $li = $('<li>').append($prev);
				$pager.append($li);
			}
			var $next = $('<a>').attr('data-search', display.value).attr('href','#page-top').attr('data-type','after').text('Next');
			var $li = $('<li>').append($next);
			$pager.append($li);
			// Prepend and append page to body
			$content.prepend($pager);
			$pager.clone().appendTo($content);
			// Show contents
			display.showContent($content);
		},
		showContent: function($content) {
			$('#jokes').empty();
			$('#jokes').append($content);
			// Scroll to top of page
			window.scrollTo(0,0);
		}
	};

	// Listen for a joke clicked and save to local storage
	$(document).one('click','.panel-default', function() {
		// Get user selected title and text
		var title = $(this).children('.panel-heading').text();
		var text = $(this).children('.panel-body').text();
		// Save user choice to local storage
		localStorage.setItem('title', title);
		localStorage.setItem('text', text);
		// Redirect to next page
		window.location.href = 'create2.html';
	});
	
});