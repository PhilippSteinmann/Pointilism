document.createElement("nav");

$(document).ready(
function()
{
	$("#upload-pic").submit(
	function()
	{
		$(".error").hide();
		var file = $("#image").val();
		if (file == "")
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
	}

	Array.prototype.randomValue = function() 
	{
		return this[Math.floor(Math.random() * this.length)]
	}
} );