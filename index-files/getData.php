<?php
    /*
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    */
    $defaultPath = ($_SERVER['SERVER_NAME'] == 'localhost') ? $_SERVER['DOCUMENT_ROOT'].'/operator-dept' : '';
    require_once($defaultPath . '/includes/operator-dept/db-connect.php');
    $con_links = getDatabaseConnection('operator2_links');

    $sqlContainers = "SELECT idContainer,name,icon,dropdown,link,containerOrder FROM containers ORDER BY containerOrder ASC;";
    $resContainers = mysqli_query($con_links,$sqlContainers);

    $containers = Array();
    while($container = mysqli_fetch_assoc($resContainers)){
        
        $sqlItems = "SELECT idItem,idContainer,name,icon,header,link,itemOrder FROM items WHERE idContainer={$container['idContainer']} ORDER BY itemOrder ASC;";
        $resItems = mysqli_query($con_links,$sqlItems);
        
        $items = Array();
        while($item = mysqli_fetch_assoc($resItems)){
            $items[] = $item;
        }
        
        $container += [ "items" => $items ];
        $containers[] = ($container);
    }
    $con_links->close();

    header('Content-type: application/json');
    echo json_encode($containers);
    
    
?>