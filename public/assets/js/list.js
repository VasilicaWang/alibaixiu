let categoryId = getUrlParams('categoryId');
$.ajax({
    type: 'get',
    url: `/posts/category/${categoryId}`,
    success: function(response) {
        let html = template('listTpl', {data: response});
        $('#listBox').html(html);
    }
})

$.ajax({
    type: 'get',
    url: `/categories/${categoryId}`,
    success: function(response) {
        $('#categoryTitle').html(response.title)
    }
})