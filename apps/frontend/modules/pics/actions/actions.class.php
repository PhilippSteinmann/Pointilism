<?php

/**
 * pics actions.
 *
 * @package    Mosaic
 * @subpackage pics
 * @author     Philipp Steinmann
 * @version    SVN: $Id: actions.class.php 23810 2009-11-12 11:07:44Z Kris.Wallsmith $
 */

class picsActions extends sfActions
{
 /**
  * Executes index action
  *
  * @param sfRequest $request A request object
  */
  public function executeIndex(sfWebRequest $request)
  {
//    $this->forward('default', 'module');
  }

  public function executeGenerate(sfWebRequest $request)
  {
      //data passes from index -> generate -> view. generate uses redirect at end.

      //hidden input field
    $this->generate_mosaic = $request->getPostParameter("generate");
    if ($this->generate_mosaic == "1")
	{
        $base_path = "/var/www/symfony/web/uploads/"; //this is where the images go.
		$all_files = $request->getFiles();
		$file = $all_files["image"];
		$fname = $file["name"];
		$fmime = $file["type"];
		$ftmp = $file["tmp_name"]; //temp path
		$fsize = $file["size"];

		$new_fname = uniqid(); //random name

		while (file_exists($base_path . $new_fname)) //assign new random name if this name already exists
		{
			$new_fname = uniqid();
		}

		$img_path = $base_path . $new_fname;
		move_uploaded_file($ftmp, $img_path); //move image from temp path to uploads path.
		
		$img = ImageManipulation::imagecreatefrom($img_path); //see lib/image_lib.php. returns Image object.

		$img_width = imagesx($img);
		$img_height = imagesy($img);
		$img_ratio = $img_height / $img_width;
	  
		$user_width = $request->getPostParameter("size"); //specified by user.   
		$cell_sizes = array("small"=>5, "medium"=>15, "large"=>30); //user uses semantic descriptions (eg. "small").
		if (array_key_exists($user_width, $cell_sizes))
		{
			$cell_size = $cell_sizes[$user_width]; //match semantic user size with pixel value from $cell_sizes
		}
		else
		{
			$cell_size = $cell_sizes["medium"]; //default
		}
		
		$user_large_mosaic = $request->getPostParameter("large_mosaic"); //Checkbox for large mosaic
		
		$mosaic_width = 600; 
		$mosaic_height = ceil($mosaic_width* $img_ratio); //Height adjusts to ratio.
		
		$new_img_width = $mosaic_width / $cell_size; //Image shrunk down so that later, $new_img_width * $cell_size = $mosaic_w
		$new_img_height = ceil($new_img_width * $img_ratio);
		
		$size_arr = getimagesize($img_path); //getimagesize() gets size from path; imagesx() gets size from Image object.
		ImageManipulation::resize_image($img_path, $img, $size_arr, $new_img_width, $new_img_height); //See lib/image_lib.php. No returns, resizes image.

		$keywords = $request->getPostParameter("keywords");
		if (empty($keywords))
		{
			$keywords = "cars"; //Default
		}		
	
		$this->getUser()->setAttribute("img_path", $img_path); //Set Session variable. That way, if user refreshes, mosaic is still there.
		$this->getUser()->setAttribute("cell_size", $cell_size); //Same for cell sizes.
		$this->getUser()->setAttribute("keywords", $keywords); //Same for key
      }
	  $this->redirect("/browse"); //on to view!
		
  }
  public function executeBrowse(sfWebRequest $request)
  {
	$img_path = $this->getUser()->getAttribute("img_path"); //retrieve values from executeGenerate()
	$cell_size = $this->getUser()->getAttribute("cell_size");
	$keywords = $this->getUser()->getAttribute("keywords");
	if ($img_path && $cell_size)
	{
		$this->img_path = $img_path; //Set as attribute for use in viewSuccess.php.
		$this->cell_size = $cell_size;
		$this->keywords = $keywords;
	}
	else
	{
		echo "<a href='/'>Create a mosaic </a>"; //Placeholder that tells people where to create mosaic if they don't have one now.
	}
  }

  public function executeSaveImages(sfWebRequest $request)
  {
  	$data = $request->getPostParameter("stuff"); //Sent from AJAX.
  	if (!empty($data))
  	{
  		$data = json_decode($data); //Decode from JSON to PHP array
  		$color = $data->color; //eg, "red"
  		$keywords = $data->keywords; //eg, "unicorns"
  		$images = $data->images; // Array of URLs

  		$keyword = new keywords(); //MySQL INSERT.
  		$keyword->setKeyword($keywords); 
  		$keyword->save(); //Query executed
  		$keyword_identifier = $keyword->identifier();
  		$keyword_id = $keyword_identifier["id"]; //$keyword->identifier()["id"]; not possible :(

  		foreach ($images as $image_url)
  		{
  			$image = new images(); //MySQL INSERT
			$image->setColor($color); //All images have the same $color and $keywords.
			$image->setUrl($image_url); 
			$image->save(); //Query executed
			$image_identifier = $image->identifier();
			$image_id = $image_identifier["id"];

			$image_keyword_relationship = new image_keyword_map();
			$image_keyword_relationship->setKeywordId($keyword_id);
			$image_keyword_relationship->setImageId($image_id);
			$image_keyword_relationship->save(); //Query executed
		}
  	}
  }

  public function executeAbout(sfWebRequest $request)
  {

  }
}
	