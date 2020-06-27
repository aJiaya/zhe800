$(function () {
    //用户验证
    $("#userName").blur(function () {
        let userReg = /^1\d{10}$/;
        if (userReg.test($("#userName").val())) {
            $("#userName").next().text("√");
            $("#userName").next().css("color", "green")
        } else {
            $("#userName").next().text("用户名必须是手机号");
            $("#userName").next().css("color", "red")
            $("#userName").css("border-color", "red")
        }
        if ($("#userName").val() == "") {
            $("#userName").next().text("用户名不能为空");
            $("#userName").next().css("color", "red")
            $("#userName").css("border-color", "red")
        }
    })

    //密码验证
    $("#userPass").blur(function () {
        let passReg = /^\w{6,24}$/
        if (passReg.test($("#userPass").val())) {
            $("#userPass").next().text("√");
            $("#userPass").next().css("color", "green")
        } else {
            $("#userPass").next().text("6-20位字符，建议由字母，数字和符号两种以上组合");
            $("#userPass").next().css("color", "red")
            $("#userPass").css("border-color", "red")
        }
        if ($("#userPass").val() == "") {
            $("#userPass").next().text("密码不能为空");
            $("#userPass").next().css("color", "red")
            $("#userPass").css("border-color", "red")
        }
    })

    //确认密码
    $("#checkBox").blur(function () {
        if ($("#checkBox").val() == $("#userPass").val()) {
            $(".checkPass").text("密码正确");
            $(".checkPass").css("color", "green")
        } else {
            $(".checkPass").text("两次密码输入不一致");
            $(".checkPass").css("color", "red")
            $("#checkBox").css("border-color", "red")
        }
        if ($("#checkBox").val() == "") {
            $(".checkPass").text("确认密码不能为空");
            $(".checkPass").css("color", "red")
            $("#checkBox").css("border-color", "red")
        }
    })

    //验证码
    //生成验证码
    let res = "";
    for (let i = 1; i <= 4; i++) {
        let t = parseInt(Math.random() * 16)
        let num = t.toString(16)
        res += num
    }
    $(".checkNum").text(res);

    //更改验证码
    $(".nextOne").click(function () {
        let res = "";
        for (let i = 1; i <= 4; i++) {
            let t = parseInt(Math.random() * 16)
            let num = t.toString(16)
            res += num
        }
        $(".checkNum").html(res);
    })
    //验证码的验证
    $("#checkText").blur(function () {
        if ($("#checkText").val() == $(".checkNumone").text()) {
            $(".nextOne").next().text("√");
            $(".nextOne").next().css("color", "green")
            return true;
        } else {
            $(".nextOne").next().text("×");
            $(".nextOne").next().css("color", "red")
        }
        if ($("#checkText").val() == "") {
            $(".nextOne").next().text("验证码不能为空");
            $(".nextOne").next().css("color", "red")
        }
    })
})