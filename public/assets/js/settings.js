// 图片上传功能
$('#logo').on('change', function() {
    let formData = new FormData();
    formData.append('logo', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            console.log(response);
            $('#site_logo').val(response[0].logo);
            $('#preview').attr('src', response[0].logo)
        }
    })
})

// 表单提交
$('#settingsForm').on('submit', function() {
    let formData = $(this).serialize();
    console.log(formData);
    $.ajax({
        type: 'post',
        url: '/settings',
        data: formData,
        success: function(response) {
            location.reload();
        }
    })
    return false;
})

// 渲染页面
$.ajax({
    type: 'get',
    url: '/settings',
    success: function(response) {
        console.log(response);
        if(response) {
            $('#preview').attr('src', response.logo);
            $('#site_logo').val(response.logo);
            $('#site_name').val(response.title);
            $('#site_description').val(response.description);
            $('#site_keywords').val(response.keywords);
            // $('#comment_status').val(response.comment);
            $('#comment_status').prop('checked', response.comment);
            
            // $('#comment_reviewed').val(response.review);
            $('#comment_reviewed').prop('checked', response.review);

        }
    }
})
