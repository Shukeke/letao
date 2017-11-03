var log = console.log.bind(console);
$(function() {
    mui(".mui-scroll-wrapper").scroll({
        indicators: false
    });
});
var currentPage = 1;
var pageSize = 10;
var key = tools.getParam("key");
$(".inputsearch").val(key);
$.ajax({
    type: "get",
    url: "/product/queryProduct",
    data: {
        page: currentPage,
        pageSize: pageSize,
        proName: key
    },
    success: function(data) {
        log(data);
        $(".lt_product").html(template("tpl", data));
    }


})

$(".btnsearch").on("click", function() {
    var key = $(".inputsearch").val().trim();
    var str2 = localStorage.getItem("le_his");
    var arr3 = JSON.parse(str2);
    log(arr3);
    var index = arr3.indexOf(key);
    log(index);
    if (index > -1) {
        //说明有
        arr3.splice(index, 1);
    }

    if (arr3.length >= 10) {
        arr3.pop();
    }
    //把key存到数组的第一条
    arr3.unshift(key);

    //存储到缓存中
    localStorage.setItem("le_his", JSON.stringify(arr3));

    //页面跳转
    location.href = "searchlist.html?key=" + key;

})