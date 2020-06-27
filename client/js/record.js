$(function () {
    $("#recordBtn").click(function () {
        if ($(".userName").val() == "" || $(".userPass").val() == "") {
            $(".helpMes").text("所填不能为空");
            $(".helpMes").css("color", "red");
        } else {
            $(".helpMes").text("");
            $.post("../../server/check.php", "uName=" + $(".userName").val()+"&uPAss=" + $(".userPass").val(),
                function (data, textStatus, jqXHR) {
                    alert(data)
                },
                "json"
            )
        }
    })
})