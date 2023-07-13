<!DOCTYPE html>
<html lang="en"> 
<head>
	<!-- Login Page  -->
	<title>Operator Department</title>
	<meta charset="utf-8">
	<link rel="icon" href="index-files/Sibyl-System.png">
	<meta name="author" content="Bartosz Kowalski">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no">
	
	<link rel='stylesheet' href="includes/bootstrap/css/bootstrap.min.css">
	<link rel='stylesheet' href='login-files/login-hud.css'>
</head>

<body>
	<div class="vignette"></div>
	<div class="container">
		<div id="main-page" class="row flex-column align-items-center">
			<img class="col-9 col-lg-4 order-1 order-lg-0" style="margin-top:-25px;" src="login-files/svg/planet.svg">
			<div id="login-info" class="text-white text-center col-12 col-lg-5 mt-2 mt-lg-0"> Operator Department </div>
			<form id='login-form' class="row flex-column align-items-center mt-2 " action='authentication/login.php' method="POST">
				<input type="text" name="username" class="btn-page col-10 col-lg-5 mb-3 mb-lg-4 p-3 p-lg-2" autocomplete="off" placeholder="Username">
				<input type="password" name="password" class="btn-page col-10 col-lg-5 mb-3 mb-lg-4 p-3 p-lg-2" autocomplete="off" placeholder="Password">
				<button type="submit" id="btn-log-in" class="btn-page col-10 col-lg-5 mb-3 mb-lg-4 p-3 p-lg-2" onclick=""><span>Log in<span></button>
			</form>
			<div id="btn-register" class="col-12 d-flex justify-content-center text-white mb-5 h6">You don't have an account? <div id="register">Too bad, we don't accept new users.</div></div>
		</div>
	</div>
</body>

<script src="includes/jquery/jquery.min.js"> </script>
<script src="includes/jquery/jquery.fittext.js"> </script>

<script type="text/javascript"  src="authentication/authentication.js"></script>
<script>
	$("#login-info").fitText(1);
	$(".btn-page").fitText(1.5, { minFontSize: '6px', maxFontSize: '25px' });
	$("#btn-register").fitText(3.2, { minFontSize: '6px', maxFontSize: '16px' });
</script>
</html>