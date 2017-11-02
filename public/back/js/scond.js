$(function() {

    var currentPage = 1;
    var pageSize = 5;

    //渲染与分页
    function render() {
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function(data) {
                $("tbody").html(template("tpl", data));
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: currentPage,
                    totalPages: Math.ceil(data.total / pageSize),
                    size: "small",
                    onPageClicked(a, b, c, page) {
                        currentPage = page;
                        render();
                    }
                });
            }
        })
    }
    render();


    $(".btnadd").on("click", function() {
        $("#addModal").modal("show");

        $.ajax({
            type: "GET",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: 1,
                pageSize: 100,
            },
            success: function(data) {
                $('.options').html(template("tpl2", data));
            }
        })
    })
    $('#fileupload').fileupload({
        dataType: 'json',
        done: function(e, data) {
            // console.log(data);
            $('.img_box img').attr("src", data.result.picAddr);
            $('#brandLogo').val(data.result.picAddr);
            $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");
        }
    });
    $(".dropdown-menu").on("click", "a", function() {
        // console.log(1);
        //获取到当前a标签的内容，设置给dropdown-text
        $(".dropdown-text").text($(this).text());

        //获取当前a标签的自定义属性，data-id,修改隐藏域的value值
        $("#categoryId").val($(this).data("id"));

        // 让categoryId的校验通过
        $form.data("bootstrapValidator").updateStatus("categoryId", "VALID");

    })
    var $form = $("#form");
    $form.bootstrapValidator({
        //默认不校验的配置
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryId: {
                validators: {
                    notEmpty: {
                        message: "请选择一级分类"
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: "请输入二级分类的名称"
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: "请上传图片"
                    }
                }
            }
        }
    });
    // console.log($form.serialize());
    $form.on("success.form.bv", function(e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/category/addSecondCategory",
            data: $form.serialize(),
            success: function(data) {
                console.log(data);
                if (data.success) {
                    $("#addModal").modal("hide");
                    currentPage = 1;
                    render();
                }

            }
        })
    })
});