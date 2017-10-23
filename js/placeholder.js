;(function(win, $){
    var mypalce = function(obj){
        $(obj).each(function(i){
            var _this = $(this);
            var _palce = _this.attr('placeholder');

            _this.attr('placeholder', '').val(_palce);
            _this.css("color","#fff");
            _this.bind('focus',function(){
                if ($.trim(_this.val()) == _palce) {
                    _this.val('')
                }
            }).bind('blur', function(){
                if (!$.trim(_this.val()) || $.trim(_this.val()) == _palce) {
                    _this.val(_palce);
                    _this.css("color","#fff");
                }
            });
        });
    };
    mypalce.prototype = {
        'test': function(){}
    };
    mypalce.init = function(obj){
        new this(obj);
    };
    win['myPalce'] = mypalce;
})(window, jQuery);

;(function(win, $) {
    var myplaceForTextarea = function (obj) {
        $(obj).each(function(i){
            var _this = $(this);
            var _palce = _this.attr('placeholder');

            _this.attr('placeholder', '').val(_palce);
            _this.bind('focus',function(){
                if (_this.val() == _palce) {
                    _this.val(' ')
                }
            }).bind('blur', function(){
                if (_this.val() == ' ' || _this.val() == _palce) {
                    _this.val(_palce);
                }
            });
        });
    };
    myplaceForTextarea.prototype = {
        'test': function(){}
    };
    myplaceForTextarea.init = function (obj) {
        new this(obj);
    };
    win['myplaceForTextarea'] = myplaceForTextarea;
})(window, jQuery);

$(function(){
    myPalce.init('.myplace');
    myplaceForTextarea.init('.myplace2');
});
