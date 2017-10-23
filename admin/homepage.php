<?php date_default_timezone_set("PRC");
header("Content-type: text/html; charset=utf-8");
//$link = mysqli_connect("localhost","41688_fi6178","9A3EmrBJrnDb5IC","41688db9826a");
//loushengyue
//$link = mysqli_connect("localhost","a0925210840","c1d0c94d","a0925210840");
$link = mysqli_connect("localhost","root","","zdx");
mysqli_query($link,'set names utf8');

/*if($link){

    include 'pro_data.php';
    $len = count($proListData);
    for($i = 0 ; $i < $len ; $i++){
        $pro_list = "INSERT INTO `zdx_pro_list`(`pro_id`, `pic_src`, `title`,`desc`, `price`, `sell_count`)
        VALUES (".$proListData[$i]['pro_id'].",'".$proListData[$i]['pic_src']."','".$proListData[$i]['title']."','".$proListData[$i]['desc']."','".$proListData[$i]['price']."',".$proListData[$i]['sell_count'].")";
        mysqli_query($link,$pro_list);
    }
}else{
    die("连接错误".mysqli_connect_error());
}*/



/*数据库status的说明*/
/*status=0为默认状态*/
/*status=1表示加入购物车*/
/*status=2表示购买，在之福也中显示*/
/*status=-1表示从购物车中清楚的项*/


/*更改pro_details的内容*/
if($_POST && $_POST['type']==1){
    $pro_id = $_POST['pro_id'];
    $sql_pro = "SELECT `pro_id`, `pic_src`, `title`,`desc`, `price`, `sell_count`
                FROM `zdx_pro_list` WHERE `pro_id`=$pro_id";
    $res = mysqli_query($link,$sql_pro);
    $rows = [];
    while($row = mysqli_fetch_assoc($res)){
        $rows[] = $row;
    }
    echo json_encode($rows);
}
/*修改状态*/
if($_POST && $_POST['type']==2){
    $pro_id = $_POST['pro_id'];
    $sql_pro = "UPDATE `zdx_pro_list` SET `status`= 1 WHERE `pro_id`=$pro_id";
    $res = mysqli_query($link,$sql_pro);
    $sql_str1 = "SELECT `init_num` FROM `zdx_pro_list` WHERE `pro_id` = $pro_id";
    $res1 = mysqli_query($link,$sql_str1);
    $rows = [];
    while($row = mysqli_fetch_assoc($res1)){
        $rows[] = $row;
    }
    $num = (int)$rows[0]['init_num'] + 1;
    $sql_str2 = "UPDATE `zdx_pro_list` SET `init_num`=$num WHERE `pro_id`=$pro_id";
    mysqli_query($link,$sql_str2);
    $return = ["status"=>1,"msg"=>"加入购物车成功"];
    echo json_encode($return);
}
/*传送状态为1的数据*/
if($_POST && $_POST['type']==3){
    $sql_pro = "SELECT `pro_id`, `pic_src`, `title`,`desc`, `price`, `sell_count`,`status`,`init_num`
                FROM `zdx_pro_list` WHERE `status`=1";
    $res = mysqli_query($link,$sql_pro);
    $rows=[];
    while($row = mysqli_fetch_assoc($res)){
        $rows[] = $row;
    }
    echo json_encode($rows);
}

/*将对应产品id的status改为0*/
if($_POST && $_POST['type']==4){
    $pro_id = $_POST['pro_id'];
    $sql_pro = "UPDATE `zdx_pro_list` SET `status`= 0,`init_num`=0 WHERE `pro_id`=$pro_id";
    $res = mysqli_query($link,$sql_pro);
    $sql_res = "SELECT `status` FROM `zdx_pro_list` WHERE `pro_id`=$pro_id";
    $sql_q = mysqli_query($link,$sql_res);
    $rows = [];
    while($row = mysqli_fetch_assoc($sql_q)){
        $rows[]= $row ;
    }
    if($rows[0]["status"] == 0){
        $return = ["msg"=>"操作成功！"];
    }else{
        $return = ["msg"=>"操作失败！"];
    }
    echo json_encode($return);
}

if($_POST && $_POST['type'] ==5){
    $sql_str = "INSERT INTO `zdx_shop_cart`(`pro_id`, `title`,`pro_src`,`price`,`num`, `sub_total`)
                VALUES ('".$_POST['pro_id']."','".$_POST['title']."','".$_POST['pro_src']."','".$_POST['price']."','".$_POST['count']."','".$_POST['total']."')";
    $res = mysqli_query($link,$sql_str);
    $return = ["status"=>1];
    echo json_encode($return);
}

