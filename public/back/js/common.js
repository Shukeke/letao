var log = console.log.bind(console);


$(function() {
    $(".cate").prev().on("click", function() {

        $(this).next().slideToggle();
    })
    $(".onleft").on("click", function() {
        log(1);
        $(".aside").toggleClass("now")
    })
    $(".onleft").on("click", function() {
        $(".main").toggleClass("mainshow")
    })
    $(".head_right").on("click", function() {
        $('#myModal').modal("show")
    })
    var btn = $(".btns");
    btn.on("click", function() {
        log(1);
        $.ajax({
            type: "GET",
            url: "/employee/employeeLogout",
            data: "",
            success: function(data) {
                if (data.success) {
                    location.href = "login.html";
                }
            }
        })

    })

    $(document).ajaxStart(function() {
        //让进度条显示出来
        NProgress.start();
    })


    $(document).ajaxStop(function() {
        setTimeout(function() {
            //让进度条结束
            NProgress.done();
        }, 1000);
    });




})