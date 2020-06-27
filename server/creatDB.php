<?php

$userName=$_POST["uName"];
$userPass=$_POST["uPass"];


$db = mysqli_connect("127.0.0.1", "root", "root", "LILI");

if (!$db) {
  die('连接错误: ' . mysqli_error($db));
}

$sql="INSERT INTO user" .
"(userName,userPass)" .
  "VALUES " .
  "($userName,'$userPass')";

?>