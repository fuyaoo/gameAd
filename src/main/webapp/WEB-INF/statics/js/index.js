$(function(){
	var baseUrl="/";
	var $msg=$('.msg');
	$('.siderbar_option').on('click','li',function(){
		var $this=$(this);
		$this.addClass('active').siblings().removeClass('active');
		// if($this.attr('id')=='operatorRecharge'){$msg.load('operatorRecharge.html');return false}
		// if($this.attr('id')=='operatorRecard'){$msg.load('operatorRecard.html');return false}
		// if($this.attr('id')=='playerRecharge'){$msg.load('playerRecharge.html');return false}
		// if($this.attr('id')=='playerRecard'){$msg.load('playerRecard.html'); return false}
		if($this.attr('id')=='operatorRelation'){$msg.load('operatorRelation.html');return false}
		if($this.attr('id')=='rateStatistics'){$msg.load('rateStatistics.html'); return false}
		if($this.attr('id')=='operatorRate'){$msg.load('operatorRate.html'); return false}
		if($this.attr('id')=='withdrawMoney'){$msg.load('withdrawMoney.html'); return false}
		if($this.attr('id')=='ModifyPassword'){$msg.load('ModifyPassword.html'); return false}
	});
	$('.msg_option ul').on('click','li',function(){
		$(this).addClass('active').siblings().removeClass('active');
	});
	$('.out').click(function(){
		$.ajax({
			type:"post",
			url:baseUrl+"gameAd/logout",
			async:true,
			success:function(data){
					window.location.href="/gameAd/index";
					sessionStorage.setItem("token", 0);
			}
		});
	});
	$('.siderbar_option>li').click(function () {
		$(this).children('ul').slideDown();
		$(this).siblings().children('ul').slideUp();
	})
	$('.ul li').click(function () {
		$(this).addClass('active').siblings('.active').removeClass('active');
		$(this).parent().parent().siblings().find('.active').removeClass('active');
	})

    if(sessionStorage.getItem("token") == 0){
        window.location.href="/gameAd/index";
    }
/************************************************************************************/
});
