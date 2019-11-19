// 获取文章分类
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        console.log(response);
        let html = template('categoryTpl', {
            data: response
        });
        $('#category').html(html);
    }
})

// 上传文章封面图
$('#postBox').on('change', '#feature', function () {
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
        success: function (response) {
            $('#thumbnail').val(response[0].cover);
            $('#preview').attr('src', response[0].cover);
            $('#preview').show();
        }
    })
})

// 文章上传
$('#postBox').on('submit', '#addForm', function () {
    let formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function () {
            location.href = '/admin/posts.html';
        }
    })
    return false;
})

// 获取地址栏参数
function getUrlParams(name) {
    let paramsArr = location.search.substr(1).split('&');
    for (var i = 0; i < paramsArr.length; i++) {
        let tmp = paramsArr[i].split('=');
        if (tmp[0] == name) {
            return tmp[1];
        }
    }
    return -1;
}

let postId = getUrlParams('id');
// 修改界面
if (getUrlParams('id') != -1) {
    $.ajax({
        type: 'get',
        url: `/posts/${postId}`,
        success: function (response) {
            $.ajax({
                type: 'get',
                url: '/categories',
                success: function (categories) {
                    response.categories = categories
                    console.log(response);
                    let html = template('modifyFormTpl', response);
                    $('#postBox').html(html);
                }
            })
        }
    })
}

// 编辑文章
$('#postBox').on('submit', '#modifyForm', function () {
    let formData = $(this).serialize();
    let id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: `/posts/${id}`,
        data: formData,
        success: function() {
            location.href = "/admin/posts.html";
        }
    })
    return false;
})