$(function(){
    removeItem();
    function removeItem () {
        var remove_item = $(".remove_item");
        remove_item.click(function () {
            var order_item = $(".order_item li");
            var index = $(".remove_item").index(this);
            order_item.eq(index).remove();
        })
    }
});