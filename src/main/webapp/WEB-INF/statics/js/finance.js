$(function(){
	/*token值*/
	var token="";
	//console.log(token);
	$('#token').val(token);
	var baseUrl="/";
		/*************时间input插件内容***********************************/
	var start = {
    	format: 'YYYY-MM-DD hh:mm:ss',
    	minDate: '2014-06-16 23:59:59', //设定最小日期为当前日期
    	festival:true,
    	//isinitVal:true,
    	maxDate: $.nowDate(0), //最大日期
    	choosefun: function(elem,datas){
        	end.minDate = datas; //开始日选好后，重置结束日的最小日期
    	}
	};
	var end = {
    	format: 'YYYY年MM月DD日 hh:mm:ss',
    	minDate: $.nowDate(0), //设定最小日期为当前日期
    	festival:true,
    	//isinitVal:true,
    	maxDate: '2099-06-16 23:59:59', //最大日期
    	choosefun: function(elem,datas){
        	start.maxDate = datas; //将结束日的初始值设定为开始日的最大日期
    	}
	};
	$("#inpstart").jeDate(start);
	$("#inpend").jeDate(end);


	$("#publish_time").jeDate({
    	isinitVal:true,
    	festival:true,
    	ishmsVal:false,
    	minDate: '2016-06-16 23:59:59',
    	//maxDate: $.nowDate(0),
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
	}) ;  
	//test
	$("#expire_time").change(function(){
		console.log($(this).val());
	})
	/*****************************************************/
	
/*	$('.clear').click(function(event){
		window.event? window.event.cancelBubble = true : e.stopPropagation();
		$(this).parent().remove();
	});*/
	/**************点击遮罩页关闭*********************************/
	$('.modal_content_finance').click(function(e){
		window.event? window.event.cancelBubble = true : e.stopPropagation();
		
	});
	$('.modal_finance').click(function(){
		$(this).fadeOut();
	});
	//点击遮罩关闭遮罩
	
	$('.ok').click(function(e){
		window.event? window.event.cancelBubble = true : e.stopPropagation();		
	})
	$('.queren').click(function(){
		$(this).fadeOut();
	});	
	/****************加载财经日历页面内容************************************/
	$.finance=function(){
		$.ajax({
			type:"get",
			url:baseUrl+"oss/calendar/list",
			async:true,
			data:{page_num:1,token:token},
			success:function(obj){
				console.log(obj);
				if(obj.code == -999) {
					window.location.href = "/admin/index";
					return false;
				}
				if(obj.code=="100"){
					var list=obj.data.list;
					console.log(list);
					var total=obj.data.total;
					$('#total').html(total);
					$('.info_finance').empty();
					var finance_info=' ';					
					$.each(list,function(index,array){
						var img=' ';
						for(var i=0;i<5;i++){
							if(i<array.weight+1){
								img+='<img src="/img/星星_1.svg" alt="" />'
							}else{
								img+='<img src="/img/星星.svg" alt="" />'
							}
						};
						finance_info+='<li id="'
						+array.id+
						'"><img src="'
							+array.icoUrl+
							'"/><div class="f1">'
						+array.title+'</div><div>'
						+array.publishTime+
						'</div><div  class="f2">前值：<span>'
							+array.currentValue+
							'</span></div><div  class="f3">预测值：<span>'
							+array.predictedValue+
							'</span></div><div class="star">'+img+'</div><div class="clear">删除</div></li>';
							
						/*	console.log(finance_info);
							console.log(img);
							finance_info=finance_info.replace(/'tihuan'/, img);*/
							
					});
									
					$('.info_finance').html(finance_info);
					/************新建财经日历********************************/
					$('.finance_').click(function(){
						$(".modal_finance").fadeIn();
						var star=$('.star_>img');
						var weight=0;
						star.each(function(i,item){
							$(this).click(function(){								
							$(this).attr('src','/img/星星_1.svg').prevAll().attr('src','/img/星星_1.svg');
							$(this).attr('src','/img/星星_1.svg').nextAll().attr('src','/img/星星.svg');
							var weight=$(this).index();
							$('#weight').val(weight);	
							
						});
						$('#weight').val(weight);
						
						
						var options={							
							url:baseUrl+"oss/calendar/add",
							type:'post',
							clearForm:true, 
							beforeSubmit:function(){					
								if($('#file').val()==''){
									$('.info').html("请选择文件");									
									return false;
								}						
							},
							success:function(obj){
								if(obj.code == -999) {
									window.location.href = "/admin/index";
									return false;
								}
								console.log(obj);
								if(obj.code==100){
									$(".modal_finance").fadeOut();
									$.finance();
								}else{
									$('.info').html(obj.message);
								}
								
							}						
						}
						
						$('#btnn').click(function(){
							$('#form_').ajaxForm(options);
						})
						
	})
					});
					/****************删除财经日历********************************/
				var $this2;
				$('.clear').click(function(event){					
					window.event? window.event.cancelBubble = true : e.stopPropagation();
					$('.queren').fadeIn();
					$this2=$(this);				
				})
				$('.ok').off().click(function(){
						var id=$this2.parent().attr('id');
						$.ajax({
							type:"post",
							url:baseUrl+"oss/calendar/delete",
							data:{id:id,token:token},
							async:true,
							success:function(obj){
								if(obj.code == -999) {
									window.location.href = "/admin/index";
									return false;
								}
								if(obj.code=="100"){	
									$('.queren').fadeOut();
									$.finance();								
								}
							}
						});
					})
					/*$('.clear').click(function(){
						var id=$(this).parent().attr('id');
						$.ajax({
							type:"post",
							url:baseUrl+"oss/calendar/delete",
							async:true,
							data:{token:token,id:id},
							success:function(obj){
								//console.log(obj);
								if(obj.code==100){
									$.finance();
								}
							}
						});
					})*/
					/*******************************************/
				}
			}
		})
	}
	$.finance();
	
})
