<?php

function getDatabaseConnection($dbname) {
    $connection = null;

    if(!isset($connection)) {
        $defaultPath = ($_SERVER['SERVER_NAME'] == 'localhost') ? $_SERVER['DOCUMENT_ROOT'] : '';
        $config = parse_ini_file($defaultPath . '/config.ini');
        $connection = mysqli_connect($config['servername'],$config['username'],$config['password'], $dbname);
    }

    if($connection === false) {
        return mysqli_connect_error(); 
    }
    return $connection;
}
?>