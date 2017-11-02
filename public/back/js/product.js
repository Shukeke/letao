$(function() {
    //思路：1. 获取商品数据
    var currentPage = 1;
    var pageSize = 4;

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
});