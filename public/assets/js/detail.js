let postId = getUrlParams('id');
$.ajax({
    type: 'get',
    url: `/posts/${postId}`,
    success: function(response) {
        let html = template('postTpl', response);
        $('#article').html(html);
    }
})

$('#article').on('click', '#like', function() {
    $.ajax({
        type: 'post',
        url: `/posts/fabulous/${postId}`,
        success: function() {
            location.reload();
        }
    })
})