/*
  Project Status:
  - Do MySQL caching for imgages
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

function create_mosaic(google_colors, imgs_per_color)
{
  all_exist = true;
  $.each(google_colors, function(index,color)
  {
    if (!(color in images_by_color))
    {
      images_by_color[color] = [];
      requestGoogleImagesFromCache(color, imgs_per_color);
    }
    else
    {
      if (images_by_color[color] === [])
      {
        all_exist = false;
      }
    }
  } );

  if (all_exist === false)
  {
      setTimeout(create_mosaic, 300, [google_colors, imgs_per_color]);
  }
  else
  {
      populate_canvas();
      send_images_to_server();
  }
}


function requestGoogleImages(color,num_images)
{
  /*Attention! This is deprecated! We're only using it 'cause there's no other option! Relevant Resources:
    - https://developers.google.com/web-search/
    - http://stackoverflow.com/q/11976747/805556
  */
  images_by_color[color] = new google.search.ImageSearch();
    
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
  images_by_color[color].setRestriction(
    google.search.ImageSearch.RESTRICT_COLORFILTER,
    color_restriction
  );
  images_by_color[color].setResultSetSize(num_images);
  images_by_color[color].gotoPage(0);
  // Set searchComplete as the callback function when a search is
  // complete.  The imageSearch object will have results in it.
  images_by_color[color].setSearchCompleteCallback(this, addResults, [color]);
  // Search by keyword.
  images_by_color[color].execute(search_keywords);
}

//https://developers.google.com/custom-search/v1/cse/list#imgDominantColor
function requestGoogleImagesNew(color,num_images)
{
  color = (color == "red" || color == "orange") ? "pink" : color;
  $.get("https://www.googleapis.com/customsearch/v1?key=AIzaSyALc9l8tOL3WZiGQ1Av3CsLsJdZyt477KA&cx=010976543539359366391:juoztraaslg&q=" + search_keywords + "&imgDominantColor=" + color + "&searchType=image&num=" + num_images,
    function(results)
    {
      color = results.queries.request[0].imgDominantColor;
      images_by_color[color] = [];
      $.each(results.items, function(index, result)
      {console.log(result);
        images_by_color[color].push(result.link);
      } );
    } );
}

function requestGoogleImagesFromCache(color, num)
{
    images_by_color[color] = all_images_by_color[color];
}

function addResults(color)
{
  if (images_by_color[color] && images_by_color[color].results.length > 0)
  {
      // Loop through our results, printing them to the page.
      var results = images_by_color[color].results;
      images_by_color[color] = [];
      $.each(results, function(index, result) //Then we cycle through results and add to array.
      {
        images_by_color[color].push(result.tbUrl);
      } );
    }
}
            

function getGoogleImage(color)
{
  color = (color == "red" || color == "orange") ? "pink" : color;
  return images_by_color[color].randomValue(); //Pick a random value from the image array. See js/script.js for method definition.
}


function populate_canvas()
{
  var imgs = [];
  var loaded = 0;
  
//see http://stackoverflow.com/a/4800250/805556. Images are stored in array instead of reusing a variable, so that they won't overwrite ea/other.
  var loadCallBack = function ()
  {
    loaded++; //Another image has loaded.
    if (loaded == mosaic_array.absolute_length()) //All images are loaded. See js/script.js for absolute_length() definition.
    {
      for (var y in imgs)
      {
        for (var x in imgs[y])
        {
          var pos_y = y * cell_size; //Calculate image coordinates on canvas
          var pos_x = x * cell_size;
          ctx.drawImage(imgs[y][x], pos_x, pos_y, cell_size, cell_size); //Draw the image.
        }
      }
    }
  };
  
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

function send_images_to_server()
{
  console.log("now sending...");
  $.each(images_by_color,  function(color, images)
  {
        post_array = {"color":color, "keywords":search_keywords, "images":images};
        $.post("saveImages", {stuff:post_array},
        function(data)
        {
            console.log(data);
        } );
  }  );
}

google.load('search', '1', {language : 'en'});
var images_by_color = {}; //Where the mosaic tiles will get their images from.