/*
* @Author: Marte
* @Date:   2017-07-21 16:23:21
* @Last Modified by:   Marte
* @Last Modified time: 2017-08-02 09:56:51
*/

$(function () {
  var baseUrl="/";
  // var baseUrl = 'http://192.168.1.44/';
  var token="";
  $('.token').val(token);

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

  $('#toggle').click(function () {
    $('#channelForm').toggle();
  })

  // 运营得到所有的渠道合作模式
  $.model = function () {
    $.ajax({
      url: baseUrl + 'oss/user/query/all/model',
      type: 'get',
      async: true,
      data: {token: token},
      success: function (obj) {
        // console.log(obj)
        if (obj.code == -999) {
          window.location.href = '/admin/index';
          return false
        }
        if (obj.code == 100) {
          var modelId = '';
          var list = obj.data;
          $.each(list, function (index, array) {
            modelId += '<option value="'+
            array.id+'">'+
            array.modelName+'('+
            array.modelDesc+')</option>'
          });
          $('#modelId').html(modelId);
          $('#modelId1').html(modelId);
        }
      }
    })
  }
  $.model();

  // 阻止反复提交
  $.submission = function () {
    $.ajax({
        type: 'get',
        url: baseUrl + "oss/info/get/form/token",
        async: true,
        data: {token:token},
        success: function(obj){
            if( obj.code == -999){
                window.location.href = '/admin/index';
                return false
            }
            if(obj.code == 100){
                var form_token = obj.data;
                $('.form_token').val(form_token)
            }
        }
    })
  };

  // 运营增加渠道
  $.fn.addChannel = function () {
    $.submission();
    var option = {
      url: baseUrl + 'oss/user/add/channel',
      type: 'post',
      async: true,
      // clearForm: true,
      beforeSubmit: function () {
        if ($('#channelName').val() == '') {
          alert('请填写渠道名称');
          return false
        }
        if ($('#channelCode').val() == '') {
          alert('请填写渠道编码');
          return false
        }
        if ($('#url').val() == '') {
          alert('请填写投放url');
          return false
        }
      },
      success: function (obj) {
        if (obj.code == -999) {
          window.location.href = '/admin/index';
          return false
        }
        if (obj.code == 100) {
          alert('添加渠道成功！')
          $('#channelForm')[0].reset();
          $.submission();
        } else {
          alert('添加失败,' + obj.message)
        }
      }
    };
    $(this).click(function () {
      $('#channelForm').ajaxSubmit(option).submit(function () {return false})
    })
  };
  $('#buildChannel').addChannel();

  // 取消
  $('#cancelChannel').click(function () {
    $('#channelForm')[0].reset();
  })

  // 导出明细报表
  function submit () {
    $('#form').attr('action', baseUrl + 'oss/user/activity/report');
    $('#form').attr('target', '_blank');
    $('#form').submit();
  };

  $('#submit1').click(submit);

  // 得到当前时间
  $.getNowDate = function () {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (hours >= 0 && hours <= 9) {
        hours = "0" + hours;
    }
    if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
    }
    if (seconds >= 0 && seconds <= 9) {
        seconds = "0" + seconds;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + hours + seperator2 + minutes
            + seperator2 + seconds;
    return currentdate;
  };
  // 一个月的时间
  $.getOneMonthAgoDate = function () {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth();
    var strDate = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (hours >= 0 && hours <= 9) {
        hours = "0" + hours;
    }
    if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
    }
    if (seconds >= 0 && seconds <= 9) {
        seconds = "0" + seconds;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + hours + seperator2 + minutes
            + seperator2 + seconds;
    return currentdate;
  }
  $('#end').val($.getNowDate());
  $('#start').val($.getOneMonthAgoDate());

  // 运营查询渠道
  function query (arg) {
    arg = (arguments[0] == undefined)? 1 : arg;
    var start = $('#start').val();
    var end = $('#end').val();
    var channelName1 = $('#channelName1').val();
    var channelCode1 = $('#channelCode1').val();
    var modelId1 = $('#modelId1').val();
    var url1 = $('#url1').val();
    if (start == ''){
      alert('请选择开始时间');
      return false
    }
    if (end == ''){
      alert('请选择截止时间');
      return false
    }
    if (Date.parse(new Date(end)) - Date.parse(new Date(start)) < 0){
      alert('截止时间要大于开始时间');
      return false
    } else {
      $.ajax({
        url: baseUrl + 'oss/user/query/channel',
        type: 'get',
        async: true,
        data: {
          token: token,
          start: start,
          end: end,
          channelCode: channelCode1,
          channelName: channelName1,
          modelId: modelId1,
          url: url1,
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
            var list = obj.data.data;
            var total = obj.data.total;
            var num = Math.ceil(total / 10);
            if (num > 1) {
              var pagination = '';
              for (var i=0; i<num; i++) {
                pagination += '<li data-page="'+(i+1)+'">'+(i+1)+'</li>'
              };
              $('.pages').html(pagination);
            }
            var channelTbody = '';
            $.each(list, function (index, array) {
              channelTbody += '<tr id="'+
              array.channelId+'"><td>'+
              (index + 1)+'</td><td class="code" title="查询密码：'+
              array.pwd+'">'+
              array.channelCode+'</td><td>'+
              array.channelName+'</td><td>'+
              array.modelName+'</td><td>'+
              array.channelUrl+'</td><td>'+
              array.channelViewCount+'</td><td>'+
              array.regCount+'</td><td>'+
              array.regPercent+'</td><td>'+
              array.openCount+'</td><td>'+
              array.openPercent+'</td><td title="浏览：'+
              array.viewFee+'元/次, 注册：'+
              array.regFee+'元/次, 开户：'+
              array.openFee+'元/次">'+
              array.costConsult+'</td><td><span class="channelDelete">删除</span>|<span class="channelReport">导出明细</span></td></tr>'
            });
            $('#channelTbody').html(channelTbody);
          }
        }
      })
    }
  };

  $('#query').click(function () {query()});

  $('body').on('click', '.pages li', function () {
    var page = $(this).attr('data-page');
    query(page);
  })

  $('#start, #end').focus(() => { $('.info').html('') });

  // 运营删除渠道
  $('body').on('click', '.channelDelete', function () {
    var id = $(this).parent().parent().attr('id');
    $('.channelDeleteModal').show();
    $('.channelDeleteModalok').click(function () {
      $.ajax({
        url: baseUrl + 'oss/user/delete/channel',
        type: 'post',
        async: true,
        data: {id: id, token: token},
        success: function (obj) {
          if (obj.code == -999) {
            window.location.href = "/admin/index";
            return false;
          }
          if (obj.code == 100) {
            $('#' + id).remove();
            $('.channelDeleteModal').hide();
          }
        }
      })
    })
    $('.channelDeleteModalcancel').click(function () {
      $('.channelDeleteModal').hide();
      return false
    })
  })

  //导出单个明细
  $('body').on('click', '.channelReport', function () {
    var channelCode = $(this).parent().parent().find('.code').html();
    $('#channelCode1').val(channelCode);
    submit();
  })
})