// 评论数据列表
$.ajax({
    type: 'get',
    url: '/comments',
    success: function (response) {
        console.log(response);
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