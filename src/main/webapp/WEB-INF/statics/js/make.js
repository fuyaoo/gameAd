
$(function(){	
	var token="";
	var baseUrl="/";
	//console.log(token);
	$('#token').val(token);
	//点击遮罩关闭遮罩
	
	$('.ok').click(function(e){
		window.event? window.event.cancelBubble = true : e.stopPropagation();		
	})
	$('.queren').click(function(){
		$(this).fadeOut();
	});	
	/*******************加载吐槽内容*****************************/
	$.make=function(){$.ajax({
		type:"get",
		url:baseUrl+"oss/user/query/feedback",
		async:true,
		data:{page_num:1},
		success:function(obj){
			if(obj.code == -999) {
				window.location.href = "/admin/index";
				return false;
			}
			if(obj.code=="100"){
				console.log(obj);
				$('.info_make').empty();
				var list=obj.data.list;					
				var make_info=' ';
				var total=obj.data.total;
				$('#total').html(total);
				$.each(list,function(index,array){

					// make_info += '<li id="'
					// +array.id+
					// '"><div><div class="toCircle"><img src="/img/kh _1.png" alt="" /><div></div>'
					// +array.uid+'</div><div >'
					// +array.createUser+
					// '</div><div class="state"><img src="/img/上.svg" alt="" /></div><div class="clear">删除</div><div>回复</div><div >'
					// +array.createTime+
					// '</div></div><div class="make_msg">'
					// +array.content+
					// '<div><textarea name="" rows="3" cols="" placeholder="开始回复"></textarea><div><span>确定</span><span>取消</span></div></div></div></li>'	;
                    make_info += '<li id="'
                    +array.id+
                    '"><div><div class="toCircle"><img src="/img/kh _1.png" /><div>'
                    +array.uid+
                    '</div></div><div class="clear">删除</div><div>'
					+array.createTime+
                    '</div><div><div><span>吐槽内容：</span>'
                    +array.content+
					'</div><div><span>联系方式：</span>'
                    +array.contactWay+
                    '</div></div></div></li>'	;

				});
				//console.log(make_info);	
				$('.info_make').html(make_info);
				$('.make_msg').hide();
				$('.info_make').on('click','li',function(){
					$(this).find('.make_msg').slideDown();
					$(this).find('.state>img').attr('src','/img/下.svg');
					$(this).siblings().find('.make_msg').slideUp();
					$(this).siblings().find('.state>img').attr('src','/img/上.svg');
				});
				/**************删除吐槽********************************/				
				$('.clear').click(function(event){
					window.event? window.event.cancelBubble = true : e.stopPropagation();
					var $this=$(this).parent().parent();
					var id=$this.attr('id');
					$.ajax({
						type:"post",
						url:baseUrl+"oss/user/delete/feedback",
						data:{id:id},
						async:true,
						success:function(obj){
							if(obj.code == -999) {
								window.location.href = "/admin/index";
								return false;
							}
							console.log(obj);
							if(obj.code=="100"){								
								$.make();
							}
						}
					});
				});			
			};	
		}
	})};
	$.make();
});