if($_POST && $_POST['type']== 9){
    $sql_str = "SELECT * FROM `zdx_shop_cart` WHERE 1";
    $res = mysqli_query($link,$sql_str);
    $rows =[];
    while($row = mysqli_fetch_assoc($res)){
        $rows[] = $row;
    }
    echo json_encode($rows);
}

if($_POST && $_POST['type']==6){
    $sql_str = "SELECT * FROM `zdx_shop_cart` WHERE `status`=1";
    $res = mysqli_query($link,$sql_str);
    $rows=[];
    while($row = mysqli_fetch_assoc($res)){
        $rows[] = $row;
    }
    if(count($rows) > 0){
        echo json_encode($rows);
    }
}
if($_POST && $_POST['type'] ==7){
    $t1 = time();
    $sql_str = "INSERT INTO `zdx_balance`(`balance`,`add_time`)VALUES('".$_POST['balance']."',".$t1.")";
    $res = mysqli_query($link,$sql_str);
    $pro_id = $_POST['pro_id'];
    for($i = 0 ,$l = count($pro_id);$i < $l ;$i++){
        $sql_str1 = "DELETE FROM `zdx_shop_cart` WHERE `pro_id`= ".$pro_id[$i];
        $res1 = mysqli_query($link,$sql_str1);
        $sql_str2 = "UPDATE `zdx_pro_list` SET `status`= 0,`init_num`=0 WHERE `pro_id`= ".$pro_id[$i];

        $res2 = mysqli_query($link,$sql_str2);
    }


    $return = ["status"=>1,"msg"=>"success"];
    echo json_encode($return);
}
if($_POST && $_POST['type'] == 8){
    $pro_id = $_POST['pro_id'];
    $sql_str =  "select * from `zdx_pro_list` where `pro_id`= $pro_id";
    $res = mysqli_query($link,$sql_str);
    $rows = [];
    while($row = mysqli_fetch_assoc($res)){
        $rows[] = $row;
    }
    $sql_str1 = "INSERT INTO `zdx_shop_cart`(`pro_id`, `title`, `pro_src`,`price`, `num`, `sub_total`)
      VALUES (".$rows[0]['pro_id'].",'".$rows[0]['title']. $rows[0]['desc']."','".$rows[0]['pic_src']."','".$rows[0]['price']."',1,'".str_replace('￥','',$rows[0]['price'])."')";
        mysqli_query($link,$sql_str1);
    echo json_encode($rows);
}
if($_POST && $_POST['type'] == 10){
    $pro_id = $_POST['pro_id'];
    $sql_str = "UPDATE `zdx_pro_list` SET `status`=1 WHERE `pro_id`=$pro_id";
    $res = mysqli_query($link,$sql_str);
    $sql_str1 = "SELECT `init_num` FROM `zdx_pro_list` WHERE `pro_id` = $pro_id";
    $res1 = mysqli_query($link,$sql_str1);
    $rows = [];
    while($row = mysqli_fetch_assoc($res1)){
        $rows[] = $row;
    }
    $num = (int)$rows[0]['init_num'] + 1;
    $sql_str2 = "UPDATE `zdx_pro_list` SET `init_num`=$num WHERE `pro_id`=$pro_id";
    mysqli_query($link,$sql_str2);
    $return = ['status'=>1,'msg'=>'已加入到购物车'];
    echo json_encode($return);
}

if($_POST && $_POST['type'] =="reset"){
    $t1 = time();
    $sql_str = "SELECT `balance` FROM `zdx_balance` WHERE 1";
    $sql_str1 = "DELETE FROM `zdx_shop_cart` WHERE 1";
    $res = mysqli_query($link,$sql_str);
    $res1 = mysqli_query($link,$sql_str1);
    $rows = [];
    while($row = mysqli_fetch_assoc($res)){
        $rows[]= $row;
    }
    echo json_encode($rows);
}
if($_POST && $_POST['type'] =='searchKeyWord'){
    $key_word = $_POST['key_word'];
    $sql_str = "SELECT * FROM `zdx_pro_list` WHERE `title` LIKE '%".$key_word."%' OR `desc` LIKE '%".$key_word ."%'";
    $res = mysqli_query($link,$sql_str);
    $rows = [];
    while($row = mysqli_fetch_assoc($res)){
        $rows[] = $row;
    }
    echo json_encode($rows);
}



?>