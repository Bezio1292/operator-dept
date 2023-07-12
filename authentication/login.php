<?php
$defaultPath = ($_SERVER['SERVER_NAME'] == 'localhost') ? $_SERVER['DOCUMENT_ROOT'].'/operator-dept' : '';
require_once($defaultPath . '/includes/operator-dept/db-connect.php');

//ini_set('session.gc_maxlifetime', 2629743);
//ini_set('session.cookie_lifetime', 2629743);
//session_set_cookie_params(2629743);

$login = stripslashes($_POST['username']);
$password = stripslashes($_POST['password']);

if($login=='' || $password == ''){
	echo '';
	return;
}

$query = 'SELECT id, login, password, privilege FROM users WHERE login=?;';
$connection = getDatabaseConnection("operator2_users");
$result = mysqli_execute_query($connection, $query, [$login]);
$row = mysqli_fetch_assoc($result);
$count = mysqli_num_rows($result);
if($count == 1){
	if(password_verify($password, $row["password"] )){
		session_start();
		$_SESSION['user_id']=$row["id"];
		$_SESSION['login']=$row["login"];
		$_SESSION['privilege']=$row["privilege"];
		setcookie('cookie_login',$row["login"], time()+60*60*24*10,'/');
		setcookie('cookie_user_id',$row["id"]*55, time()+60*60*24*10,'/');
		echo $row["login"];
	}
}