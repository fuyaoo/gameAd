/*
* @Author: Marte
* @Date:   2017-07-17 13:39:29
* @Last Modified by:   Marte
* @Last Modified time: 2017-08-02 14:49:24
*/

$(function () {
  var baseUrl="/";
  var token="";
  $('.token').val(token);

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

  $.fn.extend({
    // 新增用户分组
    addGroup: function () {
      var options = {
        url: baseUrl + 'oss/user/add/group',
        type: 'post',
        clearForm: false,
        beforeSubmit: function () {},
        success: function (obj) {
          if (obj.code == -999) {
            window.location.href = '/admin/index';
            return false
          }
          if (obj.code == 100) {
            $.getGroup();
            $('#addGroupBox').slideUp();
            alert('用户分组添加成功！')
          } else {
            alert(obj.message)
          }
        }
      };
      $(this).click(function () {
        $('#addGroupBox').ajaxForm(options)
      })
    },

    // 新增用户标签
    addTag: function () {
      var options = {
        url: baseUrl + 'oss/user/add/tag',
        type: 'post',
        clearForm: false,
        beforeSubmit: function () {},
        success: function (obj) {
          console.log(obj)
          if (obj.code == -999) {
            window.location.href = '/admin/index';
            return false
          }
          if (obj.code == 100) {
            $.getTag();
            $('#addTagBox').slideUp();
            alert('用户标签添加成功！')
          } else {
            alert(obj.message)
          }
        }
      };
      $(this).click(function () {
        $('#addTagBox').ajaxForm(options)
      })
    }
  });
  $('#submitGroup').addGroup();
  $('#submitTag').addTag();

  // 取消添加
  function cancel () {
    $(this).parent().slideUp();
    $(this).siblings('input').val('');
  };
  $('.cancel').click(cancel);
  $('body').on('click', '.cancel', cancel);

  // 点击弹框
  function showbox () {
    getFormToken ();
    if ($(this).attr('id') == 'addGroup') {
      $('#group_name').val('');
      $('#addGroupBox').slideDown();
      $('#addTagBox').slideUp();
    } else {
      $('#tag_name').val('');
      $('#addTagBox').slideDown();
      $('#addGroupBox').slideUp();
    }
  };
  $('#addGroup').click(showbox);
  $('#addTag').click(showbox);

  $.extend({
    // 运营获取分组以及各分组的人数
    getGroup: function () {
      $.ajax({
        url: baseUrl + 'oss/user/query/group/user/count',
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
            var list = obj.data;
            var groupUl = '';
            $('#groupTotal').html(list.length - 1);
            var mantotal = 0;
            for (var key in list) {
              mantotal += Math.floor(list[key].groupCount)
            }
            // console.log(mantotal)
            $.each(list, function (index, array) {
              groupUl += '<li class="groupgroup" data-id="'+
              array.id+'"><span>'+
              array.name+'</span><span class="span"><b style="width: '+
              array.groupCount/mantotal * 200 +'px"></b></span><span>'+
              array.groupCount+'</span><span class="useredit">修改</span><span class="userdelete">删除</span><form style="display:none"><input name="group_name" value="'+
              array.name+'"/><input type="hidden" name="group_id" value="'+
              array.id+'"><input type="hidden" name="form_token" class="form_token"><input type="hidden" name="token" class="token"><br><button class="ok btn1">确定</button><span class="cancel">取消</span></form></li>';
            });
            $('#groupUl').html(groupUl);
            $("[data-id = 'undefined']").find('.useredit').css('visibility', 'hidden');
            $("[data-id = 'undefined']").find('.userdelete').css('visibility', 'hidden');
          }
        }
      })
    },

    // 运营获取分组以及各标签的人数
    getTag: function () {
      $.ajax({
        url: baseUrl + 'oss/user/query/tag/user/count',
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
            var list = obj.data;
            var tagUl = '';
            $('#tagTotal').html(list.length - 1);
            var mantotal = 0;
            for (var key in list) {
              mantotal += Math.floor(list[key].tagCount)
            }
            // console.log(mantotal)
            $.each(list, function (index, array) {
              tagUl += '<li class="tagtag" id="'+
              array.id+'"><span>'+
              array.name+'</span><span class="span"><b style="width: '+
              array.tagCount/mantotal * 200 +'px"></b></span><span>'+
              array.tagCount+'</span><span class="useredit">修改</span><span class="userdelete">删除</span><form style="display:none"><input name="tag_name" value="'+
              array.name+'"/><input type="hidden" name="tag_id" value="'+
              array.id+'"><input type="hidden" name="form_token" class="form_token"><input type="hidden" name="token" class="token"><br><button class="ok btn">确定</button><span class="cancel">取消</span></form></li>'
            });
            $('#tagUl').html(tagUl);
            $("[id = 'undefined']").find('.useredit').css('visibility', 'hidden');
            $("[id = 'undefined']").find('.userdelete').css('visibility', 'hidden');
          }
        }
      })
    },
  })
  $.getGroup();
  $.getTag();

  // 点击修改
  $('body').on('click', '.useredit', function () {
    getFormToken ();
    $('.token').val(token);
    $(this).parent().siblings().find('form').hide();
    $(this).siblings('form').show();
  });

  // 点击提交修改
  $('body').on('click', '.btn1', function () {
    var $this = $(this);
    var options = {
      url: baseUrl + 'oss/user/update/group',
      type: 'post',
      async: true,
      beforeSubmit: function () {},
      success: function (obj) {
        console.log(obj)
        if (obj.code == -999) {
            window.location.href = '/admin/index';
            return false
          }
        if (obj.code == 100) {
          $this.parent().slideUp();
          $.getGroup();
          alert('修改成功！')
        } else {
          alert(obj.message)
        }
      }
    }
    $(this).parent().ajaxForm(options);
  });

  $('body').on('click', '.btn', function () {
    var $this = $(this);
    var options = {
      url: baseUrl + 'oss/user/update/tag',
      type: 'post',
      async: true,
      beforeSubmit: function () {},
      success: function (obj) {
        console.log(obj)
        if (obj.code == -999) {
          window.location.href = '/admin/index';
          return false
        }
        if (obj.code == 100) {
          $this.parent().slideUp();
          $.getTag();
          alert('修改成功！')
        } else {
          alert(obj.message)
        }
      }
    }
    $(this).parent().ajaxForm(options);
  });

  //点击删除
  $('body').on('click', '.userdelete', function () {
    if ($(this).parent().attr('class') == 'groupgroup') {
      var id = $(this).parent().attr('data-id');
      // console.log(id);
      $.ajax({
        url: baseUrl + 'oss/user/delete/group',
        type: 'post',
        async: true,
        data: {token: token, group_id: id},
        success: function (obj) {
          if (obj.code == -999) {
            window.location.href = '/admin/index';
            return false
          }
          if (obj.code == 100) {
            $.getGroup();
            alert('分组删除成功！')
          }
        }
      })
    } else {
      var id = $(this).parent().attr('id');
      // console.log(id);
      $.ajax({
        url: baseUrl + 'oss/user/delete/tag',
        type: 'post',
        async: true,
        data: {token: token, tag_id: id},
        success: function (obj) {
          if (obj.code == -999) {
            window.location.href = '/admin/index';
            return false
          }
          if (obj.code == 100) {
            $.getTag();
            alert('标签删除成功！')
          }
        }
      })
    }
  })
})