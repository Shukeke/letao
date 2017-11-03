$(function() {
    //思路：1. 获取商品数据
    var currentPage = 1;
    var pageSize = 4;
    var $form = $("#form");

    function render() {
        $.ajax({

            type: "get",
            url: "/product/queryProductDetailList",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function(data) {

                console.log(data);
                $("tbody").html(template("tpl", data));
                // 渲染分页
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

    $(".btngoods").on("click", function() {
        console.log(1);
        $("#goodsModal").modal("show");
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: 1,
                pageSize: 1444

            },
            success: function(data) {
                console.log(data);
                var data = template("tpl1", data);
                $(".dropdown-menu").html(data);
            }
        })
    })
    $(".dropdown-menu").on("click", "a", function() {
        console.log(1);
        $(".dropdown-text").text($(this).text());
        $("#brandId").val($(this).data("id"));
        $form.data("bootstrapValidator").updateStatus("brandId", "VALID");
    });
    var img_arr = [];
    $('#fileupload').fileupload({
        dataType: 'json',
        done: function(e, data) {
            console.log(data);
            $('<img src="' + data.result.picAddr + '" width="100" height="100">').appendTo(".img_box ");
            img_arr.push(data.result);
            console.log(img_arr);
            if (img_arr.length === 3) {
                log("dengyu")
                $form.data("bootstrapValidator").updateStatus("productLogo", "VALID");
            } else {
                log("budenguyi dengyu")
                $form.data("bootstrapValidator").updateStatus("productLogo", "INVALID");
            }
        }
    })
    $form.bootstrapValidator({
        //默认不校验的配置
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            brandId: {
                validators: {
                    notEmpty: {
                        message: "请选择二级分类"
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: "请输入商品名称"
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: "请输入商品描述"
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: "请输入商品库存"
                    },
                    regexp: {
                        //必须是0以上的数字
                        regexp: /^[1-9]\d*$/,
                        message: "请输入一个大于0的库存"
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: "请输入商品尺寸"
                    },
                    regexp: {
                        //33-55
                        regexp: /^\d{2}-\d{2}$/,
                        message: "请输入正确的尺码（30-50）"
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: "请输入商品的原价"
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: "请输入商品的折扣价"
                    }
                }
            },
            productLogo: {
                validators: {
                    notEmpty: {
                        message: "请上传3张商品图片"
                    }
                }
            },
        }
    })



    $form.on("success.form.bv", function(e) {
        var data = $form.serialize();
        data += "&picName1=" + img_arr[0].picName + "&picAddr1=" + img_arr[0].picAddr;
        data += "&picName2=" + img_arr[1].picName + "&picAddr2=" + img_arr[0].picAddr;
        data += "&picName3=" + img_arr[2].picName + "&picAddr3=" + img_arr[0].picAddr;
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/product/addProduct",
            data: data,
            success: function(data) {
                $("#goodsModal").modal("hide");
                currentPage = 1;
                render();
            }
        })
    })
});