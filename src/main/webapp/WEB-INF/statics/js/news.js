$(function () {
	/*token值*/
	var token="";
	//console.log(token);
	$('#token').val(token);
	var baseUrl= "/";
	/*sessionStorage.getItem("baseUrl");*/
	var tag = '';
	var tags = [];

	/*栏目设置,ajax加载栏目信息*/
	$.install=function () {
		$.ajax({
			type:"get",
			url: baseUrl+"oss/info/class/list",
			async:true,
			data:{token:token, page_num:1},
			success:function (obj) {
				if( obj.code == -999){
					window.location.href = '/admin/index';
					return false
				}
				if(obj.code==100){
					console.log(obj);
					var list=obj.data.list;
					var lis='', tds; contents='';
					$('.msg_option').html('');
					$('#column').siblings(':not(#drafts)').remove();
					$.each(list, function(index,array){
						lis+='<li data-i="'+array.clsId+'">'
						+array.clsName+
						'</li>';

						contents+='<div data-i="'
						+array.clsId+
						'"><div class="msg_content"><div class="info_title"><div>图文信息（共<span class="total">0</span>条）</div><div class="news_">+新建图文信息</div>'+
						'</div><ul class="info_news"></ul><ul class="fenye"></ul></div></div>';

						tds+='<tr id="'
						+array.clsId+
						'" rank="'
						+array.rank+
						'"><td>'
						+(index+1)+
						'</td><td><img class="icon_img" src="'
						+array.clsIcon+
						'"/></td><td class="install_clsName">'
						+array.clsName+
						'</td><td class="install_showIndex">'
						+array.showIndex+
						'</td><td class="install_indexLimit">'
						+array.indexLimit+
						'</td><td><button class="up_install">向上</button>&nbsp;&nbsp;<button class="down_install">向下</button>&nbsp;&nbsp;<button class="clear_install">修改</button>&nbsp;&nbsp;<button class="out">删除</button></td></tr>';
					});
					lis=lis+'<li class="active install">栏目设置</li><li class="drafts">草稿箱</li>';
					$('#install_content').prepend(contents);
					$('.msg_option').html(lis);
					$('.install_tbody').html(tds);
					$('#column').show().siblings().hide();

					/*页面点击跳转*/
					$('.msg_option>li').each(function(i){
						$(this).click(function(){
							$(this).addClass('active').siblings().removeClass('active');
							$('#install_content > div').eq(i).show().siblings().hide();
							var tag = $('#install_content>div').eq(i).attr('data-i');
							/*console.log(tag)*/
							$.news(tag);
						})
					});
					/*修改栏目信息*/
					$('.clear_install').click(function(){
						var $this=$(this).parent().parent();
						var $id=$this.attr('id');
						var $clsName=$this.find('.install_clsName').html();
						var $indexLimit=$this.find('.install_indexLimit').html();
						var $showIndex=$this.find('.install_showIndex').html();
						if($showIndex=="true"){
							$('#show_index1').prop('checked',true)
						}else{
							$('#show_index2').prop('checked',true)
						}
						//console.log($showIndex);
						/*将值赋给修改编辑框*/
						$('#token_install').val(token);
						$('#id').val($id);
						$('#title_install').val($clsName);
						$('#index_limit').val($indexLimit);

						/*修改编辑框出现进行操作*/
						columnBuildOrModify();

					})

					/*删除栏目操作*/
					$('.out').click(function(){
						var $id=$(this).parent().parent().attr('id');
						/*console.log($id);*/
						$.ajax({
							type:"post",
							url:baseUrl+"oss/info/class/delete",
							async:true,
							data:{token:token, cls_id:$id},
							success:function(obj){
								if( obj.code == -999){
									window.location.href = '/admin/index';
									return false
								};
								//console.log(obj);
								if(obj.code==100){
									$.install();
								}
							}
						})
					})

					/*上下移动栏目操作*/
					/*上*/
					$('.up_install').click(function(){
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
									$.install();
								}
							}
						});
					});
					/*下	*/
					$('.down_install').click(function(){
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
									$.install();
								}
							}
						});
					})
				}
			}
		});
	}
	$.install();

	$('#file_install').change(function () {
		var file = this.files[0];
		newsImgExtension1 = file.name.substring(file.name.lastIndexOf('.') + 1);
	})
	/*栏目新增修改*/
	function columnBuildOrModify () {
		$('#form_install').hide();
		$('.infos').html('');
		$('#form_install').fadeIn();
		$('#token_install').val(token);

		/*阻止重复提交*/
		$.ajax({
			type: "get",
			url: baseUrl+"oss/info/get/form/token",
			async: true,
			data: {token:token},
			success: function(obj){
				if( obj.code == -999){
					window.location.href = '/admin/index';
					return false
				};
				if(obj.code == 100){
					var form_token = obj.data;
					$('#form_token1').val(form_token)
				}
			}
		});

		var optionColumnBuild = {
			url: baseUrl + "oss/info/class/add",
			type:'post',
			clearForm:true,
			beforeSubmit: function () {
				if( $('#title_install').val() == ''){
					$('.infos').html('请输入标题');
					return false
				}
				if($('#file_install').val() == ''){
					$('.infos').html('请选择图标');
					return false
				}
				if(newsImgExtension1 != 'jpg' && newsImgExtension1 != 'png'){
					$('.infos').html('请选择png/jpg格式的图片文件');
					return false
				}
				if($('#index_limit').val() == ''){
					$('.infos').html('请输入首页显示条数');
					return false
				}
				if( $('#index_limit').val()<0 || $('#index_limit').val()>10){
					$('.infos').html('首页显示条数在1~10之间');
					return false
				}
			},
			success: function (obj) {
				console.log(obj);
				if( obj.code == -999){
					window.location.href = '/admin/index';
					return false
				}
				if( obj.code == 100){
					$.install();
					$('.infos').html('');
					$('#form_install').fadeOut();
				}else{
					$('.infos').html(obj.message);
				}
			}
		};

		var optionColumnModify = {
			url: baseUrl+"oss/info/class/update",
			type:'post',
			clearForm:true,
			beforeSubmit: function () {
				if( $('#title_install').val() == ''){
					$('.infos').html('请输入标题');
					return false
				}
				if( $('#file_install').val() != ''){
					if(newsImgExtension1 != 'jpg' && newsImgExtension1 != 'png'){
					$('.infos').html('请选择png/jpg格式的图片文件');
					return false
				}
				}
				if($('#index_limit').val() == ''){
					$('.infos').html('请输入首页显示条数');
					return false
				}
				if($('#index_limit').val() == ''){
					$('.infos').html('请输入首页显示条数');
					return false
				}
				if( $('#index_limit').val()<0 || $('#index_limit').val()>10){
					$('.infos').html('首页显示条数在1~10之间');
					return false
				}
			},
			success: function (obj) {
				console.log(obj);
				if( obj.code == -999){
					window.location.href = '/admin/index';
					return false
				}
				if( obj.code == 100){
					$.install();
					$('.infos').html('');
					$('#form_install').fadeOut();
				}else{
					$('.infos').html(obj.message);
				}
			}
		}
		$('.save').click(function(){
			if($('#id').val() == ''){
				$('#form_install').ajaxForm(optionColumnBuild);
			}else{
				$('#form_install').ajaxForm(optionColumnModify);
			}

		});
	}

	/*新增栏目*/
	$('.new_column').click(function(){
		$('#id').val('');
		$('#title_install').val('');
		$('#index_limit').val('');
		$('#file_install').val('');
		$('#show_index1').prop('checked', true);
		columnBuildOrModify();
	});
  /*取消编辑内容*/
	$('.cancel').click(function(e){
		e.preventDefault();
		$('#title_install').val('');
		$('#token_install').val('');
		$('#file_install').val('');
		$('#index_limit').val('');
		$('#cls_id').val('');
		$('#show_index1').prop('checked',false);
		$('#show_index2').prop('checked',false);
		$('#form_install').fadeOut();
		$('.info').empty();
	})

	/*得到当前时间*/
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

	/*资讯新增or修改  草稿箱新增or 修改*/
	function newsBuildOrModify (tag) {
		$('.info').html('');
		$('.modal_news').fadeIn();
		$('#token').val(token);
		$('.tabChecked').empty();
		$('#name').val('');
		$.tabs();
		$('#all').click(function(){
			$('#assign_phone').val('');
		});
		/*阻止重复提交*/
		$.ajax({
			type: "get",
			url: baseUrl+"oss/info/get/form/token",
			async: true,
			data: {token:token},
			success: function(obj){
				if( obj.code == -999){
					window.location.href = '/admin/index';
					return false
				};
				if(obj.code == 100){
					form_token = obj.data;
					$('#form_token').val(form_token)
				}
			}
		});
		/*表单新建*/
		var optionsBuild = {
			url: baseUrl + "oss/info/add",
			type:"post",
			/*clearForm:true,*/
			beforeSubmit:function () {
				/*if( $('#img').val() == '' ){
					$('.info').html('请上传封面图片');
					return false
				}
				if( newsImgExtension != 'gif' && newsImgExtension != 'jpg' && newsImgExtension != 'png'){
					$('.info').html('请上传jpg/gif/png后缀的图片');
					return false
				}
				if( newsImgSize > 200 ){
					$('.info').html('图片大小不能超过200k');
					return false
				}*/
				if( $('#news_title').val() == '' ){
					$('.info').html('标题不能为空');
					return false
				}
				if( $('[name="scope"]:checked').val() == '1' && $('#assign_phone').val()  == ''){
					$('.info').html('请输入指定用户账户');
					return false
				}
				if( $('#editor-trigger').text() == '' ){
					$('.info').html('请输入正文');
					return false
				}
				if( tags.length >5 ){
					$('.info').html('标签不能超过5个');
					return false
				}
			},
			success: function (obj) {
				console.log(obj);
				if( obj.code == -999 ){
					window.location.href = '/admin/index';
					return false
				};
				if(obj.code==100){
					$('.modal_news').fadeOut();
					$('#result').html('');
					$('#tags').val('');
					$.drafts();
					$.news(tag);
					$('[data-i="'+tag+'"]').click();

				}else{
					$('.info').html(obj.message);
				}
			}
		};

		/*表单修改*/
		var optionsModify = {
			url: baseUrl + "oss/info/update",
			type:"post",
			/*clearForm:true,*/
			beforeSubmit: function () {
				if( $('#img').val() != '' ) {
					if( newsImgExtension != 'gif' && newsImgExtension != 'jpg' && newsImgExtension != 'png'){
						$('.info').html('请上传jpg/gif/png后缀的图片');
						return false
					}
					//if( newsImgSize > 200 ){
					//	$('.info').html('图片大小不能超过200k');
					//	return false
					//}
				}
				if( $('#news_title').val() == '' ){
					$('.info').html('标题不能为空');
					return false
				}
				if( $('[name="scope"]:checked').val() == '1' && $('#assign_phone').val()  == ''){
					$('.info').html('请输入指定用户账户');
					return false
				}
				if( $('#editor-trigger').text() == '' ){
					$('.info').html('请输入正文');
					return false
				}
				if( tags.length >5 ){
					$('.info').html('标签不能超过5个');
					return false
				}
			},
			success:function(obj){
				/*console.log(obj);*/
				if( obj.code == -999){
					window.location.href = '/admin/index';
					return false
				};
				if(obj.code==100){
					$.drafts();
					$.news(tag);
					$('[data-i="'+tag+'"]').click();
					$('.modal_news').fadeOut();
				}else{
					$('.info').html(obj.message);
				}
			}
		};
		/*draft新建*/
		var optionsDraftBuild = {
			url: baseUrl + "oss/info/save/draft",
			type:"post",
			/*clearForm:true,*/
			beforeSubmit:function () {
				/*if( $('#img').val() == '' ){
					$('.info').html('请上传封面图片');
					return false
				}
				if( newsImgExtension != 'gif' && newsImgExtension != 'jpg' && newsImgExtension != 'png'){
					$('.info').html('请上传jpg/gif/png后缀的图片');
					return false
				}
				if( newsImgSize > 200 ){
					$('.info').html('图片大小不能超过200k');
					return false
				}*/
				if( $('#news_title').val() == '' ){
					$('.info').html('标题不能为空');
					return false
				}
				if( $('[name="scope"]:checked').val() == '1' && $('#assign_phone').val()  == ''){
					$('.info').html('请输入指定用户账户');
					return false
				}
				if( $('#editor-trigger').text() == '' ){
					$('.info').html('请输入正文');
					return false
				}
				if( tags.length >5 ){
					$('.info').html('标签不能超过5个');
					return false
				}
			},
			success: function (obj) {
				console.log(obj);
				if( obj.code == -999 ){
					window.location.href = '/admin/index';
					return false
				};
				if(obj.code==100){
					$('.modal_news').fadeOut();
					$.drafts();
					$('.drafts').click();
				}else{
					$('.info').html(obj.message);
				}
			}
		};
		/*draft修改*/
		var optionsDraftModify = {
			url: baseUrl + "oss/info/update/draft",
			type: "post",
			/*clearForm:true,*/
			beforeSubmit: function () {
				if( $('#img').val() != '' ) {
					if( newsImgExtension != 'gif' && newsImgExtension != 'jpg' && newsImgExtension != 'png'){
						$('.info').html('请上传jpg/gif/png后缀的图片');
						return false
					}
					if( newsImgSize > 200 ){
						$('.info').html('图片大小不能超过200k');
						return false
					}
				}
				if( $('#news_title').val() == '' ){
					$('.info').html('标题不能为空');
					return false
				}
				if( $('[name="scope"]:checked').val() == '1' && $('#assign_phone').val()  == ''){
					$('.info').html('请输入指定用户账户');
					return false
				}
				if( $('#editor-trigger').text() == '' ){
					$('.info').html('请输入正文');
					return false
				}
				if( tags.length >5 ){
					$('.info').html('标签不能超过5个');
					return false
				}
			},
			success:function(obj){
				console.log(obj);
				if( obj.code == -999){
					window.location.href = '/admin/index';
					return false
				};
				if(obj.code==100){
					$('.modal_news').fadeOut();
					$.drafts();
					$('.drafts').click();
				}else{
					$('.info').html(obj.message);
				}
			}
		};

		$('#release').click(function(){
			if($('#newsid').val() == ''){
				$('#form').ajaxForm(optionsBuild)
			}else{
				$('#form').ajaxForm(optionsModify)
			}
		});
		$('#add_drafts').click(function(){
			/*console.log(1)*/
			if($('#draft_id').val() == ''){
				$('#form').ajaxForm(optionsDraftBuild)
			}else{
				$('#form').ajaxForm(optionsDraftModify)
			}
		});
		$('.header').click(function () {
			$('.saveDraft').show();
		});
		$('.modal_news_title').click(function (event) {
			event.stopPropagation();
			$('.saveDraft').show();
		})

	};
	$('#cancelDraft').click(function () {
		$('.saveDraft').hide();
		$('.return').click();
	})
	$('#saveDraft').click(function () {
		$('.saveDraft').hide();
		$('#add_drafts').click();
	})
	/*点击修改草稿*/
	$('body').on('click', '.draft_edit', function () {
		var id = $(this).parent().parent().attr('id');
		$.ajax({
			type:"get",
			url:baseUrl + "oss/info/view",
			data:{token:token, id:id},
			success: function (obj) {
				if( obj.code == -999){
					window.location.href = '/admin/index';
					return false
				}
				if( obj.code == 100 ){
					var data=obj.data;
					console.log(data);
					/*描数据*/
					$('#img_url').val(data.infoMainImg);
					$('.cls_id').val(data.clsId);
					$('#draft_id').val(data.infoId);//
					$('#result').html('<img src="'+data.infoMainImg+'"/>');
					$('#news_title').val(data.content.title);
					$('#publish_time').val(data.publishTime);
					$('#read_count').val(data.readCount);
					$('#good_count').val(data.goodCounts);
					$('#author').val(data.content.author);
					$('#editor-trigger').html(data.content.content);
					$('#d_content').val(data.content.content);
					$('#assign_phone').val(data.assignPhone);
					if(data.isBigImg == 0){
						$('#is_big_img1').prop('checked', true)
					}else{
						$('#is_big_img2').prop('checked', true)
					}
					if(data.scope == 0){
						$('#all').prop('checked', true)
					}else{
						$('#appoint').prop('checked', true)
					}
					if(data.openRelated == 1){
						$('#open').prop('checked', true)
					}else{
						$('#close').prop('checked', true)
					}
					var tagList = data.tagList;
					var tagHtml = '';
					/*console.log(tagList);*/
					/*分割返回的tags字符串*/
					$('.tabChecked').empty();

					$.each(tagList, function(index, array) {
						tagHtml += '<span id="'+array.id+'">'+array.name+'</span>'
						tags = tags.concat(array.id);
					});
					$('.tabChecked').html(tagHtml);
					$('#tags').val(tags);
					title();
				}
			}
		});
		newsBuildOrModify();
	})

	/*新建输入框显示隐藏*/
	$('.clear').click(function(event){
		window.event? window.event.cancelBubble = true : e.stopPropagation();
		$(this).parent().remove();
	});
	//console.log(1);
	$('.close').click(function(){
		$('.modal_preview').hide();
	});
	$('.return').click(function(e){
		e.stopPropagation();
		$('#img_url').val('');
		$('#img').val('');
		$('.modal_news').hide();
		$('.info').empty();
		$('#result').html('');
		$('#news_title').val('');
		$('#publish_time').val('');
		$('#read_count').val('');
		$('#good_count').val('');
		$('#editor-trigger').html('<p>开始编辑...</p>');
		$('#d_content').val('');
		$('#newsid').val('');
		$('#draft_id').val('');
		$('#author').val('黄金先生');
		$('#is_big_img1').prop('checked', true);
		$('#all').prop('checked', true);
		$('#open').prop('checked', true);
		$('.tabChecked').empty();
		$('#name').val('');
	});

	/*时间input插件内容*/
	$("#publish_time").jeDate({
    	isinitVal:true,
    	festival:true,
    	ishmsVal:true,
    	minDate: '2014-06-16 23:59:59',
    	//maxDate: $.nowDate(0),
    	format:"YYYY-MM-DD hh:mm:ss",
    	zIndex:3000,
	});

	/*点击遮罩关闭遮罩*/
	$('.ok').click(function(e){
		window.event? window.event.cancelBubble = true : e.stopPropagation();
	})
	$('.queren').click(function(){
		$(this).fadeOut();
	});

	/*ajax资讯加载页面内容*/
	$.news = function(tag, index){
		index = (arguments[1]==undefined)? 1 : index;
		$.ajax({
		type: "get",
		url: baseUrl + "oss/info/list",
		async: true,
		data: {page_num:index, token:token, cls_id:tag},
		success:function (obj) {
			console.log(obj);
			if( obj.code == -999){
				window.location.href = '/admin/index';
				return false
			};
			if(obj.code == 100){
				var list=obj.data.list;
				var news_info=' ';
				var total=obj.data.total;
				$('.total').html(total);
				/*
				 * 根据total总数判断有多少个页面进行分页
				 */
				var page_nums=Math.ceil(total/20);
				console.log(page_nums);
				for(var i=0,lis='';i<page_nums;i++){
						lis += '<li>'+(i+1)+'</li>'
				}
				$('.fenye').html(lis);
				$('.fenye>li').click(function(){
					var index=parseInt($(this).html());
					/*console.log(index);*/
					$(this).addClass('active').removeClass('active');
					$.news(tag,index);
				})
				//已上分页内容
				$('.info_news').empty();
				$.each(list,function(index,array){
					var topRank = array.topRank;
					var topR;
					if(topRank == 0){
						topR = '置顶'
					}else{
						topR = '取消置顶'
					}
					var background = '';
					background = (array.unreadCmtCount == 0)? '#fff': '';
					news_info +='<li id="'
						+array.infoId+
						'" rank="'
						+array.rank+
						'"><div><img src="'
						+array.infoMainImg+
						'" alt="" /></div><div class="infoTitle">'
						+array.infoTitle+
						'</div><div class="clear">删除</div><div class="modify">修改</div><div class="topp">'
							+topR+
							'</div><div class="view_">留言:<span></span>'+
							array.totalCmtCount+'<span class="unreadCmtCount" style="background:'+background+'">'
							+array.unreadCmtCount+'</span></div><div class="readcount">阅读量：<span>'
							+array.readCount+
						'</span></div><div class="goodcount">点赞量：<span>'
						+array.goodCount+
						'</span></div><div><span>创建时间：'
						+array.createTime+
						'</span><br/><span>发布时间：'
						+array.publishTime+
						'</span><br/><span>修改时间：'
						+array.updateTime+
						'</span></div></li>';

				});
				//console.log(news_info);
				$('.info_news').html(news_info);
				/*删除单条资讯内容*/
				var $thiss;
				$('.clear').click(function(event){
					window.event? window.event.cancelBubble = true : e.stopPropagation();
					$('.queren').fadeIn();
					$thiss=$(this);
				})
				$('.ok').off().click(function(){
					var id=$thiss.parent().attr('id');
					$.ajax({
						type:"post",
						url:baseUrl+"oss/info/delete",
						data:{id:id,token:token},
						async:true,
						success:function(obj){
							if( obj.code == -999){
								window.location.href = '/admin/index';
								return false
							};
							if(obj.code=="100"){
								$('.queren').fadeOut();
								$.news(tag);
							}
						}
					})
				});
				/*单条资讯置顶*/
				$('.topp').click(function(){
					var id=$(this).parent().attr('id');
					var that = $(this);
					var html_top = that.html();
					if(html_top == '置顶'){
						$.ajax({
						type:"post",
						url:baseUrl+"oss/info/set/top",
						async:true,
						data:{id:id,token:token},
						success:function(obj){
							//console.log(obj);
							if( obj.code == -999){
								window.location.href = '/admin/index';
								return false
							};
							if(obj.code == 100){
								$.news(tag);
							}
						}
						});
					}else{
						$.ajax({
						type:"post",
						url:baseUrl+"oss/info/reset/top",
						async:true,
						data:{id:id,token:token},
						success:function(obj){
							if( obj.code == -999){
								window.location.href = '/admin/index';
								return false
							};
							//console.log(obj);
							if(obj.code==100){
								$.news(tag);
							}
						}
						})
					}
				});
				/*修改单条内容*/
				$('.modify').click(function () {
					var id=$(this).parent().attr('id');
					$('#newsid').val(id);
					$('#draft_id').val('');
					$('#img').val('');
					var cid = $(this).parent().parent().parent().parent().attr('data-i');
					/*console.log(cid);*/
					$('.cls_id').val(cid);
					$.ajax({
						type:"get",
						url:baseUrl + "oss/info/view",
						data:{token:token, id:id},
						async:true,
						success:function(obj){
							if( obj.code == -999){
								window.location.href = '/admin/index';
								return false
							}
							if( obj.code == 100 ){
								var data=obj.data;
								console.log(data);
								/*描数据*/
								$('#img_url').val(data.infoMainImg);
								$('#result').html('<img src="'+data.infoMainImg+'"/>');
								$('#news_title').val(data.content.title);
								$('#publish_time').val(data.publishTime);
								$('#read_count').val(data.readCount);
								$('#good_count').val(data.goodCounts);
								$('#author').val(data.content.author);
								$('#editor-trigger').html(data.content.content);
								$('#d_content').val(data.content.content);
								$('#assign_phone').val(data.assignPhone);
								if(data.isBigImg == 0){
									$('#is_big_img1').prop('checked', true)
								}else{
									$('#is_big_img2').prop('checked', true)
								}
								if(data.scope == 0){
									$('#all').prop('checked', true)
								}else{
									$('#appoint').prop('checked', true)
								}
								if(data.openRelated == 1){
									$('#open').prop('checked', true)
								}else{
									$('#close').prop('checked', true)
								}
								var tagList = data.tagList;
								var tagHtml = '';
								/*console.log(tagList);*/
								/*分割返回的tags字符串*/
								$('.tabChecked').empty();

								$.each(tagList, function(index, array) {
									tagHtml += '<span id="'+array.id+'">'+array.name+'</span>'
									tags = tags.concat(array.id);
								});
								$('.tabChecked').html(tagHtml);
								$('#tags').val(tags);
								title();
							}
						}
					})
					newsBuildOrModify(cid);
				})
			}
		}
		})
	};

	/*新增资讯*/
		/*获得新增图片信息并预览*/
	$('#img').change(function(){
		file = this.files[0];
		var reader = new FileReader();

		/*文件类型*/
		newsImgExtension = file.name.substring(file.name.lastIndexOf('.') + 1);
		/*console.log(newsImgExtension)*/

		/*文件大小*/
		newsImgSize = parseFloat(file.size/1024).toFixed(1);
		console.log(newsImgSize)
		/*预览图片*/
		reader.readAsDataURL(file);
		reader.onload = function(e){
		 $('#result').html('<img src="'+this.result+'" alt=""/>' )
		}
	});
	$('body').on('click', '.news_', function () {
		$('#img_url').val('');
		$('#newsid').val('');
		$('#img').val('');
		$('.modal_news').hide();
		$('.info').empty();
		$('#result').html('');
		$('#news_title').val('');
		$('#read_count').val('');
		$('#good_count').val('');
		$('#editor-trigger').html('');
		$('#d_content').val('');
		$('#newsid').val('');
		$('#draft_id').val('');
		$('#author').val('黄金先生');
		$('#is_big_img1').prop('checked', true);
		$('#all').prop('checked', true);
		$('#open').prop('checked', true);
		$('.tabChecked').empty();
		var id = $(this).parent().parent().parent().attr('data-i');
		/*console.log(id);*/
		$('.cls_id').val(id);
		var nowTime = getNowFormatDate();
		$('#publish_time').val(nowTime);
		newsBuildOrModify(id);
	})


	/*获得资讯标签列表*/
	$.tabs = function () {
		$.ajax({
			type:"get",
			url:baseUrl+"oss/info/tag/list",
			async:true,
			data:{token: token},
			success: function(obj){
				/*console.log(obj)*/
				if( obj.code == -999){
					window.location.href = '/admin/index';
					return false
				};
				if(obj.code == 100){
					$.ajax({
						type: "get",
						url: baseUrl+"oss/info/get/form/token",
						async: true,
						data: {token:token},
						success: function(obj){
							if( obj.code == -999){
								window.location.href = '/admin/index';
								return false
							};
							if(obj.code == 100){
								form_token = obj.data;
							}
						}
					});
					var data = obj.data;
					var commonTabs = '';
					tags = [];
					/*内容加载*/
					$('.commonTab').empty();
					$.each(data, function(index, array) {
						commonTabs += '<span id="'
						+array.id+'">'
						+array.name+'</span>'
					});
					$('.commonTab').html(commonTabs);
				}
			}
		});
	}

	/*取消选中内容*/
	function title () {
		$('.tabChecked span').each(function(i) {
			$(this).attr('title', '点击取消选中')
		})
	};

	/*添加标签*/
	$('body').on('click','.commonTab span',function(){
		var id = parseFloat($(this).attr('id'));
		for(var i = 0; i　< tags.length; i ++){
			if(tags[i] == id)return false;
		}
		tags = tags.concat(id);
		console.log(tags);
		var that = $(this).clone();
		$('.tabChecked').append(that);
		$('#tags').val(tags);
		title();
		compare();
	});

	/*防止标签重复*/
	function compare () {
		var html = [];
		$('body .tabChecked span').each(function (i) {
			/*console.log(2)*/
			var html_content = $(this).html();
			if($.inArray(html_content, html)== -1){
				html[i] = html_content
			}else{
				/*console.log(1);*/
				$('.tabChecked').find($(this)).remove();
			}
		});
	}

	/*取消标签*/
	$('body').on('click','.tabChecked span',function(){
		var id = parseFloat($(this).attr('id'));
		var index = tags.indexOf(id);
		tags.splice(index, 1);
		$(this).remove();
		$('#tags').val(tags);
	})

	/*上传标签*/
	$('#name').change(function(){
		name=$(this).val();
	});
	/*点击enter键*/
	$(document).keydown(function (event) {
		event = event ? event :(window.event ? window.event : null);
		if(event.keyCode==13){
			$('#name').blur();
		}
	});
	$('#name').blur(function(){
		$.ajax({
			type:"post",
			url:baseUrl + "oss/info/tag/add",
			data:{token:token, name:name, form_token:form_token},
			async:true,
			success:function(obj){
				console.log(obj)
				if( obj.code == -999){
					window.location.href = '/admin/index';
					return false
				};
				if(obj.code == 100) {
					$('#name').val('');
					name = '';
					$('.tabChecked').append('<span id="'+obj.data.id+'">'+obj.data.name+'</span>');
					tags = tags.concat(obj.data.id);
					$('#tags').val(tags);
					title();
				}
			}
		});
	})
	/*获得评论列表*/
	var form_token = '';
	$.view = function (id) {
		$.ajax({
			type:"get",
			url:baseUrl+"oss/info/comment/list",
			async:true,
			data:{token:token, page_num:1, page_size:100, infoId:id},
			success:function(obj){
				console.log(obj);
				if( obj.code == -999){
					window.location.href = '/admin/index';
					return false
				};
				if(obj.code == 100){
					var total = obj.data.total;
					$('.view_num').html(total);
					var list = obj.data.list;
					var views='';
					/*var arr = '';*/
					$.each(list, function(index,array) {
						var userName = '';
						var name = '';
						var content = '';
						var id = '';
						var a = '回复';
						userName = array.userName?array.userName:'';
						name = array.backComments? (array.backComments[0].userName + ':'): '';
						content = array.backComments? array.backComments[0].content: '';
						id = array.backComments? array.backComments[0].id: '';
						var src = '';
						/*if($('.edit_textarea').html() ! = ''){

						}*/
						if(content != ''){
							a = '';
						}else{
							a = '回复';
						}
						if(array.isSelected == 'N'){
							src = '/img/星星.svg'
						}else{
							src = '/img/星星_1.svg'
						};
						views += '<li id="'
						+array.id+
						'"><dl><dt><img src="'
						+array.headPic+
						'" alt="" /></dt><dd>'
						+array.nickName+'<br/><span>'
						+userName+
						'</span></dd></dl><div>'
						+array.content+'<div style="font-size: 12px;color: #ddd;padding-top: 10px">'
						+array.createTime+'</div><div class="edit_textarea" id="'
						+id+'"><span class="content_textarea">'
						+content+'</span></div><div><span  style="float: right" class="toggle_selected" data-i="'
						+array.isSelected+'"><img class="img_toggle" src="'
						+src+'"/>精选</span><span style="float: right" class="view_reply">'+a+'</span></div><div class="confirm_textarea"><textarea class="textarea"></textarea><br /><span class="btn_textarea">确认</span><span class="textarea_info"></span></div></div></li>'
					});
					$('#view').html(views);

					/*关闭评论*/
					$('.clear_').click(function(){
						$(this).parent().parent().hide(500);
					});


					/*删除该评论*/
					$('.delete').click(function(){
						var id1 = $(this).parent().parent().attr('id');
						$.ajax({
							type:"post",
							url:baseUrl+"oss/info/delete/comment",
							async:true,
							data:{
								comment_id:id1,
								token:token
							},
							success:function(obj){
								if( obj.code == -999){
									window.location.href = '/admin/index';
									return false
								}
								//console.log(obj);
								if(obj.code == 100){
									$.view(id);
								}
							}
						});
					});

					/*精选/取消精选*/
					$('.toggle_selected').click(function () {
						var id = $(this).parent().parent().parent().attr('id');
						var $this = $(this);
						if( $(this).attr('data-i') == 'N'){
							$.ajax({
								type: 'post',
								url: baseUrl + 'oss/info/select/comment',
								async: true,
								data: {
									comment_id: id,
									is_selected: 'Y',
									token: token
								},
								success: function (obj) {
									if( obj.code == -999){
										window.location.href = '/admin/index';
										return false
									}
									if(obj.code == 100){
										$this.attr('data-i', 'Y');
										$this.children('img').attr('src','/img/星星_1.svg')
									}
								}
							})
						}else{
							$.ajax({
								type: 'post',
								url: baseUrl + 'oss/info/select/comment',
								async: true,
								data: {
									comment_id: id,
									is_selected: 'N',
									token: token
								},
								success: function (obj) {
									if( obj.code == -999){
										window.location.href = '/admin/index';
										return false
									}
									if(obj.code == 100){
										$this.attr('data-i', 'N');
										$this.children('img').attr('src','/img/星星.svg')
									}
								}
							})
						}
					})

					/*查看精选评论*/
					$('#contorl_switch').click(function () {
						if($(this).is(':checked')){
							$('[data-i="N"]').parent().parent().parent().slideUp();
						}else{
							$('[data-i="N"]').parent().parent().parent().slideDown();
						}
					});

					/*回复评论*/
					$('.view_reply').click(function () {
						$(this).parent().siblings('.confirm_textarea').find('.textarea').val('');
						$(this).parent().siblings('.confirm_textarea').find('.textarea_info').html('');
						$(this).parent().siblings('.confirm_textarea').slideDown();
						mid = '';
					});
					/*修改评论*/
					$('body').on('click', '.edit_textarea', function () {
						var value = $(this).children('.content_textarea').html();
						$(this).siblings('.confirm_textarea').find('.textarea').val(value);
						$(this).siblings('.confirm_textarea').find('.textarea_info').html('');
						$(this).siblings('.confirm_textarea').slideDown();
						/*mid = $(this).attr('id');*/
					})
					/*回复or修改*/
					$('.btn_textarea').click(function () {
						var $this = $(this);
						var id = $(this).parent().parent().parent().attr('id');
						/*var mid = $(this).parent().siblings('.edit_textarea').attr('id');*/

						var value = $(this).siblings('.textarea').val();
						console.log(id);
						console.log(value);
						$.ajax({
							type: 'post',
							url: baseUrl + 'oss/info/info/give/comment',
							data: {
								parent_id: id,
								content: value,
								token: token,
								/*comment_id: ''*/
							},
							success: function (obj) {
								console.log(obj)
								if( obj.code == -999){
									window.location.href = '/admin/index';
									return false
								}
								if(obj.code == 100){

									$this.parent().slideUp();
									$this.parent().siblings('.edit_textarea').find('.content_textarea').html(obj.data.content);
									$('#' + id).find('.view_reply').hide();
								}else{
									$this.siblings('.textarea_info').html(obj.message);
								}
							}
						})
					})

				}
			}
		})
	};
	$('body').on('click', '.view_', function(){
		var id = $(this).parent().attr('id');
		var html = $(this).parent().find('.infoTitle').html();
		$('.view_title').html(html);
		$.view(id);
		$('.view').show(500);
	});




	/*加载草稿箱内容*/
	$.drafts = function (index) {
		index = (arguments[0] == undefined)? 1 : index;
		$.ajax({
			type: 'get',
			url: baseUrl + 'oss/info/draft/list',
			data: {
				token: token,
				page_num: index
			},
			success: function (obj) {
				console.log(obj);
				if( obj.code == -999){
					window.location.href = '/admin/index';
					return false
				}
				if(obj.code == 100){
					var list = obj.data.list;
					var drafts_content = '';
					$('.total_drafts').html(obj.data.total);
					$.each(list, function (index, array) {
						drafts_content += '<tr id = "'
						+array.infoId+'"><td><img src="'
						+array.infoMainImg+'"/></td><td class="name_show">'
						+array.infoTitle+'</td><td>'
						+array.clsName+'</td><td>'
						+array.createTime+'</td><td><span class="draft_edit" data-id="'
						+array.clsId+'">修改</span><span class="draft_delete">删除</span></td></tr>'
					});
					$('#drafts_content').html(drafts_content);
				}
			}
		})
	}

	/*删除单条草稿*/
	$.fn.deleteAppointDraft = function (id){
		$(this).click(function (){
			$.ajax({
				type: 'post',
				url:baseUrl+"oss/info/delete",
				data:{
					id:id,
					token:token
				},
				async:true,
				success:function(obj){
					console.log(obj)
					if( obj.code == -999){
						window.location.href = '/admin/index';
						return false
					};
					if(obj.code == 100){
						$.drafts();
						$('.modal_drafts').hide(500);
					}
				}
			})
		})
	}


	/*删除单条草稿*/
	$('body').on('click', '.draft_delete', function () {
		var id = $(this).parent().parent().attr('id');
		var name = $('#'+id).find('.name_show').text();
		console.log(id);
		console.log(name)
		$('#draft_name').html(name);
		$('.modal_drafts').show(500);
		$('#draft_delete').deleteAppointDraft(id);
	});

	$('.cancel_draft_delete').click(function () {
		$('.modal_drafts').hide(500);
	});

	$.extend({

		// 图片的分组及总数
		localImgList: function () {
			$.ajax({
				type: "get",
				url: baseUrl + "oss/img/query/total",
				async: true,
				data: {token: token},
				success: function(obj){
					console.log(obj)
					if(obj.code == -999){
						window.location.href = "/admin/index";
	          				return false;
					}
					if(obj.code == 100){
						var selectList = '';
						var list = obj.data;
						$.each(list, function(index, array) {
							selectList += '<option value="'+array.groupId+'">'+array.groupName+'</option>';
						});
						selectList = '<option value="">全部图片</option>' + selectList;
						$('#localSelect').html(selectList);
					}
				}
			});
		},
		/*查看分组图片*/
		localGetImg: function (id, index){
			index  = (arguments[1] == undefined)? 1 : index;
			$.ajax({
				type: 'get',
				url: baseUrl + 'oss/img/query',
				async: true,
				data: {
					token: token,
					page_num: index,
					group_id: id
				},
				success: function (obj){
					console.log(obj)
					if(obj.code == -999){
						window.location.href = "/admin/index";
	          			return false;
					}
					if(obj.code == 100){
						$('#total').html(obj.data.total);
						var list = obj.data.list;
						var item_content = '';
						var item_checked_name = '';
						$.each(list, function (index, array){
							item_content += '<div id="'
							+array.id+'"><img src="'
							+array.imgUrl+'"/></div>'
						});
						$('.localContent').html(item_content)
					}
				}
			})
		},
	});

	// 素材框显示隐藏
	$('body').on('click','#localImg', function () {
		$.localImgList();
		$.localGetImg();
		$('.modal_localImg').fadeIn();
	});
	$('#localCancel').click(function () {
		$('.modal_localImg').fadeOut();
	})


	$('#localSelect').change(function () {
		 /*console.log( $(this).val())*/
		var id = $(this).val();
		$.localGetImg(id);
	});

	/*选择图片*/
	$('body').on('click', '.localContent div', function () {
		console.log( $(this).attr('id'))
		var url = $(this).children('img').attr('src');
		console.log(url);
		$('#localInput').val(url);
		console.log($('#localInput').val());
		$('#localButton').click();
		$('.modal_localImg').fadeOut();
	})







	/*$.localImgList();
	$.localGetImg(7);*/
	$.drafts();

})
