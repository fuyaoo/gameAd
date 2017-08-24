$(function () {
    var token="";
    var baseUrl="/";

    /*加载时间控件*/
    $("#publish_time").jeDate({
        isinitVal:true,
        festival:true,
        ishmsVal:false,
        minDate: '2016-06-16 23:59:59',
        //maxDate: $.nowDate(0),
        initAddVal:true,
        format:"YYYY-MM-DD hh:mm:ss",
        zIndex:3000,
    });

    $("#expire_time").jeDate({
        isinitVal:true,
        festival:true,
        ishmsVal:false,
        minDate: '2016-06-16 23:59:59',
        //maxDate: $.nowDate(0),
        format:"YYYY-MM-DD hh:mm:ss",
        zIndex:3000,
    });

    $("#start_time").jeDate({
        isinitVal:true,
        festival:true,
        ishmsVal:false,
        minDate: '2016-06-16 23:59:59',
        //maxDate: $.nowDate(0),
        initAddVal:true,
        format:"YYYY-MM-DD hh:mm:ss",
        zIndex:3000,
    });

    $("#end_time").jeDate({
        isinitVal:true,
        festival:true,
        ishmsVal:false,
        minDate: '2016-06-16 23:59:59',
        //maxDate: $.nowDate(0),
        format:"YYYY-MM-DD hh:mm:ss",
        zIndex:3000,
    });

    $("#publish_time1").jeDate({
        isinitVal:true,
        festival:true,
        ishmsVal:false,
        minDate: '2016-06-16 23:59:59',
        //maxDate: $.nowDate(0),
        initAddVal:true,
        format:"YYYY-MM-DD hh:mm:ss",
        zIndex:3000,
    });

    $("#expire_time1").jeDate({
        isinitVal:true,
        festival:true,
        ishmsVal:false,
        minDate: '2016-06-16 23:59:59',
        //maxDate: $.nowDate(0),
        format:"YYYY-MM-DD hh:mm:ss",
        zIndex:3000,
    });

    /*点击所有用户，指定用户输入框清空*/
    $('#activity_scope1').click(function () {
        $('#scope_description').val('');
       /* $('#scope_description').attr('disabled', 'disabled');*/
    });
    /*$('#activity_scope2').click(function () {
        $('#scope_description').removeAttr('disabled');
    });*/

     $('#activity_scope_page1').click(function () {
        $('#scope_description_page').val('');
        /*$('#scope_description_page').attr('disabled', 'disabled');*/
    });
      /*$('#activity_scope_page2').click(function () {
        $('#scope_description_page').removeAttr('disabled');
    });*/

    $.extend({
        /*轮播图分页加载内容*/
        banner: function (index) {
          index = (arguments[0] == undefined)? 1 : index;
          $.ajax({
            type: "get",
            url: baseUrl + "oss/banner/list",
            async: true,
            data: {
              page_num:index,
              token:token
            },
            success:function(obj){
              //console.log(obj);
              if( obj.code == -999){
                window.location.href = '/admin/index';
                return false
              }
              if(obj.code == 100){
                var list = obj.data.list;
               /* console.log(list);*/
                var banner_info = "";
                var total = obj.data.total;
                $('#total').html(total);
                /*
                 * 根据total总数判断有多少个页面
                 */
                var page_nums = Math.ceil(total/20);
               /* console.log(page_nums);*/
                for(var i = 0, lis = ''; i < page_nums; i ++) {
                  lis += '<li>'+(i+1)+'</li>';
                };
                $('.fenye').html(lis);

                $.each(list, function (index,array) {
                  banner_info += '<li id="'
                  +array.infoId+'" rank="'
                  +array.rank+'"><div><img src="'
                  +array.infoMainImg+'"alt="" /></div><div class="ititle">'
                  +array.infoTitle+'</div><div><a href="'
                  +array.infoUrl+'">'
                  +array.infoUrl+'</a></div><div class="clear">删除</div><div class="modify">修改</div><div data-i="'
                  +array.publishStatus+'"></div><div class="paixu"><img src="/img/上箭头.svg" alt="" class="shang"/><img src="/img/下箭头.svg" alt="" class="xia"/></div><div><span class="open">'
                  +array.createTime+'</span>~<span class="zz">'
                  +array.expireTime+'</span></div></li>';
                  //console.log(array.publishStatus);
                });
                $('.info_banner').html(banner_info);
                $("[data-i='0']").html('未发布');
                $("[data-i='1']").html('已发布');
                $("[data-i='-1']").html('已过期');
              }
            }
          })
        },

        /*活动专区分页加载内容*/
        activity: function (index) {
            index = (arguments[0] == undefined)? 1 : index;
            $.ajax({
                type: "get",
                url: baseUrl + "oss/activity/query",
                async: true,
                data: {
                    token:token,
                    page_num:index
                },
                success: function (obj) {
                    /*console.log(obj)*/
                    if( obj.code == -999){
                        window.location.href = '/admin/index';
                        return false
                    }
                    if( obj.code == 100) {
                        var total = obj.data.total;
                        var page_nums=Math.ceil(total/20);
                        /*console.log(page_nums);*/
                        for(var i=0, lis=''; i<page_nums; i++){
                        lis += '<li>'+(i+1)+'</li>';
                        };
                        $('.fenye').html(lis);

                        var list = obj.data.list;
                        var activity = '';
                        $.each(list, function( index, array ) {
                            var activity_scope = '';
                            var activity_state = '';
                            if(array.activityScope == 0){
                                activity_scope = '所有用户'
                            }else{
                                activity_scope = '指定用户'
                             };
                             if(array.activityState == 0){
                                activity_state = '已发布'
                             }else if(array.activityState == 1){
                                activity_state = '预约中'
                             }else{
                                 activity_state = '已过期'
                             };
                            activity += '<tr id="'
                                         +array.activityId+'"><td>'
                                         +(index+1)+'</td><td><img src="'
                                         +array.activityImg+'"/></td><td>'
                                         +array.activityTitle+'</td><td>'
                                         +array.activityUrl+'</td><td>'
                                          +array.activityStartTime+'</td><td>'
                                         +array.activityEndTime+'</td><td>'
                                         +activity_scope+'</td><td>'
                                         +activity_state+'</td><td><span class="edit_view">编辑</span>&nbsp;&nbsp;&nbsp;<span class="delete_view">删除</span></td></tr>'
                        });
                        $('#activity_tbody').html(activity);
                    }
                }
            });

            /*进行中总条数*/
            $.ajax({
                type: "get",
                url:baseUrl + "oss/activity/proceed_state",
                async: true,
                data: {token:token},
                success: function (obj) {
                    if( obj.code == -999){
                        window.location.href = '/admin/index';
                        return false
                    };
                    if( obj.code == 100 ){
                        $('#proceed').html(obj.data);
                    }
                }
            });

            /*预约中总条数*/
            $.ajax({
                type: "get",
                url: baseUrl+"oss/activity/make_state",
                async: true,
                data: {token:token},
                success: function (obj) {
                    if( obj.code == -999){
                        window.location.href = '/admin/index';
                        return false
                    };
                    if( obj.code ==100 ){
                        $('#make_').html(obj.data);
                    }
                }
            });
        },

       /* 弹窗广告分页加载内容*/
        popAds: function (index) {
            index = (arguments[0] == undefined)? 1 : index;
            /*详情*/
            $.ajax({
                type: 'get',
                url: baseUrl + 'oss/activityPage/list',
                async: true,
                data: {
                    token: token,
                    page_num: index
                },
                success: function (obj){
                    /*console.log(obj);*/
                    if(obj.code == -999){
                        window.location.href = '/admin/index';
                        return false
                    }
                    if(obj.code == 100){
                        var list = obj.data.list;
                        var popAds_tbody = '';
                        $.each(list, function (index, array){
                            if(array.activityScopePage == 0){
                                array.activityScopePage = '所有用户'
                            }else{
                                array.activityScopePage = '指定用户'
                             };
                             if(array.activityPageState == 0){
                                array.activityPageState = '预约中'
                             }else if(array.activityPageState == 1){
                                array.activityPageState = '进行中'
                             }else{
                                 array.activityPageState = '已过期'
                             };
                            popAds_tbody += '<tr id="'
                            +array.activityPageId+'"><td>'
                            +(index + 1)+'</td><td><img src="'
                            +array.activityPageImg+'"/></td><td>'
                            +array.activityPageTitle+'</td><td>"'
                            +array.activityPageUrl+'"</td><td>'
                            +array.activityPageStartTime+'</td><td>'
                            +array.activityPageEndTime+'</td><td>'
                            +array.activityScopePage+'</td><td>'
                            +array.activityPageState+'</td><td><span class="pop_edit">编辑</span><span class="pop_delete">删除</span></td></tr>'
                        });
                        $('#popAds_tbody').html(popAds_tbody);
                    }
                }
            });
            /*在线条数and预约条数*/
            $.ajax({
                type: 'get',
                url: baseUrl + 'oss/activityPage/proceed_page_state',
                async: true,
                data: {token: token},
                success: function (obj) {
                    /*console.log(obj)*/
                    if(obj.code == 100){
                        $('#ooo').html(obj.data);
                    }
                }
            });
            $.ajax({
                type: 'get',
                url: baseUrl + 'oss/activityPage/make_page_state',
                async: true,
                data: {token: token},
                success: function (obj) {
                    console.log(obj)
                    if(obj.code == 100){
                        $('#ppp').html(obj.data);
                    }
                }
            });
        },

       /*得到当前时间*/
       getNowDate: function () {
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
       },

       /*时间比较大小*/
       checkTime: function (start, end) {
            var startTime = new Date(start.replace("-", "/").replace("-", "/"));
            var endTime = new Date(end.replace("-", "/").replace("-", "/"));
            if(startTime > endTime){
                judge = false
            }else{
                judge = true
            }
       },

       /*防止表单重复提交*/
        submission: function () {
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
        },

       /*BANNER表单初始化*/
        initBannerBuild: function () {
            $('.xixi').empty();
            $('#file').val('');
            $('#info_title').val('');
            $('#publish_time').val( $.getNowDate() );
            $('#expire_time').val('');
            $('#jump_url').val('');
            $('#token').val(token);
            $('.info').empty();
            $('#id').val('');
            $.submission();
        },

    });

    $.fn.extend({
       /* 顶部标签点击切换*/
        tabToggle: function () {
            $(this).click(function () {
                $(this).addClass('active').siblings().removeClass('active');
                var id = $(this).attr('id');
                if(id == 'phone'){
                  $('#phone_').show().siblings().hide();
                  $.banner()
                }else if(id == 'activity'){
                  $('#activity_').show().siblings().hide();
                  $.activity()
                }else{
                  $('#popAds').show().siblings().hide();
                  $.popAds()
                }
            })
        },

        /*分页加载*/
        pagingLoad: function () {
            var column = $(this).parent().attr('data-i');
            console.log(column)
            var pageNum = parseInt( $(this).html() );
            if(column == '1'){
                $.banner(pageNum);
                return false
            }
            if(column == '2'){
                $.activity(pageNum);
                return false
            }
            if(column == '3'){
                $.popAds(pageNum);
                return false
            }
        },

        /*得到文件信息*/
        getFileMsg: function () {
            $(this).change(function () {
                file = this.files[0];
                console.log(file)
                var name = file.name;
                fileCategory = name.substring(name.lastIndexOf('.') + 1);
                console.log(fileCategory)
                fileSize = parseFloat(file.size/1024).toFixed(1); //KB,保留一位小数
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function (e) {
                    $('.xixi').html('<img src="'+this.result+'"/>')
                    /*imgSrc = this.result;*/
                }
            })
        },

        /* BANNER表单新建内容*/
        bannerBuild: function () {
            $(this).click(function () {
                $.initBannerBuild();
                $('#modal_banner').show(500);
            })
        },

         /*BANNER提交or修改表单*/
        bannerSubmit: function () {
            var optionsBuild = {
                url: baseUrl + "oss/banner/add",
                type: "post",
               /* clearForm: true,*/
                beforeSubmit: function () {
                    $.checkTime($('#publish_time').val(), $('#expire_time').val());
                    if( $('#file').val() == '' ){
                        $('.info').html('请上传图片');
                        return false
                    }
                     if(fileSize > 500 ){
                         $('.info').html('图片大小不超过500K');
                        return false
                    }
                    if(fileCategory != 'jpg' && fileCategory != 'png' && fileCategory != 'gif'){
                         $('.info').html('请上传图片文件');
                        return false
                    }
                      if( $('#publish_time').val() == '' ){
                        $('.info').html('请填写上线时间');
                        return false
                    }
                    if( $('#expire_time').val() == '' ){
                        $('.info').html('请填写下线时间');
                        return false
                    }
                    if(!judge){
                        $('.info').html('下线时间要大于上线时间');
                        return false
                    }
                    /*if( $('#info_title').val() == '' ){
                        $('.info').html('请填写标题');
                        return false
                    }*/
                    /*if( $('#jump_url').val() == '' ){
                        $('.info').html('请填写跳转链接');
                        return false
                    }*/
                },
                success:function(obj){
                    if( obj.code == -999){
                        window.location.href = '/admin/index';
                        return false
                    }
                    if(obj.code == 100){
                        $('#modal_banner').fadeOut();
                        $.banner();
                    }else{
                        $('.info').html(obj.message);
                    }
                }
            };
            var optionEdit = {
                url: baseUrl + "oss/banner/update",
                type: "post",
                clearForm: true,
                beforeSubmit: function () {
                     $.checkTime($('#publish_time').val(), $('#expire_time').val());
                     if( $('#publish_time').val() == '' ){
                        $('.info').html('请填写上线时间');
                        return false
                    }
                    if( $('#expire_time').val() == '' ){
                        $('.info').html('请填写下线时间');
                        return false
                    }
                     if(!judge){
                        $('.info').html('下线时间要大于上线时间');
                        return false
                    }
                    if($('#file').val() != '' && fileSize > 500 ){
                         $('.info').html('图片大小不超过500K');
                        return false
                    }

                    if($('#file').val() != '' && fileCategory != 'jpg' && fileCategory != 'png' && fileCategory != 'gif'){
                         $('.info').html('请上传图片文件');
                        return false
                    }
                },
                success: function (obj){
                    /*console.log(obj)*/
                    if( obj.code == -999){
                        window.location.href = '/admin/index';
                        return false
                    }
                    if(obj.code == 100){
                        $('#modal_banner').fadeOut();
                        $.banner();
                    }else{
                        $('.info').html(obj.message);
                    }
                }
            };
            $(this).click(function () {
                if( $('#id').val() == '' ){
                    $('#banner_form').ajaxForm(optionsBuild);
                }else{
                    $('#banner_form').ajaxForm(optionEdit);
                }
            })
        }
    });

    var bannerObj = {
        /*点击修改bannerbanner*/
        modify: function (id) {
            $.ajax({
                type: 'get',
                url: baseUrl + 'oss/banner/view',
                data: {
                    token: token,
                    id: id
                },
                success: function (obj){
                    console.log(obj);
                    if( obj.code == -999){
                        window.location.href = '/admin/index';
                        return false
                    }
                    if(obj.code == 100){
                        var data = obj.data;
                       /*嵌套数据*/
                       $('#id').val(id);
                       $('.xixi').html('<img src="'+data.infoMainImg+'"/>');
                       $('#info_title').val(data.infoTitle);
                       $('#publish_time').val(data.publishTime);
                       $('#expire_time').val(data.expireTime);
                       $('#jump_url').val(data.infoUrl);
                    }
                }
            })
        },
        /*删除banner*/
        deleteBanner: function (id){
            $.ajax({
                type:"post",
                url:baseUrl+"oss/banner/delete",
                data:{id:id,token:token},
                async:true,
                success:function(obj){
                    if( obj.code == -999){
                        window.location.href = '/admin/index';
                        return false
                    };
                    if(obj.code == 100){
                        $('.queren').fadeOut();
                        $.banner();
                    }
                }
            });
        },
        /*banner移动*/
        bannerMove: function (data) {
            $.ajax({
                type: "post",
                url: baseUrl + "oss/banner/sort",
                async: true,
                data: data,
                success:function(obj){
                    if( obj.code == -999){
                        window.location.href = '/admin/index';
                        return false
                    };
                    if(obj.code== 100){
                        $.banner();
                    }
                }
            })
        }
    };



    /* 顶部标签点击切换*/
    $('.pdan li').tabToggle();

    /*分页加载*/
    /*$('body').on('click', '.fenye li', pagingLoad());*/


    /*===============
        BANNER操作
    ================*/
    /*点击新建banner*/
    $('.build1').bannerBuild();
    $('#file').getFileMsg();

    /*点击修改banner*/
    $('body').on('click', '.modify', function (){
        var id = $(this).parent().attr('id');
        $.submission();
        $.initBannerBuild();
        bannerObj.modify(id);
        $('#modal_banner').show(500);
    });
    /*点击删除banner*/
    $('body').on('click', '.clear', function () {
        var id = $(this).parent().attr('id');
         $('.queren').fadeIn();
         $('.ok').click(function () {
            bannerObj.deleteBanner(id)
         });
    });
    /*点击上下移动banner*/
    $('body').on('click', '.paixu img', function () {
        var $this=$(this).parent().parent();
        var frt_id=$this.attr('id');
        var frt_rank=parseInt($this.attr('rank'));
        if( $(this).attr('class') == 'shang' ){
            if($this.prev().attr('rank') == null) return false;
            var sec_id=$this.prev().attr('id');
            var sec_rank=parseInt($this.prev().attr('rank'));
        }else{
            if($this.next().attr('rank')==null) return false;
            var sec_id=$this.next().attr('id');
            var sec_rank=parseInt($this.next().attr('rank'));
        }
        var a = '';
        a = frt_rank;
        frt_rank = sec_rank;
        sec_rank = a;
        var data = {
            frt_id: frt_id,
            frt_rank: frt_rank,
            sec_id: sec_id,
            sec_rank: sec_rank,
            token: token
        };
        bannerObj.bannerMove(data);
    });
    /*点击遮罩退出*/
    $('.modal_content_banner').click(function(e){
        window.event? window.event.cancelBubble = true : e.stopPropagation();
    });
    $('#modal_banner').click(function(){
        $(this).fadeOut();
    });

    /*提交表单*/
    $('#banner_btn').bannerSubmit();


    /*===============
       活动专区操作
    ================*/
    var activityObj = {
        /*初始化*/
        initActivity: function () {
            $('#activity_token').val(token);
            $('#activity_modify').val('');
            $('.onload_').html('点击上传图片');
            $('#activity_title').val('');
            $('#start_time').val($.getNowDate());
            $('#end_time').val('');
            $('#activity_scope1').prop('checked', true);
            $('#scope_description').val('');
            /*$('#scope_description').attr('disabled', 'disabled');*/
            $('#activity_url').val('');
            $('.info').empty();
            $.submission();
        },
        /*删除单条信息  */
        deleteAppointActivity: function (id) {
            $.ajax({
                type: "post",
                url: baseUrl + "oss/activity/delete",
                async: true,
                data: {
                    token:token,
                    activity_id:id
                },
                success: function(obj){
                    console.log(obj);
                    if( obj.code == -999){
                    window.location.href = '/admin/index';
                    return false
                    };
                    if( obj.code == 100){
                       $.activity();
                    }
                }
            });
        },
        /*请求单条信息内容  */
        seeAppointActivity: function (id, index) {
            index = (arguments[1] == undefined)? 1:index;
            $.ajax({
                type: "get",
                url: baseUrl + "oss/activity/query",
                async: true,
                data: {
                    id: id,
                    token:token,
                    page_num:index
                },
                success: function (obj) {
                    if( obj.code == -999){
                        window.location.href = '/admin/index';
                        return false
                    }
                    if(obj.code == 100){
                        var data = obj.data.list[0];
                        /*将得到的数据描上去*/
                        $('.onload_').html('<img src="'+data.activityImg+'"/>');
                        $('#activity_title').val(data.activityTitle);
                        $('#activity_url').val(data.activityUrl);
                        $('#start_time').val(data.activityStartTime);
                        $('#end_time').val(data.activityEndTime);
                        if(!data.activityScope){
                            $('#activity_scope1').prop('checked',true);
                            $('#scope_description').val('');
                            /*$('#scope_description').attr('disabled', 'disabled');*/
                        }else{
                            $('#activity_scope2').prop('checked',true);
                            /*$('#scope_description').removeAttr('disabled');*/
                            $('#scope_description').val(data.scopeDescription)
                        }
                    }
                }
            })
        },

    };
    $.fn.extend({
        /*上传or修改*/
        activitySubmit: function () {

            var optionsBuild = {
                url: baseUrl + "oss/activity/save",
                type: 'post',
                /*clearForm: true,*/
                beforeSubmit: function () {
                    var start = $('#start_time').val();
                    var end = $('#end_time').val();
                    $.checkTime(start, end);
                    if( $('#activity_file').val() == ''){
                        $('.info').html('请上传图片');
                        return false
                    }
                    if( $('#activity_title').val() == ''){
                        $('.info').html('请输入标题');
                        return false
                    }
                    if( $('#activity_title').val().length > 40){
                        $('.info').html('标题不能超过40字符');
                        return false
                    }
                    if( $('#activity_url').val() == ''){
                        $('.info').html('请输入URL');
                        return false
                    }
                    if(start == ''){
                        $('.info').html('请选择开始时间');
                        return false
                    }
                    if(end == ''){
                        $('.info').html('请选择结束时间');
                        return false
                    }
                    if(!judge){
                        $('.info').html('结束时间需大于开始时间');
                        return false
                    }
                    if( $('#activity_scope2').is(':checked') && $('#scope_description').val() == ''){
                        $('.info').html('指定用户不能为空');
                        return false
                    }
                },
                success: function (obj) {
                    if( obj.code == -999){
                        window.location.href = '/admin/index';
                        return false
                    }
                    if(obj.code == 100){
                        $.activity();
                        $('#activity_new').hide();
                        $('#activity_').show(500);
                    }
                }
            };
            var optionsModify = {
                url: baseUrl + "oss/activity/update",
                type: "post",
                /*clearForm: true,*/
                beforeSubmit: function () {
                    var start = $('#start_time').val();
                    var end = $('#end_time').val();
                    $.checkTime(start, end);
                    if( $('#activity_title').val() == ''){
                        $('.info').html('请输入标题');
                        return false
                    }
                    if( $('#activity_title').val().length > 40){
                        $('.info').html('标题不能超过40字符');
                        return false
                    }
                    if( $('#activity_url').val() == ''){
                        $('.info').html('请输入URL');
                        return false
                    }
                    if(start == ''){
                        $('.info').html('请选择开始时间');
                        return false
                    }
                    if(end == ''){
                        $('.info').html('请选择结束时间');
                        return false
                    }
                    if(!judge){
                        $('.info').html('结束时间需大于开始时间');
                        return false
                    }
                    if( $('#activity_scope2').is(':checked') && $('#scope_description').val() == ''){
                        $('.info').html('指定用户不能为空');
                        return false
                    }
                },
                success: function(obj){
                    if( obj.code == -999){
                        window.location.href = '/admin/index';
                        return false
                    }
                    if(obj.code == 100){
                        $.activity();
                        $('#activity_new').hide();
                        $('#activity_').show(500);
                    }
                }
            };
            $(this).click(function () {
                if($('#activity_modify').val() == ''){
                    $('#activity_form').ajaxForm(optionsBuild)
                }else{
                    $('#activity_form').ajaxForm(optionsModify)
                }
            })
        },
        /*验证图片信息*/
        provingImgMsg: function () {
            $(this).change(function () {
                $('.info').empty();
                var file = this.files[0];
                console.log(file)
                var name = file.name;
                var fileCategory = name.substring(name.lastIndexOf('.') + 1);
                console.log(fileCategory)
                var fileSize = parseFloat(file.size/1024).toFixed(1); //KB,保留一位小数
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function (e) {
                    $('.onload_').html('<img src="'+this.result+'"/>')
                    /*imgSrc = this.result;*/
                };
                if(fileCategory != 'jpg' && fileCategory != 'png' && fileCategory != 'gif'){
                    $('.info').html('请上传图片格式的文件');
                        return false
                }
                if(fileSize > 400){
                    $('.info').html('图片大小不超过400K');
                        return false
                }
            })
        }
    })

    /*验证图片信息*/
    $('#activity_file').provingImgMsg();

    /*新建*/
    $('.build2').click(function (){
        activityObj.initActivity();
        $('#activity_new').show(500);
        $('#activity_').hide();
    });

    /*修改*/
    $('body').on('click', '.edit_view', function () {
        var id = $(this).parent().parent().attr('id');
        activityObj.initActivity();
        activityObj.seeAppointActivity();
        $('#activity_modify').val(id);
        $('#activity_new').show(500);
        $('#activity_').hide();
    });

    /*提交表单*/
    $('#activity_btn').activitySubmit();

     /*删除单条信息*/
     $('body').on('click', '.delete_view', function () {
        var id = $(this).parent().parent().attr('id');
        activityObj.deleteAppointActivity(id)
     });
     /*得到首页开关的初始状态码*/
        var init = '';
        $.init = function () {
            $.ajax({
            type: "get",
            url: baseUrl + "oss/activity/query_state",
            async: true,
            data: {token:token},
            success: function (obj) {
                console.log(obj);
                if( obj.code == -999){
                    window.location.href = '/admin/index';
                    return false
                };
                if( obj.code == 100 ){
                    init = parseInt(obj.data);
                    console.log(init);
                    if(init == 1){
                        $('#view_toggle').addClass('view_toggle');
                        $('#view_toggle').html('点击关闭');
                    }else{
                        $('#view_toggle').removeClass('view_toggle');
                        $('#view_toggle').html('点击开启');
                    }
                }
            }
            });
        }
        $.init();

        /*点击更换状态*/
        $('#view_toggle').click(function(){
            if(init == 1){
                init = 0;
            }else{
                init = 1;
            }
            console.log(init);
            $.ajax({
                type: "post",
                url: baseUrl + "oss/activity/activity_state",
                async:true,
                data: {token:token, switch_state:init},
                success: function (obj) {
                    console.log(obj);
                    if( obj.code == -999){
                    window.location.href = '/admin/index';
                    return false
                    };
                    if ( obj.code == 100 ){
                        $.init();
                    }
                }
            });
        });

    /*==================
    弹窗广内容
     =====================*/
     var popAds = {
         /*初始化表单*/
        initPop: function () {
            console.log($.getNowDate())
            $('#pop_token').val(token);
            $('#pop_id').val('');
            $('.file_show').html('点击上传图片');
            $('#page_title').val('');
            $('#publish_time1').val($.getNowDate());
            $('#expire_time1').val('');
            $('#activity_scope_page1').prop('checked', true);
            $('#activity_page_file').val('');
            $('#scope_description_page').val('');
            $('#page_url').val('');
            $('.info').empty();
            $.submission();
           /* $('#scope_description_page').attr('disabled', 'disabled');*/
        },
        /*删除单条信息*/
        deleteAppointPop: function (id) {
            $.ajax({
                type: 'post',
                url: baseUrl + 'oss/activityPage/delete',
                async: true,
                data: {
                    token: token,
                    id: id
                },
                success: function (obj) {
                    /*console.log(obj);*/
                   if( obj.code == -999){
                        window.location.href = '/admin/index';
                        return false
                    }
                    if(obj.code == 100){
                        $.popAds();
                    }
                }
            })
        },
        /*请求单条信息*/
        seeAppointPop: function (id, index) {
            index = (arguments[1] == undefined)? 1: index;
            $.ajax({
                type: 'get',
                url: baseUrl + 'oss/activityPage/list',
                async: true,
                data: {
                    token: token,
                    page_num: index,
                    id: id
                },
                success: function (obj) {
                   /* console.log(obj)*/
                    if( obj.code == -999){
                        window.location.href = '/admin/index';
                        return false
                    }
                    if(obj.code == 100){
                        var data = obj.data.list[0];
                        /*将得到的数据描上去*/
                        $('.file_show').html('<img src="'+data.activityPageImg+'"/>');
                        $('#page_title').val(data.activityPageTitle);
                        $('#page_url').val(data.activityPageUrl);
                        $('#publish_time1').val(data.activityPageStartTime);
                        $('#expire_time1').val(data.activityPageEndTime);
                        if(!data.activityScopePage){
                            $('#activity_scope_page1').prop('checked',true);
                            $('#scope_description_page').val('');
                            /*$('#scope_description_page').attr('disabled', 'disabled');*/
                        }else{
                            $('#activity_scope_page2').prop('checked',true);
                            $('#scope_description_page').val(data.scopeDescriptionPage);
                            /*$('#scope_description_page').removeAttr('disabled');*/
                        }
                    }
                }
            })
        }
     };

     $.fn.extend({

        /*新建or修改*/
        popSubmit: function () {
            var optionsBuild = {
                url: baseUrl + 'oss/activityPage/add',
                type: 'post',
                /*clearForm: true,*/
                beforeSubmit: function () {
                    var start = $('#publish_time1').val();
                    var end = $('#expire_time1').val();
                    $.checkTime(start, end);
                    if( $('#activity_page_file').val() == ''){
                        $('.info').html('请上传图片');
                        return false
                    }
                    if( $('#page_title').val() == ''){
                        $('.info').html('请填入广告标题');
                        return false
                    }
                    if( $('#page_url').val() == ''){
                        $('.info').html('请填入URL');
                        return false
                    }
                    if( start == ''){
                        $('.info').html('请填入发布时间');
                        return false
                    }
                    if( end == ''){
                        $('.info').html('请填入过期时间');
                        return false
                    }
                    if(!judge){
                        $('.info').html('发布时间不能大于过期时间');
                        return false
                    }
                    if( $('#activity_scope_page2').is(':checked') && $('#scope_description_page').val() == ''){
                        $('.info').html('发布时间不能大于过期时间');
                        return false
                    }
                },
                success: function (obj){
                    console.log(obj)
                    if( obj.code == -999){
                        window.location.href = '/admin/index';
                        return false
                    }
                    if(obj.code == 100){
                        $.popAds();
                        $('#modal_pop').hide();
                        $('#popAds').show(500);
                    }else{
                         $('.info').html(obj.message);
                    }
                }
            };
            var optionsEdit = {
                url: baseUrl + 'oss/activityPage/update',
                type: 'post',
                /*clearForm: true,*/
                beforeSubmit: function () {
                    var start = $('#publish_time1').val();
                    var end = $('#expire_time1').val();
                    $.checkTime(start, end);
                    /*if( $('#activity_page_file').val() == ''){
                        $('.info').html('请上传图片');
                        return false
                    }*/
                    if( $('#page_title').val() == ''){
                        $('.info').html('请填入广告标题');
                        return false
                    }
                    if( $('#page_url').val() == ''){
                        $('.info').html('请填入URL');
                        return false
                    }
                    if( start == ''){
                        $('.info').html('请填入发布时间');
                        return false
                    }
                    if( end == ''){
                        $('.info').html('请填入过期时间');
                        return false
                    }
                    if(!judge){
                        $('.info').html('发布时间不能大于过期时间');
                        return false
                    }
                    if( $('#activity_scope_page2').is(':checked') && $('#scope_description_page').val() == ''){
                        $('.info').html('发布时间不能大于过期时间');
                        return false
                    }
                },
                success: function (obj) {
                    if( obj.code == -999){
                        window.location.href = '/admin/index';
                        return false
                    }
                    if(obj.code == 100){
                        $.popAds();
                        $('#modal_pop').hide();
                        $('#popAds').show(500);
                    }else{
                        $('.info').html(obj.message);
                    }
                }
            };
            $(this).click(function () {
                if( $('#pop_id').val() == ''){
                    $('#pop_form').ajaxForm(optionsBuild)
                }else{
                    $('#pop_form').ajaxForm(optionsEdit)
                }
            })
        },

        /*验证图片信息*/
        provingPopImgMsg: function () {
            $(this).change(function () {
                $('.info').empty();
                var file = this.files[0];
                console.log(file)
                var name = file.name;
                var fileCategory = name.substring(name.lastIndexOf('.') + 1);
                /*console.log(fileCategory)*/
                var fileSize = parseFloat(file.size/1024).toFixed(1); //KB,保留一位小数
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function (e) {
                    $('.file_show').html('<img src="'+this.result+'"/>')
                    /*imgSrc = this.result;*/
                };
                if(fileCategory != 'jpg' && fileCategory != 'png' && fileCategory != 'gif'){
                    $('.info').html('请上传图片格式的文件');
                        return false
                }
                /*if(fileSize > 400){
                    $('.info').html('图片大小不超过400K');
                        return false
                }*/
            })
        }
     })

   /* 新建*/
    $('.build3').click(function () {
        popAds.initPop();
        $('#modal_pop').show(500);
        $('#popAds').hide();
    })

    /*修改表单*/
    $('body').on('click', '.pop_edit', function () {
        var id = $(this).parent().parent().attr('id');
         popAds.initPop();
         $('#pop_id').val(id);
         popAds.seeAppointPop(id);
        $('#modal_pop').show(500);
        $('#popAds').hide();
    });

     /*验证图片信息*/
    $('#activity_page_file').provingPopImgMsg();

   /*提交表单*/
   $('#pop_btn').popSubmit();

    /*删除单条内容*/
    $('body').on('click', '.pop_delete', function () {
       var id = $(this).parent().parent().attr('id');
       popAds.deleteAppointPop(id)
    });




    $('#phone').click();

});
