// 获取文章分类
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response) {
        let html = template('categoryTpl', {data: response});
        $('#category').html(html);
    }
})

// 上传文章封面图
$('#feature').on('change', function() {
    let file = this.files[0];
    let formData = new FormData();
    formData.append('cover', file);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 告诉$.ajax不要处理data对应的参数
        processData: false,
        // 告诉$.ajax不要设置参数类型
        contentType: false,
        success: function(response) {
            $('#thumbnail').val(response[0].cover)
        }
    })
})

// 文章上传
$('#addForm').on('submit', function() {
    let formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function() {
            location.href = '/admin/posts.html';
        }
    })
    return false;
})