<?php
	header("Content-Type:text/html;charset=utf-8");
	//1、接受客户端的数据（用户输入的数据）
	$goodsId   = $_GET['goodsId'];
	
	//2、数据保存在数据库中
	//1）、建立连接（搭桥）
	$conn = mysqli_connect("localhost","root","root",'shoppingcenter');
	if(!$conn){
		die("数据库连接失败：".mysqli_error());
	}
	
	//3）、传输数据（过桥）
	$sqlstr = "delete from  goodsInfo where goodsId='{$goodsId}'";
    $result=mysqli_query($conn,$sqlstr);	
   
	if(!$result){
		die("删除SQL语句执行失败".mysqli_error());
		echo 0; //1：表示删除成功，0：表示删除失败。
	}	
	//4）、关闭连接（拆桥）
	mysqli_close($conn);
	
	//3、给客户端返回（响应）！
	
	if(!$result){
		echo 0;
	}else{
		echo 1;
	}	
?>