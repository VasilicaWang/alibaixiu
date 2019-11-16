// 提交添加用户数据
$('#modifyBox').on('submit', '#userForm', function () {
    let formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function () {
            location.reload();
        },
        error: function () {
            alert('用户添加失败');
        }
    })
    // 阻止表单默认提交
    return false;
})

// 头像上传
$('#modifyBox').on('change', '#avatar', function () {
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
        success: function (response) {
            console.log(response);
            // 图片预览功能
            $('#preview').attr('src', response[0].avatar);
            // 隐藏表单域用来提交数据
            $('#hiddenAvatar').val(response[0].avatar);
        },
        error: function () {
            alert('头像上传失败！')
        }
    })
})

// 渲染列表
$.ajax({
    type: 'get',
    url: '/users',
    success: function (response) {
        let html = template('userTpl', {
            data: response
        });
        $('#userList').html(html);
    }
})

// 修改用户
$('#userList').on('click', '.edit', function () {
    let id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: `/users/${id}`,
        success: function (response) {
            var html = template('modifyTpl', response);
            $('#modifyBox').html(html);
        }
    })
})

// 提交修改
$('#modifyBox').on('submit', '#modifyForm', function() {
    let id = $(this).attr('data-id');
    let formData = $(this).serialize();
    $.ajax({
        type: 'put',
        url: `/users/${id}`,
        data: formData,
        success: function() {
            location.reload();
        },
        error: function() {
            alert('用户修改失败');
        }
    })
    // 阻止表单默认提交
    return false;
})

// 删除用户
$('#userList').on('click', '.delete', function() {
    if(confirm('确认要删除用户吗？')) {
        let id = $(this).attr('data-id');
        // alert(id);
        $.ajax({
            type: 'delete',
            url: `/users/${id}`,
            success: function() {
                location.reload();
            }
        })
    }
})

// 批量删除用户
let selectAll = $("#selectAll");
// 全选按钮控制单选按钮
selectAll.on('change', function() {
    let status = $(this).prop('checked');
    $('#userList').find('input').prop('checked', status);
})
// 单个按钮控制全选按钮
$('#userList').on('change', '.userStatus', function() {
    let inputs = $('#userList').find('input');
    if(inputs.length == inputs.filter(':checked').length) {
        selectAll.prop('checked', true);
    }else{
        selectAll.prop('checked', false);
    }
})