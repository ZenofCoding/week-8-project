$(document).on('ready', function() {
	var img = $('img');
	var image = $('#image');
	var imageOut = $('#image-out');
	var width, height;
	img.load(function() {
		// Get image width and height
		width = img.width();
		height = img.height();
		// Set div width and height to image
		image.width(width).height(height);
		imageOut.width(width).height(height);
	});
	$("#btnSave").on('click', function() { 
    html2canvas(image, {
      onrendered: function(canvas) {
        var img = canvas.toDataURL('assets/images/png')
        var $png = $('<img>').attr('src',img);
        $('#image-out').append($png);
      }
    });
  });
});