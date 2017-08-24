
$(function(){
    var baseUrl="/";
	$('.modal_push').hide();
    $('.push_').click(function(){
        $('.modal_push').resetForm();
        $('.info').html('');
        $('.modal_push').fadeIn();
    });
    $('.return').click(function(){
        $('.modal_push').fadeOut();
    })
    $("#push_time").jeDate({
        isinitVal:false,
        festival:true,
        ishmsVal:false,
        minDate: $.nowDate(0),
        //maxDate: $.nowDate(0),
        format:"YYYY-MM-DD hh:mm:ss",
        zIndex:3000,
    }) ;
    $('#only_user').click(function(){
        $('#only_user_text').removeAttr("readonly");
    })
    $('#all_user').click(function(){
        $('#only_user_text').attr("readonly","readonly");
    })
    $('#url').click(function(){
        $('#push_url').removeAttr("readonly");
    })
    $('#model').click(function(){
        $('#push_url').attr("readonly","readonly");
    })
    /**
     * 获取字符串长度
     * @param str
     * @returns {number}
     * @constructor
     */
    var GetLength = function (str) {
        ///<summary>获得字符串实际长度，中文2，英文1</summary>
        ///<param name="str">要获得长度的字符串</param>
        var realLength = 0, len = str.length, charCode = -1;
        for (var i = 0; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) realLength += 1;
            else realLength += 2;
        }
        return realLength;
    };
    options={
        url:"/oss/push/insert",
        type:'post',
        clearForm:true,
        beforeSubmit:function(){

            if($('#push_content').val()==''){
                $('.info').html("请输入推送内容");
                return false;
            }
            if($('#push_content').val()!='' && GetLength($('#push_content').val())>200){
                $('.info').html("推送内容过长，仅限100字以内");
                return false;
            }
            if($('input[name="range"]:checked').val()=='2' && $('#only_user_text').val()==''){
                $('.info').html("请输入指定用户");
                return false;
            }
            if($('input[name="model"]:checked').val()=='2' && $('#push_url').val()==''){
                $('.info').html("请输入跳转页面链接");
                return false;
            }
            if($('input[name="model"]:checked').val()=='2' && $('#push_url').val()!=''){
                var Expression=/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
                var objExp=new RegExp(Expression);
                if(objExp.test($('#push_url').val())==false){
                    $('.info').html("请输入正确的跳转页面链接");
                    return false;
                }
            }
            if($('input[name="time"]:checked').val()=='2' && $('#push_time').val()==''){
                $('.info').html("请输入指定时间");
                return false;
            }
        },
        success:function(obj){
            console.log(obj);
            if(obj.code == -999) {
                window.location.href = "/admin/index";
                return false;
            }
            if(obj.code==100){
                $('.modal_push').fadeOut();
                $.push(1);
                if(obj.data != ''){
                    rightNow(obj.data);
                }
            }else if(obj.code < 0){
                $('.info').html(obj.message)
            }
        }
    }
    $('#push_btn').click(function(){
        $('#form').ajaxForm(options)
    })
	$.push=function(page){$.ajax({
        type:"get",
        url:baseUrl+"oss/push/list",
        async:true,
        data:{page_num:page},
        success:function(obj){
            if(obj.code == -999) {
                window.location.href = "/admin/index";
                return false;
            }
            if(obj.code=="100"){
                var tbody='';
                $('.push_tbody').empty();
                var list=obj.data.list;
                var total=obj.data.count;
                $('#push_total').html(total);
				/*
				 * 根据total总数判断有多少个页面
				 */
                var page_nums=Math.ceil(total/20);
                console.log(page_nums);
                for(var i=0,lis='';i<page_nums;i++){
                    lis+='<li>'+(i+1)+'</li>';
                }
                $('.fenye').html(lis);
                $('.fenye>li').eq(page-1).addClass('active');
                $('.fenye>li').click(function(){
                    var nums=parseInt($(this).html());
                    $.push(nums);
                    $(this).addClass('active').siblings().removeClass('active');
                });
				/**********************************/
                $.each(list,function(index,array){
                    var count=parseInt(index)+1;
                    var range='';
                    var status_push = '';
                    var model = '';
                    if(array.pushRange == 1){
                        range = '所有用户';
                    }else if(array.pushRange == 2){
                        range = '指定用户';
                    }
                    if(array.status == 1){
                        status_push = '预约中';
                    }else if(array.status == 2){
                        status_push = '正在发送';
                    }else if(array.status == 3){
                        status_push = '已推送';
                    }else if(array.status == 4){
                        status_push = '推送失败';
                    }
                    if(array.model ==1){
                        model = '首页';
                    }else if(array.model ==2){
                        model = '行情';
                    }else if(array.model ==3){
                        model = '行情-白银';
                    }else if(array.model ==4){
                        model = '行情-黄金';
                    }else if(array.model ==5){
                        model = '行情-迷你黄金';
                    }else if(array.model ==6){
                        model = '我的';
                    }else if(array.model ==7){
                        model = '消息列表';
                    }else if(array.model ==8){
                        model = '消息正文';
                    }else {
                        model = array.model;
                    }
                    tbody+='<tr id="'
                        +array.id+'"><td>'
                        +count+
                        '</td><td style="width: 40%">'
                        +array.pushContent+
                        '</td><td style="width: 20%">'
                        +model+
                        '</td><td>'
                        +array.pushTime+
                        '</td><td>'
                        +range+
                        '</td><td>'
                        +status_push+
						'</td><td><span class="delete_view">删除</span></td></tr>';

                });
                $('.push_tbody').html(tbody);
                tbody=tbody.replace('undefined','');
                /*点击删除该行数据*/
                $('.delete_view').click(function(){
                    var id = $(this).parent().parent().attr('id');
                    $.ajax({
                        type: "post",
                        url: baseUrl+"oss/push/delete",
                        async: true,
                        data: {id:id},
                        success: function(obj){
                            console.log(obj);
                            if( obj.code == -999){
                                window.location.href = '/admin/index';
                                return false
                            };
                            if( obj.code == 100){
                                $.push(1);
                            }
                        }
                    });
                })
            }
        }
    })};
    $.push(1);
    function rightNow(id) {
        $.ajax({
            type: "post",
            url: baseUrl+"oss/push/rightNow",
            async: true,
            data: {id:id},
            success: function(obj){
                console.log(obj);
                if( obj.code == -999){
                    window.location.href = '/admin/index';
                    return false
                };
                if( obj.code == 100){
                    $.push(1);
                }
            }
        });
    }
});