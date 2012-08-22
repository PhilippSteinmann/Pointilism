<?php
use_javascript("https://www.google.com/jsapi?key=AIzaSyALc9l8tOL3WZiGQ1Av3CsLsJdZyt477KA"); //See https://code.google.com/apis/console/#project:326513611386:overview
use_javascript("formatted_colors.js");
use_javascript("google_images.js");
//use_javascript("jquery-ui.js");
//use_stylesheet("jquery-ui.css");


if (isset($img_path)):

	slot("mosaic_actions", 
	'<div class="tweak-size">
			<p>Mosaic Size: </p>
			<select>
				<option value="300">Small </option>
				<option value="600" selected>Medium </option>
				<option value="1200">Large </option>
				<option value="2400">Huge </option>
			</select>
			<br>
			<input type="text" id="width" value="600">
			<p> x <span id="height">600 </span>
		</div>' ); ?>
	<div class="mosaic-wrapper">
	<?php
		$img = ImageManipulation::imagecreatefrom($img_path); //Returns Image object. 
		MosaicGenerator::printCanvasMosaic($img, $cell_size, $keywords); //Defines three Javascript variables: The color matrix, the size of each image, and the keywords.
	?>
	<script src="/js/generate_mosaic.js"> </script> <!-- Picks up three variables from printCanvasMosaic(), creates canvas mosaic !-->
		<div class="tweak-size">
			<p>Mosaic Size: </p>
			<select>
				<option value="300">Small </option>
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