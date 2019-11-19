let key = getUrlParams('key');
// 根据关键字查询文章
$.ajax({
    type: 'get',
    url: `/posts/search/${key}`,
    success: function(response) {
        console.log(response);
        let html = '';
        if(response.length > 0) {
            html = template('searchTpl', {data: response});
        }else{
            html = ' <div class="head">空空如也~~</div>';
        }
        $('#listBox').html(html);
    }
})