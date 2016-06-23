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
			// Add fonts
			display.fonts($controls, fonts);
			// Add controls to page
			$('.panel-body').append($controls);
			console.log($controls)

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
		}
	}

	// Get image properties after load
	img.on('load', display.image);
});

/*
<div class="form-group">
	<div id="font">
	  <label for="select" class="control-label">Font</label>
	  <select class="form-control" id="select-font">
	    <option>Arial</option>
	    <option>Arial Black</option>
	    <option>Georgia</option>
	    <option>Impact</option>
	    <option>Tahoma</option>
	    <option>Times</option>
	  </select>
  </div>
  <div id="font-size">
	  <label for="select" class="control-label">Font-size</label>
	  <input type="number" name="quantity" min="8" max="30" value="20">
	</div>
	<div id="font-color">
	  <label for="select" class="control-label">Font Color</label>
	  <select class="form-control" id="select-font-color">
	    <option>White</option>
	    <option>Black</option>
	    <option>Red</option>
	    <option>Yellow</option>
	    <option>Purple</option>
	  </select>
	</div>
	<div id="top-text">
	  <label for="select" class="control-label">Top Text Position</label>
	  <input type="range" name="points" min="0" max="10">
  </div>
  <div id="bottom-text">
	  <label for="select" class="control-label">Bottom Text Position</label>
	  <input type="range" name="points" min="0" max="10">
	</div>
</div>
*/