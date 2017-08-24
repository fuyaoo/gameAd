/*
* @Author: Marte
* @Date:   2017-07-08 14:48:20
* @Last Modified by:   Marte
* @Last Modified time: 2017-07-10 10:50:07
*/

$(function () {
  var token="";
  // var baseUrl=sessionStorage.getItem("baseUrl");
  var baseUrl = '/'

  /*加载时间控件*/
  $("#start").jeDate({
    isinitVal:true,
    festival:true,
    ishmsVal:false,
    minDate: '2016-06-16 23:59:59',
    //maxDate: $.nowDate(0),
    initAddVal:true,
    format:"YYYY-MM-DD hh:mm:ss",
    zIndex:3000
  });

  $("#end").jeDate({
    isinitVal:true,
    festival:true,
    ishmsVal:false,
    minDate: '2016-06-16 23:59:59',
    //maxDate: $.nowDate(0),
    initAddVal:true,
    format:"YYYY-MM-DD hh:mm:ss",
    zIndex:3000
  });

  function submit () {
    $('#form').attr('action', baseUrl + 'oss/user/activity/report');
    $('#form').attr('target', '_blank');
    $('#form').submit();
  };

  $('#submit').click(submit);

  function query (arg) {
    console.log(arg)
    var start = $('#start').val();
    var end = $('#end').val();

    if (start == ''){
      $('.info').html('请选择开始时间');
      return false
    }
    if (end == ''){
      $('.info').html('请选择截止时间');
      return false
    }
    if (Date.parse(new Date(end)) - Date.parse(new Date(start)) < 0){
      $('.info').html('截止时间要大于开始时间');
      return false
    } else {
      $.ajax({
        url: baseUrl + 'oss/user/activity/data',
        type: 'get',
        async: true,
        data: {
          token: token,
          start: start,
          end: end,
          page_size: 10,
          page_num: arg
        },
        success: function (obj) {
          console.log(obj)
          if (obj.code == -999) {
            window.location.href = "/admin/index";
            return false;
          }
          if (obj.code == 100) {
            var list = obj.data.list;
            var total = obj.data.total;
            var num = Math.ceil(total / 10);
            if (num > 1) {
              var pagination = '';
              for (var i=0; i<num; i++) {
                pagination += '<li data-page="'+(i+1)+'">'+(i+1)+'</li>'
              };
              $('.pagination').html(pagination);
            }
            var offerTbody = '';
            $.each(list, function (index, array) {
              offerTbody += '<tr><td>'+
              (index + 1)+'</td><td>'+
              array.create_time+'</td><td>'+
              array.user_name+'</td><td>'+
              array.from_channel+'</td></tr>'
            });
            $('#offerTbody').html(offerTbody);
          }
        }
      })
    }
  };

  $('#query').click(function () {query(1)});

  $('body').on('click', '.pagination li', function () {
    var page = $(this).attr('data-page');
    query(page);
  })

  $('#start, #end').focus(() => { $('.info').html('') });
})