<?php

include_once "./connectDB.php";
mysqli_query($db,"SET NAMES utf8");

$user_ID=$_REQUEST["user_ID"];

/* 多表查询 */
$sql="SELECT shoppingcar.*,goodslist.src,goodslist.title,goodslist.price,goodslist.lastTime FROM shoppingcar , goodslist WHERE shoppingcar.goods_ID = goodslist.idname";

$result=mysqli_query($db,$sql);

$data = mysqli_fetch_all($result,MYSQLI_ASSOC);

echo json_encode($data,true);





?>