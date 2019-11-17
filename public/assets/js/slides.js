// 图片上传功能
$('#file').on('change', function() {
    let formData = new FormData();
    formData.append('image', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            console.log(response[0].image);
            $('#image').val(response[0].image);
        }
    })
})

// 获取轮播图列表
$.ajax({
    type: 'get',
    url: '/slides',
    success: function(response) {
        console.log(response);
        let html = template('slidesTpl', {data: response});
        $('#slidesBox').html(html);
    }
})

// 添加轮播图
$('#slidesForm').on('submit', function() {
    let formData = $(this).serialize();
    // console.log(formData);
    $.ajax({
        type: 'post',
        url: '/slides',
        data: formData,
        success: function(response) {
            location.reload();
        }
    })
    return false;
})

// 删除操作
$('#slidesBox').on('click', '.delete', function() {
    let id = $(this).attr('data-id');
    $.ajax({
        type: 'delete',
        url: `/slides/${id}`,
        success: function() {
            location.reload();
        }
    })
})