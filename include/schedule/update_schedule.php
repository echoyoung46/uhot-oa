<?php 

    header("Content-Type: text/html;charset=utf-8");
    
	include("../conn.php");          // 引入数据库连接
 
    $status = $_GET["status"];
    $designNo = $_GET["designNo"];
    $timeType = $_GET['timeType'];
    $newTime = $_GET['newTime'];

    $sql = "UPDATE dress SET status = '".$status."', ".$timeType."  = '".$newTime."'  WHERE design_no = ".$designNo;

    $result = mysql_query($sql);

    if( $result ){
        echo '{"ret": 0, "msg": "update success."}';
    }else{
        echo '{"ret": 3002, "msg": "update schedule fail."}';
    }

	mysql_close($conn);

 ?>