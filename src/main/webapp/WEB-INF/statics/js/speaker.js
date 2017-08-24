/*
* @Author: Marte
* @Date:   2017-06-29 16:43:12
* @Last Modified by:   Marte
* @Last Modified time: 2017-07-06 13:35:06
*/

$(function () {
  var token="";
  $('#token').val(token);
  var baseUrl= "/";

  $.extend({
    // 加载主讲人信息
    infoSpearker: function () {
      $.ajax({
        url: baseUrl + 'oss/video/query/speaker',
        type: 'get',
        data: {token: token, page_num: 1},
        async: true,
        success: function (obj) {
          // console.log(obj)
          if (obj.code == -999) {
            window.location.href = '/admin/index';
            return false
          }
          if (obj.code == 100) {
            $('#total').html(obj.data.total)
            var list = obj.data.list;
            var info_speaker = '';
            $.each(list, function (index, array) {
              info_speaker += '<li id="'+
              array.id+'"><div><div><img class="imgShow" src="'
              +array.headPic+'" alt="" /><b>'+
              array.name+'</b></div><div><span class="speakerEdit">修改</span><span class="speakerDelete">删除</span></div></div><div>'+
              array.desc+'</div></li>'
            })
            $('#info_speaker').html(info_speaker);
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
            $('#form_token').val(obj.data)
          }
        }
      })
    }
  });

    // 主讲人头像变更信息
    $('#file').change(function () {
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

   $.fn.extend({
     // 主讲人新建和修改
     opSpeaker: function () {
      var optionBuild = {
        url: baseUrl + 'oss/video/add/speaker',
        type: 'post',
        clearForm: false,
        beforeSubmit: function () {
          if ($('#channelTitle').val() == '') {
            $('.info').html('请输入主讲人名称');
            return false
          }
          if ($('#desc').val() == '') {
            $('.info').html('请输入主讲人简介');
            return false
          }
          if ($('#file').val() == '') {
            $('.info').html('请上传主讲人头像');
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
            $.infoSpearker();
            $('#speakerFormPage').fadeOut();
          } else {
            $('.info').html(obj.message)
          }
        }
      };
      var optionEdit = {
        url: baseUrl + 'oss/video/update/speaker',
        type: 'post',
        clearForm: false,
        beforeSubmit: function () {
          if ($('#channelTitle').val() == '') {
            $('.info').html('请输入主讲人名称');
            return false
          }
          if ($('#desc').val() == '') {
            $('.info').html('请输入主讲人简介');
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
            $.infoSpearker();
            $('#speakerFormPage').fadeOut();
          } else {
            $('.info').html(obj.message)
          }
        }
      };
      $(this).click(function () {
        if ($('#id').val() == '') {
          $('#channelForm').ajaxForm(optionBuild)
        } else {
          $('#channelForm').ajaxForm(optionEdit)
        }
      })
     },

  });

  // 点击新建和修改，弹出表单
  $('#speakerBuild').click(function () {
    $('#id').val('');
    $('#result').html('');
    $('#reset').click();
    $.stopAgainSubmit();
    $('#speakerFormPage').fadeIn();
  })

  $('body').on('click', '.speakerEdit', function () {
    $('#reset').click();
    $.stopAgainSubmit();
    var id = $(this).parent().parent().parent().attr('id');
    $('#id').val(id);
    $.ajax({
      url: baseUrl + 'oss/video/view/speaker',
      type: 'get',
      async: true,
      data: {id: id, token: token},
      success: function (obj) {
        // console.log(obj)
        if (obj.code == -999) {
          window.location.href = '/admin/index';
          return false
        }
        if (obj.code == 100) {
          $('#channelTitle').val(obj.data.name);
          $('#desc').val(obj.data.desc);
          $('#result').html('<img src="'+obj.data.headPic+'" alt=""/>' )
        }
      }
    })
    $('#speakerFormPage').fadeIn();
  })

  // 点击提交表单
  $('#release').opSpeaker();

  // 点击关闭表单
  $('.return').click(function () {
    $('#speakerFormPage').fadeOut();
  })

  // 删除主讲人
  $('body').on('click', '.speakerDelete', function () {
    var id = $(this).parent().parent().parent().attr('id');
    $.ajax({
      url: baseUrl + 'oss/video/delete/speaker',
      type: 'post',
      data: {id: id, token: token},
      async: true,
      success: function (obj) {
        if (obj.code == -999) {
          window.location.href = '/admin/index';
          return false
        }
        if (obj.code == 100) {
          $.infoSpearker();
        }
      }
    })
  })


  $.infoSpearker();
})