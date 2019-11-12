
$(function () {

  var random = Math.floor(Math.random() * 10);

  $('body').css({
    backgroundImage: 'url(./images/bg' + random + '.jpg)'
  });

  // 获取实况天气
  function weatherData(city) {

    // 基础路径
    var baseUrl = './images/';

    var weatherIconData = {
      yun: {
        title: '多云',
        icon: 'yun.png'
      },

      qing: {
        title: '晴',
        icon: 'qing.png'
      },

      lei: {
        title: '雷阵雨',
        icon: 'lei.png'
      },

      yu: {
        title: '小雨',
        icon: 'xiao.png'
      },

      //未知天气默认图标
      default: {
        title: '未知',
        icon: ''
      }
    }

    var data = {
      appid: '74536942',
      appsecret: 'Wu8DcQtU',
      version: 'v6'
    }

    if (city !== undefined) {
      data.city = city;
    }

    // 天气阴晴数据图标
    $.ajax({
      url: 'https://www.tianqiapi.com/api',
      type: 'GET',
      data: data,
      dataType: 'jsonp',
      success: function (data) {
        console.log('current ==> ', data);
        // 获取当前定位位置
        $('.location-city').text(data.city);

        var currentWeatherData = ['date', 'wea', 'week', 'tem', 'qing', 'air_level', 'win', 'win_speed', 'win_meter'];

        for (var i = 0; i < currentWeatherData.length; i++) {
          $('.' + currentWeatherData[i]).text(data[currentWeatherData[i]]);
        }


        // 获取24小时天气   未来6天天气

        var params = {
          appid: '74536942',
          appsecret: 'Wu8DcQtU',
          version: 'v9'
        }

        if (city !== undefined) {
          params.city = city;
        }

        $.ajax({
          url: 'https://www.tianqiapi.com/api',
          type: 'GET',
          data: params,
          dataType: 'jsonp',
          success: function (res) {
            console.log('hours future', res);

            var hoursWeatherData = res.data[0].hours;

            for (var j = 0; j < hoursWeatherData.length; j++) {

              // 判断图标库是否存在噶天气图标
              var isIconHas1 = weatherIconData[hoursWeatherData[j].wea_img] ? weatherIconData[hoursWeatherData[j].wea_img].icon : weatherIconData.default.icon;

              var hourItem = $(`<div class="hour-item">
                              <p class="hour">${hoursWeatherData[j].hours}</p>
                              <div class="hour-icon" style="background-image:url(${baseUrl + isIconHas1})"></div>
                              <p class="hour-tem">${hoursWeatherData[j].tem}℃</p>
                              <p class="wind">${hoursWeatherData[j].win}</p>
                            </div>`);
              $('.hours-box').append(hourItem);

            }

            var futureWeatherData = res.data;

            for (var k = 1; k < futureWeatherData.length; k++) {

              // 判断图标库是否存在噶天气图标
              var isIconHas2 = weatherIconData[futureWeatherData[k].wea_img] ? weatherIconData[futureWeatherData[k].wea_img].icon : weatherIconData.default.icon;

              var futureDay = $(`<div class="future-item">
                                <span class="fu-day">${futureWeatherData[k].day.slice(0, -5)}</span>
                                <span class="fu-icon" style="background-image:url(${baseUrl + isIconHas2})"></span>
                                <span class="fu-tem">${futureWeatherData[k].tem2 + '℃'} ~ ${futureWeatherData[k].tem1 + '℃'}</span>
                                <span class="fu-wind">${futureWeatherData[k].win[0]}</span>
                              </div>`);
              $('.future-day').append(futureDay);
            }

          }
        })

      }
    });

  }

  weatherData();

  $('.search-icon').on('click', function () {

    var value = $('.search-ipt').val();
    
    if (value !== undefined || value !== null || value !== '') {
      weatherData(value);
    }

  })

})
