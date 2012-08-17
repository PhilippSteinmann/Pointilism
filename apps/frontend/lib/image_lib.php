<?php
class ImageManipulation
{
	public static function resize_image($img_path, $image, $size_arr, $max_width, $max_height)//maintain aspect ratio
	{
		$width  = $max_width;
		$height = $max_height;
		list($width_orig, $height_orig, $img_type) = $size_arr;
		$ratio_orig = $width_orig / $height_orig;

		if ($width/$height > $ratio_orig) 
		{
		   $width = floor($height*$ratio_orig);
		} 
		else 
		{
		   $height = floor($width/$ratio_orig);
		}
		// Resample
		$tempimg = imagecreatetruecolor($width, $height);
		imagecopyresampled($tempimg, $image, 0, 0, 0, 0, $width, $height, $width_orig, $height_orig);
		if ($img_type == IMAGETYPE_GIF)
		{
			imagegif($tempimg, $img_path, 80);
		}
		
		else if ($img_type == IMAGETYPE_JPEG)
		{
			imagejpeg($tempimg, $img_path, 80);
		}

		else if ($img_type == IMAGETYPE_PNG)
		{
			imagepng($tempimg, $img_path, NULL);
			//NULL is used because otherwise it doesn't work: http://stackoverflow.com/a/5946819/805556	 	
		}
		else
		{
			die("Mosaic could not be created: Image type unknown"); 
		}
	} 

	public static function imagecreatefrom($img_path)
	{
		$size_arr = getimagesize($img_path);
		$img_type = $size_arr[2];
		
		if ($img_type == IMAGETYPE_GIF)
		{
			$img = imagecreatefromgif($img_path);
		}
		else if ($img_type == IMAGETYPE_JPEG)
		{
			$img = imagecreatefromjpeg($img_path);
		}

		else if ($img_type == IMAGETYPE_PNG)
		{
			$img = imagecreatefrompng($img_path);	 	
		}
		else
		{
			die("Mosaic could not be created: Image type unknown"); 
		}
		
		return $img;
	}
}
?>