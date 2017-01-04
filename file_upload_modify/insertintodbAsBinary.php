<?php 
	$srcs=$_POST["src"];
	for ($i=0; $i <count($srcs) ; $i++) { 
		$s = base64_decode(str_replace('data:image/jpeg;base64,', '', $srcs[$i]));
		file_put_contents('img/'.$i.'.png', $s);
	}
	echo json_encode("success");
?>
