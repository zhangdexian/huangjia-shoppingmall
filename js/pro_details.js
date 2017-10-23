$(function(){
    var bth1 = $(".bth1");
    var bth2 = $(".bth2");
    /*pro_id  type = 1  查询并更改pro_details的标题*/
    /*pro_id  type = 2  修改状态*/

    getData();
    addToShopCart();
    buyRightNow();
    linkToSearchPage();

    /*搜索框获得焦点时跳转到搜索页*/
    function linkToSearchPage () {
        var keyword_search = $("#keyword_search");
        keyword_search.focus(function () {
            location.href = "pro_search.html";
        })
    }

    /*根据location中的产品id从数据库取得数据*/
    function getData () {
        var pro_id = getProIdByLocation();
        pro_id.type = 1;
        $.ajax({
            type: "POST",
            url: "admin/homepage.php",
            data: pro_id,
            dataType: "json",
            cache: false,
            success: function (data) {

                var pro_info =
                    "<div>"
                    +"<div class='pro-info'>"
                    +"<h5>"+data[0].title+data[0].desc+"</h5>"
                    +"<p>满200减20，满300减30，满500减50</p>"
                    +"<div><span>"+data[0].price+"</span><a href='#'>降价通知</a></div>"
                    +"</div>";
                var discount_info = $(".discount_info");
                $(pro_info).insertBefore(discount_info);
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    /*加入购物车*/
    function addToShopCart () {
        var pro_id = getProIdByLocation();
        pro_id.type = 2;
        bth1.click(function(){
            $.ajax({
                type: "POST",
                url: "admin/homepage.php",
                data: pro_id,
                dataType: "json",
                cache: false,
                success: function(data){
                    alert(data.msg);
                },
                error: function(err){
                    console.log(err)
                }
            })
        })
    }

    /*立即购买*/
    function buyRightNow (){
        var pro_id = getProIdByLocation();
        pro_id.type = 8;
        var bth2 = $(".bth2");
        bth2.click(function(){
            $.ajax({
                type: "POST",
                url: "admin/homepage.php",
                data: pro_id,
                dataType: "json",
                cache: false,
                success: function(data){
                    console.log(data);
                },
                error: function(err){
                    console.log(err);
            }
            });
        })

    }
});
