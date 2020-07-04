<?php

include_once "./connectDB.php";


$good_id = $_REQUEST["goods_id"];
$user_id = $_REQUEST["user_ID"];
$goods_num=$_REQUEST["goods_num"];

$sql = "SELECT * FROM shoppingcar WHERE goods_ID = $good_id AND user_ID = $user_id";


$result=mysqli_query($db,$sql);
$num=mysqli_num_rows($result);

if($num==1){
   $sql = "UPDATE shoppingcar SET num = $goods_num WHERE goods_ID = $good_id AND user_ID = $user_id"; 
}




$retval=mysqli_query($db,$sql);

if(!$retval){
    die("数字改变失败：". mysqli_error($conn));
}

echo "数字改变成功";






?>