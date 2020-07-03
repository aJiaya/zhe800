$(()=>{

    /* 动态生成商品详情 */
    let goodsNameid=localStorage.getItem("goodsNameID");
    $.ajax({
        url: "../../zhe800/server/goodsDetails.php",
        data: {goodsNameid},
        dataType: "json"
    }).done(data=>{
        let htmlstr=`
        <div id="details" class="clear_fix" data-goodsID=${data[0].idname}>
        <div class="details_l float_l">
            <figure class="show_bigpho">
                <img src=${data[0].src} alt="">
            </figure>
            <ul class="clear_fix show_pho">
                <li class="hightColor">
                    <img src=${data[0].src} alt="">
                </li>
                <li>
                    <img src="https://z3.tuanimg.com/imagev2/trade/800x800.3f0ff863fe21e8afc93aae520addd9a9.400x.jpg" alt="">
                </li>
                <li>
                    <img src="https://z3.tuanimg.com/imagev2/trade/800x800.80efc9d0743dcd7065a011513d998771.400x.jpg" alt="">
                </li>
                <li>
                    <img src="https://z3.tuanimg.com/imagev2/trade/800x800.0af796dc0dc0a1a3a6c25afec5df6ffe.400x.jpg" alt="">
                </li>
                <li>
                    <img src="https://z3.tuanimg.com/imagev2/trade/800x800.76247f6299933f6c8afb3da9881eaee1.400x.jpg" alt="">
                </li>
            </ul>
        </div>
        <div class="details_R float_l">
            <div class="details_mes float_l">
                <h3>
                    ${data[0].title}
                </h3>
                <div class="price_box">
                    <strong>
                        ¥<i>${data[0].price}</i>
                        <em>¥299.00</em>
                    </strong>
                    <p class="details_p1">
                        <span>积分</span>
                        <span>积分可抵订单金额  最多返27积分</span>
                    </p>
                    <p class="details_p2">
                        <span>优惠</span>
                        <span>指定商品领券满159元减8元 ></span>
                    </p>
                </div>
                <p class="goods_allmes">
                    <span>运费</span>
                    <span>上海  至 广东 ∨ 免运费</span>
                </p>
                <p class="goods_allmes">
                    <span>服务</span>
                    <span>本商品由折800买手砍价</span>
                </p>
                <p class="goods_allmes goods_color">
                    <span>颜色</span>
                    <span class="color_box">
                        <img src="https://z3.tuanimg.com/imagev2/trade/800x800.72310c2a009960f8af7cdc18d3fa67dd.400x.jpg" alt="">
                    </span>
                    <span class="color_box">
                        <img src="https://z3.tuanimg.com/imagev2/trade/800x800.f5d2abb6c250fac4dbcb5ec9570a60c1.400x.jpg" alt="">
                    </span>
                    <span class="color_box">
                        <img src="https://z3.tuanimg.com/imagev2/trade/800x800.fde8221a9e4bd41b2477671ecca6b601.400x.jpg" alt="">
                    </span>
                    <span class="color_box">
                        <img src="https://z3.tuanimg.com/imagev2/trade/800x800.6acc0cf5ce437fc287195c437689a627.400x.jpg" alt="">
                    </span>
                </p>
                <p class="goods_allmes goods_size">
                    <span>尺码</span>
                    <span>均码</span>
                </p>
                <p class="goods_allmes goods_count">
                    <span>数量</span>
                    <span>
                        <i class="cut_count">-</i>
                        <input type="text" value="1" id="Counts">
                        <i class="addCounts">＋</i>
                    </span>
                </p>    
                <div class="submit_box">
                    <input type="button" value="立即购买" id="buyNow">
                    <input type="button" value="加入购物车" id="addGoodsOne">
                </div>            
            </div>
            <aside class="float_l">
                <h4>
                    <a href="#">苏醒的乐园wake-up服饰特卖店</a>
                </h4>
                <p>
                    <span>描述综合评分：</span>
                    <span>
                        4.9 ↑</span>
                </p>
                <p>
                    <span>服务综合评分：</span>
                    <span>
                        4.9 ↑</span>
                </p>
                <p>
                    <span>发货综合评分：</span>
                    <span>
                        4.9 ↑</span>
                </p>
            </aside>
        </div>
    </div>
        `

        
        $("#gOne").append($(htmlstr))
    });






    /* 图片移入移出事件 */
    $("#gOne").on("mouseenter","li",function(){
        console.log(11)
        $(this).addClass("hightColor")
        $(this).siblings().removeClass("hightColor")
        $(".show_bigpho").children("img").attr("src",$(this).children("img").attr("src"))
    })

    /* 颜色选择 */
    $("#gOne").on("click",".color_box",function(){
        $(this).css("border-color","#ec1611")
        $(this).siblings().css("border-color","#ccc")
        $(".show_bigpho").children("img").attr("src",$(this).children("img").attr("src"))
        $(".show_pho").children("li").removeClass("hightColor")
    })

    /* 数量加减按钮 */
    $("#gOne").on("click",".addCounts",function(){
        
        $("#Counts").val(Number($("#Counts").val())+1);
    })
    $("#gOne").on("click",".cut_count",function(){
        if($("#Counts").val()==1){
            return
        }
        $("#Counts").val($("#Counts").val()-1);
    })


    /* 加入购物车 */
    $("#gOne").on("click","#addGoodsOne",function(){
        let goods_ID=$(this).parent().parent().parent().parent().attr("data-goodsID");
        let num=$("#Counts").val();
        let user_ID=localStorage.getItem("userID");
        let user_name=localStorage.getItem("username")
        if(user_name && user_ID){
            $.ajax({
                url:"../../zhe800/server/listAddCar.php",
                data:{user_ID,goods_ID,num}
            }).done(data=>{
                alert(data)
            })
        }else{
            location.href="../client/record.html"
        }
    })

    /* 立即购买 */
    $("#gOne").on("click","#buyNow",function(){
        location.href="../client/shoppingCar.html";
    })
















})