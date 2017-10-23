<?php
header("Content-type: text/html; charset=utf-8");
$link = mysqli_connect("localhost","41688_fi6178","9A3EmrBJrnDb5IC","41688db9826a");
mysqli_query($link,'set names utf8');


if($link){
    if($_POST && $_POST['type'] == 1 ){
        $user_name = $_POST['user_name'];
        $psw = $_POST['psw'];
        $sql_str = "select * from `zdx_register` where `user_name`='"."$user_name'";
        $res = mysqli_query($link,$sql_str);
        $rows = [];
        while($row = mysqli_fetch_assoc($res)){
            $rows[] = $row;
        }
        $len = count($rows);
        if($len > 0 ){
            $return = ['status'=> 0 ,'msg'=>'用户已存在!'];
        }else{
            $sql_str1 = "INSERT INTO `zdx_register`(`user_name`, `psw`, `reg_time`)
                          VALUES ('".$user_name."','".md5($psw)."','".time()."')";
            $res1 = mysqli_query($link,$sql_str1);
            $return = ['status'=> 1 ,'msg'=>'注册成功!'];
        }
        echo json_encode($return);
    }

    if($_POST && $_POST['type'] == 2){
        $user_name = $_POST['user_name'];
        $psw = $_POST['psw'];
        $sql_str = "select * from `zdx_register` where `user_name`='"."$user_name'";
        $res = mysqli_query($link,$sql_str);
        $rows = [];
        while($row = mysqli_fetch_assoc($res)){
            $rows[] = $row;
        }
        $len = count($rows);
        if($len > 0){
            if(md5($psw) == $rows[0]['psw']){
                $sql_str1 = "INSERT INTO `zdx_login`(`user_id`, `user_name`, `login_time`)
                        VALUES (".$rows[0]['user_id'].",'".$user_name."','".time()."')";
                mysqli_query($link,$sql_str1);
                $return = ['status'=>1,'msg'=>'登录成功！'];
            }else{
                $return = ['status'=>2,'msg'=>'密码输入错误'];
            }
        }else{
            $return = ['status'=>0,'msg'=>'您尚未注册，请注册后再来登录'];
        };
        echo json_encode($return);
    }
}




?>