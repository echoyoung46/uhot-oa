<?php 

    header("Content-Type: text/html;charset=utf-8");
    
	include("../conn.php");          // 引入数据库连接
 
    $designNo = $_GET["designNo"];

    $sql1 = "SELECT * from  dress WHERE design_no = ".$designNo;

    $result1 = mysql_query($sql1);

    while ($row = mysql_fetch_object($result))
    {
        $curr_count =  $row->dubversion_count;
        $new_count = $curr_count + 1;

        $sql2 = "UPDATE dress SET dubversion_count = '".$curr_count."' WHERE design_no = ".$designNo;
        $result2 = mysql_query($sql2);
        if( $result2 ){
            echo '{"ret": 0, "msg": "update dubversion count success."}';
        }else{
            echo '{"ret": 3003, "msg": "update dubversion count fail."}';
        }
    }

	mysql_close($conn);

 ?>