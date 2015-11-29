<?php 

    header("Content-Type: text/html;charset=utf-8");
    
	include("../conn.php");          // 引入数据库连接
 
    $designNo = $_GET["designNo"];
    $materialType = $_GET['materialType'];
    $status = $_GET["status"];
    if($materialType == 'is_accessory_send'){
        $anotherType = 'is_material_send';
    }else{
        $anotherType = 'is_accessory_send';
    }
    $sql = "UPDATE dress SET ".$materialType."  = 1 WHERE design_no = ".$designNo;

    $result = mysql_query($sql);

    if( $result ){
        $sql1 = "SELECT * FROM dress WHERE design_no = ".$designNo;
        $result1 = mysql_query($sql1);
        if($result1){
            while ($row = mysql_fetch_object($result1)){
                if($anotherType == 'is_material_send'){
                    $anotherStatus = $row->is_material_send;
                }else if($anotherType == 'is_accessory_send'){
                    $anotherStatus = $row->is_material_send;
                }
                if($anotherStatus == 1){
                    $sql2 = "UPDATE dress SET status = '".$status."' WHERE design_no = ".$designNo;
                    $result2 = mysql_query($sql2);
                    if($result2){
                        echo '{"ret": 0, "msg": "update success."}';
                    }else{
                        echo '{"ret": 3002, "msg": "update schedule fail."}';
                    }
                }else{
                    echo '{"ret": 1001, "msg": "material cant send."}';
                }
            }
            
        }
        
    }else{
        echo '{"ret": 3003, "msg": "no not exists."}';
    }

	mysql_close($conn);

 ?>