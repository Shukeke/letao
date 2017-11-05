/**
 * Created by HUCC on 2017/11/4.
 */
$(function() {

    $.ajax({
        type: "get",
        url: "/user/queryUserMessage",
        success: function(data) {
            tools.checkLogin(data);
            $(".userinfo").html(template("tpl", data));
        }
    });

    $(".logout a").on("click", function() {

        mui.confirm("确定要退出系统吗？", "提示", ["否", "是"], function(e) {
            if (e.index === 0) {
                mui.toast("操作取消");
            } else {
                $.ajax({
                    type: "get",
                    url: "/user/logout",
                    success: function(data) {
                        if (data.success) {
                            location.href = "login.html";
                        }
                    }
                })
            }
        });



    });



});