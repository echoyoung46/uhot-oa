<?php 

    header("Content-Type: text/html;charset=utf-8");
    
	include("../conn.php");          // 引入数据库连接
 
    $sendType = $_GET["sendType"];
    $designNo = $_GET["designNo"];

    $sql = "UPDATE dress SET send_type = '".$sendType."' WHERE design_no = ".$designNo;

    $result = mysql_query($sql);

    if( $result ){
        echo '{"ret": 0, "msg": "submit success."}';
    }else{
        echo '{"ret": 3002, "msg": "submit fail."}';
    }

	mysql_close($conn);

 ?>