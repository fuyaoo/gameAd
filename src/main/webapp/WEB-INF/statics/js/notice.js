$(function(){	
	/*token值*/
	var token="";
	//console.log(token);
	$('#token').val(token);
	var baseUrl="/";
	/*********************************************/
	
	$('.return').click(function(){
		$('.modal_notice').fadeOut();
	})
	
	$('.info_push').on('click','li',function(){
		if($(this).find('.push_msg').is(':hidden')){
			$(this).find('.push_msg').slideDown();
			$(this).find('.state>img').attr('src','/img/下.svg');
			$(this).siblings().find('.push_msg').slideUp();
			$(this).siblings().find('.state>img').attr('src','/img/上.svg');
		}else{
			$(this).find('.push_msg').slideUp();
			$(this).find('.state>img').attr('src','/img/上.svg');
		}
		
	});
	$('.clear').click(function(event){
		window.event? window.event.cancelBubble = true : e.stopPropagation();
		$(this).parent().parent().remove();
	})
	//点击遮罩关闭遮罩
	
	$('.ok').click(function(e){
		window.event? window.event.cancelBubble = true : e.stopPropagation();		
	})
	$('.queren').click(function(){
		$(this).fadeOut();
	});	
	/***************新增公告********************************/
	$('.notice_').click(function(){
		$('.info').empty();
        $('.modal_notice').resetForm();
		$('.modal_notice').fadeIn();
		$.ajax({
			type: "get",
			url: baseUrl+"oss/info/get/form/token",
			async: true,
			data: {token:token},
			success: function(obj){
				console.log(obj);
				if( obj.code == -999){
					window.location.href = '/admin/index';
					return false
				};
				if(obj.code == 100){
					var form_token = obj.data;
					$('#form_token').val(form_token)
				}
			}
		});
	});
	
	options={
		url: baseUrl + "oss/notice/save",
		type:'get',
		clearForm:true, 
		beforeSubmit:function(){					
			if($('#noticeTitle').val()==''){
				$('.info').html("请输入标题");									
				return false;
			}	
			if($('#notice_author').val()==''){
				$('.info').html("请输入作者");									
				return false;
			}	
			if($('#noticeContent').val()==''){
				$('.info').html("请编辑正文");									
				return false;
			}
        },
		success:function(obj){
			console.log(obj);
			if(obj.code==100){
				$('.modal_notice').fadeOut();
				$.notice(1);
			}
		}
	};
	$('#notice_btn').click(function(){
		$('#form').ajaxForm(options)
	})
	/***************加载公告内容*********************************/
	$.notice=function(page){
		$.ajax({
			type:"get",
			url:baseUrl+"oss/notice/list",
			data:{token:token,page:page,sum:20},
			async:true,
			success:function(obj){
				//console.log(obj);
				if(obj.code!==null){
					var total=obj.code;
					
					$('#total').html(total);
					/******************/
					$('.info_push').empty();
					var info_push=' ';
					var data=obj.data;
					console.log(data);
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
                        $.notice(nums);
                        $(this).addClass('active').siblings().removeClass('active');
                    });
					$.each(data, function(index,array) {

						info_push+='<li id="'
						+array.nid+
						'"><div><div class="title" style="width: 20%">'
						+array.noticeTitle+
						'</div><div class="state"><img src="/img/上.svg" alt="" /></div><div class="clear">删除</div><div >'
						+array.createTime+
						'</div><div class="author" style="width: 20%">'
						+array.noticeAuthor+
						'</div></div><div class="push_msg">'
						+array.noticeContent+
						'</div></li>';
					});
					
					$('.info_push').html(info_push);
					/******************删除公告*******************************/
					var $this4;
				$('.clear').click(function(event){					
					window.event? window.event.cancelBubble = true : e.stopPropagation();
					$('.queren').fadeIn();
					$this4=$(this);				
				})
				$('.ok').off().click(function(){
					console.log($this4);
						var nid=$this4.parent().parent().attr('id');						
						$.ajax({
							type:"post",
							url:baseUrl+"oss/notice/delete",
							data:{token:token,nid:nid},
							async:true,
							success:function(obj){
								if(obj.code==100){	
									$('.queren').fadeOut();
									$.notice(1);
								}
							}
						});
					})
					/*$('.clear').click(function(event){
						window.event? window.event.cancelBubble = true : e.stopPropagation();
						var nid=$(this).parent().parent().attr('id');						
						console.log(nid);
						$.ajax({
							type:"post",
							url:"http://192.168.1.10:8080/oss/notice/delete",
							async:true,
							data:{token:token,nid:nid},
							success:function(obj){
								//console.log(obj);
								$.notice();
							}
						});
					})*/
				}
			}
		});
	}
	$.notice(1);
	
})
