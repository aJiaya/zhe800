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
    getData("default");

    function getData(sort,page=0){
        $.ajax({
            url: "../../zhe800/server/index.php",
            dataType: "json",
            data:{
                sort,
                page:page
            }
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
            }).join("")
            $(".goodsMes").html(html)
        });
    }
    
    /* 分页器的处理 */
    /* Ajax请求获得数据动态生成分页器 */
    getPageCount()
    function getPageCount(){
        $.ajax({
            type: "get",
            url: "../../zhe800/server/getPageCount.php",
            success: function (response) {
                let pageStr="";
                for(let i=0;i<response;i++){
                    pageStr +=`
                    <li class="page-item page-itemOne ${i==0?"active":""}"><a class="page-link" href="#">${i+1}</a></li>
                    `
                }
                $(pageStr).insertBefore("#nextOne");
            }
        });
    }

    /* 分页功能的实现 */
    $(".pagination").on("click",".page-itemOne",function(){
        let page=$(this).text()*1-1;
        getData("default",page);
        /* 设置class名用于上下页操作 */
        $(this).addClass("active").siblings().removeClass("active");
    })

    /* 上一页与下一页功能实现 */
    $("#prevOne,#nextOne").click(function(){
        let page=$(".active").text()*1-1;
        if(this.id=="prevOne"){
            page--;
        }else if(this.id=="nextOne"){
            page++;
        }
        $(".page-itemOne").eq(page).addClass("active");
        $(".page-itemOne").eq(page).siblings().removeClass("active");
        getData("default",page);
    })





})

