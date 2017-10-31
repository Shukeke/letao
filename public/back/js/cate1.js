var log = console.log.bind(console);
var pageSize = 5;
var page = 1;

function render() {
    $.ajax({
        type: "GET",
        url: "/category/queryTopCategoryPaging",
        data: {
            page: page,
            pageSize: pageSize
        },
        success: function(data) {
            console.log(data);
            var html = template("tpl", data);
            $("tbody").html(html);
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
$(".btnadd").on("click", function() {
    $("#addModal").modal("show");
})
var $form = $("#form");
$form.bootstrapValidator({
    //校验时使用的图标
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
        //name属性
        categoryName: {
            validators: {
                notEmpty: {
                    message: "一级分类名称不能为空"
                }
            }
        }

    }
});
$form.on("success.form.bv", function(e) {
    e.preventDefault();
    $.ajax({
        type: "post",
        url: "/category/addTopCategory",
        data: $form.serialize(),
        success: function(data) {
            if (data.success) {
                $("#addModal").modal("hide");
                page = 1;
                render();
                $form.data("bootstrapValidator").resetForm();
                $form[0].reset();
            }
        }
    })
})