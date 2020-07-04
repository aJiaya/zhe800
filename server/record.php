<?php

$username = $_REQUEST["username"];
$userpass = $_REQUEST["userpass"];

include_once "./connectDB.php";

$sql="SELECT * FROM `password` WHERE userName = $username";

$r=mysqli_query($db,$sql);

$num =mysqli_num_rows($r);

if($num==1){
    $data=mysqli_fetch_all($r,MYSQLI_ASSOC);
    // echo "4444";
    // print_r($data);
    // print_r($data[0]);
    
    $data = $data[0];
    
    if($userpass===$data["userPass"]){
        $userID=$data["userId"];
        $d["status"] = "success";
        $d["d"]["msg"] = "恭喜你，登录成功";
        $d["d"]["userId"] = $userID;
        $d["d"]["userpass"] = $userpass;
        $d["d"]["username"] = $username;

        // print_r($d);
        echo json_encode($d,true);
    }else{
        echo '{"status":"error","msg":"登录失败"}';
    }
}else{
    echo '{"status":"error","msg":"该用户不存在！"}';
}

?>