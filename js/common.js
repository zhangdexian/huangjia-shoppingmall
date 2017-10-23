document.documentElement.style.fontSize=50/750*document.documentElement.clientWidth+'px';
window.onresize=function () {
    document.documentElement.style.fontSize=50/750*document.documentElement.clientWidth+'px';
};


/*用户名密码正则表达式*/

var userNameReg = /^([a-zA-Z0-9]|[\u4e00-\u9fa5]){4,10}$/;
var pswReg = /^[a-zA-Z0-9~!@#\$%\^&\*]{6,16}$/;


function validationByRegExp (type,txt) {
    var regExp = '';
    switch (type){
        case "username":
            regExp = userNameReg ;
            break;
        case "psw":
            regExp = pswReg ;
            break;
        default:
            return true;
    }
    return regExp.test(txt) ? false : true;
}

/*产生验证码*/
function creatValidateCode (n) {
    var rand  = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    var randStr = "";
    for( var i = 0 ; i < n ; i ++){
        randStr += rand[Math.floor(Math.random()*62)];
    }
    return randStr;
}

/*产生随机数*/
function creatRandom (n){
    var _identifyCode = creatValidateCode(n);
    return _identifyCode;
}



/*从location获取产品id*/
function getProIdByLocation(){
    var proId = {};
    var searchStr = location.search;
    searchStr = searchStr.replace("?","").split("=");
    proId[searchStr[0]] = searchStr[1];
    return proId;
}


/*搜索*/
searchPro();
function searchPro () {
    var search_bth = $(".search_bth");
    var search_content = $(".search input");
    search_bth.click(function(e){
        e.preventDefault();
        var keyWord = search_content.val();
        var data = {
            type: "searchKeyWord",
            key_word: keyWord
        };
        if(keyWord){
            $.ajax({
                type: "POST",
                url: "admin/homepage.php",
                data: data,
                dataType: "json",
                cache: false,
                success: function(data){
                    if(data.length > 0){
                        searchResultAddToPage(data);
                    }else{
                        alert("搜索结果不存在");
                    }
                },
                error: function (err) {
                    console.log(err);
                }

            });
        }
    })

}
function searchResultAddToPage (data){
    if(data){
        var pro_item = $(".pro_item");
        var pageStr ="";
        for(var i = 0, l = data.length ; i < l ; i++){
            pageStr +=
                "<li data-pro_id='"+data[i].pro_id+"'>"
                +"<div>"
                +"<a href='pro_details.html?pro_id="+data[i].pro_id+"'><img src='"+data[i].pic_src+"' alt=''></a>"
                +"</div>"
                +"<div>"
                +"<h5><a href='pro_details.html?pro_id="+data[i].pro_id+"'>"+data[i].title+ data[i].desc+"</a></h5>"
                +"<p><a href='pro_details.html?pro_id="+data[i].pro_id+"'>￥<span>59</span></a></p>"
                +"<div><a href='pro_details.html?pro_id="+data[i].pro_id+"'><span>123</span>条评价 <span>98%</span>好评</a><a href='###' class='shop_cart'>购物车</a></div>"
                +"</div>"
                +"</li>";
        }
        var proItem = pro_item.find("li").remove();
        pro_item.append($(pageStr));
    }

}

