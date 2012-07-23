<?php
use_javascript("https://www.google.com/jsapi?key=ABQIAAAA9ozePzao9mxP4UicD1QqkxT2yXp_ZAY8_ufC3CFXhHIE1NvwkxSmcL65R52kgKAmzJkkFA7XHTZTTw");
use_javascript("formatted_colors.js");
use_javascript("google_images.js");
use_javascript("generate_mosaic.js.php");

if (isset($mosaic_path))
{
	$img = ImageManipulation::imagecreatefrom($mosaic_path);
	MosaicGenerator::printHTMLRoundedPic($img);
}
?>

<div id="hex_refine" style="font-size: 12px"></div>
<div id="image_search" style="font-size: 12px"></div>