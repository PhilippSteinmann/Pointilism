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
      //data passes from index -> generate -> view
      //hidden input field
    $this->generate_mosaic = $request->getPostParameter("generate");
    if ($this->generate_mosaic == "1")
	{
        $base_path = "/var/www/symfony/web/uploads/";
		$all_files = $request->getFiles();
		$file = $all_files["image"];
		$fname = $file["name"];
		$fmime = $file["type"];
		$ftmp = $file["tmp_name"];
		$fsize = $file["size"];

		$new_fname = uniqid();
		while (file_exists($base_path . $new_fname))
		{
			$new_fname = uniqid();
		}
		$img_path = $base_path . $new_fname;
		move_uploaded_file($ftmp, $img_path);
		
		
		$img = ImageManipulation::imagecreatefrom($img_path);

		$img_width = imagesx($img);
		$img_height = imagesy($img);
		$img_ratio = $img_height / $img_width;
	  
		$user_width = $request->getPostParameter("size");  
		$cell_sizes = array("small"=>5, "medium"=>15, "large"=>40);
		if (array_key_exists($user_width, $cell_sizes))
		{
			$cell_size = $cell_sizes[$user_width];
		}
		else
		{
			$cell_size = $cell_sizes["medium"];
		}
		
		$user_large_mosaic = $request->getPostParameter("large_mosaic"); //Checkbox for large mosaic
		
		$mosaic_w = isset($user_large_mosaic) ? 1600 : 800; //If yes, mosaic is 1600px. Else, 800px.
		$mosaic_h = ceil($mosaic_w * $img_ratio);
		
		$image_w = $mosaic_w / $cell_size; //Image shrunk down so that later, $image_w * $cell_size = $mosaic_w
		$image_h = ceil($image_h * $img_ratio);
		
		$size_arr = getimagesize($img_path);
		ImageManipulation::resize_image($img_path, $img, $size_arr, $image_w, $image_h);
	
		$this->getUser()->setAttribute("img_path", $img_path);
		$this->getUser()->setAttribute("cell_size", $cell_size);
      }
	  
	  $this->redirect("/view");
		
  }
  public function executeView(sfWebRequest $request)
  {
	$mosaic_path = $this->getUser()->getAttribute("img_path");
	$cell_size = $this->getUser()->getAttribute("cell_size");
	if ($mosaic_path && $cell_size)
	{
		$this->mosaic_path = $mosaic_path;
		$this->cell_size = $cell_size;
	}
	else
	{
		echo "Create a mosaic at /";
	}
  }
}
