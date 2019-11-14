// 提交添加用户数据
$('#userForm').on('submit', function() {
    let formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function() {
            location.reload();
        },
        error: function() {
            alert('用户添加失败');
        }
    })
    return false;
})

// 头像上传
$('#avatar').on('change', function() {
    let formData = new FormData();
    formData.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 告诉$.ajax不要解析请求参数
        processData: false,
        // 告诉$.ajax不要设置请求参数的类型
        contentType: false,
        success: function(response) {
            console.log(response);
            // 图片预览功能
            $('#preview').attr('src', response[0].avatar);
            // 隐藏表单域用来提交数据
            $('#hiddenAvatar').val(response[0].avatar);
        },
        error: function() {
            alert('头像上传失败！')
        }
    })
})

// 渲染列表
$.ajax({
    type:'get',
    url: '/users',
    success: function(response) {
        let html = template('userTpl', {data: response});
        $('#userList').html(html);
    }
})