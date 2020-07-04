<?php


include_once "./connectDB.php";
mysqli_query($db,"SET NAMES utf8");

$nameID=$_REQUEST["goodsNameid"];

$sql="SELECT * FROM goodslist WHERE idname=$nameID";
$result=mysqli_query($db,$sql);
$num=mysqli_num_rows($result);


$result=mysqli_query($db,$sql);

$data = mysqli_fetch_all($result,MYSQLI_ASSOC);

echo json_encode($data,true);

















?>