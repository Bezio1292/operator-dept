<?php
$defaultPath = ($_SERVER['SERVER_NAME'] == 'localhost') ? $_SERVER['DOCUMENT_ROOT'].'/operator-dept' : '';
if(isset($_COOKIE['cookie_user_id'])){
	$user_id=($_COOKIE['cookie_user_id']/55);
	$login=$_COOKIE['cookie_login'];
	require_once($defaultPath . '/includes/operator-dept/db-connect.php');
	$connection = getDatabaseConnection("operator2_users");
	$sql = "SELECT count(*),id,login,pic,privilege,date from users where id={$user_id} AND login='{$login}'";
	$res = mysqli_query($connection,$sql);
	$row = mysqli_fetch_array($res);
	if($row[0]>0){
		$_SESSION['login']=$row[2];
		$_SESSION['user_id']=$row[1];
		if ($row[4]>2) {
			$_SESSION['privilege']=$row[4];
		}
		else{
			$_SESSION['privilege']=$row[4];
		}
	}
}
else{
	header("Location: $defaultPath/login.php");
	exit();
}
?>