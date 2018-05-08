var typeString={
    "0":"1*1图片",
    "1":"1*1图文",
    "2":"1*2图片",
    "3":"1*4图片",
};
var zoneString={
    "0": "置顶组",
    "1": "普通组"
};
var countCdnSwitch=0;
var majorData=null;
var childrenData=null;
//表单数据格式化为object
$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [ o[this.name] ];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
}
//深copy一个对象
function copyObject(old) {
    return JSON.parse(JSON.stringify(old))

}