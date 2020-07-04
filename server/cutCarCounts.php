<?php

include_once "./connectDB.php";


$good_id = $_REQUEST["goods_id"];
$user_id = $_REQUEST["user_ID"];

$sql = "SELECT * FROM shoppingcar WHERE goods_ID = $good_id AND user_ID = $user_id";


$result=mysqli_query($db,$sql);
$num=mysqli_num_rows($result);

if($num==1){
   $sql = "UPDATE shoppingcar SET num = num -1 WHERE goods_ID = $good_id AND user_ID = $user_id"; 
}




$retval=mysqli_query($db,$sql);

if(!$retval){
    die("减号失败：". mysqli_error($conn));
}

echo "减号成功";






?>