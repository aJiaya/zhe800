$(()=>{
    /* 侧边栏的移入哟移出 */
    $(".screenR").children("div").on("mouseenter","a",function(){
        $(this).children("p").css("display","block")
    })
    $(".screenR div").on("mouseleave","i",function(){
        $(this).children("p").css("display","none")
    })
})


/* 获取首页数据 */
// let allDiv=document.querySelector(".dealbox").querySelectorAll(".brand-cpc");
// let arr=[];
// allDiv.forEach(item=>{
//     let obj={};
//     obj.src=item.querySelector(".con").querySelector("img").src;

//     obj.title=item.querySelector(".con").querySelector(".title-time").querySelector(".title-url").innerText;

//     obj.discount=item.querySelector(".con").querySelector(".coupon-collect").querySelector(".coupon").innerText;

//     obj.lastTime=item.querySelector(".con").querySelector(".title-time").querySelector(".remain-time").innerText

//     obj.idname=item.getAttribute("data-id");
//     arr.push(obj)
// })