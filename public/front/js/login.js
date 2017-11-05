$(function() {
    var log = console.log.bind(console);
    $(".btn_login").on("click", function() {

        var username = $("[name='username']").val();

        var password = $("[name='password']").val();

        if (!username) {
            mui.toast("请输入用户名");
            return;
        }
        if (!password) {
            mui.toast("请输密码");
            return;
        }
        $.ajax({
            type: "post",
            url: "/user/login",
            data: {
                username: username,
                password: password
            },
            success: function(data) {
                log(data);
                if (data.success) {
                    var search = location.search;
                    if (search.indexOf("retUrl") > -1) {
                        search = search.replace("?retUrl=",
                            "");
                        location.href = search;
                    } else {
                        location.href = "#";
                    }
                }
                if (data.error === 403) {
                    mui.toast(data.message);
                }
            }
        })
    })
})