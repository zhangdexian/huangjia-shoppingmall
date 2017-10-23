getItemFromDataBaseShopCart();
$(function(){
   var pay_instant = $(".pay_instant");
   var payment = $(".payment li input");
   pay_instant.click(function(){
       var payItem = $(".cart_item li");
       if(payment.eq(0).prop("checked") || payment.eq(1).prop("checked")){
           var _balance = $(".balance").text();
           var pro_id = [];
           for(var i = 0, l = payItem.length; i < l ;i++){
               var ids = parseInt(payItem.eq(i).attr("data-pro_id"));
               pro_id.push(ids);
           }
           var data ={
               balance: _balance,
               type: 7,
               pro_id:pro_id
           };
           $.ajax({
               type: "POST",
               url: "admin/homepage.php",
               data: data,
               dataType: "json",
               cache: false,
               success: function(data){
                   if(data.status ==1){
                       location.href = "pay_success.html";
                   }
               },
               error: function(err){
                   console.log(err);
               }
           });

       }else{
           location.href = "pay_failure.html";
       }
    })
});

function calTotalPrice (){
    var balance = $(".balance");
    var total = $(".total");
    var _total = 0;
    total.each(function(){
        _total += parseFloat($(this).text());
    });
    _total = "￥" + _total.toFixed(2);
    balance.text(_total);
}
function getItemFromDataBaseShopCart () {
    var data ={type:6};
    $.ajax({
        type: "POST",
        url: "admin/homepage.php",
        data: data,
        dataType: "json",
        cache: false,
        success: function(data){
            var cart_item = $(".cart_item");
            var itemStr = "";
            for(var i = 0,l = data.length ; i <l ;i++){
                itemStr = createPageContent(data[i]);
                $(itemStr).appendTo(cart_item);
            }
            calTotalPrice();
        },
        error: function (err){
            console.log(err);
        }
    });
}
function createPageContent (item){
    var payStr =
        "<li data-pro_id='"+item.pro_id+"'>"
            +"<table>"
                +"<tr>"
                +"<td rowspan='4' class='pro_pic'>"
                    +"<a href='pro_details.html?pro_id="+item.pro_id+"'><img src='"+item.pro_src+"' alt=''></a>"
                    +"</td>"
                    +"<td colspan='4' class='pro_model'><a href='pro_details.html?pro_id="+item.pro_id+"'>"+item.title+"</a></td>"
                +"<tr>"
                +"<td class='count_wrap'>数量:</td>"
                +"<td colspan='2' class='count'>"+item.num+"件</td>"
                +"<td class='discount_info'><a href='###'>降价通知</a></td>"
                    +"</tr>"
                    +"<tr>"
                    +"<td class='total_wrap' colspan='2'>商品总价:</td>"
                +"<td class='total_tag' colspan='2'>￥<span class='total'>"+item.sub_total+"</span></td>"
                +"</tr>"
                +"<tr>"
                +"<td colspan='3'></td>"
                +"</tr>"
            +"</table>"
        +"</li>";
    return payStr;
}

