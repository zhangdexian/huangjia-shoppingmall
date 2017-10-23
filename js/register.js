$(function(){
    var userName = $("#userName");
    var psw = $("#psw");
    var identify = $("#identify");
    var identifyCode = $("#identifyCode");
    var subscribe = $(".subscribe input");
    var registerBth = $("#registerBth");

    usernameBlurEvent();
    pswBlurEvent();
    identifyBlurEvent();
    registerClickEvent();

    function usernameBlurEvent () {
        userName.blur(function(){
            if($(this).val() != '用户名'){
                var _userName = userName.val();
                if(validationByRegExp('username',_userName)){
                    $(this).next().text("用户名长度为4-10位");
                }else{
                    $(this).next().text("");
                }
            }
        })
    }
    function pswBlurEvent () {
        psw.blur(function(){
            if($(this).val() != '密码'){
                var _pwd = psw.val();
                if(validationByRegExp('psw',_pwd)){
                    $(this).next().text("密码长度位6-16位");
                }else{
                    $(this).next().text("");
                }
            }
        })
    }
    function identifyBlurEvent () {
        var identifyStr = creatRandom(4);
        identifyCode.text(identifyStr);
        identifyCode.click(function(){
            identifyStr = creatRandom(4);
            identifyCode.text(identifyStr);
        });
        identify.blur(function (){
            var identifyCodeUserInput = identify.val();
            var _identifyStr = "^" + identifyStr +"$";
            var identifyCodeReg = new RegExp(_identifyStr,"i");
            if(identifyCodeUserInput != "验证码"){
                if(!identifyCodeReg.test(identifyCodeUserInput)){
                    $(".identify").children("i").text("×").addClass("error").removeClass("correct");
                }else{
                    $(".identify").children("i").text("√").addClass("correct").removeClass("error");
                }
            }else{
                $(".identify").children("i").text("");
            }
        })


    }
    function getRegisterInfo () {
        var register = $(".register");
        var reg_msg = register.serializeArray();
        var data = {};
        $.each(reg_msg,function(){
            data[this.name] = this.value;
        });
        return data;
    }

    function registerClickEvent () {
        registerBth.click(function (e) {
            e.preventDefault();
            if (!subscribe.attr("checked")) {
                return false;
            } else {
                var username = userName.val();
                var _psw = psw.val();
                var identifyCodeUserInput = identify.val();
                if(username == '用户名'){
                    userName.next().text("用户名长度为4-10位");
                }
                if(_psw == '密码'){
                    psw.next().text("密码长度位6-16位");
                }
                if(identifyCodeUserInput == "验证码"){
                    $(".identify").children("i").text("×").addClass("error").removeClass("correct");
                }
                if(validationByRegExp('username',username)){
                    return false;
                }
                if(validationByRegExp('psw',_psw)){
                    return false;
                }
                if($(".identify").children("i").text() != "√"){
                    return false;
                }
                var data = getRegisterInfo();
                data.type = 1;
                $.ajax({
                    type: "POST",
                    url: "admin/register.php",
                    data: data,
                    dataType: "json",
                    cache: false,
                    success: function (data) {
                        if(data.status == 1){
                            alert(data.msg);
                            location.href = "login.html";
                        }else{
                            alert(data.msg);
                        }
                    },
                    error: function (err){
                        console.log(err);
                    }
                });
            }

        })
    }
});
