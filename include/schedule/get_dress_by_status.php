<?php 

    include("../conn.php");          // 引入数据库连接

    //获取参数
    $status = $_GET["status"];
    $source = $_GET["source"];
    
    //参数转化为可识别的数组
    $status = implode($status);
    $source = implode($source);
    
    $sql2 = "SELECT * FROM dress WHERE status IN ($status) AND source IN ($source)";
        
 
    $sql1 = "SELECT COUNT(*) AS count FROM dress";
    

    // 查询记录数
    $result1 = mysql_fetch_array(mysql_query($sql1)); 
    $count = $result1['count'];

    // 查询记录
    $result2 = mysql_query($sql2);

    $info = (object)null;
    
    $arr = array();
    if ($count > 0) {
        while($row = mysql_fetch_object($result2)){
            array_push($arr, $row);
        }
        $info -> ret = 0;
        $info -> msg = "success";
        $info -> total = $count;
        $info -> list = $arr;
        
    } else {
        $info -> ret = 2002;
        $info -> msg = "status not exist";
    }

    echo json_encode($info);
    mysql_close($conn);

 ?>