<?php namespace operatordept;

readonly class DocumentPath{
   public string $fullPath;
   public string $rootPath;
   
   function __construct()
   {
		if($_SERVER['SERVER_NAME'] == 'localhost'){
			$this->fullPath = $_SERVER['DOCUMENT_ROOT']."/operator-dept/";
         $this->rootPath = "/operator-dept";
    	}
		else{
			$this->fullPath = "";
         $this->rootPath = "";
    	}
   }
}

?>