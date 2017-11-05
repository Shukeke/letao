$(function() {
    mui(".mui-scroll-wrapper").scroll({
        indicators: false
    })

    var id = tools.getParam("product");

    $.ajax({
        type: "get",
        url: "/product/queryProductDetail",
        data: {
            id: id
        },
        success: function(data) {
            var temp = data.size.split("-");
            var sizeArray = [];
            for (var i = temp[0]; i <= temp[1]; i++) {
                sizeArray.push(i);
            }

            data.sizeArray = sizeArray;

            $(".mui-scroll").html(template("tpl", data));

            //当内容渲染完成后，需要去初始化轮播图
            //轮播图效果
            mui('.mui-slider').slider({
                interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
            });

            mui(".mui-numbox").numbox();


        }
    });
    $(".mui-scroll").on("click", ".size", function() {
        $(this).addClass("now").siblings().removeClass("now");
    });
    $(".btn_add_cart").on("click", function() {
        //获取数据
        var size = $(".size.now").html();
        var num = $(".mui-numbox-input").val();

        if (!size) {
            mui.toast("请选择尺码");
            return;
        }

        //才发送ajax请求
        $.ajax({
            type: "post",
            url: "/cart/addCart",
            data: {
                productId: id,
                num: num,
                size: size
            },
            success: function(data) {

                if (data.success) {
                    mui.toast("添加成功了,");
                }
                if (data.error === 400) {
                    //跳转到login页面
                    location.href = "login.html?retUrl=" + location.href;
                }

            }
        });

    })


})