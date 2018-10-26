<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-MEthods: GET, POST');

$target_dir = "uploads/";
$url = $_SERVER['REQUEST_URI']; //returns the current url
$parts = explode('/',$url);
$dir = "http://".$_SERVER['SERVER_NAME'];

for($i=0; $i < count($parts) -1; $i++) {
	$dir .=$parts[$i] . "/";
}

$actual_link = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
$target_file = $target_dir . basename($_FILES["uploadFile"]["name"]);
$uploadOk = 1;
$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);

if(isset($_POST["submit"])) {
	$check = getimagesize($_FILES["uploadFile"]["tmp_name"]);
	if($check !== false){
		echo "file is an image - ".$check["mime"]. ".";
		$uploadOk= 1;
	} else{
		echo "File is not an image";
		$uploadOk = 0;
	}
}

//check if file exists
if(file_exists($target_file)){
	echo "Sorry file already exists";
	$uploadOk = 0;
}


if($uploadOk == 0) {
	echo "sorry, your file was not uploaded";
} else {
	if(move_uploaded_file($_FILES["uploadFile"]["tmp_name"], $target_file)) {
		echo $dir. $target_file;

	} else{
		echo " sorry there was an error uploading your file";
	}
}


?>