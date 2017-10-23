$(function(){
    slideNavTab();
    linkToSearchPage();

    function slideNavTab () {
       var slider_nav = $(".slider_nav li");
       var content = $(".content ul");
        slider_nav.each(function (i){
           if($(this).hasClass("current")){
               content.eq(i).css("display","block").siblings().css("display","none");
           }
        });
       slider_nav.click(function () {
           $(this).addClass("current").siblings().removeClass("current");
           var index = $(".slider_nav li").index(this);
           content.eq(index).css("display","block").siblings().css("display","none");

       })
   }

    /*搜索框获得焦点时跳转到搜索页*/
    function linkToSearchPage () {
        var keyword_search = $("#keyword_search");
        keyword_search.focus(function () {
            location.href = "pro_search.html";
        })
    }
});