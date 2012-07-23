<!DOCTYPE html>
<html>
<head>
    <title>Pointilism</title>
    <meta charset="UTF-8">
    <?php include_javascripts() ?>
    <?php include_stylesheets() ?>
</head>
<body>
    <header>
        <h1 class="logo">
			<a href="/">
				POINTILISM
			</a>
		</h1>
	
		<nav>
			<ul>
				<li><a href="/">Create</a> </li>
				<li><a href="/view">View </a> </li>
				<li><a href="/about">About </a> </li>
			</ul>

		</nav>
    </header>
    <div id="content">
          <?php echo $sf_content ?>
    </div>
</body>
</html>
