/**
 * Created by acera on 2017/10/29.
 */
$(function() {
    var $form = $("#form");
    $form.bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [':disabled', ':hidden', ':not(:visible)'],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 4,
                        max: 30,
                        message: '用户名长度必须在到30之间'
                    },
                    //正则校验
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: '用户名由数字字母下划线和.组成'
                    },
                    callback: {
                        message: '用户名错误'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: '密码长度必须在6到30之间'
                    },
                    //正则校验
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: '密码由数字字母下划线和.组成'
                    },
                    callback: {
                        message: '密码不正确'
                    }
                }
            },
        }

    }).on('success.form.bv', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/employee/employeeLogin',
            data: $form.serialize(),
            dataType: 'json',
            success: function(data) {
                console.log(data);
                if (data.success) {
                    location.href = 'index.html';
                } else {
                    if (data.error == 1000) {
                        $form.data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback');
                    } else if (data.error == 1001) {
                        $form.data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback');
                    }
                }

            }
        });
    });
    //重置功能
    $("[type=rest]").on("click", function() {
        $form.data('bootstrapValidator').resetForm();
    })





});