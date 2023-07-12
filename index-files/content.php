<?php
$disabled_sites = array("Games","Artworks");

function loadUserImg(){
    $on_error_path = "'users_pic/unknown.jpg'";
							$on_error = "onerror=this.onerror=null;this.src=";
							echo "<img src = 'users_pic/";
							echo strtolower($_SESSION["login"]);
							echo ".jpg' ";
							echo trim($on_error, '"');
							echo trim($on_error_path, '"');
							echo " class='nav-link dropdown-toggle' "; 
							echo "href='#' ";
							echo "data-bs-auto-close='outside' ";
							//echo "id='navbarDarkDropdownMenuLink' ";
							echo "role='button' ";
							echo "data-bs-toggle='dropdown' "; 
							//echo "aria-expanded='false' ";
							echo "style='height: 60px; border-radius: 30px;' "; 
							echo "/>";
}

function loadContent(){
    $defaultPath = ($_SERVER['SERVER_NAME'] == 'localhost') ? $_SERVER['DOCUMENT_ROOT'].'/operator-dept' : '';
    require_once($defaultPath . '/includes/operator-dept/db-connect.php');
    
    $con_links = getDatabaseConnection('operator2_links');
    $sqlContainers = "SELECT idContainer,name,icon,dropdown,link FROM containers ORDER BY containerOrder ASC;";
    $resContainers = mysqli_query($con_links,$sqlContainers);

    $containers = Array();
    while($container = mysqli_fetch_assoc($resContainers)){
        
        $sqlItems = "SELECT name,icon,header,link FROM items WHERE idContainer={$container['idContainer']} ORDER BY itemOrder ASC;";
        $resItems = mysqli_query($con_links,$sqlItems);
        
        $items = Array();
        while($item = mysqli_fetch_assoc($resItems)){
            $items[] = $item;
        }
        
        $container += [ "items" => $items ];
        $containers[] = ($container);
    }
    mysqli_close($con_links);

    foreach($containers as $container){
        addContainer(
            $container["idContainer"],
            $container["name"],
            $container["icon"],
            $container["dropdown"],
            $container["link"],
            $container["items"]
        );
    }
}


function addContainer($idContainer,$name,$icon,$dropdown,$link, $items=[]){

    $aNode = "<a target='_BLANK' href='$link' data-bs-auto-close='outside' class='nav-link showPopover ";
    $aNode .= ($dropdown)?"dropdown-toggle' data-bs-toggle='dropdown'>":"'>";
    echo"
        <li class='nav-item dropdown mx-1 draggableX ' draggable='true'>
            $aNode
                <i class='$icon'></i>
                <span>$name</span>
            </a>
        ";
    if($dropdown){
        echo "<ul class='dropdown-menu dropdown-menu-dark dragContainerY'>";
        $first = true;
        foreach($items as $item){
            addItem($item["name"],
                $item["icon"],
                $item["header"],
                $item["link"],
                $first
            );
            if($first) $first=false;
        }
        echo "</ul>";
    }

    echo"</li>";
        
};

function addItem($name,$icon,$header,$link, $firstHeader = false){

    $node = ($header && !$firstHeader) ? "<hr class='dropdown-divider'>" : "";
    $node .= ($header) ? "" : "<a class='dropdown-item' target='_BLANK' href='$link'>";
    $node .= ($header) ? "<h6 class='dropdown-header'><i class='$icon'></i><span class='mx-1'>$name</span></h6>" : "<i class='$icon'></i><span class='mx-1'>$name</span></a>";

    echo"
        <li class='draggableY' draggable='true'>
			$node
		</li>
        ";
}


function create_div($name_url,$name){
	for($i=0;$i<count($GLOBALS['disabled_sites']);$i++){
		if($GLOBALS['disabled_sites'][$i]==$name)
			$name_url = '#';
	}
	echo "<div class='col-lg-2 col-md-3 col-5 mx-2 my-3 text-center shadow position-relative cols' style='background:#3e60dd'>";
	echo "<a href='".$name_url."' class='text-decoration-none stretched-link row d-flex h-100' style='color:white'>";
	echo "<div class='col-12 align-self-start p-0'>";
	echo "<p class='h5 my-1'>";
	echo $name;
		if($name_url=="#")
			echo "<br><small style='font-size:15px;'>(DISABLED)</small>";
	echo "</p>";
	echo "</div>";
	if($name_url!="#"){
		echo "<div class='col-12 align-self-start'>";
		echo "<i class='icon-";
		echo $name_url;
		echo "' style='font-size:800%;opacity:0.75;'></i></div>";
	}
	echo "</a></div>";

		//echo "<img src='./index_files/sites_svg/";
		//echo $name_url;
		//echo ".svg' class='img-fluid' style='height:80%;'>";
}

?>