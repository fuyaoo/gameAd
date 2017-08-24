/*
* @Author: Marte
* @Date:   2017-06-29 09:21:12
* @Last Modified by:   Marte
* @Last Modified time: 2017-07-11 17:30:22
*/

$(function () {
  var token="";
  $('.token').val(token);
  // var baseUrl = 'http://192.168.1.44/'
  var baseUrl= "/";

  // 得到当前时间
  function getNowFormatDate () {
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
  // 时间插件
  $("#publish_time").jeDate({
    isinitVal:true,
    festival:true,
    ishmsVal:false,
    minDate: '2016-06-16 23:59:59',
    //maxDate: $.nowDate(0),
    initAddVal:true,
    format:"YYYY-MM-DD hh:mm:ss",
    zIndex:3000
  });

  $.extend({
    // 录播栏目的加载
    recordingCol: function () {
      $.ajax({
        async: true,
        url: baseUrl + 'oss/video/class/list',
        type: 'get',
        data: {token: token},
        success: function (obj) {
          // console.log(obj)
          if( obj.code == -999) {
            window.location.href = '/admin/index';
            return false
          }
          if (obj.code == 100) {
            var list = obj.data.list;
            var colContent = '';
            var menuCol = '';
            $.each(list, function (index, array) {
              colContent += '<tr id="'+
              array.clsId+'" rank="'+
              array.rank+'"><td>'+
              (index + 1)+'</td><td>'+
              array.clsName+'</td><td>'+
              array.showIndex+'</td><td><span class="up_install">向上</span><span class="down_install">向下</span><span class="editCol">修改</span><span class="deleteCol">删除</span></td></tr>';

              menuCol += '<li data-i="'+array.clsId+'">'+array.clsName+'</li>';
            })
            menuCol = menuCol + '<li class="active install">栏目设置</li>'
            $('#colContent').html(colContent);
            $('#menuCol').html(menuCol);
          }
        }
      })
    },

    // 阻止重复提交
    stopAgainSubmit: function () {
      $.ajax({
        async: true,
        url: baseUrl + "oss/info/get/form/token",
        type: 'get',
        data: {token: token},
        success: function (obj) {
          if (obj.code == -999) {
            window.location.href = '/admin/index';
            return false
          }
          if (obj.code == 100) {
            $('.form_token').val(obj.data)
          }
        }
      })
    },
  });

  $.fn.extend({
    // 录播栏目的新增和修改
    recordingChange: function () {
      var optionsBuild = {
        url: baseUrl + 'oss/video/class/add',
        type: 'post',
        clearForm: false,
        beforeSubmit: function () {},
        success: function (obj) {
          // console.log(obj);
          if (obj.code == -999) {
            window.location.href = '/admin/index';
            return false
          }
          if (obj.code == 100) {
            $.recordingCol();
            $('#colInstallForm').fadeOut();
          } else {
            $('#colInfo').html(obj.message)
          }
        }
      }
      var optionsEdit = {
        url: baseUrl + 'oss/video/class/update',
        type: 'post',
        clearForm: false,
        beforSubmit: function () {},
        success: function (obj) {
          // console.log(obj);
          if (obj.code == -999) {
            window.location.href = '/admin/index';
            return false
          }
          if (obj.code == 100) {
            $.recordingCol();
            $('#colInstallForm').fadeOut();
          } else {
            $('#colInfo').html(obj.message)
          }
        }
      }
      $(this).click(function () {
        if ($('#cls_id').val() == '') {
          $('#colInstallForm').ajaxForm(optionsBuild)
        } else {
          $('#colInstallForm').ajaxForm(optionsEdit)
        }
      })
    }
  });

  $('.return').click(function () {
    $('#channelFormPage').fadeOut();
  })
/*============================================================
        栏目
=============================================================*/

  // 点击栏目新建、点击修改、取消
  $('.buildColInstall').click(function(){
    $('#cls_id').val('');
    $('#colInfo').html('');
    $('#reset').click();
    $('#colInstallForm').fadeIn();
  })
  $('#cancelFormIntall').click(function () {
    // $('#reset').click();
    $('#colInstallForm').fadeOut();
  })
  $('body').on('click', '.editCol', function () {
    var id = $(this).parent().parent().attr('id');
    $('#reset').click();
    $('#cls_id').val(id);
    $('#colInfo').html('');
    $.ajax({
      url: baseUrl + 'oss/info/class/view',
      type: 'get',
      data: {
        token: token,
        cls_id: id
      },
      success: function (obj) {
        // console.log(obj)
        if (obj.code == -999) {
          window.location.href = '/admin/index';
          return false
        }
        if (obj.code == 100) {
          $('#cls_name').val(obj.data.clsName);
          if (obj.data.showIndex == false) {
            $('#hasShow').click()
          }
          $('#colInstallForm').fadeIn()
        }
      }
    })
  })

  // 栏目点击删除
  $('body').on('click', '.deleteCol', function () {
    var id = $(this).parent().parent().attr('id');
    $.ajax({
      url: baseUrl + 'oss/info/class/delete',
      type: 'post',
      data: {token: token, cls_id: id},
      success: function (obj) {
        // console.log(obj)
        if (obj.code == -999) {
          window.location.href = '/admin/index';
          return false
        }
        if (obj.code == 100) {
          $.recordingCol();
        }
      }
    })
  })

  // 栏目上下移动
  /*上*/
  $('body').on('click', '.up_install', function(){
    if($(this).parent().parent().prev().attr('rank')==null)return false;
    var $frt_id = $(this).parent().parent().attr('id');
    var $frt_rank = $(this).parent().parent().attr('rank');
    var $sec_id = $(this).parent().parent().prev().attr('id');
    var $sec_rank = $(this).parent().parent().prev().attr('rank');
    var a;
    a=$frt_rank;
    $frt_rank=$sec_rank;
    $sec_rank=a;
    $.ajax({
      type: "post",
      url: baseUrl+"oss/info/class/sort",
      async:true,
      data:{
        token:token,
        frt_id:$frt_id,
        frt_rank:$frt_rank,
        sec_id:$sec_id,
        sec_rank:$sec_rank
      },
      success:function(obj){
        if( obj.code == -999){
          window.location.href = '/admin/index';
          return false
        };
        //console.log(obj);
        if(obj.code==100){
          $.recordingCol();
        }
      }
    });
  });
  /*下 */
  $('body').on('click', '.down_install', function(){
    if($(this).parent().parent().next().attr('rank')==null){return};
    var $frt_id=$(this).parent().parent().attr('id');
    var $frt_rank=$(this).parent().parent().attr('rank');
    var $sec_id=$(this).parent().parent().next().attr('id');
    var $sec_rank=$(this).parent().parent().next().attr('rank');
    var a;
    a=$frt_rank;
    $frt_rank=$sec_rank;
    $sec_rank=a;

    $.ajax({
      type:"post",
      url:baseUrl+"oss/info/class/sort",
      async:true,
      data:{
        token:token,
        frt_id:$frt_id,
        frt_rank:$frt_rank,
        sec_id:$sec_id,
        sec_rank:$sec_rank
      },
      success:function(obj){
        if( obj.code == -999){
          window.location.href = '/admin/index';
          return false
        };
        //console.log(obj);
        if(obj.code==100){
          $.recordingCol();
        }
      }
    });
  })
  // 点击提交
  $('#saveFormIntall').recordingChange();
  // 点击查看评论


  // 加载录播栏目
  $.recordingCol();

/*============================================================
        具体录播内容
=============================================================*/
// 查看单个录播内容
  $.recording = function (id) {
    $.ajax({
    url: baseUrl + 'oss/info/list',
    type: 'get',
    async: true,
    data: {cls_id: id, token: token, page_num: 1},
    success: function (obj) {
      //console.log(obj)
      if (obj.code == -999) {
        window.location.href = '/admin/index';
        return false
      }
      if (obj.code == 100) {
        $('#recordingTotal').html(obj.data.total);
        var list = obj.data.list;
        var info_recording = '';
        $.each(list, function (index, array) {
          topRank = array.topRank == 1 ? '取消首页推荐' : '首页推荐';
          info_recording += '<li id="'+
          array.infoId+'"><div><div><img src="'+
          array.infoMainImg+'" alt=""></div><div class="title">'+
          array.infoTitle+'</div><div>视频时长：<span>'+
          array.videoDuration+'</span></div><div class="comment">查看评论</div><div class="indexShow" key="'+
          array.topRank+'">'+
          topRank+'</div><div><span class="recording_edit">修改</span><span class="recording_delete">删除</span></div></div><div><div><div>创建时间：<span>'+
          array.createTime+'</span></div><div>发布时间：<span>'+
          array.publishTime+'</span></div><div>修改时间：<span>'+
          array.updateTime+'</span></div></div><div><div>观看量：<span>'+
          array.playCount+'</span></div><div>点赞量：<span>'+
          array.goodCount+'</span></div></div></div></li>'
        })
        $('.info_recording').html(info_recording)
      }
    }
    })
  }

  // 查看所有的主讲人
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
  }

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

  // 录播的新建/修改
  $.fn.extend({
    recording: function () {
      var optionsBuild = {
        url: baseUrl + 'oss/video/add',
        type: 'post',
        clearForm: false,
        beforeSubmit: function () {
          if ($('#title').val() == '') {
            $('.info').html('请输入标题');
            $('.loading').hide();
            return false
          }
          if ($('#video_desc').val() == '') {
            $('.info').html('请输入视频简介');
            $('.loading').hide();
            return false
          }
          if ($('#imgFile').val() == '') {
            $('.info').html('请上传列表页图片');
            $('.loading').hide();
            return false
          }
          if ($('#videoFile').val() == '') {
            $('.info').html('请上传视频文件');
            $('.loading').hide();
            return false
          }
        },
        success: function (obj) {
          // console.log(obj)
          if (obj.code == -999) {
            $('.loading').hide();
            window.location.href = '/admin/index';
            return false
          }
          if (obj.code == 100) {
            $('.loading').hide();
            var id = $('#menuCol li.active').attr('data-i');
            $.recording(id);
            $('#channelFormPage').fadeOut();
          } else {
            $('.loading').hide();
            $('.info').html(obj.message);
          }
        }
      }

      var optionsEdit = {
        url: baseUrl + 'oss/video/update',
        type: 'post',
        clearForm: false,
        beforeSubmit: function () {
          if ($('#title').val() == '') {
            $('.info').html('请输入标题');
             $('.loading').hide();
            return false
          }
          if ($('#video_desc').val() == '') {
            $('.info').html('请输入视频简介');
            $('.loading').hide();
            return false
          }
        },
        success: function (obj) {
          // console.log(obj)
          if (obj.code == -999) {
            $('.loading').hide();
            window.location.href = '/admin/index';
            return false
          }
          if (obj.code == 100) {
            $('.loading').hide();
            var id = $('#menuCol li.active').attr('data-i');
            $.recording(id);
            $('#channelFormPage').fadeOut();
          } else {
            $('.loading').hide();
            $('.info').html(obj.message);
          }
        }
      }

      $(this).click(function () {
        $('.loading').show();
        if ($('#id').val() == '') {
          $('#channelForm').ajaxForm(optionsBuild)
        } else {
          $('#channelForm').ajaxForm(optionsEdit)
        }
      })
    }
  })

// 点击菜单条
  $('body').on('click', '#menuCol li', function () {
    $(this).addClass('active').siblings('.active').removeClass('active');
    var id = $(this).attr('data-i');
    // console.log(id)
    if (id == undefined) {
      $.recordingCol();
      $('#recordingColInstall').show().siblings().hide();
    } else {
      $.recording(id);
      $('#recordingContent').show().siblings().hide();
      $('#cls_id1').val(id);
    }
  })

  //点击新建/修改
  $('#buildVideoInfo').click(function () {
    $('#reset1').click();
    $('#id').val('');
    $('#result').html('');
    $('.info').html('');
    $('#publish_time').val(getNowFormatDate());
    $.stopAgainSubmit();
    $.speakerAll();
    $('.videobtn').html('点击上传视频');
    $('#channelFormPage').fadeIn();
  })

  $('body').on('click', '.recording_edit', function () {
    var id = $(this).parent().parent().parent().attr('id');
    $('#reset1').click();
    $('#id').val(id);
    $('.info').html('');
    $.stopAgainSubmit();
    $.speakerAll();
    $('.videobtn').html('点击修改视频');
    $('#channelFormPage').fadeIn();
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
          $('#video_duration').val(data.videoDuration);
          $('#play_count').val(data.playCount);
          $('#good_count').val(data.goodCount);
        }
      }
    })
  })

  //点击删除
  $('body').on('click', '.recording_delete', function () {
    var id = $(this).parent().parent().parent().attr('id');
    $.ajax({
      async: true,
      url: baseUrl + 'oss/info/delete',
      type: 'post',
      data: {id: id, token: token},
      success: function (obj) {
        // console.log(obj)
        if (obj.code == -999) {
          window.location.href = '/admin/index';
          return false
        }
        if (obj.code == 100) {
          var id = $('#menuCol li.active').attr('data-i');
          $.recording(id);
        }
      }
    })
  })

  //首页推荐
  $('body').on('click', '.indexShow', function () {
    var id = $(this).parent().parent().attr('id');
    var $this = $(this);
    var key = $(this).attr('key');
    if (key != 1) {
      $.ajax({
        url: baseUrl + 'oss/video/set/top',
        type: 'post',
        async: true,
        data: {id: id, token: token},
        success: function (obj) {
          console.log(obj)
          if (obj.code == -999) {
            window.location.href = '/admin/index';
            return false
          }
          if (obj.code == 100) {
            $this.html('取消首页推荐');
            var id = $('#menuCol li.active').attr('data-i');
            $.recording(id);
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
          console.log(obj)
          if (obj.code == -999) {
            window.location.href = '/admin/index';
            return false
          }
          if (obj.code == 100) {
            $this.html('首页推荐');
            var id = $('#menuCol li.active').attr('data-i');
            $.recording(id);
          }
        }
      })
    }
  })

  // 加载留言
  $.comment = function (id, index) {
    index = arguments[1] == undefined ? 1 : index;
    $.ajax({
      url: baseUrl + 'oss/video/comment/list',
      type: 'get',
      async: true,
      data: {infoId: id, page_num: index, token: token},
      success: function (obj) {
        console.log(obj)
        if (obj.code == -999) {
          window.location.href = '/admin/index';
          return false
        }
        if (obj.code == 100) {
          $('.commentTotal').html(obj.data.total);
          var list = obj.data.list;
          var view = '';
          $.each(list, function (index, array) {
            var userName = '';
            var name = '';
            var content = '';
            var id = '';
            var a = '';
            userName = array.userName?array.userName:'';
            a = array.backComments? '修改' : '回复';
            name = array.backComments? (array.backComments[0].userName + ':'): '';
            content = array.backComments? array.backComments[0].content: '';
            id = array.backComments? array.backComments[0].id: '';
            var src = '';
            view += '<li id="'+
            array.id+'"><dl><dt><img src="'+
            array.headPic+'" alt="" /></dt><dd><span>'+
            array.nickName+'</span></dd></dl><div>'+
            array.content+'<div><b>'+
            name+'</b><b class="content">'+
            content+'</b></div></div><div><span class="delete">删除</span><span class="edit">'+a+'</span></div><div class="dialog"><textarea class="editContent"></textarea><span class="submit">提交</span></div></li>'
          })
          $('#view').html(view)
        }
      }
    })
  }
  // 点击查看评论
  $('body').on('click', '.comment', function () {
    var id = $(this).parent().parent().attr('id');
    var title = $(this).parent().parent().find('.title').html();
    $('.view_title').html(title);
    $('.view_title').attr('data-i', id);
    $.comment(id);
    $('.view').fadeIn();
  })

  // 关闭评论
  $('.clear_').click(function () {
    $('.view').fadeOut();
  })

  // 点击提交回复/修改
  $('body').on('click', '.submit', function () {
    var id = $(this).parent().parent().attr('id');
    var $this = $(this);
    var content = $(this).siblings('.editContent').val();
    $.ajax({
      url: baseUrl + 'oss/info/info/give/comment',
      type: 'post',
      async: true,
      data: {token: token, parent_id: id, content: content},
      success: function (obj) {
        // console.log(obj)
        if (obj.code == -999) {
          window.location.href = '/admin/index';
          return false
        }
        if (obj.code == 100) {
          var tag = $this.parent().parent().parent().siblings('.view_title').attr('data-i');
          // console.log(tag)
          $.comment(tag);
          $this.parent().parent().find('.dialog').slideUp();
        }
      }
    })
  })

  // 回复评论or修改评论
  $('body').on('click', '.edit', function () {
    var html = $(this).html();
    if (html == '回复') {
      $(this).parent().parent().find('.editContent').val('');
    } else {
     var content = $(this).parent().parent().find('.content').html();
     $(this).parent().parent().find('.editContent').val(content);
    }
    var id = $(this).parent().parent().attr('id');
    $(this).parent().parent().find('.dialog').slideDown();
  })

  // 删除评论
  $('body').on('click', '.delete', function () {
    var $this = $(this);
    var id = $(this).parent().parent().attr('id');
    $.ajax({
      url: baseUrl + 'oss/info/delete/comment',
      async: true,
      type: 'post',
      data: {comment_id: id, token: token},
      success: function (obj) {
        console.log(obj)
        if (obj.code == -999) {
          window.location.href = '/admin/index';
          return false
        }
        if (obj.code == 100) {
          var tag = $this.parent().parent().parent().siblings('.view_title').attr('data-i');
          // console.log(tag)
          $.comment(tag);
        }
      }
    })
  })

  // 点击提交表单
  $('#release').recording();
})