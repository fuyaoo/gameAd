$(function () {
	var token="";
	var baseUrl="/";
	var fileExtension = '';

	$("#publish_time").jeDate({
        isinitVal:false,
        festival:true,
        ishmsVal:false,
        minDate: $.nowDate(0),
        //maxDate: $.nowDate(0),
        format:"YYYY-MM-DD hh:mm:ss",
        zIndex:3000,
   }) ;
	/*获取版本列表*/
	$.getEdition = function () {
		$.ajax({
			type:"get",
			url:baseUrl + "oss/app/list",
			async:true,
			data: {page_num:1, token:token},
			success: function (obj) {
				console.log(obj)
				if(obj.code == -999) {
	                window.location.href = "/admin/index";
	                return false;
	            }
				if(obj.code == 100){
					$('#total').html(obj.data.total);
					var editonTbody = '';
					var list = obj.data.list;
					$.each(list, function(index, array) {
						if(array.forceUpgrade == 'false'){
							array.forceUpgrade = "否"
						}else{
							array.forceUpgrade = "是"
						};
						if(array.publishScope == 0){
							array.publishScope = "所有用户"
						}else{
							array.publishScope = "指定用户"
						}
						editonTbody += '<tr id="'
						+array.id+'"><td>'
						+array.fileName+'</td><td>'
						+array.version+'</td><td>'
						+array.fileSize+'</td><td>'
						+array.publishTime+'</td><td>'
						+array.forceUpgrade+'</td><td>'
						+array.releaseLog+'</td><td>'
						+array.publishScope+'</td><td>'
						+array.createTime+'</td><td><span class="onload"><a href="'
						+array.downloadUrl+'">下载</a></span><span class="edit">编辑</span><span class="delete">删除</span></td></tr>'
					});
					$('#editonTbody').html(editonTbody);

					/*删除该行记录*/
					$('.delete').click(function () {
						var $this = $(this).parent().parent();
						var id = $this.attr('id');
						$.ajax({
							type:"post",
							url:baseUrl + "oss/app/delete",
							async:true,
							data: {id:id, token:token},
							success: function (obj) {
								console.log(obj)
								if(obj.code == -999){
									window.location.href = "/admin/index";
	                				return false;
								}
								if(obj.code == 100){
									$this.fadeOut();
								}
							}
						});
					})

					/*编辑该行记录*/
					$('.edit').click(function () {
						$('.info_msg').html('正在修改内容...');
						var id = $(this).parent().parent().attr('id');
						$('#id').val(id);
						modifyInit (id);
						buildOrEdit();
					})
				}
			}
		});
	}
	$.getEdition();

	/*新建版本*/
	$('#editionBuild').click(function () {
		$('.info_msg').html('正在新建版本...');
		init();
		buildOrEdit();
	})
	/*获取当前时间*/
	function getNowFormatDate() {
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
	}

	/*初始化表单*/
	function init () {
		$('#id').val('');
		$('#immediately').prop('checked', true);
		$('#publish_time').val(getNowFormatDate());
		$('#is_force_false').prop('checked', true);
		$('#scope_all').prop('checked', true);
		$('#is_big').empty();
		$('#file_edit').empty();
		$('#publish_log').val('');
		$('#assign_phone').val('');
	};

	/*修改时初始化表单*/
	function modifyInit (id) {
		$('#id').val(id);
		$.ajax({
			type:"get",
			url:baseUrl + "oss/app/view",
			async:true,
			data: {id:id, token:token},
			success: function (obj) {
				/*console.log(obj)*/
				if(obj.code == -999) {
	                window.location.href = "/admin/index";
	                return false;
	            }
				if(obj.code == 100){
					/*嵌套数据*/
					var data = obj.data;
					$('#time_point').prop('checked', true);
					$('#publish_time').val(data.publishTime);
					if(data.forceUpgrade == true){
						$('#is_force_true').prop('checked', true);
					}else{
						$('#is_force_false').prop('checked', true);
					};
					$('#publish_log').val(data.releaseLog);
					if(data.publishScope == 0){
						$('#scope_all').prop('checked', true);
					}else{
						$('#scope_point').prop('checked', true);
					};
					$('#assign_phone').val(data.assignPhone);
					$('#file_edit').html(data.version);
					$('#is_big').html(data.fileSize);
				}
			}
		});
	}

	/*默认选择清零*/
	$('[name="time"]').click(function () {
		if( $(this).attr('id') == 'immediately'){
			var date = getNowFormatDate();
			$('#publish_time').val(date);
		}else{
			$('#publish_time').val('');
		}
	})

	$('[name="scope"]').click(function () {
		if( $(this).attr('id') == 'scope_all'){
			$('#assign_phone').val('');
		}
	})

	/*验证文件类型*/
	$('#file').change(function () {
		var name = this.files[0].name;
		/*文件大小*/
		var file_size = parseFloat(this.files[0].size/1024/1024).toFixed(1);
		$('#is_big').html(file_size+'M');
		/*文件类别*/
		fileExtension = name.substring(name.lastIndexOf('.') + 1);
		var file_edits = name.split('-');
		file_edit = file_edits[1].split('v')[1];
		if(
			file_edits.length != 5
			|| file_edits[0] != 'GoldMister'
			|| file_edits[3] != 'release'
			|| file_edits[4].split('.')[0].length != 8
			|| file_edit == undefined
			){
			a = false;
			return false
		}else {
			a = true;
		}
		/*文件版本*/

		/*console.log(file_edit)*/
		$('#file_edit').html(file_edit);
	})

	/*新建or编辑*/
	function buildOrEdit () {
		$('.info').html('');
		$('#editionShow').hide().siblings().show(500);
		$('#token').val(token);
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
					$('#form_token').val(form_token)
				}
			}
		});

		var optionsEditon = {
			url: baseUrl + "oss/app/add",
			type: "post",
			clearForm: true,
			beforeSubmit: function () {
				if( $('#file').val() == '' ){
					$('.info').html('请选择上传文件');
					return false
				}
				if( fileExtension != 'apk' ){
					$('.info').html('请选择apk格式的文件');
					return false
				}
				if( a == false ){
					$('.info').html('文件名称格式不匹配');
					return false
				}
				if( $('[name="time"]:checked').val() == '1' && $('#publish_time').val() == ''){
					$('.info').html('请选择发布时间');
					return false
				}
				if( $('#publish_log').val() == '' ){
					$('.info').html('请输入更新日志');
					return false
				}
				if( $('[name="scope"]:checked').val() == '1' && $('#assign_phone').val() == ''){
					$('.info').html('请输入指定用户');
					return false
				}
			},
			success: function (obj){
				console.log(obj);
				if(obj.code == -999) {
	                window.location.href = "/admin/index";
	                return false;
	            }
				if(obj.code == 100){
					$.getEdition();
					$('#editionShow').show(500).siblings().hide();
				}else{
					$('.info').html(obj.message);
					init ();
				}
			}
		};
		var optionsEditon_edit = {
			url: baseUrl + "oss/app/update",
			type: "post",
			clearForm: true,
			beforeSubmit: function () {
				if( $('#file').val() != '' && fileExtension != 'apk'){
					$('.info').html('请选择apk格式的文件');
					return false
				}
				if( $('#file').val() != '' && a == false){
					$('.info').html('文件名称格式不匹配');
					return false
				}
				if( $('[name="time"]:checked').val() == '1' && $('#publish_time').val() == ''){
					$('.info').html('请选择发布时间');
					return false
				}
				if( $('#publish_log').val() == '' ){
					$('.info').html('请输入更新日志');
					return false
				}
				if( $('[name="scope"]:checked').val() == '1' && $('#assign_phone').val() == ''){
					$('.info').html('请输入指定用户');
					return false
				}
			},
			success: function (obj){
				var id = $('#id').val();
				/*console.log(obj)*/
				if(obj.code == -999) {
	                window.location.href = "/admin/index";
	                return false;
	            }
				if(obj.code == 100){
					$.getEdition();
					$('#editionShow').show(500).siblings().hide();
				}else{
					$('.info').html(obj.message);
					modifyInit (id)
				}
			}
		};
		$('#btn').click(function () {
			if ( $('#id').val() == ''){
				$('#editionForm').ajaxForm(optionsEditon)
			}else{
				$('#editionForm').ajaxForm(optionsEditon_edit)
			}

		})
	}
})
