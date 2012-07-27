
function getGoogleColor(target_color)
  {
    if (typeof colors[target_color] == "undefined") 
    { // not found
      return "white"; // default color
    } 
    else 
    {
      return colors[target_color];
    }
  }

function getGoogleImage(color)
{
  if (typeof images[color] === "undefined") //If we didn't pull for this color yet, do it now.
  {
    var google_images = requestGoogleImages(color,40);
    images[color] = google_images; //Add the pulled images to the object.     
  }

  return images[color].randomValue() //Pick a random value from the image array. See js/script.js for definition.
}

function requestGoogleImages(color,num)
{
  var searcher = new google.search.customSearchControl.getImageSearcher();
}

/*
function getRandomImageFromCache(google_color)
{
  var random_number = Math.floor(Math.random()*all_images_by_color[google_color].length);
  var result = all_images_by_color[google_color][random_number];
  return result;
}

  function getRandomGoogleImage(color) 
  { 
     // Create an Image Search instance.
    imageSearch = new google.search.ImageSearch();
    
    var color_restriction = google.search.ImageSearch.COLOR_WHITE; // default color
    
    if(color == "blue") {
      color_restriction = google.search.ImageSearch.COLOR_BLUE;
    } 
    else if(color == "red") {
      color_restriction = google.search.ImageSearch.COLOR_RED;
    } 
    else if(color == "brown") {
      color_restriction = google.search.ImageSearch.COLOR_BROWN;
    } 
    else if(color == "gray") {
      color_restriction = google.search.ImageSearch.COLOR_GRAY;
    } 
    else if(color == "green") {
      color_restriction = google.search.ImageSearch.COLOR_GREEN;
    } 
    else if(color == "orange") {
      color_restriction = google.search.ImageSearch.COLOR_ORANGE;
    }
    else if(color == "teal") {
      color_restriction = google.search.ImageSearch.COLOR_TEAL;
    }
    else if(color == "yellow") {
      color_restriction = google.search.ImageSearch.COLOR_YELLOW;
    }
    else if(color == "black") {
      color_restriction = google.search.ImageSearch.COLOR_BLACK;
    }
    else if(color == "pink") {
      color_restriction = google.search.ImageSearch.COLOR_PINK;
    }
    else if(color == "purple") {
      color_restriction = google.search.ImageSearch.COLOR_PURPLE;
    }
    else if(color == "white") {
      color_restriction = google.search.ImageSearch.COLOR_WHITE;
    }
    
    // Set color restriction
    imageSearch.setRestriction(
      google.search.ImageSearch.RESTRICT_COLORFILTER,
      color_restriction
    );
    
    imageSearch.setResultSetSize(8);
    // imageSearch.setSiteRestriction("www.funnygarbage.com");
    imageSearch.gotoPage(0);    
  
    // Set searchComplete as the callback function when a search is 
    // complete.  The imageSearch object will have results in it.
    imageSearch.setSearchCompleteCallback(this, setImageHelper, null);
  
    // Search by keyword.
    imageSearch.execute("boobs garbage");

  } //end of function


function setImageHelper() 
{  
  // Check that we got results
  if (imageSearch.results && imageSearch.results.length > 0) 
  {
      // Loop through our results, printing them to the page.
      var results = imageSearch.results;
      $.each(results, function(index, value) 
      { 
        alert(value.tbUrl);
      } );      
  }
}
*/

  var images = {}; //Where the mosaic tiles will get their images from.
  google.load('search', '1', {language : 'en'});

  //see http://stackoverflow.com/a/4800250/805556. Prevents images from loading on top o' each other.
  var imgs = [];
  var loaded = 0;
  var loadCallBack = function ()
  {
    loaded++;
    if (loaded == mosaic_array.absolute_length()) //All images are loaded. See js/script.js for absolute_length() definition.
    {
      for (var y in imgs)
      {
        for (var x in imgs[y])
        {
          var pos_y = y * cell_size; //Calculate image coordinates
          var pos_x = x * cell_size;
          ctx.drawImage(imgs[y][x], pos_x, pos_y, cell_size, cell_size); //Draw the image.
          alert("Here we go! Drawing " + imgs[y][x].src);
        }
      } 
    }
  }
  //Iterate through the matrix of google colors
  for (var y in mosaic_array)
  {
    if (typeof imgs[y] == "undefined") //We need to explicitly define an array the first time.
    {
        imgs[y] = [];
    }
    for (var x in mosaic_array[y])
    {
      var hex_color = mosaic_array[y][x]; //The hex color returned by lib/mosaic_lib.php
      var google_color = getGoogleColor(hex_color);
      var image_url = getGoogleImage(google_color);  
      imgs[y][x] = new Image(); //Images are identified by their coords in this array.
      imgs[y][x].addEventListener('load', loadCallBack, false);
      imgs[y][x].src = image_url;
    }
  }