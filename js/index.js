$(function () {
    /*搜索框获得焦点时跳转到搜索页*/
    linkToSearchPage();
    function linkToSearchPage () {
        var keyword_search = $("#keyword_search");
        keyword_search.focus(function () {
            location.href = "pro_search.html";
        })
    }
});
