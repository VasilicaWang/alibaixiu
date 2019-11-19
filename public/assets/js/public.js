// 随机推荐
$.ajax({
  type: 'get',
  url: '/posts/random',
  success: function (response) {
    let randomTpl = `
            {{each data}}
            <li>
            <a href="detail.html?id={{$value._id}}">
              <p class="title">{{$value.title}}</p>
              <p class="reading">阅读({{$value.meta.views}})</p>
              <div class="pic">
                <img src="{{$value.thumbnail}}" alt="">
              </div>
            </a>
            </li>
            {{/each}}
        `;
    let html = template.render(randomTpl, {
      data: response
    });
    $('#randomBox').html(html);
  }
})

// 最新评论
$.ajax({
  type: 'get',
  url: '/comments/lasted',
  success: function (response) {
    let lastedCommentsTpl = `
    {{each data}}
    <li>
    <a href="javascript:;">
      <div class="avatar">
        <img src="{{$value.author.avatar}}" alt="">
      </div>
      <div class="txt">
        <p>
          <span>{{$value.author.nickName}}</span>{{$imports.formateDate($value.createAt)}}说:
        </p>
        <p>{{$value.content}}</p>
      </div>
    </a>
    </li>
    {{/each}}
    `;
    let html = template.render(lastedCommentsTpl, {
      data: response
    });
    $('#lastedCommentsBox').html(html);
  }
})

// 导航数据
$.ajax({
  type: 'get',
  url: 'categories',
  success: function(response) {
    let navTpl = `{{each data}}<li><a href="list.html?categoryId={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>{{/each}}`;
    let navHtml = template.render(navTpl, {data: response});
    $('#navBox').html(navHtml);
    $('#topNavBox').html(navHtml);
  }
})