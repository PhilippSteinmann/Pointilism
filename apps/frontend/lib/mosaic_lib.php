<?php
class MosaicGenerator
{
	public static function roundHexColor($color) 
	{
		$color = strtolower($color);
		$round_up = array(8,9,'a','b','c','d','e','f','A','B','C','D','E','F');
		$cur = 0;
		$color_split = str_split($color); // splits the color function into array

		while($cur < count($color_split)) 
		{
			if(in_array($color_split[$cur+1], $round_up))
			{ // check if we should round up
			  
				if(is_numeric($color_split[$cur]))
				{
					$color_split[$cur] = $color_split[$cur] + 1; 
			
					if($color_split[$cur] == 10)
					{ // catch base16 increment rule
						$color_split[$cur] = "a";
					}
				} 
				else 
				{ //is not numeric
					switch($color_split[$cur]) 
					{
						case "a": case "A":
							$color_split[$cur] = "b";
						case "b": case "B":
							$color_split[$cur] = "c";
						case "c": case "C":
							$color_split[$cur] = "d";
						case "d": case "D":
							$color_split[$cur] = "e";
						case "e": case "E":
							$color_split[$cur] = "f";
						//case "f": case "F":
						//$color_split[$cur+1] = "f";
					} //end switch

				} // end if else
			} // Do not round up, so round down.
            //if($color_split[$cur] != "f" || $color_split[$cur+1] != "f"){ // if is NOT "FF"
		    $color_split[$cur+1] = 0;
			//} // end if
			$cur = $cur + 2;
		}	 // end while
	return implode("", $color_split);
  
	} //end function
	
	public static function printHTMLMosaic($img) 
	{
		$imagew = imagesx($img);
		$imageh = imagesy($img);
		
		for ($y = 0; $y < $imageh; $y++) 
		{
			for ($x = 0; $x < $imagew; $x++) 
			{
				$rgb = imagecolorat($img, $x, $y);
				$r = ($rgb >> 16) & 0xFF;
				$g = ($rgb >> 8) & 0xFF;
				$b = $rgb & 0xFF;

			$original_r = $r;
			$original_g = $g;
			$original_b = $b;

			// converting rgb into hex
			$css_color = str_pad(dechex($r), 2, "0", STR_PAD_LEFT).str_pad(dechex($g), 2, "0", STR_PAD_LEFT).str_pad(dechex($b), 2, "0", STR_PAD_LEFT); //convert rgb into css

			$css_color_original = str_pad(dechex($original_r), 2, "0", STR_PAD_LEFT).str_pad(dechex($original_g), 2, "0", STR_PAD_LEFT).str_pad(dechex($original_b), 2, "0", STR_PAD_LEFT); // original css color values

			echo '<span style="background-color:#' . $css_color_original . 	'" >'.'&nbsp;</span>';

			} // end x loop
			echo '<br />';
		} // end y loop
	} //end function printHTMLPic

	public static function printHTMLRoundedMosaic($img) 
	{
		$imagew = imagesx($img);
		$imageh = imagesy($img);
		echo "<div >";
		for ($y = 0; $y < $imageh; $y++) 
		{
			for ($x = 0; $x < $imagew; $x++) 
			{
				$rgb = imagecolorat($img, $x, $y);
				$r = ($rgb >> 16) & 0xFF;
				$g = ($rgb >> 8) & 0xFF;
				$b = $rgb & 0xFF;
				// converting decimal rgb into hex
				$css_color = str_pad(dechex($r), 2, "0", STR_PAD_LEFT).str_pad(dechex($g), 2, "0", STR_PAD_LEFT).str_pad(dechex($b), 2, "0", STR_PAD_LEFT); //convert rgb into css

				echo '<span hex="'.MosaicGenerator::roundHex($css_color).'" id="'.$x.'_'.$y.'" class="color_cell" style="background-color:#'.MosaicGenerator::roundHex($css_color).'" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>';
			} // end x loop
			echo '<br style="clear:left; float:right;" />';
		} // end y loop
		echo "</div>";
	} //end function printHTMLRoundedPic
	
	public static function printCanvasMosaic($img, $cell_size)
	{
		$imagew = imagesx($img); //Get image width, height.
		$imageh = imagesy($img);
		
		$mosaic_width = $imagew * $cell_size; //See generateSuccess() in actions.class.php, where $image_w = $mosaic_w / $cell_size.
		$mosaic_height = $imageh * $cell_size;
		echo "<canvas width='$mosaic_width"."px' height='$mosaic_height"."px'> </canvas> 
		<script>
		var canvas = document.querySelector('canvas');
		var ctx = canvas.getContext('2d')				
		"; //These two variables are available globally.

		$mosaic_array = array(); //Matrix of rows and columns of colors, which will be replaced by images.

		for ($y = 0; $y < $imageh; $y++)  //Iterating through the rows of pixels...
		{
			$moisac_array[$y] = array(); 
			for ($x = 0; $x < $imagew; $x++) //Iterating through the pixels in that row...
			{
				$rgb = imagecolorat($img, $x, $y); //The color at this specific pixel.
				$r = ($rgb >> 16) & 0xFF; //Converts to RGB. I got this explained at http://stackoverflow.com/q/11570312/805556.
				$g = ($rgb >> 8) & 0xFF;
				$b = $rgb & 0xFF;
				// converting decimal rgb into hex
				$pos_x = $x * $cell_size;
				$pos_y = $y * $cell_size;
				
				$css_color = str_pad(dechex($r), 2, "0", STR_PAD_LEFT).str_pad(dechex($g), 2, "0", STR_PAD_LEFT).str_pad(dechex($b), 2, "0", STR_PAD_LEFT); //convert rgb into css
				$rounded_hex_color = MosaicGenerator::roundHexColor($css_color); //Now we round the color.

				$mosaic_array[$y][$x] = $rounded_hex_color; //And add this rounded color to our matrix of pixels.
			}
		}
				echo "
				var mosaic_array = " . json_encode($mosaic_array) . "
				var cell_size = " . $cell_size . "
				</script>"; //We pass the color matrix and the size of each image to Javascript as variables.
	}
	
	public static function drawRect($color, $x, $y, $width, $height, $ctx="ctx")
	{
		return "
		var color = getGoogleColor('$color');
		$ctx.fillStyle = color;
		$ctx.fillRect($x, $y, $width, $height)
		"; 
	}
	
	public static function drawImageFromCache($color, $x, $y, $width, $height, $ctx="ctx")
	{
		$img = "img" . $x . $y;
		return "
		var color = getGoogleColor('$color');
		$img = new Image();
					
		$img.src = result;
		$img.onload = function() {
			ctx.drawImage($img, $x, $y, $width, $height);
		};
		";
	}
}
?>`