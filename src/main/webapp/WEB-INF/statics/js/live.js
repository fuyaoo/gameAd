/*
* @Author: Marte
* @Date:   2017-07-20 09:35:01
* @Last Modified by:   Marte
* @Last Modified time: 2017-07-21 15:04:56
*/

$(function () {
  var baseUrl="/";
  var token="";
  $('.token').val(token);
  var liveListId = '';

  // 时间插件
  $("#publish_time").jeDate({
    isinitVal:true,
    festival:true,
    ishmsVal:false,
    minDate: '2016-06-16 23:59:59',
    //maxDate: $.nowDate(0),
    format:"YYYY-MM-DD hh:mm:ss",
    zIndex:3000
  });

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
  };
  getFormToken();
  // 运营获取视频直播栏目列表
  $.liveList = function () {
    $.ajax({
      url: baseUrl + 'oss/video/class/live/list',
      type: 'get',
      async: true,
      data: {token: token},
      success: function (obj) {
        if (obj.code == -999) {
          window.location.href = '/admin/index';
          return false
        }
        if (obj.code == 100) {
          liveListId = obj.data.list[0].clsId;
          $.live(liveListId);
        }
      }
    })
  }();

  // 加载直播内容
  $.extend({
    live: function (id, index) {
      index = arguments[1] == undefined ? 1:index;
      $.ajax({
        url: baseUrl + 'oss/info/list',
        type: 'get',
        async: true,
        data: {cls_id: id, token: token, page_num: index},
        success: function (obj) {
          if (obj.code == -999) {
            window.location.href = '/admin/index';
            return false
          }
          if (obj.code == 100) {
            var total = obj.data.total;
            $('#liveTotal').html(total);
            var list = obj.data.list;
            var live_list = '';
            $.each(list, function (index, array) {
              topRank = array.topRank == 1 ? '取消首页推荐' : '首页推荐';
              state = array.state == 1 ? '直播开启' : '直播未开始';
              live_list += '<li id="'+
              array.infoId+'"><div><div><img src="'+
              array.infoMainImg+'" alt=""></div><div>'+
              array.infoTitle+'</div><div>'+
                  state+'</div><div class="indexshow" style="cursor: pointer" key="'+
              array.topRank+'">'+
              topRank+'</div><div><span class="editlive">修改</span><span class="deletelive">删除</span></div></div><div><div><div>创建时间：<span>'+
              array.createTime+'</span></div><div>发布时间：<span>'+
              array.publishTime+'</span></div><div>修改时间：<span>'+
              array.updateTime+'</span></div></div></div></li>'
            });
            $('#live_list').html(live_list);
          }
        }
      })
    }
  });

  // 首页推荐直播
  function indexshow () {
    var key = $(this).attr('key');
    var id = $(this).parent().parent().attr('id');
    var $this = $(this);
    if (key == '0') {
      $.ajax({
        url: baseUrl + 'oss/video/set/top/live',
        type: 'post',
        async: true,
        data: {id: id, token: token},
        success: function (obj) {
          if (obj.code == -999) {
            window.location.href = '/admin/index';
            return false
          }
          if (obj.code == 100) {
            $.live(liveListId);
          } else {
            alert(obj.message);
          }
        }
      })
    } else {
      $.ajax({
        url: baseUrl + 'oss/info/reset/top',
        type: 'post',
        async: true,
        data: {id: id, token: token},
        success: function (obj) {
          if (obj.code == -999) {
            window.location.href = '/admin/index';
            return false
          }
          if (obj.code == 100) {
            $.live(liveListId);
          }
        }
      })
    }
  };
  $('body').on('click', '.indexshow', indexshow);

  // 主讲人信息
  $.speakerAll = function () {
    $.ajax({
      url: baseUrl + 'oss/video/query/all/speaker',
      type: 'get',
      async: true,
      data: {token: token},
      success: function (obj) {
       if (obj.code == -999) {
          window.location.href = '/admin/index';
          return false
       }
       if (obj.code == 100) {
          var list = obj.data;
          var speakerInfo = '';
          $.each(list, function (index, array) {
            speakerInfo += '<label for="'+
            array.id+'">'+
            array.name+'</label><input type="checkbox" name="speakers" id="'+
            array.id+'" value="'+
            array.id+'">'
          })
          $('.speakerInfo').html(speakerInfo)
       }
      }
    })
  };

  // 列表页图片信息
  $('#imgFile').change(function () {
    var file = this.files[0];
    var reader = new FileReader();
    /*文件类型*/
    var ImgExtension = file.name.substring(file.name.lastIndexOf('.') + 1);
    /*文件大小*/
    var ImgSize = parseFloat(file.size/1024).toFixed(1);
    /*预览图片*/
    reader.readAsDataURL(file);
    reader.onload = function(e){
      $('#result').html('<img src="'+this.result+'" alt=""/>' )
    }
  })

  // 表单切换
  $('#buildlive').click(function () {
    $('#liveform').show();
    $.speakerAll();
    $('#reset1').click();
    $('#liveid').val('');
    $('#result').html('');
    $('.info').html('');
  });
  $('.return').click(function () {
    $('#liveform').hide();
  });
  $('body').on('click', '.editlive', function () {
    var id = $(this).parent().parent().parent().attr('id');
    $('#liveid').val(id);
    $('#liveform').show();
    $.speakerAll();
    $('#reset1').click();
    $('.info').html('');
    $.ajax({
      async: true,
      url: baseUrl + 'oss/video/view',
      type: 'get',
      data: {token: token, vid: id},
      success: function (obj) {
        console.log(obj)
        if (obj.code == -999) {
          window.location.href = '/admin/index';
          return false
        }
        if (obj.code == 100) {
          var data = obj.data;
          var speakers = data.speakers;
          if (speakers) {
            $.each(speakers, function (index, array) {
              $('#' +array.id).click();
            })
          }
          $('#result').html('<img src="'+data.infoMainImg+'" alt=""/>' )
          $('#title').val(data.infoTitle);
          $('#video_desc').val(data.videoDesc);
          $('#publish_time').val(data.publishTime);
          if (data.isBigImg == 0) {
            $('#is_big_img1').click()
          }
          if (data.scope == 1) {
            $('#appoint').click()
          }
          $('#assign_phone').val(data.assignPhone);
          $('#room').val(data.room);
        }
      }
    })
  })

  // 表单新建修改
  $.fn.extend({
    liveform: function () {
      var buildoption = {
        url: baseUrl + 'oss/video/add/live',
        type: 'post',
        clearForm: false,
        beforeSubmit: function () {
          if ($('#title').val() == '') {
            $('.info').html('请输入标题');
            return false
          }
          if ($('#video_desc').val() == '') {
            $('.info').html('请输入视频简介');
            return false
          }
          if ($('#imgFile').val() == '') {
            $('.info').html('请上传列表页图片');
            return false
          }
          if ($('#url').val() == '') {
            $('.info').html('请输入链接地址');
            return false
          }
        },
        success: function (obj) {
          // console.log(obj)
          if (obj.code == -999) {
            window.location.href = '/admin/index';
            return false
          }
          if (obj.code == 100) {
            $.live(liveListId);
            $('#liveform').hide();
          } else {
            $('.info').html(obj.message);
          }
        }
      };
      var editoption = {
        url: baseUrl + 'oss/video/update/live',
        type: 'post',
        clearForm: false,
        beforeSubmit: function () {
          if ($('#title').val() == '') {
            $('.info').html('请输入标题');
            return false
          }
          if ($('#video_desc').val() == '') {
            $('.info').html('请输入视频简介');
            return false
          }
          if ($('#url').val() == '') {
            $('.info').html('请输入链接地址');
            return false
          }
        },
        success: function (obj) {
          // console.log(obj)
          if (obj.code == -999) {
            window.location.href = '/admin/index';
            return false
          }
          if (obj.code == 100) {
            $.live(liveListId);
            $('#liveform').hide();
          } else {
            $('.info').html(obj.message);
          }
        }
      };

      $(this).click(function () {
        getFormToken();
        if ($('#liveid').val() == '') {
          $('#liveformcontent').ajaxForm(buildoption)
        } else {
          $('#liveformcontent').ajaxForm(editoption)
        }
      })
    }
  });
  $('#release').liveform();

  //删除单条直播
  $('body').on('click', '.deletelive', function(){
    var id = $(this).parent().parent().parent().attr('id');
    $.ajax({
      url: baseUrl + 'oss/info/delete',
      type: 'post',
      data: {id: id, token: token},
      success: function (obj) {
        $.live(liveListId);
      }
    })
  })
})
