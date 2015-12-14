<?php 

	include 'conn.php';
	$userid = $_GET["userid"];
	$sql = "SELECT * FROM user WHERE u_pid = '$userid'"; 
	$query=mysql_query($sql);
	if($rs=mysql_fetch_array($query)){
		echo '{"ret": 0, "ret_msg": "success", "user_id": '.$rs[1].', "user_name": "'.$rs[2].'",  "user_gender": "'.$rs[4].'","user_department": "'.$rs[5].'","user_position": "'.$rs[6].'",  "user_tel": "'.$rs[7].'",  "user_mobile": "'.$rs[8].'"}';
	}else{
		echo '{"ret": 1002, "ret_msg": "user not exist"}';
	}
	mysql_close($conn);

 ?>