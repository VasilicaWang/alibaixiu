// 获取文章分类
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response) {
        let html = template('categoryTpl', {data: response});
        $('#category').html(html);
    }
})