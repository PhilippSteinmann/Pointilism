  function getGoogleColor(target_color){
    if (colors[target_color] == undefined) { // not found
      return "white"; // default color
    } else {
      return colors[target_color];
    }
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
/*
      var random_number = 0;
      $("."+selected_color).each(function() {
        random_number = Math.floor(Math.random()*results.length);
        var result = results[random_number];
        $(this).css("background-image", "url('"+result.tbUrl+"')");
      });
*/
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

  var used_colors = {};
    
  $(".cell_test").click(function(){
    $("#hex_refine").html($("#hex_refine").html()+" "+$(this).attr("hex"));
    $("#swatch").css('backgroundColor',$(this).attr("hex"));
    
    //change clicked cell to white and unbind
    $(this).css({'background-color':'white'});
    $(this).unbind('click');
  });
  
  $(document).ready(function() {
    // SETS ALL COLOR CELLS TO THE GOOGLE COLOR
    <?php
      if(isset($_REQUEST['effect_option']) && $_REQUEST['effect_option'] != 'no_color') {
    ?>
      $(".color_cell").each( function() {
        google_color = getGoogleColor($(this).attr('hex'));
        used_colors[google_color] = 1;
        $(this).css("background-color", google_color);
        $(this).addClass(google_color);
      });
    <?php
      }  //end if
    ?>
    selected_color = "purple";
    // setImage(selected_color); 
    <?php
      if(isset($_REQUEST['effect_option']) && $_REQUEST['effect_option'] != 'no_images') {
    ?>
    $.each(used_colors, function(index, value) {
      selected_color = index;
      setImageFromCache(selected_color); 
    });  
    <?php
      }  //end if
    ?>
  });
