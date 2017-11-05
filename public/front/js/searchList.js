var log = console.log.bind(console);
$(function() {


    mui(".mui-scroll-wrapper").scroll({
        indicators: false
    });
    var data = {
        proName: '',
        brandId: '',
        price: '',
        num: '',
        page: 1,
        pageSize: 10
    };

    function render(data) {
        $.ajax({
            type: "get",
            url: "/product/queryProduct",
            data: data,
            success: function(data) {
                log(data);
                $(".lt_product").html(template("tpl", data));
            }
        });
    }


    var key = tools.getParam("key");
    $(".inputsearch").val(key);
    data.proName = key;
    render(data);


    $(".btnsearch").on("click", function() {
        //点击搜索时候清空
        $(".lt_sort a").removeClass("now");
        $(".lt_sort span").removeClass("fa-angle-up").addClass("fa-angle-down");
        data.price = '';
        data.num = '';

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
        // location.href = "searchlist.html?key=" + key;
    })
    $(".lt_sort a").on("click", function() {
        log(1);
        var $this = $(this);
        log($this);

        var $span = $(this).find("span");
        log($span);
        if ($this.hasClass("now")) {
            $span.toggleClass("fa-angle-down").toggleClass("fa-angle-up");

        } else {
            $(this).addClass("now").siblings().removeClass("now");
            $(".lt_sort span").removeClass("fa-angle-up").addClass("fa-angle-down");

        }
        var type = $this.data("type");
        var value = $span.hasClass("fa-angle-down") ? 2 : 1;
        data.price = '';
        data.num = '';
        data[type] = value;
        log()
        render(data);
    })
});