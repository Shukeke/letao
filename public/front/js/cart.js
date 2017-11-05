var log = console.log.bind(console);
mui.init({
    pullRefresh: {
        container: ".mui-scroll-wrapper", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
        down: {
            style: 'circle', //必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
            color: '#2BD009', //可选，默认“#2BD009” 下拉刷新控件颜色
            height: '50px', //可选,默认50px.下拉刷新控件的高度,
            range: '100px', //可选 默认100px,控件可下拉拖拽的范围
            offset: '0px', //可选 默认0px,下拉刷新控件的起始位置
            auto: true, //可选,默认false.首次加载自动上拉刷新一次
            callback: function() {
                $.ajax({

                    type: "get",
                    url: "/cart/queryCart",
                    success: function(data) {
                        tools.checkLogin(data);

                        $("#OA_task_2").html(template("tpl", { data: data }));
                        mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
                    }
                })
            }
        }
    }


});
//编辑功能
$(".info_content").on("tap", ".compile", function() {
    log(1);
    var data = this.dataset;
    log(data);
    var html = template("tpl2", data);
    html = html.replace(/\n/g, "");
    mui.confirm(html, "编辑商品", ["确定", "取消"], function(e) {
        if (e.index == 0) {
            $.ajax({
                type: "post",
                url: "/cart/updateCart",
                data: {
                    id: data.id,
                    size: $(".lt_edit_size span.now").html(),
                    num: $(".mui-numbox-input").val()
                },
                success: function(data) {
                    //校验是否登录
                    tools.checkLogin(data);

                    if (data.success) {
                        //如果成功，重新下拉一次
                        mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                    } else {
                        mui.toast("操作取消")
                    }
                }
            });
        }

    });
    mui(".mui-numbox").numbox();
    $(".lt_edit_size span").on("tap", function() {
        $(this).addClass("now").siblings().removeClass("now");
    })
});
//删除功能
$(".info_content").on("tap", ".delete", function() {
    log(1);
    var id = $(this).data("id");
    mui.confirm("确定删除吗?", "提示", ["否", "是"], function(e) {
        if (e.index == 0) {
            mui.toast("操作取消");
        } else {

            $.ajax({
                type: "get",
                url: "/cart/deleteCart",
                data: {
                    id: [id] //id必须是一个数组
                },
                success: function(data) {
                    tools.checkLogin(data);
                    if (data.success) {
                        //让容器下拉一次
                        mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                    }
                }
            })
        }

    })
});
$(".info_content").on("change", ".ck", function() {
    log(1);


    var total = 0;

    $(":checked").each(function(i, e) {

        total += $(this).data("num") * $(this).data("price");

    });

    $(".lt_total span").html(total);
});