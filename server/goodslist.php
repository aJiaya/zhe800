<?php

include_once "./connectDB.php";

mysqli_query($db,"SET NAMES utf8");

$page=$_REQUEST["page"];
$sort=$_REQUEST["sort"];

$limit=$page*10;

$sql = "SELECT * FROM goodslist Order BY idname LIMIT $limit,20";
$result = mysqli_query($db,$sql);



$data = mysqli_fetch_all($result,MYSQLI_ASSOC);

echo json_encode($data,true);

?>