<h2>Create a Mosaic </h2>
<p>Upload a picture and view it as a Mosaic of images! </p>



<form action="generate" method="POST" enctype="multipart/form-data" id="upload-pic">
    <div class="col index-col">
        <p>Choose image: </p>
    </div>
    <div class="col">
        <input type="file" name="image" size="20" id="image">
    </div>
	
    <div class="col index-col">
        <p>Size of Mosaic: </p>
    </div>
    <div class="col">
        <select name="size">
			<option value="small">Small </option>
			<option selected value="medium">Medium </option>
			<option value="large">Large </option>
	</select>
    </div>
	<div class="col">
		<label for="large_mosaic">Large Mosaic </label>
		<input type="checkbox" name="large_mosaic" value="1">
	</div>
   
    <div class="col index-col">
        <p>Keywords for images: </p>
    </div>
    <div class="col">
        <input type="text" name="keywords">
    </div>

    <br> <br> <br> <br>
    <input type="submit" value="Create Mosaic!" class="submit-creation">
	<p class="error"> </p>
    <input type="hidden" name="generate" value="1">
 
</form>

