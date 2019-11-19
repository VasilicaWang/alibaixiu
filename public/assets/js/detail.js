let postId = getUrlParams('id');
let review = true;

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

// 评论模板
$.ajax({
    type: 'get',
    url: '/settings',
    success: function(response) {
        review = response.review;
        if(response.comment) {
            let html = template('commentTpl');
            $('#comment').html(html);
        }
    }
})

let userId = JSON.parse(localStorage.getItem('user'))._id;

$('#comment').on('submit', 'form', function () {
    let content = $(this).find('textarea').val();
    let state = 0;
    if(review) {
        state = 0;
    }else{
        state = 1;
    }
    console.log(postId,userId,content, state);
    $.ajax({
        type: 'post',
        url: '/comments',
        data: {
            author: userId,
            content: content,
            state: state,
            post: postId
        },
        success: function(){
            location.reload();
        },
        error: function() {
            alert('评论失败');
        }
    })
    return false;
})