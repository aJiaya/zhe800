<?php

include_once "./connectDB.php";


$goods_ID=$_REQUEST["goods_ID"];
$user_ID=$_REQUEST["user_ID"];
$num=$_REQUEST["num"];

$sql="SELECT * FROM shoppingCar WHERE goods_ID=$goods_ID AND user_ID=$user_ID";
$result=mysqli_query($db,$sql);
$num=mysqli_num_rows($result);

if($num==0){
    $sql="INSERT INTO shoppingCar".
        "(goods_ID,user_ID,num)".
        "VALUES".
        "($goods_ID,$user_ID,$num)";
}elseif($num==1){
    $sql="UPDATE shoppingCar SET num =num+1 WHERE goods_ID=$goods_ID AND user_ID=$user_ID";
}

$retval=mysqli_query($db,$sql);

if(!$retval){
    die("添加到购物车失败：".mysqli_error($conn));
}
echo "添加成功";

?>