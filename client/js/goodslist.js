$(() => {

    /* 商品列表发生Ajax请求 */
    getData("default");


    function getData(sort, page = 0) {
        $.ajax({
            url: "../../zhe800/server/goodslist.php",
            dataType: "json",
            data:{
                sort,
                page:page
            }
        }).done(data => {
            let html = data.map(item => {
                return `
            <li data-id=${item.idname}>
                    <a href="#" class="img_links">
                        <img src="${item.src}" alt="">
                    </a>
                    <h3>
                        <a href="#">
                            ${item.title}
                        </a>
                    </h3>
                    <h4>
                        <em>
                            <b>¥</b>${item.price}
                        </em>
                        <span>${item.lastTime}</span>
                    </h4>
                    <div class="links_bottom">
                        <input type="button" value="加入购物车" class="addCar">
                    </div>
        </li>
            `
            }).join("")
            $(".all_list").html(html)
        });

    }




    /* 商品列表的移出移入 */
    $(".all_list").on("mouseenter", "li", function () {
        $(this).children("div").css("display", "block")
    })
    $(".all_list").on("mouseleave", "li", function () {
        $(this).children("div").css("display", "none")
    })

    /* 加入购物车的点击事件 */
    $(".all_list").on("click", ".addCar", function () {
        let goods_ID = $(this).parent().parent().attr("data-id");
        let user_ID = localStorage.getItem("userID");
        let user_name = localStorage.getItem("username")
        if (user_name && user_ID) {
            $.ajax({
                url: "../../zhe800/server/addCar.php",
                data: { user_ID, goods_ID }
            })
        } else {
            location.href = "../client/record.html"
        }
    })



    /* 跳转详情页 */
    $(".all_list").on("click", "a", function () {
        let nameID = $(this).parent().attr("data-id") || $(this).parent().parent().attr("data-id");
        localStorage.setItem("goodsNameID", nameID);
        location.href = "../client/goodsDetails.html"
    })

    /* 分页器的处理 */
    /* Ajax请求获得数据动态生成分页器 */
    getPageCount()
    function getPageCount() {
        $.ajax({
            type: "get",
            url: "../../zhe800/server/getPageCount.php",
            success: function (response) {
                let pageStr = "";
                for (let i = 0; i < response; i++) {
                    pageStr += `
                    <li class="page-item page-itemOne ${i == 0 ? "active" : ""}"><a class="page-link" href="#">${i + 1}</a></li>
                    `
                }
                $(pageStr).insertBefore("#nextOne");
            }
        });
    }

    /* 分页功能的实现 */
    $(".pagination").on("click", ".page-itemOne", function () {
        let page = $(this).text() * 1 - 1;
        getData("default", page);
        /* 设置class名用于上下页操作 */
        $(this).addClass("active").siblings().removeClass("active");
    })

    /* 上一页与下一页功能实现 */
    $("#prevOne,#nextOne").click(function () {
        let page = $(".active").text() * 1 - 1;
        if (this.id == "prevOne") {
            page--;
        } else if (this.id == "nextOne") {
            page++;
        }
        $(".page-itemOne").eq(page).addClass("active");
        $(".page-itemOne").eq(page).siblings().removeClass("active");
        getData("default", page);
    })




})




