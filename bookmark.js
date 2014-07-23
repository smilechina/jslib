/**
 * bookmark.js  js书签切换方式，基于jquery
 * @param {[object]} options 
 * options {
 *  type  切换的方式'click'|'mouseover'
 *  hitClass  当前展示的class名字，用于区分展示的和没有展示的
 *  eventTag  a链接的id数组
 *  changeTag  img标签的id数组
 *  divTag  外层div的id数组
 * }
 * eventTag,changeTag和divTag中的值是一一对应的
 * eg:
 *  <div id="ff1" class="f1">
 *    <img src="a.jpg" id="img1" class="down">
 *      <a id="aa"></a>
 *  </div>
 */
function BookMark(options) {
    this.options = options;
    if_ok = 0;//设置全局变量，检测animate动画是否执行完成
    this.init();
}
BookMark.prototype.init = function() {
    var that = this;
    var eventTags = that.options.eventTag;
    if (that.options.type != 'click' && that.options.type != 'mouseover') {
        return;
    } else {
        for (var key in eventTags) {
            var clsName = eventTags[key];       
            (function(num, name) {
                $(document).on(that.options.type,'#'+name,function() {
                    that.Change(num);
                })
            })(key, clsName);
        };
    }
}
BookMark.prototype.Change = function(num) {
    if(if_ok == 1){return;}//如果animate动画正在执行，则return
    var eventTags = this.options.eventTag;
    var changeTags = this.options.changeTag;
    var divTags = this.options.divTag;
    var hitClass = this.options.hitClass;
    if($("#"+changeTags[num]).hasClass(hitClass)){
        return;
    }else{
        if_ok = 1;
        for ( var key in changeTags) {//找到当前显示的底标
            if($("#"+changeTags[key]).hasClass('down')&&key!=num){
                var tmp = key;
            }               
        }
        //展示
        $("#"+divTags[num]).animate({marginTop:"5px"});
        $("#"+eventTags[num]).css({
            'background-color':"black",
            'opacity':"0.4",
            'color':"white"
        });
        $("#"+changeTags[num]).animate({height:"150px"},200,function(){                         
            $("#"+changeTags[num]).addClass('down');
        });     
        //隐藏
        $("#"+divTags[tmp]).animate({marginTop:"25px"});
        $("#"+changeTags[tmp]).animate({height:"0px"},200,function(){
            if_ok = 0;
            $("#"+changeTags[tmp]).removeClass('down'); 
        });
        $("#"+eventTags[tmp]).css({
            'background-color':"white",
            'opacity':"1",
            'color':"black"
        });
    }
}
