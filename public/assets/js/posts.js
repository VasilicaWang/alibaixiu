// 获取文章列表
$.ajax({
    type: 'get',
    url: '/posts',
    success: function (response) {
        let postsHtml = template('postsTpl', response);
        $('#postsBox').html(postsHtml);
        let pageHtml = template('pageTpl', response);
        $('#pagination').html(pageHtml);
    }
})

// 点击页数
function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: page
        },
        success: function (response) {
            let html = template('postsTpl', response);
            $('#postsBox').html(html);
            let pageHtml = template('pageTpl', response);
            $('#pagination').html(pageHtml);
        }
    })
}

// 获取文章分类
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        let html = template('allCategoryTpl', {
            data: response
        });
        $('#allCategory').html(html);
    }
})

// 筛选文章列表
$('#filterForm').on('submit', function () {
    let formData = $(this).serialize();
    console.log(formData);
    $.ajax({
        type: 'get',
        url: '/posts',
        data: formData,
        success: function (response) {
            let postsHtml = template('postsTpl', response);
            $('#postsBox').html(postsHtml);
            let pageHtml = template('pageTpl', response);
            $('#pagination').html(pageHtml);
        }
    })
    return false;
})

// 删除文章
$('#postsBox').on('click', '.delete', function () {
    if (confirm('确认删除文章吗？')) {
        let id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: `/posts/${id}`,
            success: function () {
                location.reload();
            }
        })
    }
})