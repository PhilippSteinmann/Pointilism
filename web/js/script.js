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
} );