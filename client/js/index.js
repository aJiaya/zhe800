$(() => {
    /* 二级菜单的移入哟移出 */
    $(".secondNav").on("mouseenter", "li", function () {
        $(this).children(".mesBox").css("display", "block");
        $(this).children("a").css("color", "red");
    })
    $(".secondNav").on("mouseleave", "li", function () {
        $(this).children(".mesBox").css("display", "none");
        $(this).children("a").css("color", "#333");
    })

    /* 商品列表发生Ajax请求 */
    $.ajax({
        url: "../../zhe800/server/index.php",
        dataType: "json"
    }).done(data=>{
        let html=data.map(item=>{
            return`
            <li data-id=${item.idname}>
            <a href="#" class="goodsPho">
                <img src="${item.src}" alt="">
            </a>
            <div>
                <a href="#">${item.title}</a>
                <span>${item.lastTime}</span>
            </div>
            <span class="goodsDis">${item.discount}</span>
        </li>
            `
        }).join()
        $(".goodsMes").html(html)
    });








})

