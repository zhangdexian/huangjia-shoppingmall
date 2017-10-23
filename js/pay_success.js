var data = {
    type: "reset"
};
$.ajax({
    type: "POST",
    url: "admin/homepage.php",
    data: data,
    dataType: "json",
    cache:false,
    success: function(data){
        var total = $(".total");
        var l = data.length;
        var _total = data[l-1].balance.replace("￥","");
        total.text(_total);
    },
    error: function(err){
        console.log(err);
    }
});
