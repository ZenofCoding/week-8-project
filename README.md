# fleddit
Week 8 project for Rutgers Coding Bootcamp.

LIVE PREVIEW --> https://fleddit.firebaseapp.com/
VIDEO PRESENTATION --> https://www.youtube.com/watch?v=QpkZLEkNlGg

## Screenshots

Main
------
![Main Image](/readme_images/main.png?raw=true"main.png")

Step 1 | Click Joke Category
-------------|--------
![Step 1 Image](/readme_images/step1.png?raw=true"step1.png") | ![Click Joke Category Image](/readme_images/step1click.png?raw=true"step1click.png")

Step 2 | Type Image to Search
-------------|--------
![Step 2 Image](/readme_images/step2.png?raw=true"step2.png") | ![Type Image to Search Image](/readme_images/step2search.png?raw=true"step2search.png")

Step 3 | Edit the Text
-------------|--------
![Step 3 Image](/readme_images/step3.png?raw=true"step3.png") | ![Edit the Text Image](/readme_images/step3edit.png?raw=true"step3edit.png")

Final
------
![Final Image](/readme_images/final.png?raw=true"final.png")

## Project Requirements
* Must uses at least two APIs
* Must use AJAX to pull data
* Must utilize at least one new library or technology that we haven’t discussed
* Must have a polished frontend / UI 
* Must meet good quality coding standards (indentation, scoping, naming)
* Must NOT use alerts, confirms, or prompts (look into modals!)
* Must have some sort of repeating element (table, columns, etc)
* Must use Bootstrap or Alternative CSS Framework
* Must be Deployed (Heroku or Firebase)
* Must have User Input Validation 

## Technologies used
- HTML
- CSS (media queries, font-awesome, Boostrap with Bootswatch Cyborg Theme)
- JavaScript (jQuery and AJAX)
- Firebase for persistant storage
- APIs (Reddit and Flickr)

## How to Create a Meme

1. Click "Create"
2. Click a joke category.  Browse through (previous and next) and click on a desired joke
3. Type in the search box for an image and press enter or click "Submit".  Browse through images (press 1,2,3,4,5 or arrows) and click desired image.
4. Edit the text by selecting font type, size, and color as well as the top and bottom text positions.  Click "fleddit!" to post the meme.
5. Admire your work on the main page!

## Built With

* Sublime Text
* Gimp

## Deployed With

* Firebase

## Walk throughs of code

Most interesting JavaScript code:
(Part of the display object that allows for pagination on through the images on the second step)
```
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
}
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
```

## Authors

* [Matthew Bajorek](https://github.com/mattbajorek)
* [Mike Magnani](https://github.com/MMagnani5)
* [Joe Shin](https://github.com/ZenofCoding)
* [Rowena Jaico](https://github.com/rowieej)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* All those hours spent on iFunny or other meme applications