var pageSize = 5;
var page = 1;

function render() {
    $.ajax({
        type: "GET",
        url: "/user/queryUser",
        data: {
            page: page,
            pageSize: pageSize
        },
        success: function(data) {

            console.log(data);
            var html = template("tpl", data);
            // console.log(html);
            $("tbody").html(html);
            // console.log('success');
        }

    })
    $("#pagintor").bootstrapPaginator({
        bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
        currentPage: page, //当前页
        totalPages: 10, //总页数
        size: "small", //设置控件的大小，mini, small, normal,large
        onPageClicked: function(event, originalEvent, type, p) {
                //为按钮绑定点击事件 page:当前点击的按钮值
                page = p;
                render()
            }
            // $('#pagintor').bootstrapPaginator(options)
    });
}
render();
$(function() {
    $("tbody").on("click", ".btn", function() {
        $("#banModal").modal("show");
        var id = $(this).parent().data("id");
        var isDelete = $(this).parent().data("isDelete");
        $(".btn_confirm").on("click", function() {
            $.ajax({
                type: "POST",
                url: "/user/updateUser",
                data: {
                    id: id,
                    isDelete: isDelete,
                },
                success: function(data) {
                    if (data.success) {
                        $("#banModal").modal("hide");
                        render();
                    }
                }
            })
        })
    });


})