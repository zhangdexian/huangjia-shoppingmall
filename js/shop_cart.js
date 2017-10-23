/*从数据库拿到数据*/
getDataFromDataBaseByStatus();


function init () {
    var minus = $(".minus");
    var plus = $(".plus");
    var count = $(".count");
    var price = $(".price");

    var total = $(".total");
    var total_price = $(".total_price");
    var check_all = $(".check_all");
    var check_item = $(".check_item input[type=checkbox]");
    var _price;
    var _count;
    var _total;
    var _totalPrice = 0 ;

    check_item.each(function(i){
        _price = parseInt(price.eq(i).text().replace("￥","")).toFixed(2);
        _count = parseInt(count.eq(i).val());
        _total = _price * _count;
        _total = _total.toFixed(2);
        total.eq(i).text(_total);

        if($(this).prop("checked")){
            _totalPrice += parseFloat(_total);
        }
    });
    _totalPrice = _totalPrice.toFixed(2);
    total_price.text(_totalPrice);
}
function countChangeEvent () {
    var minus = $(".minus");
    var plus = $(".plus");
    var count = $(".count");
    var total = $(".total");
    var total_price = $(".total_price");
    var check_all = $(".check_all");
    var check_item = $(".check_item input[type=checkbox]");
    var _count;
    minus.click(function(){
        var i = minus.index(this);
        _count = Number(count.eq(i).val());
        if(_count > 1){
            _count -= 1;
            count.eq(i).val(_count);
        }
        init();
    });
    plus.click(function(){
        var i = $(".plus").index(this);
        _count = Number(count.eq(i).val());
        _count += 1;
        count.eq(i).val(_count);
        init();
    })
}
/*购买数量输入框正则验证非数字字符*/
function numReg () {
    var count = $(".count");
    count.blur(function (){
        count.each(function (i){
            var _count = Number(count.eq(i).val());
            if(!_count){
                count.eq(i).val("1");
            }
        });
        init();
    });
    count.keyup(function(){
        count.each(function (i) {
            var _count = parseInt(count.eq(i).val());
            if(_count <= 0 ){
                $(this).val("1");
            }
        });

    })
}
function checkBoxItemEvent () {
    var minus = $(".minus");
    var plus = $(".plus");
    var price = $(".price");

    var total = $(".total");
    var total_price = $(".total_price");
    var check_all = $(".check_all");
    var check_item = $(".check_item input[type=checkbox]");
    check_item.change(function(){
        var itemCheckedLength = $(".check_item input[type=checkbox]").length;
        for(var i = 0; i < itemCheckedLength ; i++){
            if(!$(".check_item input[type=checkbox]").eq(i).prop("checked")){
                itemCheckedLength--;
            }
        }
        if(itemCheckedLength == $(".check_item input[type=checkbox]").length){
            check_all.prop("checked",true);
        }else{
            check_all.prop("checked",false);
        }
        init();
    })
}
function checkAllEvent () {
    var total = $(".total");
    var total_price = $(".total_price");
    var check_all = $(".check_all");
    var check_item = $(".check_item input[type=checkbox]");
    check_all.bind("click",function(){
        if($(this).prop("checked")){
            check_item.prop("checked",true);
        }else{
            check_item.prop("checked",false);
        }
        init();
    })
}
function removeItem () {
    var remove_item = $(".remove_item img");
    remove_item.click(function(){
        var itemList = $(".cart_item li");
        var index = $(".remove_item img").index(this);
        var pro_id = itemList.eq(index).attr("data-pro_id");
        itemList.eq(index).remove();
        checkIsAllChecked();
        var data = {
            pro_id: pro_id,
            type: 4
        };
        $.ajax({
            type: "POST",
            url: "admin/homepage.php",
            data: data,
            dataType: "json",
            cache: false,
            success: function(data){
                console.log(data.msg);
            },
            error: function (){
                alert("操作失败！");
            }
        })
    })
}
/*清空购物车*/
function clearShopCart () {
    var clearBth = $(".wrap_top a");
    var cart_item = $(".cart_item li");
    var data = {};
    clearBth.click(function(){
        var isok = confirm("您确定要清空购物车吗？");
        if(isok){
            for(var i = 0,l = cart_item.length; i < l ; i ++){
                data["pro_id"] = cart_item.eq(i).attr("data-pro_id");
                data.type=4;
                $.ajax({
                    type: "POST",
                    url: "admin/homepage.php",
                    data: data,
                    dataType: "json",
                    cache: false,
                    success: function(){
                        location.reload();
                        /*history.go(0);*/
                        checkIsAllChecked();
                    },
                    error: function(err){
                        console.log(err);
                    }
                });
            }
        }
    })
}
/*立即购买*/
function buyRightNow(){
    var buyRightNow = $("#buyRightNow");
    buyRightNow.click(function(){
        var cart_item = $(".cart_item li");
        var check_item = $(".check_item input[type=checkbox]");
        var price = $(".price");
        var count = $(".count");
        var total = $(".total");
        var pro_model = $(".pro_model a");
        var pro_pic = $(".pro_pic img");
        var _price;
        var _count;
        var _total;
        var _pro_id;
        var _title;
        var picSrc;
        var buy_item = {};
        for(var i = 0,l = cart_item.length; i < l ; i++){
            if(check_item.eq(i).prop("checked")){
                _price = price.eq(i).text();
                _count = count.eq(i).val();
                _total = total.eq(i).text();
                _pro_id = cart_item.eq(i).attr("data-pro_id");
                _title = pro_model.eq(i).text();
                picSrc = pro_pic.eq(i).attr("src");
                buy_item.pro_id = _pro_id;
                buy_item.price = _price;
                buy_item.count = _count;
                buy_item.total = _total;
                buy_item.title = _title;
                buy_item.pro_src = picSrc;
                buy_item.type = 5;
                $.ajax({
                    type: "POST",
                    url: "admin/homepage.php",
                    data: buy_item,
                    dataType: "json",
                    cache: false,
                    success: function(data){
                        console.log("success");
                    },
                    error: function (err){
                        console.log(err);
                    }
                })
            }
        }
    })

}
function getDataFromDataBaseByStatus (){
    var data1={
        type: 3
    };
    $.ajax({
        type: "POST",
        url: "admin/homepage.php",
        data: data1,
        dataType: "json",
        cache: false,
        success: function(data){
            getDataByStatus(data);
            init();
            countChangeEvent();
            numReg();
            checkBoxItemEvent();
            checkAllEvent();
            removeItem();
            clearShopCart();
            buyRightNow();
        },
        error: function(err){
            console.log(err)
        }
    })
}
function getDataByStatus (data) {
    var cart_item = $(".cart_item");
    for(var i = 0,l = data.length ; i < l ; i++) {
        var pro_item =
            "<li data-pro_id='"+data[i].pro_id+"'>"
            + "<table>"
            + "<tr>"
            + "<td rowspan='5' class='check_item'>"
            + "<div class='box'><input type='checkbox'><span>√</span></div>"
            + "</td>"
            + "<td rowspan='5' class='pro_pic'>"
            + "<a href='pro_details.html?pro_id="+data[i].pro_id+"'><img src='" + data[i].pic_src + "' alt=''></a>"
            + "</td>"
            + "<td colspan='3' class='pro_model'><a href='pro_details.html?pro_id="+data[i].pro_id+"'>" + data[i].title + data[i].desc + "</a></td>"
            + "</tr>"
            + "<tr>"
            + "<td class='price-wrap'>价格:</td>"
            + "<td class='price'>" + data[i].price + "</td>"
            + "<td class='discount_info'><a href='###'>降价通知</a></td>"
            + "</tr>"
            + "<tr>"
            + "<td class='count_wrap'>数量:</td>"
            + "<td colspan='2' class='count_info'><div>"
            + "<span class='minus'>-</span>"
            + "<input type='number' class='count' value='"+data[i].init_num+"'>"
            + "<span class='plus'>+</span>"
            + "</div></td>"
            + "</tr>"
            + "<tr>"
            + "<td class='total_wrap'>总价:</td>"
            + "<td class='total_tag'>￥<span class='total'>66.00</span></td>"
            + "<td colspan='2' class='remove_item'>"
            + "<img src='img/shopcart05.png' alt=''>"
            + "</td>"
            + "</tr>"
            + "<tr>"
            + "<td colspan='3'></td>"
            + "</tr>"
            + "</table>"
            + "</li>";
        cart_item.append(pro_item);
    }
}
function checkIsAllChecked () {
    var check_all = $(".check_all");
    var check_item = $(".check_item input[type=checkbox]");
    var len = check_item.length;
    var num = 0;
    check_item.each(function(i){
        if(!check_item.eq(i).prop("checked")){
            num++;
        }
    });
    if(num == len){
        check_all.prop("checked","true");
    }else{
        check_all.prop("checked","false");
    }
}
