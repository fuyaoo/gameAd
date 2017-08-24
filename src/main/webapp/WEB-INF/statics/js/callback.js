$(function () {
	var token = "";
	/*console.log(token);*/
	var baseUrl = "/";
	/*console.log(baseUrl)*/
	/*分页获取预约回电*/
	$.callBack = function (index) {
		index = (arguments[0] == undefined)? 1 : index;
		$.ajax({
			type:"get",
			url:baseUrl + "oss/customer/query/callback",
			async:true,
			data: {token: token, page_num:index},
			success: function (obj) {
				console.log(obj)
				if(obj.code == -999 || obj.code == -27){
					window.location.href = '/customer/login.html';
					return false
				};
				if(obj.code == 100){
					var list = obj.data.list;
					var total = obj.data.total;
					var num = Math.ceil(total/20);
					for(var i=0,lis=''; i<num; i++){
						lis += '<li>'+(i+1)+'</li>';
					}				
					$('.fenye').html(lis);
					$('.fenye>li').click(function(){
						var num = parseInt($(this).html());
						$.callBack(num);
					});
					var callBackTbody = '';
					$.each(list, function(index, array) {
						if(array.named == null) array.named = '';
						if(array.description == null) array.description = '';
						callBackTbody += '<tr id="'
						+array.id+'"><td>'
						+array.phone+'</td><td>'
						+array.named+'</td><td>'
						+array.description+'</td><td>'
						+array.createTime+'</td></tr>'
					});
					$('#callBackTbody').html(callBackTbody)
				}
			}
		});
	}
	$.callBack();
	
	$('#signOut').click(function () {
		$.ajax({
			type:"post",
			url:baseUrl + "customer/logout",
			async:true,
			data: {token:token},
			success: function (obj) {
				if(obj.code == 100){
					window.location.href = '/customer/login.html';
				}
			}
		});
	})
})
