<!DOCTYPE html>
<html>
<head>
    <title>Pointilism</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="initial-scale = 1.0,maximum-scale = 1.0">
    <?php include_javascripts() ?>
    <?php include_stylesheets() ?>
</head>
<body>
    <header>
        <h1 class="logo">
			<div class="vertical-align">
				<a href="/">
					POINTILISM
				</a>
			</div>	
		</h1>
	
		<nav>
			<div class="vertical-align">
				<ul>
					<li><a href="/">Create</a> </li>
					<li><a class="no-effect"> ~ </a></li>
					<li><a href="/browse">Browse </a> </li>
					<li><a class="no-effect"> ~ </a></li>
					<li><a href="/about">About </a> </li>
				</ul>
			</div>
		</nav>
		<?php include_slot("mosaic_actions",""); ?>

    </header>
    <div id="content">
          <?php echo $sf_content ?>
    </div>
</body>
</html>
