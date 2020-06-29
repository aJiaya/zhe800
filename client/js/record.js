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
                if(data.status=="success"){
                    alert(data.msg);
                    location.href="../index.html";
                }else{
                    alert(data.msg);
                }
            });
        }
    })
})