<?php

include_once "./connectDB.php";

$userName=$_REQUEST["uName"];
$userPass=$_REQUEST["uPass"];

$sql="SELECT * FROM `password` WHERE userName = '$userName'";

$r=mysqli_query($db,$sql);

$num=mysqli_num_rows($r);

if($num==1){
  echo '{"status":"error","msg":"该用户已经存在，请重新填写注册的昵称!!"}';
}else{
  $sql="INSERT INTO password ".
  "(userID,userName,userPass)" .
  "VALUES " .
  "(NULL,'$userName','$userPass')";

  $retval=mysqli_query($db,$sql);

  if(!$retval){
    die('无法插入数据：'.mysqli_error($conn));
  }

  echo '{"status":"success"}';
};

?>