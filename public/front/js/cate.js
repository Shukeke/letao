var log = console.log.bind(console);

mui('.mui-scroll-wrapper').scroll({
    indicators: false
});
$.ajax({
    type: "get",
    url: " /category/queryTopCategory",
    success: function(data) {
        var html = template("tpl", data);
        $(".content_left ul").html(html);
        render();

    }
})

function render() {
    var id = $('.content_left .now').data('id');
    $.ajax({
        type: 'get',
        url: "/category/querySecondCategory",
        data: {
            id: id
        },
        success: function(data) {
            console.log(data);
            //渲染二级分类
            $(".content_right ul").html(template("tpl2", data));
        }
    });
}
$(".content_left").on("click", "li", function() {
    $(this).addClass("now").siblings().removeClass("now");
    var id = $(this).data("id");
    render(id);
})