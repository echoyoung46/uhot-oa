<?php 

    header("Content-Type: text/html;charset=utf-8");
    
	include("../conn.php");          // 引入数据库连接
 
    $designNo = $_GET["designNo"];
    $count = $_GET["count"];
    $storage = $_GET["storage"];

    $sql = "UPDATE dress SET reple_count = '".$count."',reple_storage = '".$storage."' WHERE design_no = ".$designNo;

    $result = mysql_query($sql);

    if( $result ){
        echo '{"ret": 0, "msg": "submit success."}';
    }else{
        echo '{"ret": 3002, "msg": "submit fail."}';
    }

	mysql_close($conn);

 ?>