/*
  Project Status:
  - Decided to use deprecated search.
  - Current microwork is using SetTimeout until Google images arrive in getGoogleImage()
  _____________________________________________________
  - google.search.CustomSearchControl does not seem to work, method getImageSearcher() is undefined
  - JSAPI Docs at https://developers.google.com/custom-search/v1/overview
  */


/*
function getRandomImageFromCache(google_color)
{
  var random_number = Math.floor(Math.random()*all_images_by_color[google_color].length);
  var result = all_images_by_color[google_color][random_number];
  return result;
}

  function getRandomImage(color) 
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

function getGoogleImage(color)
{
  if (typeof images_by_color[color] === "undefined") //If we didn't pull images for this color yet, do it now.
  {
    images_by_color[color] = "add"; //Arbitrary marker used so that callback func knows where to place images
    requestGoogleImages(color,4); //Second param is number to pull. Callback func adds images to images_by_color.
  }

 image_url = getRandomImage(color);
 while (image_url == "add")
 {
    image_url = getRandomImage(color);
 }

  return image_url; 
}

*/

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

function fetchGoogleImages(google_colors, imgs_per_color)
{
  $.each(google_colors, function(index,color)
  {console.log(color)
    requestGoogleImages(color, imgs_per_color);
  } );
}


function requestGoogleImages(color,num_images)
{
  /*Attention! This is deprecated! We're only using it 'cause there's no other option! Relevant Resources:
    - https://developers.google.com/web-search/
    - http://stackoverflow.com/q/11976747/805556
  */
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
  //Set color restriction
  imageSearch.setRestriction(
    google.search.ImageSearch.RESTRICT_COLORFILTER,
    color_restriction
  );
  imageSearch.setResultSetSize(num_images);
  imageSearch.gotoPage(0);    
    // Set searchComplete as the callback function when a search is 
  // complete.  The imageSearch object will have results in it.
  imageSearch.setSearchCompleteCallback(this, addResults, [color]);
    // Search by keyword.
  imageSearch.execute("boobs garbage");
}

function addResults(color) 
{ 
  if (imageSearch.results && imageSearch.results.length > 0) 
  {
      // Loop through our results, printing them to the page.
      var results = imageSearch.results;
      images_by_color[color] = [];
      $.each(results, function(index, result) //Then we cycle through results and add to array.
      {console.log(color + ": " + result.tbUrl); 
        images_by_color[color].push(result.tbUrl); 
      } );     
    }
} 
            

function getGoogleImage(color)
{
  return images_by_color[color].randomValue(); //Pick a random value from the image array. See js/script.js for method definition.
}


function populate_canvas()
{
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
      var hex_color = mosaic_array[y][x]; //The hex color echoed by lib/mosaic_lib.php
      var google_color = getGoogleColor(hex_color); //"red", "blue", etc.
      var image_url = getGoogleImage(google_color); //Gets img src URL for canvas  
      imgs[y][x] = new Image(); //Image objects are identified by their coords in this array.
      imgs[y][x].addEventListener('load', loadCallBack, false);
      imgs[y][x].src = image_url; 
    }
  }
}

google.load('search', '1', {language : 'en'});
var images_by_color = {}; //Where the mosaic tiles will get their images from.

$(document).ready(
function() 
{
  //see http://stackoverflow.com/a/4800250/805556. Prevents images from using the same variable, so they won't overwrite each other.
  var google_colors = ["blue","red","brown","gray","green","orange","teal","yellow","black","pink","purple","white"];
  fetchGoogleImages(google_colors,4);
  setTimeout("populate_canvas()", 10000);
  
} );
 