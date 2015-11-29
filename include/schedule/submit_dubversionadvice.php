<?php 

    header("Content-Type: text/html;charset=utf-8");
    
	include("../conn.php");          // 引入数据库连接
 
    $advice = $_GET["advice"];
    $designNo = $_GET["designNo"];

    $sql = "UPDATE dress SET dubversion_advice = '".$advice."' WHERE design_no = ".$designNo;

    $result = mysql_query($sql);

    if( $result ){
        echo '{"ret": 0, "msg": "adopt success."}';
    }else{
        echo '{"ret": 3002, "msg": "adopt sampler fail."}';
    }

	mysql_close($conn);

 ?>