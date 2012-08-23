$(document).ready(
function()
{
	document.createElement("nav");
	
	Array.prototype.absolute_length = function () //For multi-dimensional arrays.
	{
		var length = 0;
		for (var item in this)
		{
			if (this.hasOwnProperty(item))
			{
				length++; //Another item in the array.
				if (this[item] instanceof Array) //If this item is array...
				{
					length += this[item].absolute_length(); //...we go recursive!
				}
			}
		}
		return length;
	};

	Array.prototype.randomValue = function()
	{
		return this[Math.floor(Math.random() * this.length)];
	};
	
	$("#upload-pic").submit(
	function()
	{
		$(".error").hide();
		var file = $("#image").val();
		if (file === "")
		{
			$(".error").html("Please choose a file.").fadeIn(300);
			return false;
		}
	} );

	$(".tweak-size select").change(
	function()
	{
		var new_width = $(this).val();
		var ratio = canvas.width / canvas.height;
		var new_height = new_width / ratio;
		$(".tweak-size #width").val(new_width);
		$(".tweak-size #height").html(new_height);
	} );


  $(".tweak-size select").change(
  function()
  {
    var new_width = $(this).val();
    var ratio = canvas.width / canvas.height;
    var new_height = new_width / ratio;
    $(".tweak-size #width").val(new_width);
    $(".tweak-size #height").html(new_height);

    old_width = canvas.width;
    change_factor = new_width / old_width;
    cell_size = cell_size * change_factor;

    canvas.width = new_width;
    canvas.height = new_height;
    populate_canvas();
  } );

  $(".tweak-size #width").change(
  function()
  {
    var new_width = $(this).val();
    var ratio = canvas.width / canvas.height;
    var new_height = new_width / ratio;
    $(".tweak-size #height").html(new_height);

    old_width = canvas.width;
    change_factor = new_width / old_width;
    cell_size = cell_size * change_factor;

    canvas.width = new_width;
    canvas.height = new_height;

    $.each($(".tweak-size option"), function(index, option)
    {
      if (parseInt(new_width,10) >= parseInt(option.value,10))
      {
        $(option).attr("selected", "selected");
      }

    } );

    if (new_width < 300)
    {
      $(".tweak-size option[value=300]").attr("selected","selected");
    }
    create_mosaic();
  } );

  $(".download-mosaic").click(
    function()
    {
        Canvas2Image.saveAsPNG(canvas);
    } );

  //var google_colors = ["blue","red","brown","gray","green","orange","teal","yellow","black","pink","purple","white"];
	var google_colors = ["blue","brown","gray","green","teal","yellow","black","pink","purple","white"];
	create_mosaic(google_colors,1);
} );