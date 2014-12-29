/**
 *js创建元素方法
 * */
function createElementNode(tag, attrs) {
    attrs = attrs || {};
    var node = document.createElement(tag);
    for (var key in attrs) {
        node.setAttribute(key, attrs[key]);
    };
    return node;
}
/**
 *js创建文本节点方法
 * */
function createTextNode(text) {
    var node = document.createTextNode(text);
    return node;
}
/**
 *解析URL各部分的通用方法,利用a标签自动解析URL
 * */
function parseURL(url) {
    var a =  document.createElement('a');
    a.href = url;
    return {
        source: url,
        protocol: a.protocol.replace(':',''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function(){
                var ret = {},
                    seg = a.search.replace(/^\?/,'').split('&'),
                    len = seg.length, i = 0, s;
                for (;i<len;i++) {
                    if (!seg[i]) { continue; }
                    s = seg[i].split('=');
                    ret[s[0]] = s[1];
                }
                return ret;
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
        hash: a.hash.replace('#',''),
        path: a.pathname.replace(/^([^\/])/,'/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
        segments: a.pathname.replace(/^\//,'').split('/')
    };
}
