<?php


include_once "./connectDB.php";

$size=11;

$sql="SELECT * FROM home";

$result=mysqli_query($db,$sql);

$total=mysqli_num_rows($result);

$num=ceil($total / $size);

echo $num;
































?>