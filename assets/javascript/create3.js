$(document).on('ready', function() {
	// Create the image
	var top = $('<p>').attr('id','top').text('This dog is so cute This dog is so cute This dog is so cute This dog is so cute This dog is so cute ');
	var bottom = $('<p>').attr('id','bottom').text('It is freaking ridiculous It is freaking ridiculous It is freaking ridiculous It is freaking ridiculous');
	var img = $('<img>').attr('src','https://farm8.staticflickr.com/7536/27765233411_6e665cb191_n.jpg');
	var $div = $('<div>').attr('id','image');
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
			var colors = ['White','Black','Red','Yellow','Purple','Green'];
			// Add fonts, font size, color
			display.fonts($controls, fonts);
			display.fontSize($controls);
			display.fontColor($controls, colors);
			display.topText($controls);
			display.bottomText($controls);
			// Add controls to page
			$('.panel-body').append($controls);
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
			var $label = $('<label>').addClass('control-label').attr('for','select').text('Font Size');
			var $input = $('<input>').attr('type','number').attr('name','quantity').attr('min','8').attr('max','30').attr('value','20');
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
			var $input = $('<input>').attr('type','range').attr('name','point').attr('min','0').attr('max','10').attr('value','0');
			var $topText = $('<div>').attr('id','top-text').append($label).append($input);
			$controls.append($topText);
		},
		bottomText: function($controls) {
			var $label = $('<label>').addClass('control-label').attr('for','select').text('Bottom Text Position');
			var $input = $('<input>').attr('type','range').attr('name','point').attr('min','0').attr('max','10').attr('value','0');
			var $bottomText = $('<div>').attr('id','bottom-text').append($label).append($input);
			$controls.append($bottomText);
		}
	}

	// Get image properties after load
	img.on('load', display.image);
});