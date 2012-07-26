  function getGoogleColor(target_color){
    if (colors[target_color] == undefined) { // not found
      return "white"; // default color
    } else {
      return colors[target_color];
    }
  }

function getRandomImageFromCache(google_color)
{
  var random_number = Math.floor(Math.random()*all_images_by_color[google_color].length);
  var result = all_images_by_color[google_color][random_number];
  return result;
}

function arrayLength(arr) //For multi-dimensional arrays.
{
    var length = 0;
    for (var item in arr)
    {
        length++;
        if (arr[item] instanceof Array)
        {
          length += arrayLength(arr[item]); //Recursive!
        }
    }
    return length;
}


  google.load('search', '1');
  var imageSearch;
  var selected_color = "";
  
  function setImageHelper() {  
    
    // Check that we got results
    if (imageSearch.results && imageSearch.results.length > 0) {
  
      // Loop through our results, printing them to the page.
      var results = imageSearch.results;
      $.each(results, function(index, value) { 
        $("#image_search").html($("#image_search").html()+", \""+value.tbUrl+"\"");
      });      

    }
  }

  function setImageFromCache(color) {
    var random_number = 0;
    $("."+selected_color).each(function() {
      random_number = Math.floor(Math.random()*all_images_by_color[color].length);
      var result = all_images_by_color[color][random_number];
      $(this).css("background-image", "url('"+result+"')");
    });

  }

  function setImage(color) { 
     // Create an Image Search instance.
    imageSearch = new google.search.ImageSearch();
    
    var color_restriction = google.search.ImageSearch.COLOR_WHITE; // default color
    
    if(color == "blue") {
      color_restriction = google.search.ImageSearch.COLOR_BLUE;
    } 
    if(color == "red") {
      color_restriction = google.search.ImageSearch.COLOR_RED;
    } 
    if(color == "brown") {
      color_restriction = google.search.ImageSearch.COLOR_BROWN;
    } 
    if(color == "gray") {
      color_restriction = google.search.ImageSearch.COLOR_GRAY;
    } 
    if(color == "green") {
      color_restriction = google.search.ImageSearch.COLOR_GREEN;
    } 
    if(color == "orange") {
      color_restriction = google.search.ImageSearch.COLOR_ORANGE;
    }
    if(color == "teal") {
      color_restriction = google.search.ImageSearch.COLOR_TEAL;
    }
    if(color == "yellow") {
      color_restriction = google.search.ImageSearch.COLOR_YELLOW;
    }
    if(color == "black") {
      color_restriction = google.search.ImageSearch.COLOR_BLACK;
    }
    if(color == "pink") {
      color_restriction = google.search.ImageSearch.COLOR_PINK;
    }
    if(color == "purple") {
      color_restriction = google.search.ImageSearch.COLOR_PURPLE;
    }
    if(color == "white") {
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


    //see http://stackoverflow.com/a/4800250/805556. Not my question. Prevents images from loading on top o' each other.
    alert(arrayLength(mosaic_array));
    var imgs = [];
    var loaded = 0;
    var loadCallBack = function ()
    {
      loaded++;
      if (loaded == arrayLength(mosaic_array))
      {
        for (var y in imgs)
        {
          for (var x in imgs[y])
          {
            var pos_y = y * cell_size;
            var pos_x = x * cell_size;

            ctx.drawImage(imgs[y][x], pos_x, pos_y, cell_size, cell_size);
          }
        } 
      }
    }
    for (var y in mosaic_array)
    {
      for (var x in mosaic_array[y])
      {
        var css_color = mosaic_array[y][x]; 
        var google_color = getGoogleColor(css_color);
        var image_url = getRandomImageFromCache(google_color);
        alert(y + "|" + x);
        imgs[y][x] = new Image(); //Images are identified by their coords.
        imgs[y][x].addEventListener('load', loadCallBack, false);
        imgs[y][x].src = image_url;
      }
    }