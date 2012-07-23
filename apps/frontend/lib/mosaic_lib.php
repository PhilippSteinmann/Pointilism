<?php
class MosaicGenerator
{
	public static function roundHex($css_color) 
	{
		$css_color = strtolower($css_color);
		$round_up = array(8,9,'a','b','c','d','e','f','A','B','C','D','E','F');
		$cur = 0;
		$css_color_split = str_split($css_color); // splits the css_color function into array

		while($cur < count($css_color_split)) 
		{
			if(in_array($css_color_split[$cur+1], $round_up))
			{ // check if we should round up
			  
				if(is_numeric($css_color_split[$cur]))
				{
					$css_color_split[$cur] = $css_color_split[$cur] + 1; 
			
					if($css_color_split[$cur] == 10)
					{ // catch base16 increment rule
						$css_color_split[$cur] = "a";
					}
				} 
				else 
				{ //is not numeric
					switch($css_color_split[$cur]) 
					{
						case "a": case "A":
							$css_color_split[$cur] = "b";
						case "b": case "B":
							$css_color_split[$cur] = "c";
						case "c": case "C":
							$css_color_split[$cur] = "d";
						case "d": case "D":
							$css_color_split[$cur] = "e";
						case "e": case "E":
							$css_color_split[$cur] = "f";
						//case "f": case "F":
						//$css_color_split[$cur+1] = "f";
					} //end switch

				} // end if else
			} // Do not round up, so round down.
            //if($css_color_split[$cur] != "f" || $css_color_split[$cur+1] != "f"){ // if is NOT "FF"
		    $css_color_split[$cur+1] = 0;
			//} // end if
			$cur = $cur + 2;
		}	 // end while
	return implode("", $css_color_split);
  
	} //end function
	
	public static function printHTMLPic($img) 
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

	function printHTMLRoundedPic($img) 
	{
		$imagew = imagesx($img);
		$imageh = imagesy($img);
		echo "<div style='width: ". 15*$imagew . "px'>";
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
}
?>