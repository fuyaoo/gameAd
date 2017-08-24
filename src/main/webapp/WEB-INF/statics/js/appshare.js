$(function () {
	var token="";
	var baseUrl="/";
	/*运营获取分享app配置*/
	$.appShare = function () {
		$.ajax({
			type:"get",
			url:baseUrl + "oss/app/query/share",
			async:true,
			data: {token:token},
			success: function (obj) {
				/*console.log(obj)*/
				var appPreview = '';
				if(obj.code == -999) {
	                window.location.href = "/admin/index";
	                return false;
	            }
				if(obj.code == 100){
					var data = obj.data;
					$('#content').val(data.content);
					$('#title').val(data.title);
					$('#url').val(data.url);
					$('.appShareImg').html('<img src="'+data.logo+'"/>');
					$('.info').html('');
					/*预览内容*/
					appPreview = '<div><div><div>'
					+data.title+'</div><div>'
					+data.content+'</div></div></div><div><img src="'
					+data.logo+'" alt="" /></div></div>';
					$('.appPreview').html(appPreview);
				}			
				
			}
		});
		
	}
	
	$.appShare();
	/*运营保存分享app配置*/
	/*更换图片预览*/
	var appShareImg = '';	
	$('#file').change(function () {
		$('.appShareImg').empty();
		appShareImg = this.files[0];
		appShareName = appShareImg.name;
		console.log(appShareName)
		file_size = parseFloat(this.files[0].size/1024).toFixed(1);	
		fileExtension = appShareName.substring(appShareName.lastIndexOf('.') + 1);
		console.log(fileExtension)
		var reader = new FileReader(); 
		reader.readAsDataURL(appShareImg); 
		reader.onload = function(e){ 
		 $('.appShareImg').html('<img src="'+this.result+'" alt=""/>' )
		} 
	})
	
	
	
	/*
		var file='';
	$('#file').change(function(){
		file = this.files[0]; 
		var reader = new FileReader(); 
		file_size = parseFloat(this.files[0].size/1024).toFixed(1);	
		fileExtension = file.name.substring(file.name.lastIndexOf('.') + 1);
		reader.readAsDataURL(file); 
		reader.onload = function(e){ 
		 $('#result').html('<img src="'+this.result+'" alt=""/>' )
		} 
	})*/
				
				
				
	$('#token').val(token);
	var optionsAppShare = {
		url: baseUrl + "oss/app/add/share",
		type: "post",
		/*clearForm: true,*/
		beforeSubmit: function () {
			if( $('#file').val() != ''){
				if( file_size > 250){
					$('.info').html('图片不超过250K');
					return false
				}
				if( fileExtension != 'png' && fileExtension != 'jpg'){
					$('.info').html('请选择png/jpg的图片');
					return false
				}
			}
			if( $('#title').val() == ''){
				$('.info').html('请输入标题');
				return false
			}
			if( $('#content').val() == ''){
				$('.info').html('请输入内容');
				return false
			}
			if( $('#url').val() == ''){
				$('.info').html('请输入网址');
				return false
			}
		},
		success: function (obj) {
			console.log(obj);
			if(obj.code == -999) {
                window.location.href = "/admin/index";
                return false;
            }
			if(obj.code == 100){
							
				$.appShare();
				$('.info').empty();
			}else{
				$('.info').html(obj.message);
			}
			
		}
	};
	$('#appShareBtn').click(function () {
		$('#appShareForm').ajaxForm(optionsAppShare)
	})
})
