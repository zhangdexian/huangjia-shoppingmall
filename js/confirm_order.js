pageLoad();


function pageLoad (){
    var data = {type:9};
    $.ajax({
        type: "POST",
        url: "admin/homepage.php",
        data: data,
        dataType: "json",
        cache: false,
        success: function (data){
            createPageContent(data);
            calTotalPrice();
        },
        error: function (err){
            console.log(err);
        }
    });
}
function createPageContent (data) {
    var len = data.length;
    for(var i = 0; i <len ; i++){
        var cart_item = $(".cart_item");
        var pro_str=
            "<li>"
            +"<table>"
            +"<tr>"
            +"<td rowspan='5' class='pro_pic'>"
            +"<a href='pro_details.html?pro_id="+data[i].pro_id+"'><img src='"+data[i].pro_src+"' alt=''></a>"
            +"</td>"
            +"<td colspan='4' class='pro_model'><a href='pro_details.html?pro_id="+data[i].pro_id+"'>"+data[i].title+"</a></td>"
            +"</tr>"
            +"<tr>"
            +"<td class='price-wrap'>价格:</td>"
            +"<td class='price' colspan='2'>"+data[i].price+"</td>"
            +"<td class='discount_info'><a href='###'>降价通知</a></td>"
            +"</tr>"
            +"<tr>"
            +"<td class='count_wrap'>数量:</td>"
            +"<td colspan='3' class='count'>"+data[i].num+"件</td>"
            +"</tr>"
            +"<tr>"
            +"<td class='total_wrap' colspan='2'>商品总价:</td>"
            +"<td class='total_tag' colspan='2'>￥<span class='total'>"+data[i].sub_total+"</span></td>"
            +"</tr>"
            +"<tr>"
            +"<td colspan='3'></td>"
            +"</tr>"
            +"</table>"
            +"</li>";
        cart_item.append($(pro_str));
    }
}
function calTotalPrice(){
    var total = $(".total");
    var total_price = $(".total_price");
    var _total = 0;
    for(var i = 0,len = total.length; i < len ; i++){
        _total += parseFloat(total.eq(i).text());
    }
    _total = _total.toFixed(2);
    total_price.text(_total);
}





