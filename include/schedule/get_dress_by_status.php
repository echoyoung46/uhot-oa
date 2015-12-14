<?php 

    include("../conn.php");          // 引入数据库连接

    $status = $_GET["status"];
    // $source = $_GET["source"];
    if(isset($_GET['status1'])){
        $status1 = $_GET["status1"];
        if(isset($_GET['source'])){
            $source = $_GET["source"];
            $sql2 = "SELECT * FROM dress WHERE status = $status OR status = $status1 AND source = $source";
        }else{
            $sql2 = "SELECT * FROM dress WHERE status = $status OR status = $status1";
        }
    }else{
        if(isset($_GET['source'])){
            $source = $_GET["source"];
            $sql2 = "SELECT * FROM dress WHERE status = $status AND source = $source";
        }else{
            $sql2 = "SELECT * FROM dress WHERE status = $status";
        }
    }
 
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