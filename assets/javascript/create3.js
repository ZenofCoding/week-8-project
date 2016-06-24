$(document).on('ready', function() {
	// Link to Firebase
	var memes = new Firebase("https://fleddit.firebaseio.com/memes");
	// Retrieve title, text, and url
	var title = localStorage.getItem('title');
	var text = localStorage.getItem('text');
	var url = localStorage.getItem('url');
	// Edit url to show bigger picture
	var splitURL = url.split('');
	splitURL.splice(splitURL.length-6, 2);
	url = splitURL.join('');
	// Create the image
	var top = $('<p>').addClass('top').text(title);
	var bottom = $('<p>').addClass('bottom').text(text);
	var img = $('<img>').attr('src', url);
	var $div = $('<div>').addClass('image');
	var width, height;
	// Put div together
	$div.append(img);
	// Add div to page
	$('.panel-body').append($div);

	// Display picture and controls
	var display = {
		image: function() {
			// Get image width and height
			width = img.width();
			height = img.height();
			// Set div width and height to image and append words
			$div.width(width).height(height).append(top).append(bottom);
			// Display controls
			display.controls();
		},
		controls: function() {
			// Create controls div
			$controls = $('<div>').attr('id','controls');
			// Selectable fonts
			var fonts = ['Arial','Arial Black','Georgia','Impact','Tahoma','Times'];
			// Selectable colors
			var colors = ['White','Black','Red','Yellow','Purple','Green','Blue','Orange','SlateGray','Maroon','SaddleBrown','HotPink'];
			// Add fonts, font size, color
			display.fonts($controls, fonts);
			display.fontSize($controls);
			display.fontColor($controls, colors);
			display.topText($controls);
			display.bottomText($controls);
			// Add controls to page
			$('.panel-body').append($controls);
			// Add fleddit button to page
			$a = $('<a>').addClass('btn btn-default').text('fleddit!');
			$('.panel-body').append($a);
		},
		fonts: function($controls, fonts) {
			var $label = $('<label>').addClass('control-label').attr('for','select').text('Font');
			var $select = $('<select>').addClass('form-control').attr('id','select-font');
			for (var i=0; i<fonts.length; i++) {
				$option = $('<option>').text(fonts[i]);
				$select.append($option);
			}
			var $font = $('<div>').attr('id','font').append($label).append($select);
			$controls.append($font);
		},
		fontSize: function($controls) {
			var $label = $('<label>').addClass('control-label').attr('for','select').text('Font Size (Between 10-100 px)');
			var $input = $('<input>').attr('type','number').attr('name','quantity').attr('min','10').attr('max','100').attr('value','20');
			var $fontSize = $('<div>').attr('id','font-size').append($label).append($input);
			$controls.append($fontSize);
		},
		fontColor: function($controls, colors) {
			var $label = $('<label>').addClass('control-label').attr('for','select').text('Font Color');
			var $select = $('<select>').addClass('form-control').attr('id','select-font-color');
			for (var i=0; i<colors.length; i++) {
				$option = $('<option>').text(colors[i]);
				$select.append($option);
			}
			var $fontColor = $('<div>').attr('id','font-color').append($label).append($select);
			$controls.append($fontColor);
		},
		topText: function($controls) {
			var $label = $('<label>').addClass('control-label').attr('for','select').text('Top Text Position');
			var $input = $('<input>').attr('type','range').attr('name','point').attr('min','0').attr('max','300').attr('value','0');
			var $topText = $('<div>').attr('id','top-text').append($label).append($input);
			$controls.append($topText);
		},
		bottomText: function($controls) {
			var $label = $('<label>').addClass('control-label').attr('for','select').text('Bottom Text Position');
			var $input = $('<input>').attr('type','range').attr('name','point').attr('min','0').attr('max','300').attr('value','0');
			var $bottomText = $('<div>').attr('id','bottom-text').append($label).append($input);
			$controls.append($bottomText);
		}
	}

	// Get image properties after load
	img.on('load', display.image);

	var changed = {
		font: function() {
			// Get font choice
			var font = $('#select-font option:selected').text();
			// Update font
			$('.image>p').css('font-family', font);
		},
		fontSize: function() {
			// Get font size choice
			var fontSize = $('input[type="number"]').val();
			// Update font size
			$('.image>p').css('font-size', fontSize+'px');
		},
		fontColor: function() {
			// Get font color choice
			var fontColor = $('#select-font-color option:selected').text();
			// Update font color
			$('.image>p').css('color', fontColor);
		},
		topText: function() {
			// Get font size choice
			var topText = $('#top-text input[type="range"]').val();
			// Update font size
			$('.top').css('top', topText+'px');
		}
		,
		bottomText: function() {
			// Get font size choice
			var bottomText = $('#bottom-text input[type="range"]').val();
			// Update font size
			$('.bottom').css('bottom', bottomText+'px');
		}
	};

	// Listen for change in font
	$(document).on('change','#select-font', changed.font);
	// Listen for change in font-size
	$(document).on('change','input[type="number"]', changed.fontSize);
	// Listen for change in font color
	$(document).on('change','#select-font-color', changed.fontColor);
	// Listen for change in top text position
	$(document).on('change','#top-text input[type="range"]', changed.topText);
	// Listen for change in bottom text position
	$(document).on('change','#bottom-text input[type="range"]', changed.bottomText);

	// Listen for submittion
	$(document).on('click','.panel-body a', function() {
		var $p = $('.image>p');
		var font = $p.css('font-family');
		var fontSize = $p.css('font-size');
		var fontColor = $p.css('color');
		var topText = $('.top').css('top');
		var bottomText = $('.bottom').css('bottom');
		// Save user customizations to firebase
		memes.push({
			'url': url,
			'title': title,
			'text': text,
			'font': font,
			'fontSize': fontSize,
			'fontColor': fontColor,
			'topText': topText,
			'bottomText': bottomText,
		});
		// Redirect to next page
		window.location.href = 'index.html';
	});
});