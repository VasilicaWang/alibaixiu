$('#logout').on('click', function() {
    let isConfirm = confirm('确认退出吗？')
    if(isConfirm) {
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function() {
                location.href = 'login.html';
            },
            error: function() {
                alert('退出失败')
            }
        })
    }
})

// 处理时间
function formateDate(date) {
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

// 更改用户头像
let userId = JSON.parse(localStorage.getItem('user'))._id;
$.ajax({
    type: 'get',
    url: `/users/${userId}`,
    success: function(response) {
        // console.log(response);
        $('.profile .avatar').attr('src', response.avatar);
        $('.profile .name').html(response.nickName);
    }
})