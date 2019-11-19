let postId = getUrlParams('id');
$.ajax({
    type: 'get',
    url: `/posts/${postId}`,
    success: function(response) {
        console.log(response);
        let html = template('postTpl', response);
        $('#article').html(html);
    }
})