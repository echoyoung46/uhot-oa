<?php 

	include 'conn.php';
	$userid = $_GET["userid"];
	$pwd = $_GET["pwd"];
	$sql = "SELECT * FROM user WHERE u_pid = '$userid'"; 
	$query=mysql_query($sql);
	if($rs=mysql_fetch_array($query)){
		if ($pwd == $rs[3]) {
			echo '{"ret": 0, "ret_msg": "success", "user_id": '.$rs[1].', "user_name": "'.$rs[2].'", "user_department": "'.$rs[5].'","user_position": "'.$rs[6].'"}';
		} else {
			echo '{"ret": 1001, "ret_msg": "pwd error"}';
		}
	}else{
		echo '{"ret": 1002, "ret_msg": "user not exist"}';
	}
	mysql_close($conn);

 ?>