$(() => {
    /* 侧边栏的移入哟移出 */
    $(".screenR").on("mouseenter", "div", function () {
        $(this).children("p").css("display", "block")
    })
    $(".screenR").on("mouseleave", "a", function () {
        $(this).next().css("display", "none")
    })



    //当点击跳转链接后，回到页面顶部位置
    $(".goTop").click(function () {
        if ($('html').scrollTop()) {
            $('html').animate({ scrollTop: 0 }, 100);//动画效果
            return false;
        }
        $('body').animate({ scrollTop: 0 }, 100);
        return false;
    });

    /* nav点击事件 */
    $(".nav-wrap").on("click", "a", function () {
        $(".nav-wrap").children().removeClass("nav_high")
        $(this).addClass("nav_high");


    })



    /* 检测登录用户 */
    if (localStorage.getItem("userID")) {
        /* 删除前面的QQ登录 */
        $(".downloadQQ").remove();
        /* 设置登录名 */
        let str = ("欢迎您，" + localStorage.getItem("username")).toString();
        $(".user").text(str)
        $(".user").css({ "height": "30px", "line-height": "30px" })
    }else{
        alert("请登录后浏览网站")
        location.href="../client/record.html"
    }

    
    /* 点击logo跳转首页 */
    $(".searchL").click(function(){
        location.href="../client/index.html"
    })













})
