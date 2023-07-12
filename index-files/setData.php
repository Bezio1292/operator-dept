<?php
session_start();
    if($_SESSION['privilege']>=4 && isset($_POST['data'])){
      
        $defaultPath = ($_SERVER['SERVER_NAME'] == 'localhost') ? $_SERVER['DOCUMENT_ROOT'].'/operator-dept' : '';
        require_once($defaultPath . '/includes/operator-dept/db-connect.php');
      
        $con_links = getDatabaseConnection('operator2_links');
        $data = json_decode($_POST['data'],true);


        $insert="";
        if(count($data["insert"]["containers"])!=0){
          $insert.="INSERT INTO containers VALUES";
          $comma = false;
          foreach($data["insert"]["containers"] as $container){
            ($comma)? $insert.="," : $comma=true;
            echo "\n\nECHO CONTAINER DROPDOWN:" . $container['dropdown'] . "\n\n";
            $insert .= "(null,'{$container['name']}','{$container['icon']}',{$container['dropdown']},'{$container['link']}',{$container['containerOrder']})";
          }
          $insert.=";";
        }
        if(count($data["insert"]["items"])!=0){
          $insert.="INSERT INTO items VALUES";
          $comma = false;
          foreach($data["insert"]["items"] as $item){
            ($comma)? $insert.="," : $comma=true;
            $insert .= "(null,{$item['idContainer']},'{$item['name']}','{$item['icon']}',{$item['header']},'{$item['link']}',{$item['itemOrder']})";
          }
          $insert.=";";
        }
        echo "\n";
        echo $insert;
        echo "\n";
        if(!empty($insert))
          mysqli_query($con_links,$insert);
        

        $update="";
        if(count($data["update"]["containers"])!=0){
          foreach($data["update"]["containers"] as $container){
              $update = "UPDATE containers SET
              name='{$container['name']}',
              icon='{$container['icon']}',
              dropdown={$container['dropdown']},
              link='{$container['link']}',
              containerOrder={$container['containerOrder']}
              WHERE idContainer = {$container['idContainer']};";
              mysqli_query($con_links,$update);

          }
        }
        if(count($data["update"]["items"])!=0){
          foreach($data["update"]["items"] as $item){
              $update = "UPDATE items SET
              idContainer={$item['idContainer']},
              name='{$item['name']}',
              icon='{$item['icon']}',
              header={$item['header']},
              link='{$item['link']}',
              itemOrder={$item['itemOrder']}
              WHERE idItem = {$item['idItem']};";
              mysqli_query($con_links,$update);
          }
       }
       //echo $update;
       //if(!empty($update))
          //mysqli_query($con_links,$update);
        

       $delete="";
       if(count($data["delete"]["containers"])!=0){
        $delete="DELETE FROM containers WHERE idContainer IN(";
        $comma = false;
        foreach($data["delete"]["containers"] as $container){
          ($comma)? $delete.="," : $comma=true;
          $delete .= "$container";
        }
        $delete.=");";
      }
      if(count($data["delete"]["items"])!=0){
        $delete.="DELETE FROM items WHERE idItem IN(";
        $comma = false;
        foreach($data["delete"]["items"] as $item){
          ($comma)? $delete.="," : $comma=true;
          $delete .= "$item";
        }
        $delete.=");";
      }
      //echo $delete;
      if(!empty($delete))
        mysqli_query($con_links,$delete);
      

      $con_links->close();

    }
    else{
        echo "Error\n";
    }
    

    /*
    DELETE FROM table_name
WHERE column_name IN (value 1, value 2, value 3, etc...);


    INSERT INTO table (id, name, age) VALUES(1, "A", 19) ON DUPLICATE KEY UPDATE    
name="A", age=19
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    */
    /*
    $con_links = mysqli_connect();

    $resContainers = mysqli_query($con_links,$sqlContainers);

    $containers = Array();
    while($container = mysqli_fetch_assoc($resContainers)){
        
        $sqlItems = "SELECT idItem,name,icon,header,link FROM items WHERE idContainer={$container['idContainer']} ORDER BY itemOrder ASC;";
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
    echo json_encode($containers);*/


    /*

        foreach ($containers as $container){
            var_dump($container);
            $idContainer = $container['idContainer'];
            $name = $container['name'];
            $icon = $container['icon'];
            $dropdown = ($container['dropdown'])?"1":"0";
            $link = $container['link'];

            $sqlContainer = "INSERT INTO containers VALUES(
                $idContainer,
                '$name',
                '$icon',
                $dropdown,
                '$link',
                $conOrder) 
                ON DUPLICATE KEY UPDATE
                name = '$name',
                icon = '$icon',
                dropdown = $dropdown,
                link = '$link',
                containerOrder = $conOrder
                ;";
                echo $sqlContainer;

                mysqli_query($con_links,$sqlContainer);
                ++$conOrder;
        }
        */
    
    
?>