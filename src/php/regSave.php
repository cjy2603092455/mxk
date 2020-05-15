<?php
    header('content-type:text/html;charset=utf-8');

    //一、获取前端发来的数据
    $name = $_POST['username'];
    $pass = $_POST['userpass'];

    //二、数据库
    //1.连接数据库
    $conn = mysqli_connect('localhost','root','root','shoppingcenter');

    //2.执行sql语句

    $result = mysqli_query($conn,"insert into vip(username,userpass) value('{$name}','{$pass}')");
    //关闭数据库
    mysqli_close($conn);

    //响应
    if($result){
        echo '1';
    }else{
        echo '0';
    }
?>