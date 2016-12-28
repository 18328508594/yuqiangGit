<?php 
	$num=count($_FILES["file"]["tmp_name"]);
	for($i=0;$i<$num;$i++){
 		move_uploaded_file($_FILES["file"]["tmp_name"][$i],
      	"./img/" .$_FILES["file"]["name"][$i]);
	} 
	echo json_encode($_FILES["file"]["type"][0]);
?>
