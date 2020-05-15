<?php
    header('content-type:text/html;charset=utf-8');

    //一、获取前端发来的数据
    $name = $_GET['username'];
    //二、数据库
    //1.连接数据库
    $conn = mysqli_connect('localhost','root','root','shoppingcenter');

    //2.执行sql语句
    $result = mysqli_query($conn,"select * from vip where username='{$name}'");
    //关闭数据库
    mysqli_close($conn);

    //响应
    $arr = mysqli_fetch_all($result,MYSQLI_ASSOC);
    if(count($arr)>0){
        echo '1';   //用户名已存在
    }else{
        echo '0';   //用户名不存在
    }
?>