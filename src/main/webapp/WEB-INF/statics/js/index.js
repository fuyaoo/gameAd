$(function(){
	var baseUrl="/";
	var $msg=$('.msg');
	$('.siderbar_option').on('click','li',function(){
		var $this=$(this);
		$this.addClass('active').siblings().removeClass('active');
		if($this.attr('id')=='banner'){$msg.load('banner.html');return false}
		if($this.attr('id')=='finance'){$msg.load('finance.html');return false}
		if($this.attr('id')=='news'){$msg.load('news.html');return false}
		if($this.attr('id')=='notice'){$msg.load('notice.html'); return false}
		if($this.attr('id')=='push'){$msg.load('push.html');return false}
		if($this.attr('id')=='make'){$msg.load('make.html'); return false}
		if($this.attr('id')=='market'){$msg.load('market.html'); return false}
		if($this.attr('id')=='imglist'){$msg.load('imglist.html'); return false}
		if($this.attr('id')=='data'){$msg.load('data.html'); return false}
		if($this.attr('id')=='etf'){$msg.load('etf.html'); return false}
		if($this.attr('id')=='app'){$msg.load('app.html'); return false}
		if($this.attr('id')=='Edition'){$msg.load('edition.html'); return false}
		if($this.attr('id')=='recording'){$msg.load('recording.html'); return false}
		if($this.attr('id')=='speaker'){$msg.load('speaker.html'); return false}
		if($this.attr('id')=='agent'){$msg.load('agent.html'); return false}
        if($this.attr('id')=='statement'){$msg.load('statement.html'); return false}
        if($this.attr('id')=='tixian'){$msg.load('tixian.html'); return false}
        if($this.attr('id')=='settingfile'){$msg.load('settingfile.html'); return false}
		if($this.attr('id')=='live'){$msg.load('live.html'); return false}
		if($this.attr('id')=='userquery'){$msg.load('userquery.html'); return false}
		if($this.attr('id')=='userconfig'){$msg.load('userconfig.html'); return false}
		if($this.attr('id')=='channel'){$msg.load('channel.html'); return false}
	});
	$('.msg_option ul').on('click','li',function(){
		$(this).addClass('active').siblings().removeClass('active');
	});
	$

	$('.out').click(function(){
		$.ajax({
			type:"post",
			url:baseUrl+"oss/user/logout",
			async:true,
			success:function(data){
					window.location.href="/admin/index.html";
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

    sessionStorage.setItem("brokerUsername", "");
    sessionStorage.setItem("brokerNickname", "");
    sessionStorage.setItem("uid", "");
    sessionStorage.setItem("team", "");
    sessionStorage.setItem("startTime", "");
    sessionStorage.setItem("endTime", "");
/************************************************************************************/
});
