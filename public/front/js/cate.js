mui('.mui-scroll-wrapper').scroll({
    indicators: false
});
$.ajax({
    type: "get",
    url: " /category/queryTopCategory",
    success: function(data) {
        var html = template("tpl", data);
        $(".content_left ul").html(html);
    }
})