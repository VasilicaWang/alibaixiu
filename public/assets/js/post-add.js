// 获取文章分类
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response) {
        let html = template('categoryTpl', {data: response});
        $('#category').html(html);
    }
})

// 上传封面图
$('#feature').on('change', function() {
    let file = this.files[0];
    let formData = new FormData();
    formData.append('cover', file);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            $('#thumbnail').val(response[0].cover)
        }
    })
})