// 添加文章分类
$('#categoryBox').on('submit', '#addCategory', function () {
    let formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function () {
            location.reload();
        }
    })
    return false;
})

// 渲染页面
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        let html = template('categoryListTpl', {
            data: response
        });
        $('#categoryList').html(html);
    }
})

// 编辑文章分类
$('#categoryList').on('click', '.edit', function () {
    let id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: `/categories/${id}`,
        success: function (response) {
            let html = template('editCategoryTpl', response);
            $('#categoryBox').html(html);
        }
    })
})

// 修改文章分类
$('#categoryBox').on('submit', '#editCategory', function () {
    let id = $(this).attr('data-id');
    let formData = $(this).serialize();
    $.ajax({
        type: 'put',
        url: `/categories/${id}`,
        data: formData,
        success: function (response) {
            location.reload();
        }
    });
    return false;
})

// 删除分类
$('#categoryList').on('click', '.delete', function () {
    if (confirm('确定要删除吗？')) {
        let id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: `/categories/${id}`,
            success: function () {
                location.reload();
            }
        })
    }
})

// 批量删除用户
let selectAll = $("#selectAll");
let deleteMany = $("#deleteMany");
// 全选按钮控制单选按钮
selectAll.on('change', function () {
    let status = $(this).prop('checked');
    if (status) {
        deleteMany.show();
    } else {
        deleteMany.hide();
    }
    $('#categoryList').find('input').prop('checked', status);
})
// 单个按钮控制全选按钮
$('#categoryList').on('change', '.categoryStatus', function () {
    let inputs = $('#categoryList').find('input');
    if (inputs.length == inputs.filter(':checked').length) {
        selectAll.prop('checked', true);
    } else {
        selectAll.prop('checked', false);
    }
    if (inputs.filter(':checked').length > 0) {
        deleteMany.show();
    } else {
        deleteMany.hide();
    }
})
deleteMany.on('click', function () {
    let checkedCategory = $('#categoryList').find('input:checked');
    let ids = [];
    checkedCategory.each((i, ele) => {
        ids.push($(ele).attr('data-id'));
    })
    console.log(ids);
    if (confirm('确定要批量删除吗')) {
        $.ajax({
            type: 'delete',
            url: `/categories/${ids.join('-')}`,
            success: function () {
                location.reload();
            }
        })
    }
})