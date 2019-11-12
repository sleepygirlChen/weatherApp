function remSet() {

  var standardWidth = 375; // 以iphone6的屏宽为标准屏

  var screenWidth = $(window).width();

  var fontSize = screenWidth / standardWidth * 100;

  if ($('#rem')) {
    $('#rem').remove();
  }

  var style = $('<style id="rem"> html{ font-size: ' + (screenWidth >= 1200 ? 100 : fontSize) + 'px; } </style>');

  $('head').append(style);

}



$(function () {

  remSet();

  var timers = [];

  $(window).on('resize', function () {

    var timer = setTimeout(function () {

      for (var i = 1; i < timers.length; i++) {
        clearTimeout(timers[i]);
      }

      remSet();

      timers = [];

    });

    timers.push(timer);

  });

})