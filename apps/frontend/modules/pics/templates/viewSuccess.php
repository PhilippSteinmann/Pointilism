<?php
use_javascript("https://www.google.com/jsapi?key=ABQIAAAA9ozePzao9mxP4UicD1QqkxT2yXp_ZAY8_ufC3CFXhHIE1NvwkxSmcL65R52kgKAmzJkkFA7XHTZTTw");
use_javascript("formatted_colors.js");
use_javascript("google_images.js");

if (isset($mosaic_path)):?>
	<div class="mosaic-wrapper">

	<?php
		$img = ImageManipulation::imagecreatefrom($mosaic_path); //Returns Image object. 
		MosaicGenerator::printCanvasMosaic($img, $cell_size); //Defines two Javascript variables: The color matrix and the size of each image.
	?>
	<script src="/js/generate_mosaic.js"> </script> <!-- Picks up two variables from printCanvasMosaic(), creates canvas mosaic !-->
		<div class="tweak-size">
			<p>Mosaic Size: </p>
			<select>
				<option value="300" >Small </option>
				<option value="600" selected>Medium </option>
				<option value="1200">Large </option>
				<option value="2400">Huge </option>
			</select>
			<br>
			<input type="text" id="width" value="600">
			<p> x <span id="height">600 </span>
		</div>
	</div>
<?php endif ?>

<div id="hex_refine" style="font-size: 12px"></div>
<div id="image_search" style="font-size: 12px"></div>