var pageSize = 5;
var page = 1;

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
        console.log(html);
        $("tbody").html(html);
        console.log('success');

    }

})