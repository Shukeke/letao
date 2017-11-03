var log = console.log.bind(console);

mui('.mui-scroll-wrapper').scroll({
    indicators: false
});

// localStorage.setItem("ltsearch", '["123","skk"]');
// localStorage.getItem("ltsearch");
// log(localStorage.getItem("ltsearch"));
render();

/* $(".btnsearch").on("click", function() {

    var str1 = localStorage.getItem("le_his");
    var arr = JSON.parse(str1) || [];
    log(arr);
    arr.unshift($(".inputsearch").val());
    localStorage.setItem('le_his', JSON.stringify(arr));
    render();

})
 */
function render() {
    var str1 = localStorage.getItem("le_his");
    var arr = JSON.parse(str1);
    $('.content').html(template('tpl', { arr: arr }));
}
$(".lt_history").on("click", ".fa-trash", function() {
        localStorage.removeItem('le_his');
        render();
    })
    //
$(".content").on("click", ".fa-close", function() {
    log(111);
    var index = $(this).data("index");
    var str2 = localStorage.getItem("le_his");
    var arr2 = JSON.parse(str2);
    log(arr2);
    arr2.splice(index, 1);
    localStorage.setItem("le_his", JSON.stringify(arr2));
    render();
})
$(".btnsearch").on("click", function() {
    var key = $(".inputsearch").val().trim();
    if (key === "") {
        mui.alert("亲，你想买啥", "温馨提示")
        return;
    }

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

    render();
    //页面跳转
    location.href = "searchlist.html?key=" + key;

})