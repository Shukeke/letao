var log = console.log.bind(console);
//tools中放了常用的一些方法
var tools = {
    //获取地址栏中所有的参数
    getParamObj: function() {
        var obj = {};
        var search = location.search;
        log(search);
        search = search.slice(1);
        log(search);
        var arr = search.split("&");
        log(arr);
        for (var i = 0; i < arr.length; i++) {
            var key = arr[i].split("=")[0];
            var value = decodeURI(arr[i].split("=")[1]);
            obj[key] = value;
        }
        //this指向的是谁：  4种调用模式
        return obj;
    },
    getParam: function(key) {
        return this.getParamObj()[key];
    }
}