$(() => {
    /* 移除nav */
    $(".nav-wrap").remove();
    /* 移除侧边栏 */
    $(".screenR").remove();



    /* Ajax请求获得商品信息 */
    let user_ID = localStorage.getItem("userID") || "";

    $.ajax({
        url: "../../zhe800/server/getShoppingCar.php",
        data: { user_ID },
        dataType: "json"
    }).done(data => {
        data = dataTool(data);
        renderShoppingCar(data);
    });

    /* 提取lastTime（当作店铺） */
    function dataTool(data) {
        let arr = [];
        data.forEach(item => {
            let result = arr.filter((ele) => ele.store == item.lastTime);
            if (result.length == 0) {
                arr.push({ store: item.lastTime, goods: [] });
            }
        });

        /* 将其余数据加到goods中 */
        data.forEach(item => {
            arr.forEach(ele => {
                if (ele.store == item.lastTime) {
                    ele.goods.push(item);
                }
            })
        })

        return arr;
    }


    /* 动态生成购物车 */
    function renderShoppingCar(orderData) {
        let html = "";
        let listOne = "";

        orderData.forEach(data => {
            let listHtml = data.goods.map(item => {
                return `
                <div class="item_goods" data-gid=${item.goods_ID}>
                <p class="p1">
                    <input type="checkbox" class="goodsItem">
                </p>
                <p class="p2">
                    <a href="#">
                        <img src="${item.src}"
                            alt="">
                    </a>
                    <a href="#">${item.title}</a>
                </p>
                <p class="p3">
                    <span class="goods_prices">${item.price}</span>
                </p>
                <p class="p4">
                    <i class="cut_count"></i>
                    <input type="text" value=${item.num} class="countsVal">
                    <i class="add_count"></i>
                </p>
                <p class="oneGoods_price">
                    ${item.num * item.price}
                </p>
                <p class="deleCounts">删除</p>
                </div>
                `
            }).join("");
            listOne = listHtml;

            let carBoxHtml = `
            <div class="car_item">
                <div class="item_tit clear_fix">
                    <h3 class="float_l">${data.store}</h3>
                    <a href="#" class="float_l">去凑单></a>
                </div>
                ${listHtml}
            </div>
            
            `
            html += carBoxHtml;


        })
        $(".allShoppingCar").append(html);

    }





    /* 数量加减按钮 */
    $(".allShoppingCar").on("click", ".cut_count", function () {
        if ($(this).next().val() == 1) {
            return;
        }
        $(this).next().val(Number($(this).next().val()) - 1);
        /* 价格改变 */
        $(this).parent().next().text((Number($(this).parent().prev().children(".goods_prices").text()) * Number($(this).next().val())).toFixed(2));
        /* 总价格 */
        if ($(this).parent().prevAll().eq(2).children().is(":checked") == true) {
            allMoneyAndCounts()
        }
        /* Ajax请求数据库的增加 */
        let goods_id = $(this).parent().parent().attr("data-gid");

        $.ajax({
            url: "../../zhe800/server/cutCarCounts.php",
            data: { goods_id, user_ID },
            dataType: "json"
        });
    })
    $(".allShoppingCar").on("click", ".add_count", function () {
        $(this).prev().val(Number($(this).prev().val()) + 1);
        /* 价格改变 */
        $(this).parent().next().text((Number($(this).parent().prev().children(".goods_prices").text()) * Number($(this).prev().val())).toFixed(2));
        /* 总价格 */
        if ($(this).parent().prevAll().eq(2).children().is(":checked") == true) {
            allMoneyAndCounts()
        }
        /* Ajax请求数据库的增加 */
        let goods_id = $(this).parent().parent().attr("data-gid");

        $.ajax({
            url: "../../zhe800/server/addCarCounts.php",
            data: { goods_id, user_ID },
            dataType: "json"
        });
    })

    /* 数量框输入 */
    $(".allShoppingCar").on("blur", ".countsVal", function () {
        $(this).parent().next().text(Number($(this).val()) * Number($(this).parent().prev().children(".goods_prices").text()))
        /* Ajax请求改变商品数量 */
        let goods_id = $(this).parent().parent().attr("data-gid");
        let goods_num=$(this).val();
        $.ajax({
            url: "../../zhe800/server/changeCarCounts.php",
            data: { goods_id, user_ID,goods_num },
            dataType: "json"
        });
    })

    /* 删除按钮 */
    $("#shoppingCarMes").on("click", ".deleCounts", function () {
        if (confirm("您确定要删除吗？")) {
            /* Ajax请求删除数据库信息 */
            let goods_id = $(this).parent().attr("data-gid");

            $.ajax({
                url: "../../zhe800/server/deleCarCounts.php",
                data: { goods_id, user_ID },
                dataType: "json"
            });
            /* 移除商品信息 */
            if ($(this).parent().siblings(".item_goods").length == 0) {
                $(this).parent().parent().remove();
                return;
            }
            $(this).parent().remove();

        }
    })


    /* 每列商品前选择框的点击事件 */
    $(".allShoppingCar").on("click", ".goodsItem", function () {
        //选中触发事件
        if ($(this).is(":checked") == true) {
            allMoneyAndCounts()
            /* 样式改变 */
            $(this).parent().parent().css("background", "#fdf4f6")
        } else {
            //取消选中触发事件
            /* 总价计算 */
            allMoneyAndCounts()
            /* 样式改变 */
            $(this).parent().parent().css("background", "#fafafa")
        }
    })


    
    /* 全选 */

    $(".mark").attr("checked", "checked");






   


    /* 总金额和数量 */
    function allMoneyAndCounts() {
        /* 总金额 */
        let num = 0;
        let numOne = 0;
        $(".goodsItem").each(function (index, item) {

            if ($(item).is(":checked") == true) {
                num += $(item).parent().siblings(".oneGoods_price").text() * 1
                /* 总数量 */
                numOne += $(item).parent().nextAll().eq(2).children(".countsVal").val() * 1
            }
        });
        $("#allGoodsPrices").text(num)
        $("#allGoodsCounts").text(numOne)

    }









})