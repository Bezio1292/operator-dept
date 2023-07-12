<!DOCTYPE html>
<html lang="en"> 
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
	<meta name="author" content="Bartosz Kowalski">
	<meta charset="utf-8">

	<title>Operator Department</title>

	<?php
    use operatordept\DocumentPath;
    require_once("./includes/operator-dept/document-path.php");
    $documentPath = new DocumentPath();

    if(!isset($_SESSION['user_id']))
		require($documentPath->fullPath.'authentication/login-check.php');
  	?>

	<link href='./includes/bootstrap/css/bootstrap.min.css' rel='stylesheet'>
	<link href='./index-files/index-style.css' rel='stylesheet'>
	<link href='./includes/fontawesome/css/all.min.css' rel='stylesheet'>
	<link href='./includes/fontawesome/custom/brands/style.css' rel='stylesheet'>
	<link href='./includes/fontawesome/custom/pages/style.css' rel='stylesheet'>
	<script src='./index-files/content.js'></script>
	<script src='./includes/bootstrap/js/bootstrap.bundle.min.js'></script>
	<script src='./includes/jquery/jquery.min.js' rel='stylesheet'></script>
	
	<?php require($documentPath->fullPath.'index-files/content.php') ?>
	
</head>
<body style="min-height:100vh">
	<header>
		<nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg" >
			<div class="container-fluid">
				<a class="navbar-brand me-4">Operator Department</a>
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<ul id='nabarContainer' class="navbar-nav me-auto mb-2 mb-lg-0 dragContainerX flex-wrap" style="color:white;">
					</ul>
					<ul class="navbar-nav">
						<li class="nav-item">
							<?php loadUserImg(); ?>
							<ul class="dropdown-menu dropdown-menu-dark m-0 py-4 px-1 dropdown-menu-lg-end" aria-labelledby="navbarDarkDropdownMenuLink" style="border-bottom-right-radius: 0px;border-top-right-radius: 0px;">
								<li><h6 class="dropdown-header pb-4 px-3" style="font-size:large"><?php echo $_SESSION['login']; ?></h6></li>
								<li><a id="settingsBtn" class="dropdown-item py-2 Notdisabled" href="#" ><i class='fa-solid fa-screwdriver-wrench me-2'></i>Settings (BETA)</a></li>
								<li><a id="saveBtn" class="dropdown-item py-2 Notdisabled" href="#" ><i class='fa-solid fa-screwdriver-wrench me-2'></i>Save (BETA)</a></li>
								<li><a class="dropdown-item py-2" href="./authentication/logout.php"><i class='fa-solid fa-right-from-bracket fa-flip-horizontal me-2'></i>Sign out</a></li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	</header>
	<main class="py-5">
		<div class="container">
			<div class="row justify-content-center">
				<?php
				require_once($documentPath->fullPath . '/includes/operator-dept/db-connect.php');
				$con_sites = getDatabaseConnection('operator2_sites');
				$sql = "SELECT name,priv_req from site order by name";
				$res = mysqli_query($con_sites,$sql);
				while($row = mysqli_fetch_array($res)){
					if($_SESSION['privilege'] >= $row[1]){
						$name_url = str_replace(" ","_",$row[0]);
						$name_url = strtolower($name_url);
						create_div($name_url,$row[0]);
					}
				}
				mysqli_close($con_sites);

				?>
			</div>
		</div>

	</main>
	

	<script type="text/javascript">
		resize_col();
		window.addEventListener('resize', resize_col);

		function resize_col(){
			var cols = document.querySelectorAll(".cols");
			var width_col = cols[0].offsetWidth+1;
			for (i = 0; i < cols.length; i++) {
				cols[i].style.fontSize = width_col/11 + 'px';
				cols[i].style.height = width_col + 'px';
			}
		}
		
	</script>
	
</body>
</html>