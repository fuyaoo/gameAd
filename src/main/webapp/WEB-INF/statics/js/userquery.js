/*
* @Autdor: Marte
* @Date:   2017-07-11 13:38:41
* @Last Modified by:   Marte
* @Last Modified time: 2017-08-02 10:16:30
*/

$(function () {
  var baseUrl = "/";
  var token = "";
  $('.token').val(token);
  var total = 0;

  /*时间input插件内容*/
  $("#regStart").jeDate({
      isinitVal:true,
      festival:true,
      ishmsVal:true,
      minDate: '2014-06-16 00:00:00',
      //maxDate: $.nowDate(0),
      format:"YYYY-MM-DD hh:mm:ss",
      zIndex:3000
  });
  $("#regEnd").jeDate({
      isinitVal:true,
      festival:true,
      ishmsVal:true,
      minDate: '2014-06-16 00:00:00',
      //maxDate: $.nowDate(0),
      format:"YYYY-MM-DD hh:mm:ss",
      zIndex:3000
  });
  $("#loginStart").jeDate({
      isinitVal:true,
      festival:true,
      ishmsVal:true,
      minDate: '2014-06-16 00:00:00',
      //maxDate: $.nowDate(0),
      format:"YYYY-MM-DD hh:mm:ss",
      zIndex:3000
  });
  $("#loginEnd").jeDate({
      isinitVal:true,
      festival:true,
      ishmsVal:true,
      minDate: '2014-06-16 00:00:00',
      //maxDate: $.nowDate(0),
      format:"YYYY-MM-DD hh:mm:ss",
      zIndex:3000
  });
  $("#regStart").val('');
  $("#regEnd").val('');

  // 获取表单令牌
  function getFormToken () {
    $.ajax({
      type: 'get',
      url: baseUrl + "oss/info/get/form/token",
      async: true,
      data: {token: token},
      success: function(obj){
        if ( obj.code == -999){
          window.location.href = '/admin/index';
          return false
        }
        if(obj.code == 100){
          var form_token = obj.data;
          $('.form_token').val(form_token);
        }
      }
    })
  }

  // 查询用户信息
  function userquery (index) {
    index = arguments[0] == undefined ? 1 : index;
    var userName = $('#userName').val();
    var nickName = $('#nickName').val();
    var uid = $('#uid').val();
    var groupId = $('#groupId').val();
    var acctNo = $('#acctNo').val();
    var regStart = $('#regStart').val();
    var regEnd = $('#regEnd').val();
    var tagId = $('#tagId').val();
    var loginStart = $('#loginStart').val();
    var loginEnd = $('#loginEnd').val();
    $.ajax({
      url: baseUrl + 'oss/user/query',
      type: 'get',
      async: true,
      data: {
        userName: userName,
        nickName: nickName,
        uid: uid,
        groupId: groupId,
        acctNo: acctNo,
        regStart: regStart,
        regEnd: regEnd,
        tagId: tagId,
        loginStart: loginStart,
        loginEnd: loginEnd,
        token: token,
        page_num: index
      },
      success: function (obj) {
        console.log(obj);
        if (obj.code == -999) {
          window.location.href = "/admin/index";
          return false;
        }
        if (obj.code == 100) {
          var list = obj.data.list;
          var agentTbody = '';
          total = obj.data.total;
          var page = Math.ceil(total / 20);
          var pages = '';
          for (var i = 1; i< page+1; i++) {
            pages += '<li>'+i+'</li>'
          };
          $('.pages').html(pages);
          $('.pages > li').eq(index - 1).addClass('active');
          $.each(list, function (index, array) {
            var tags = array.tags;
            var tag = '';
            $.each(tags, function (index, array) {
              tag += '<span>'+array.name+',</span>'
            })
            array.acctNo = array.acctNo == null ? '' : array.acctNo;
            array.bankPhone = array.bankPhone == null ? '' : array.bankPhone;
            array.groupName = array.groupName == null ? '' : array.groupName;
            array.brokeNickname = array.brokeNickname == null ? '' : array.brokeNickname;
            agentTbody += '<tr><td><input type="checkbox"/></td><td><img src="'+
                          array.headPic+'"/></td><td>'+
                          array.userName+'</td><td class="nickName">'+
                          array.nickName+'</td><td class="uid">'+
                          array.uid+'</td><td>'+
                          array.acctNo+'</td><td>'+
                          array.bankPhone+'</td><td>--</td><td>'+
                          array.groupName+'</td><td>'+
                          tag+'</td><td>'+
                          array.brokeNickname+'</td><td>'+
                          array.createTime+'</td><td><span class="config">配置</span></td></tr>'
          });
          $('#agentTbody').html(agentTbody);
        }
      }
    })
  };
  $('#userQuery').click(function () {
    userquery()
  });

  // 分页查询用户信息
  $('body').on('click', '.pages li', function () {
    var page = $(this).html();
    userquery(page);
    $('#allchecked').prop('checked', false)
  })

  // 导出用户信息
  function userreport () {
    $('#agentForm').attr('action', baseUrl + 'oss/user/report');
    $('#agentForm').attr('target', '_blank');
    $('#agentForm').submit();
  }
  $('#userreport').click(userreport);

  $.extend({
    // 获取所有用户分组
    getGroup: function () {
      $.ajax({
        url: baseUrl + 'oss/user/query/group',
        type: 'get',
        async: true,
        data: {token: token},
        success: function (obj) {
          console.log(obj)
          if (obj.code == -999) {
            window.location.href = "/admin/index";
            return false;
          }
          if (obj.code == 100) {
            var list = obj.data;
            var userGroup = '<option value="">请选择</option>';
            $.each(list, function (index, array) {
              userGroup += '<option value="'+array.id+'">'+array.name+'</option>'
            });
            $('#groupId').html(userGroup);
            $('#groupId1').html(userGroup);
          }
        }
      })
    },

    // 获取所有用户标签
    getTag: function () {
      $.ajax({
        url: baseUrl + 'oss/user/query/tag',
        type: 'get',
        async: true,
        data: {token: token},
        success: function (obj) {
          // console.log(obj)
          if (obj.code == -999) {
            window.location.href = "/admin/index";
            return false;
          }
          if (obj.code == 100) {
            var list = obj.data;
            var userTag = '<option value="">请选择</option>';
            $.each(list, function (index, array) {
              userTag += '<option value="'+array.id+'">'+array.name+'</option>'
            });
            $('#tagId').html(userTag);
            $('#tagId1').html(userTag);
          }
        }
      })
    },

    // 得到所有经纪人
    getBroker: function () {
      $.ajax({
        url: baseUrl + 'oss/broker/back/AllBroker',
        type: 'get',
        async: true,
        data: {token: token},
        success: function (obj) {
          // console.log(obj)
          if (obj.code == -999) {
            window.location.href = "/admin/index";
            return false;
          }
          if (obj.code == 100) {
            var list = obj.data;
            var userTag = '<option value="">请选择</option>';
            $.each(list, function (index, array) {
              userTag += '<option value="'+array.uid+'">'+array.nickName+'</option>'
            });
            // $('#tagId').html(userTag);
            $('#broker1').html(userTag);
          }
        }
      })
    }
  });

  $.getGroup();
  $.getTag();
  $.getBroker();

  // 全选
  $('#allchecked').click(function () {
    if ($(this).is(':checked')) {
      $('#agentTbody').find('input').prop('checked', true)
    } else {
      $('#agentTbody').find('input').prop('checked', false)
    }
  })

  // 点击单个配置
  $('body').on('click', '.config', function () {
    var uid = $(this).parent().siblings('.uid').html();
    // var nickName = $(this).parent().siblings('.nickName').html();
    // console.log(uid);
    // console.log(nickName);
    $.ajax({
      url: baseUrl + 'oss/user/query/single',
      type: 'get',
      async: true,
      data: {token: token, uid: uid},
      success: function (obj) {
        console.log(obj)
        if (obj.code == -999) {
          window.location.href = "/admin/index";
          return false;
        }
        if (obj.code == 100) {
          $('#Uid').html(obj.data.uid);
          $('#nickName1').html(obj.data.nickName);
          $('#userName1').html(obj.data.userName);
          $('#createTime').html(obj.data.createTime);
          $('#acctNo1').html(obj.data.acctNo);
          $('#bankPhone1').html(obj.data.bankPhone);
          $('#email1').html(obj.data.email);
          $('#openTime1').html(obj.data.openTime);
          $('#createTime1').html(obj.data.createTime);
          if (obj.data.groupId != null) {
            $('#groupId1').val(obj.data.groupId)
          }
          if (obj.data.tags.length != 0) {
            for (var i = 0; i<obj.data.tags.length; i++ ) {
              $('#tagId1').val(obj.data.tags[i].id)
            }
          }
          if (obj.data.brokeId != null) {
            $('#broker1').val(obj.data.brokeId)
          }
        }
      }
    })
    $('.agent').hide();
    $('.modalAgent').show();
    $('#nickName1').html(nickName);
    $('#uids').val(uid);
    getFormToken();
  });

  // 点击批量配置
  function someconfig () {
    var uids = [];
    var nickName = [];
    for (var i=0; i<total; i++){
      if($('#agentTbody input').eq(i).is(':checked')){
        uids.push($('#agentTbody input').eq(i).parent().parent().find('.uid').html());
        nickName.push($('#agentTbody input').eq(i).parent().parent().find('.nickName').html());
      }
    }
    $('.agent').hide();
    $('.modalAgent').show();
    $('#Uid').html(uids);
    $('#nickName1').html(nickName);
    $('#uids').val(uids);
    getFormToken();
  }
  $('#someconfig').click(someconfig);

  // 运营配置用户
  $.fn.extend({
    config: function () {
      var options = {
        url: baseUrl + 'oss/user/set/user/config',
        type: 'post',
        async: true,
        beforeSubmit: function () {},
        success: function (obj) {
          // console.log(obj)
          if (obj.code == -999) {
            window.location.href = "/admin/index";
            return false;
          }
          if (obj.code == 100) {
            $('.msg').load('userconfig.html')
          }
        }
      };
      $(this).click(function () {
        $('#formconfig').ajaxSubmit(options).submit(function () {return false})
      })
    }
  })
  $('#saveconfig').config();

  // 取消配置
  $('#cancelconfig').click(function () {
    $('.msg').load('userquery.html')
  })
})

 // $.ajax({
 //      url: baseUrl + 'oss/user/set/user/config',
 //      type: 'post',
 //      async: true,
 //      data: {uids: uid, token: token},
 //      success: function (obj) {
 //        console.log(obj)
 //      }
 //    })