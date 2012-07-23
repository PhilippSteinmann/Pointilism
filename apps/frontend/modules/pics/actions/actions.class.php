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
		$output_widths = array("small"=>40, "medium"=>80, "large"=>120);
		if (array_key_exists($user_width, $output_widths))
		{
			$output_width = $output_widths[$user_width];
		}
		else
		{
			$output_width = $output_widths["medium"];
		}
		
		$output_height = ceil($output_width * $img_ratio);
		
		$size_arr = getimagesize($img_path);
		ImageManipulation::resize_image($img_path, $img, $size_arr, $output_width, $output_height);
		var_dump(getimagesize($img_path));
	
		$this->getUser()->setAttribute("img_path", $img_path);
      }
	  
	  $this->redirect("/view");
		
  }
  public function executeView(sfWebRequest $request)
  {
	$mosaic_path = $this->getUser()->getAttribute("img_path");
	if ($mosaic_path)
	{
		$this->mosaic_path = $mosaic_path;
	}
	else
	{
		echo "Create a mosaic at /";
	}
  }
}
