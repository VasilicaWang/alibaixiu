// 获取轮播图数据
$.ajax({
    type: 'get',
    url: '/slides',
    success: function (response) {
        // 轮播图数据
        let html = template('slidesTpl', {
            data: response
        });
        $('#slidesBox').html(html);
        // 下面的小圆点
        let totle = response.length - 1;
        let indexTpl = `
          <span class="active"></span>
          <% for(var i = 0; i < data; i++) { %>
          <span></span>
          <% } %>
        `;
        let indexHtml = template.render(indexTpl, {data: totle});
        $('#slidesIndex').html(indexHtml);
        // 轮播功能
        var swiper = Swipe(document.querySelector('.swipe'), {
            auto: 3000,
            transitionEnd: function (index) {
                // index++;
                $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
            }
        });
        // 上/下一张
        $('.swipe .arrow').on('click', function () {
            var _this = $(this);
            if (_this.is('.prev')) {
                swiper.prev();
            } else if (_this.is('.next')) {
                swiper.next();
            }
        })
    }
})

// 最新发布数据
$.ajax({
    type: 'get',
    url: '/posts/lasted',
    success: function (response) {
        let html = template('lastedTpl', {
            data: response
        });
        $('#lastedBox').html(html);
    }
})