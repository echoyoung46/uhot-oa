<?php 

	include '../conn.php';
	$designNo = $_POST['designNo'];
	$series = $_POST['series'];
	$gender = $_POST['gender'];
	$style = $_POST['style'];
	$source = $_POST['source'];
	$newTime = $_POST['newTime'];
	$timeType = $_POST['timeType'];

	$sql = "INSERT INTO dress (design_no, series_id, d_gender, style, status, source) VALUES ('".$designNo."', '".$series."', '".$gender."', '".$style."', 0, '".$source."')";
	
	$result = mysql_query($sql) or die("Error in query: $sql. ".mysql_error());  

	if(!$result){
		echo '{"ret": 2001, "msg": "add new dress fail."}';
	}else{
		$query = "UPDATE dress set ".$timeType."  = '".$newTime."' WHERE design_no = '".$designNo."'";
		$result1 = mysql_query($query) or die("Error in query: $query. ".mysql_error()); 
		echo '{"ret": 0, "msg": "add new dress success."}';
	}

	mysql_close($conn);

 ?>