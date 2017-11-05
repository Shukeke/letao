$(function() {
    $(".btn_register").on("click", function() {


        var username = $("[name='username']").val();
        var password = $("[name='password']").val();
        var repassword = $("[name='repassword']").val();
        var mobile = $("[name='mobile']").val();
        var vCode = $("[name='vCode']").val();



        if (!username) {
            mui.toast("请输入用户名");
            return false;
        }
        if (!password) {
            mui.toast("请输入密码");
            return false;
        }
        if (!repassword) {
            mui.toast("请输入确认密码");
            return false;
        }

        if (password != repassword) {
            mui.toast("确认密码与密码不一致");
            return false;
        }

        if (!vCode) {
            mui.toast("请输入验证码");
            return false;
        }

        if (!/^\d{6}$/.test(vCode)) {
            mui.toast("请输入有效的验证码");
            return false;
        }

        if (!mobile) {
            mui.toast("请输入手机号");
            return false;
        }

        if (!/^1[34578]\d{9}$/.test(mobile)) {
            mui.toast("请输入有效的手机号码");
            return false;
        }

        $.ajax({
            type: "post",
            url: "/user/register",
            data: {
                username: username,
                password: password,
                mobile: mobile,
                vCode: vCode
            },
            success: function(data) {
                if (data.success) {
                    mui.toast("注册成功，即将跳转到登录页");
                    setTimeout(function() {
                        location.href = "login.html";
                    }, 1000);
                } else {
                    mui.toast(data.message);
                }

            }
        })

    });
    $(".btn_getcode").on("click", function() {
        var $this = $(this);
        if ($this.hasClass("disabled")) {
            return;
        }
        $this.addClass("disabled").html("正在发送中....");
        $.ajax({
            type: "get",
            url: "/user/vCode",
            success: function(data) {

                console.log(data.vCode);
                var num = 60;
                var timer = setInterval(function() {
                    num--;
                    $this.html(num + "秒后再次发送");

                    if (num <= 0) {
                        $this.html("再次发送").removeClass("disabled");
                        clearInterval(timer);
                    }
                }, 1000);

            }
        });
    })
});