$(function(){
    var user_name = $("#username");
    var psw = $("#psw");
    var login_bth = $(".login_bth");


    usernameBlurEvent();
    pswBlurEvent();
    loginClickEvent();

    function usernameBlurEvent () {
        user_name.blur(function(){
            if($(this).val() != '用户名'){
                var userName = user_name.val();
                if(validationByRegExp('username',userName)){
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


    function loginClickEvent () {
        login_bth.click(function(e){
            e.preventDefault();
            var username = user_name.val();
            var _psw = psw.val();
            if(username == '用户名'){
                user_name.next().text("用户名长度为4-10位");
            }
            if(_psw == '密码'){
                psw.next().text("密码长度位6-16位");
            }
            if(validationByRegExp('username',username)){
                return false;
            }
            if(validationByRegExp('psw',_psw)){
                return false;
            }
            var login = $(".login");
            var data = {};
            var login_info = login.serializeArray();
            $.each(login_info,function(){
                data[this.name] = this.value;
            });
            data.type = 2;
            $.ajax({
                type: "POST",
                url: "admin/register.php",
                data: data,
                dataType: "json",
                cache: false,
                success: function (data){
                    if(data.status == 1){
                        alert(data.msg);
                        location.href = "index.html";
                    }else{
                        alert(data.msg);
                    }
                },
                error: function (err){
                    console.log(err);
                }
            });
        })
    }


});


