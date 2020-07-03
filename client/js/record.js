$(function () {

    $(".userName").val(13106722676);
    $(".userPass").val(13106722676);

    $("#recordBtn").click(function () {
        if ($(".userName").val() == "" || $(".userPass").val() == "") {
            $(".helpMes").text("所填不能为空");
            $(".helpMes").css("color", "red");
        } else {
            $(".helpMes").text("");

            let username=$.trim($(".userName").val());
            let userpass=$.trim($(".userPass").val());
            $.ajax({
                type: "post",
                url: "../../zhe800/server/record.php",
                data: `username=${username}&userpass=${userpass}`,
                dataType: "json"
            }).done(data=>{
                console.log(data)
                if(data.status=="success"){
                    /* ..登录成功.. */
                    /* (1) 要把用户的id和名字保存起来 */
                    localStorage.setItem("userID",data.d.userId)
                    localStorage.setItem("username",data.d.username)
                    // console.log(data,"+++")
                    /* (2) 跳转回列表页 */
                    alert(data.d.msg);
                    location.href="./index.html";
                }else{
                    alert(data.msg);
                }
            });
        }
    })
})