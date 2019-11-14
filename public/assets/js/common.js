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