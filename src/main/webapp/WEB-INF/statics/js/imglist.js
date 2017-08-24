$(function(){
	var token="";
	var baseUrl="/";


	$.extend({
	 	 /*图片的分组及总数*/
	 	imgList: function () {
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
						var img_content_list = '';
						var selectList = '';
						var list = obj.data;
						$.each(list, function(index, array) {
							img_content_list += '<li id="'+array.groupId+'">'+array.groupName+'</li>';
							selectList += '<option value="'+array.groupId+'">'+array.groupName+'</option>';
						});
						$('#img_content_list').html(img_content_list);
						$('#selectList').html(selectList);
						$('#moveGroupOption').html(selectList);
					}
				}
			});
		},
		/*查看分组图片*/
		getImg: function (id, index){
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
							+array.imgUrl+'"/><input type="checkbox" name="ids" value="'
							+array.id+'"/><span class="imgName">'
							+array.imgName+'</span><br /><span class="modify_img">修改<div class="modal_imgname" style="display: none"><input name="name" class="name" placeholder="请输入图片名称"/><div><span class="cancel_imgname">取消</span><button class="editImgName">确认</button></div><div class="modify_img_info"></div></div></span><span class="delete_img">删除<div class="modal_imgdelete" style="display: none"><div>删除该图片?</div><div><span class="cancel_imgdelete">取消</span><span class="DeleteImg">确认</span><div class="modify_img_info"></div></div></div></span></div>'
						});
						$('#item_content').html(item_content)
					}
				}
			})
		},
		/*添加分组*/
		getImgGroup: function() {
			/*表单初始化*/
			$.submission();
			$('#build_group_token').val(token);
			$('[name="group_name"]').val('');
			$('.img_group_info').empty();
			$('.build_img_form').fadeIn();
			var options = {
				url: baseUrl + 'oss/img/add/group',
				type: 'post',
				/*clearForm: true,*/
				beforeSubmit: function () {
					if( $('[name="group_name"]').val() == '' || $('[name="group_name"]').val().length > 5 ){
						$('.img_group_info').html('分组名称应该在1-5个字符');
						return false
					}
				},
				success: function (obj) {
					if(obj.code == -999){
						window.location.href = "/admin/index";
	          				return false;
					}
					if(obj.code == 100){
						$.imgList();
						$.closeGroup();
					}else{
						$('.img_group_info').html(obj.message);
					}
				}
			};
			$('#get_group_btn').click(function () {
				$('#build_img_form').ajaxForm(options)
			})
		},
		/*关闭添加分组*/
		closeGroup: function () {
			$('.build_img_form').hide(500);
		},
		/*初始化上传图片表单*/
		initForm: function () {
			$('.files input').val('');
			$('.files img').remove();
			$('.getImg_info').empty();
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

		 /*批量上传图片*/
	 	onlineImg: function () {
	 		$.submission();
 			$('#token').val(token);
 			$('.modal').fadeIn();
 			var id = '';
 			var options = {
		 		type: 'post',
		 		url: baseUrl + 'oss/img/add/img',
		 		/*clearForm: true,*/
		 		beforeSubmit: function () {
		 			id = $('#selectList').val();
		 			var arr = [];
		 			$('.files .imgFile').each(function (i) {
		 				var val = $(this).val();
		 				if (val != ''){
		 					arr.push(val)
		 				}
		 				// console.log(arr)
		 			});
		 			if(arr.length == 0){
		 				$('.getImg_info').html('请上传图片');
		 				return false
		 			}
		 		},
		 		success: function (obj) {
		 			console.log(obj)
		 			if(obj.code == -999){
						window.location.href = "/admin/index";
	          			return false;
					}
		 			if(obj.code == 100){
		 				console.log(id)
		 				$.imgList();
		 				$.getImg(id);
		 				$.closeOnlineImg();
		 			}else{
		 				$('.getImg_info').html(obj.message)
		 			}
		 		}
		 	};
		 	$('#onlineImgBtn').click(function () {
		 		$('#onloadImg').ajaxForm(options)
		 	})
	 	},
	 	/*关闭上传*/
	 	closeOnlineImg: function () {
	 		$('.modal').fadeOut();
	 	},
	 	/*批量删除图片*/
	 	deleteAllImg: function () {
	 		$.submission();
	 		var options = {
	 			type: 'post',
	 			url: baseUrl + 'oss/img/delete',
	 			beforeSubmit: function (){
	 				var arr = [];
	 				$('input[name="ids"]').each(function (i) {
	 					if( $(this).is(':checked')){
	 						var val = $(this).val();
	 						arr.push(val);
	 					}
	 					/*console.log(arr)*/
	 				})
	 				if( arr.length == 0){
	 					$('.delete_img_info').html('请选择要删除的图片');
	 					return false
	 				}
	 			},
	 			success: function (obj) {
	 				if(obj.code == -999){
						window.location.href = "/admin/index";
	          			return false;
					}
					if(obj.code == 100){
						$('.cancel_delete').click();
						$.imgList();
						$('#allImg').click();
					}else{
						$('.delete_img_info').html(obj.message);
					}
	 			}
	 		}
	 		$('#deleteAllImgBtn').click(function () {
	 			$('#deleteAllImg').ajaxForm(options)
	 		})
	 	},
	 	/*批量移动图片*/
	 	moveAllImg: function () {
	 		$.submission();
	 		var options = {
	 			type: 'post',
	 			url: baseUrl + 'oss/img/switch',
	 			beforeSubmit: function (){
	 				var arr = [];
	 				$('input[name="ids"]').each(function (i) {
	 					if( $(this).is(':checked')){
	 						var val = $(this).val();
	 						arr.push(val);
	 					}
	 					/*console.log(arr)*/
	 				})
	 				if( arr.length == 0){
	 					$('.move_group_info').html('请选择移动分组的图片');
	 					return false
	 				}
	 			},
	 			success: function (obj) {
	 				console.log(obj)
	 				if(obj.code == -999){
						window.location.href = "/admin/index";
	          			return false;
					}
					if(obj.code == 100){
						$('.cancel_move').click();
						$.imgList();
						$('#allImg').click();

					}else{
						$('.move_group_info').html(obj.message);
					}
	 			}
	 		}
	 		$('#moveGroup').click(function () {
	 			$('#deleteAllImg').ajaxForm(options)
	 		})
	 	}

	});

	$.fn.extend({
		/*验证图片信息并预览*/
	 	onlineImgPreview: function () {
	 		$(this).change(function (){
				var file =this.files[0];
				var name = file.name;
				var file_category = name.substring(name.lastIndexOf('.') + 1);
				var file_size = parseFloat(file.size/1024);
				var reader = new FileReader();
				reader.readAsDataURL(file);
				var $this = $(this);
				reader.onload = function (e) {
					$this.parent().find('img').remove();
					$this.parent().append('<img src="'+this.result+'"/>');
				};
				if(file_category != 'jpg' && file_category != 'png' && file_category != 'gif'){
					$('.getImg_info').html('请上传正确格式的图片');
					return false
				}
				if(file_size > 500){
					$('.getImg_info').html('图片的尺寸不能超过500K');
					return false
				}else{
					$('.getImg_info').empty();
				}
			})
	 	}
	});

	/*点击 --添加分组*/
	$('#build_img_group').click(function () {$.getImgGroup()});

	/*点击 --关闭添加分组*/
	$('#cancel_build_group').click(function () {$.closeGroup()});

	/*点击删除分组*/
	$('body').on('click', '.delete_group', function () {
		$.submission();
		var id = $(this).siblings('.operation').attr('data-i');
		/*console.log(id)*/
 			$.ajax({
 				type: 'post',
 				url: baseUrl + 'oss/img/delete/group',
 				async: true,
 				data: {
 					id: id,
 					token: token
 				},
 				success: function (obj){
 					if(obj.code == -999){
						window.location.href = "/admin/index";
	          			return false;
					}
					if(obj.code == 100){
						$.imgList();
						$('#allImg').click();
					}
 				}
 			})
	});


	 /*点击group获取组内容图片*/
	$('body').on('click', '#img_content_list>li', function () {
		var id = $(this).attr('id');
		var title = $(this).html();
		/*console.log(title)*/
		$('.item_checked_name').html('<span class="operation" data-i="'+id+'">'+title+'</span><span class="again_name">重命名<div class="modal_name" style="display: none"><input name="group_name" id="group_name" placeholder="请输入分组名称"/><div><span class="cancel_againname">取消</span><button id="againName">确认</button></div><div class="again_name_info"></div></div></span><span class="delete_group">删除</span>');

		$.getImg(id)
	});


	/*点击获取全部图片*/
	$('#allImg').click(function () {
		$('.item_checked_name').html('全部图片');
		$.getImg();
	});

	 /*删除单张图片*/
	 $('body').on('click', '.delete_img', function () {
	 	$(this).find('.modal_imgdelete').show(500);
	 });
	 $('body').on('click', '.cancel_imgdelete', function (e) {
	 	e.stopPropagation();
	 	$('.modal_imgdelete').fadeOut();
	 });
	$('body').on('click', '.DeleteImg', function () {
	 	var id = $(this).parent().parent().parent().parent().attr('id');
	 	$.ajax({
	 		type: 'post',
	 		url: baseUrl + 'oss/img/delete',
	 		async: true,
	 		data: {
	 			token: token,
	 			ids: id
	 		},
	 		success: function (obj){
	 			/*console.log(obj);*/
	 			if(obj.code == -999){
					window.location.href = "/admin/index";
          			return false;
				}
				if(obj.code == 100){
					$('#'+id).fadeOut();
				}
	 		}
	 	})
	});

	/*全选*/
	$('#select').click(function () {
		if( $('#select').is(':checked')){
			$('#item_content').find('input').prop('checked', true);
		}else{
			$('#item_content').find('input').prop('checked', false);
		}
	});

	/*批量删除图片*/
	$.deleteAllImg();

	/*批量移动图片*/
	$.moveAllImg();

	/*点击批量上传图片*/
	$('#img_online').click(function () {$.initForm(); $.onlineImg()});

	/*点击关闭上传*/
	$('#cancelOnload').click(function () {$.closeOnlineImg()});

	/*验证图片信息并预览*/
	$('.files label').find('input').onlineImgPreview();

	/*移动分组模态框--显示隐藏*/
	$('.moveGroup').click(function(){
		$('#deleteAllImgToken').val(token);
		$('.move_group_info').empty();
		$('.modal_move').show(500);
	});
	$('.cancel_move').click(function (e) {
		e.stopPropagation();
		$('.modal_move').fadeOut();
	})

	/*删除 模态框--显示隐藏*/
	$('.deleteAllImgBtn').click(function(){
		$('#deleteAllImgToken').val(token);
		$('.delete_img_info').empty();
		$('.modal_delete').show(500);
	});
	$('.cancel_delete').click(function (e) {
		e.stopPropagation();
		$('.modal_delete').fadeOut();
	})

	/*group重命名模态框--显示隐藏*/
	/*运营重命名分组*/
	$('body').on('click', '.again_name', function (){
		$('#group_name').val('');
		$('.again_name_info').empty();
		$('.modal_name').show(500);
		var $this = $(this).siblings('.operation');
		var id = $this.attr('data-i');

		$('#againName').click(function (e) {
			e.preventDefault();
			var group_name = $('#group_name').val();
			if( group_name == '' || group_name.length > 5){
				$('.again_name_info').html('分组名称应该在1-5个字符');
				return false
			}
			$.ajax({
				type: 'post',
				url: baseUrl + 'oss/img/group/rename',
				async: true,
				data: {
					group_name: group_name,
					id: id,
					token: token
				},
				success: function(obj){
					if(obj.code == -999){
						window.location.href = "/admin/index";
	          			return false;
					}
					if(obj.code == 100){
						$.imgList();
						$('#allImg').click();
					}else{
						$('.again_name_info').html(obj.message);
					}
				}
			})
		})
	});
	$('body').on('click', '.cancel_againname', function (e){
		e.stopPropagation();
		$('.modal_name').fadeOut();
	})

	/*图片名称修改模态框 -- 显示隐藏*/
	$('body').on('click', '.modify_img', function(){
		$(this).find('.modal_imgname').show(500);
		var id = $(this).parent().attr('id');
		$('#'+id+' .name').val('');
		$('#'+id+' .modify_img_info').empty();
		$('#'+id+' .editImgName').click(function (e){
			e.preventDefault();
			var name = $('#'+id+' .name').val();
			if(name.length > 20){
				$('#'+id+' .modify_img_info').html('不超过20个字符');
				return false
			}
			/*console.log(name)*/
			$.ajax({
				type: 'post',
				url: baseUrl + 'oss/img/rename',
				async: true,
				data: {
					id: id,
					name: name,
					token: token
				},
				success: function (obj) {
					if(obj.code == -999){
						window.location.href = "/admin/index";
	          			return false;
					}
					if(obj.code == 100){
						$.imgList();
						$('#allImg').click();
					}
				}
			})
		})
	});
	$('body').on('click', '.cancel_imgname', function(e){
		e.stopPropagation();
		$(this).parent().parent().fadeOut();
	})

	$.imgList();
	$('#allImg').click();
})
