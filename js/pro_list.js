$(function(){
    var shop_cart = $(".shop_cart");
    var pro_item = $(".pro_item li");

    addToShopCart();
    function addToShopCart () {
        shop_cart.click(function(){
            var index = shop_cart.index(this);
            var data = {};
            data.pro_id = pro_item.eq(index).attr("data-pro_id");
            data.type = 10;
            $.ajax({
                type: "POST",
                url: "admin/homepage.php",
                data: data,
                dataType: "json",
                cache: false,
                success: function (data){
                    alert(data.msg);
                },
                error: function (err) {
                    console.log(err);
                }
            });
        })
    }
});
