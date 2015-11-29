<?php 

    header("Content-Type: text/html;charset=utf-8");
    
	include("../conn.php");          // 引入数据库连接
 
    $designNo = $_GET["designNo"];
    $count = $_GET["failInCount"];

    $sql = "UPDATE dress SET fail_in_count = '".$count."' WHERE design_no = ".$designNo;

    $result = mysql_query($sql);

    if( $result ){
        echo '{"ret": 0, "msg": "submit success."}';
    }else{
        echo '{"ret": 3002, "msg": "submit fail."}';
    }

	mysql_close($conn);

 ?>