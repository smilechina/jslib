/**
 *  js实现tab切换的功能,支持IE6+
 *  @author zhaoxiaolu@baidu.com
 *  @param {obj} [options] 
 *  options = {
 *     type 区分触发tab切换的类型  click|mouseover
 *     hit 选中tab的样式，string类型
 *     tabIds 需要触发切换的所有tab的id数组
 *     conIds  需要触发切换的所有content的id数组
 *  }
 *  tabIds和conIds是一一对应的
 */
function $(id) {
    return document.getElementById(id);
}
function ChangeTab(options) {
    this.options = options;
    if (!options.type || !options.hit) {
        return;
    };
    this.init();
}
ChangeTab.prototype.init = function() {
    var that = this;
    var len = that.options.tabIds.length;
    for (var i = 0; i < len; i++) {     
        if(window.addEventListener) {
            (function (num) {
                $(that.options.tabIds[i]).addEventListener(that.options.type, function() {
                    that.tabShow(num);
                }, false);
            })(i);
        } else {
            (function (num) {
                $(that.options.tabIds[i]).attachEvent('on' + that.options.type, function() {
                    that.tabShow(num);
                });
            })(i);
        }
    };
}
ChangeTab.prototype.tabShow = function(num) {
    var tabIdArr = this.options.tabIds;
    var conIdArr = this.options.conIds;
    if (this.hasClass($(tabIdArr[num]))) {
        return;
    };
    for (var key in tabIdArr) {
        if (key == num) {
            $(tabIdArr[key]).className += " " + this.options.hit;
            $(conIdArr[key]).style.display = "";
        } else {
            var reg = new RegExp('(\\s|^)' + this.options.hit + '(\\s|$)');
            $(tabIdArr[key]).className = $(tabIdArr[key]).className.replace(reg, '');
            $(conIdArr[key]).style.display = "none";
        }
    };
}
ChangeTab.prototype.hasClass = function(obj) {
    return obj.className.match(new RegExp('(\\s|^)' + this.options.hit + '(\\s|$)'));
}
