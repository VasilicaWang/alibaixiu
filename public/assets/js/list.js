let categoryId = getUrlParams('categoryId');
// 根据分类找出所有文章
$.ajax({
    type: 'get',
    url: `/posts/category/${categoryId}`,
    success: function(response) {
        let html = template('listTpl', {data: response});
        $('#listBox').html(html);
    }
})
// 获取分类名称
$.ajax({
    type: 'get',
    url: `/categories/${categoryId}`,
    success: function(response) {
        $('#categoryTitle').html(response.title)
    }
})