// 评论数据列表
$.ajax({
    type: 'get',
    url: '/comments',
    success: function (response) {
        let commentsHtml = template('commentsTpl', response);
        $('#commentsBox').html(commentsHtml);
        let pageHtml = template('pageTpl', response);
        $('#pagination').html(pageHtml);
    }
})

// 点击页数
function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/comments',
        data: {
            page: page
        },
        success: function (response) {
            let commentsHtml = template('commentsTpl', response);
            $('#commentsBox').html(commentsHtml);
            let pageHtml = template('pageTpl', response);
            $('#pagination').html(pageHtml);
        }
    })
}

// 改变评论状态
$('#commentsBox').on('click', '.status', function () {
    let state = $(this).attr('data-status');
    let id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: `/comments/${id}`,
        data: {
            state: state == 0 ? 1 : 0
        },
        success: function () {
            location.reload();
        }
    })
})

// 删除评论
$('#commentsBox').on('click', '.delete', function () {
    if (confirm('确认要删除吗？')) {
        let id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: `/comments/${id}`,
            success: function () {
                location.reload();
            }
        })
    }
})