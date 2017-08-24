$(function () {
	var optionsLogin = {
		url:"/user/login",
		type:"post",
		beforeSubmit:function(){//校验
			if($('#userName').val() == ''){$('.info').html('请输入用户名'); return false};
			if($('#passWord').val() == ''){$('.info').html('请输入密码'); return false};
		},
		success: function (obj) {
			
			if(obj.code == 100){
				window.location.href = '/customer/callback.html'
			}else{
				$('.info').html(obj.message);
			}
		}
	}
	
	$('#loginBtn').click(function () {
		$('#loginForm').ajaxForm(optionsLogin)
	})
	$(document).keydown(function (event) {
		event = event ? event :(window.event ? window.event : null); 
		if(event.keyCode==13){
			
			$('#loginForm').ajaxForm(optionsLogin)
		}
	})
	$('#userName').focus(function () {$('.info').html('')});
	$('#passWord').focus(function () {$('.info').html('')})
})
