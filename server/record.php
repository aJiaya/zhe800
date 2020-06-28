<?php

$username = $_REQUEST["username"];
$userpass = $_REQUEST["userpass"];

include_once "./connectDB.php";

$sql="SELECT * FROM `password` WHERE userName = '$username'";

$r=mysqli_query($db,$sql);

$num =mysqli_num_rows($r);

if($num==1){
    $data=mysqli_fetch_all($r,MYSQLI_ASSOC)[0];
    if($userpass===$data["userPass"]){
        echo '{"status":"success","msg":"登录成功"}';
    }else{
        echo '{"status":"error","msg":"登录失败"}';
    }
}else{
    echo '{"status":"error","msg":"该用户不存在！"}';
}

?>