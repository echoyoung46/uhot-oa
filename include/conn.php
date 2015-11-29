<?php 

	$host ="localhost:3306";              //服务器地址
    $root ="root";                        //用户名
    $password ="root";           //密码
    $database ="uhot";                  //数据库名
                     
    $conn = mysql_connect($host,$root,$password);   //连接数据库

    //转码，正常读取数据库
    mysql_query("set character set 'utf8'");//读库 
    mysql_query("set names 'utf8'");//写库 

    if(!$conn){
        die("数据库连接失败!".mysql_error());
    }else{
        // echo"数据库连接成功";
    }
                         
    mysql_select_db($database, $conn);     //选择数据库
    mysql_query("set names utf-8");        //设置编码为utf-8

 ?>