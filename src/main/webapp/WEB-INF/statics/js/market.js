var baseUrl="/";
var token="";



$('#data').click(function(){
	$.market_(1);

	$(this).addClass('active').siblings().removeClass('active');
	$('.market>div').eq(0).fadeIn().siblings().hide();
});
$('#user_data').click(function(){

	$.market1_(1);
	console.log($('#startTime').val());
	$(this).addClass('active').siblings().removeClass('active');
	$('.market>div').eq(1).fadeIn().siblings().hide();
});
/*$('.pdan>li').each(function(i){
 $(this).click(function(){
 $(this).addClass('active').siblings().removeClass('active');
 $('.market>div').eq(i).fadeIn().siblings().hide();
 })
 })*/
/**********************一周时间**********************************************/
var mydate=new Date();

var my_year=mydate.getFullYear();

var my_month=mydate.getMonth();
my_month=(parseInt(my_month)+1);
if(my_month<10){my_month="0"+my_month};

var my_day=mydate.getDate();
if(my_day<10){my_day="0"+my_day};

var current_time=my_year+'-'+my_month+'-'+my_day;//得到正确格式的当前时间
console.log(current_time);

var ydate = new Date(mydate.getTime() - 7 * 24 * 3600 * 1000);

var y_year=ydate.getFullYear();

var y_month=ydate.getMonth();
y_month=(parseInt(y_month)+1);
if(y_month<10){y_month="0"+y_month};

var y_day=ydate.getDate();
if(ydate<10){ydate="0"+ydate};

var past_time=y_year+'-'+y_month+'-'+y_day;//得到正确格式的过去一周时间

/****************************落地页数据******************************************************************************/
/*
 * 查询页面数据
 * */
var startTime,endTime,programme,channel,os,pageTitle;
startTime=past_time;
endTime=current_time;
$('#startTime').change(function(){startTime=$(this).val()});
$('#endTime').change(function(){endTime=$(this).val()});
$('#programme').change(function(){programme=$(this).val()});
$('#channel').change(function(){channel=$(this).val()});
$('#os').change(function(){os=$(this).val()});
$('#pageTitle').change(function(){pageTitle=$(this).val()});
/*startTime=$('#startTime').val();
 endTime=$('#endTime').val();
 programme=$('#programme').val();
 channel=$('#channel').val();
 os=$('#os').val();
 pageTitle=$('#pageTitle').val();*/
$('#startTime').val(past_time);
$('#endTime').val(current_time);

/****************************************/
$.market=function(page){
	$.ajax({
		type:"get",
		url:baseUrl+"data/list",
		async:true,
		data:{
			startTime:startTime,
			endTime:endTime,
			programme:programme,
			channel:channel,
			os:os,
			pageTitle:pageTitle,
			token:token,
			page:page,
			size:20
		},
		success:function(obj){
			//console.log(obj);
			if(obj.code == -999) {
				window.location.href = "/admin/index";
				return false;
			}
			if(obj.code==100){
				var tbody='';
				$('.market_tbody').empty();
				var list=obj.data.list;
				var total=obj.data.total_count;
				$('#pv').html(obj.data.pv_total_count);
				$('#uv').html(obj.data.uv_total_count);
				/*
				 * 根据total总数判断有多少个页面
				 */
				var page_nums=Math.ceil(total/20);
				console.log(page_nums);
				for(var i=0,lis='';i<page_nums;i++){
					lis+='<li>'+(i+1)+'</li>';
				}
				$('.fenye').html(lis);
				$('.fenye>li').eq(page-1).addClass('active');
				$('.fenye>li').click(function(){
					var nums=parseInt($(this).html());
					$.market(nums);
					$(this).addClass('active').siblings().removeClass('active');
				});
				/**********************************/
				$.each(list,function(index,array){
					var count=parseInt(index)+1;
					tbody+='<tr><td>'
							+count+
							'</td><td>'
							+array.create_time+
							'</td><td>'
							+array.programme+
							'</td><td>'
							+array.page_title+
							'</td><td>'
							+array.url+
							'</td><td>'
							+array.channel+
							'</td><td>'
							+array.os+
							'</td><td>'
							+array.stay_time+
							'</td><td>'
							+array.timing+
							'</td><td>'
							+array.pv_count+
							'</td><td>'
							+array.uv_count+'</td></tr>';

				});
				$('.market_tbody').html(tbody);
				tbody=tbody.replace('undefined','');
			}
		}
	});
}

$('.market_btn1').click(function(e){
	e.preventDefault();
	$.market(1);
})

/*
 5-4加值
 * */
/*$('#startTime').val(past_time);
 $('#endTime').val(current_time);*/


/**********************页面加载，得到一周内的信息**********************************************/

$.market_=function(page){
	$.ajax({
		type:"get",
		url:baseUrl+"data/list",
		async:true,
		data:{
			startTime:startTime,
			endTime:endTime,
			programme:programme,
			channel:channel,
			os:os,
			pageTitle:pageTitle,
			token:token,
			page:page,
			size:20
		},
		success:function(obj){
			//console.log(obj);
			if(obj.code == -999) {
				window.location.href = "/admin/index";
				return false;
			}
			if(obj.code==100){
				var tbody='';
				$('.market_tbody').empty();
				var list=obj.data.list;
				var total=obj.data.total_count;
				$('#pv').html(obj.data.pv_total_count);
				$('#uv').html(obj.data.uv_total_count);
				/*
				 * 根据total总数判断有多少个页面
				 */
				var page_nums=Math.ceil(total/20);
				console.log(page_nums);
				for(var i=0,lis='';i<page_nums;i++){
					lis+='<li>'+(i+1)+'</li>';
				}
				$('.fenye').html(lis);
				$('.fenye>li').eq(page-1).addClass('active');
				$('.fenye>li').click(function(){
					var nums=parseInt($(this).html());
					$.market_(nums);
					$(this).addClass('active').siblings().removeClass('active');
				});

				/**********************************/
				$.each(list,function(index,array){

					var count=parseInt(index)+1;
					tbody+='<tr><td>'
							+count+
							'</td><td>'
							+array.create_time+
							'</td><td>'
							+array.programme+
							'</td><td>'
							+array.page_title+
							'</td><td>'
							+array.url+
							'</td><td>'
							+array.channel+
							'</td><td>'
							+array.os+
							'</td><td>'
							+array.stay_time+
							'</td><td>'
							+array.timing+
							'</td><td>'
							+array.pv_count+
							'</td><td>'
							+array.uv_count+'</td></tr>';

				});
				tbody=tbody.replace('undefined','');
				$('.market_tbody').html(tbody);

			}
		}
	});
}
//页面加载数据
$.market_(1);
console.log(startTime);
console.log(endTime);
/***********************************用户转换数据***************************************************************************/
/*
 * 查询页面数据
 * */
var startTime1,endTime1,channel1;
startTime1=past_time;
endTime1=current_time;
$('#startTime1').change(function(){startTime1=$(this).val()});
$('#endTime1').change(function(){endTime1=$(this).val()});
$('#channel1').change(function(){channel1=$(this).val();console.log(channel1)});

$('#startTime1').val(past_time);
$('#endTime1').val(current_time);

$.market1=function(page){
	$.ajax({
		type:"get",
		url:baseUrl+"data/datalist",
		async:true,
		data:{
			startTime:startTime1,
			endTime:endTime1,
			channel:channel1,
			token:token,
			page:page,
			size:20
		},
		success:function(obj){
			//console.log(obj);
			if(obj.code == -999) {
				window.location.href = "/admin/index";
				return false;
			}
			if(obj.code==100){
				var tbody='';
				$('.market_tbody').empty();
				var list=obj.data.list;
				var total=obj.data.total_count;
				$('#pv1').html(obj.data.pv_total_count);
				$('#uv1').html(obj.data.uv_total_count);
				$('#code').html(obj.data.code_total_number);
				$('#login').html(obj.data.user_total_type);
				/*
				 * 根据total总数判断有多少个页面
				 */
				var page_nums=Math.ceil(total/20);
				console.log(page_nums);
				for(var i=0,lis='';i<page_nums;i++){
					lis+='<li>'+(i+1)+'</li>';
				}
				$('.fenye').html(lis);
				$('.fenye>li').eq(0).addClass('active');
				$('.fenye>li').click(function(){
					var nums=parseInt($(this).html());
					$.market1(nums);
					$(this).addClass('active').siblings().removeClass('active');
				});

				/**********************************/
				$.each(list,function(index,array){

					var count=parseInt(index)+1;
					tbody+='<tr><td>'
							+count+
							'</td><td>'
							+array.create_time+
							'</td><td>'
							+array.channel+
							'</td><td>'
							+array.pv_count+
							'</td><td>'
							+array.uv_count+
							'</td><td>'
							+array.code_number+
							'</td><td>'
							+array.user_type+'</td></tr>';

				});
				tbody=tbody.replace('undefined','');
				$('.market_tbody').html(tbody);

			}
		}

	});
}
$('.market_btn2').click(function(e){
	e.preventDefault();
	$.market1(1);
})
/***************加载页面 得到一周的信息*****************************************************************************/

$.market1_=function(page){
	$.ajax({
		type:"get",
		url:baseUrl+"data/datalist",
		async:true,
		data:{
			startTime:startTime1,
			endTime:endTime1,
			channel:channel1,
			token:token,
			page:page,
			size:20
		},
		success:function(obj){
			//console.log(obj);
			if(obj.code == -999) {
				window.location.href = "/admin/index";
				return false;
			}
			if(obj.code==100){
				var tbody='';
				$('.market_tbody').empty();
				var list=obj.data.list;
				var total=obj.data.total_count;
				$('#pv1').html(obj.data.pv_total_count);
				$('#uv1').html(obj.data.uv_total_count);
				$('#code').html(obj.data.code_total_number);
				$('#login').html(obj.data.user_total_type);
				/*
				 * 根据total总数判断有多少个页面
				 */
				var page_nums=Math.ceil(total/20);
				console.log(page_nums);
				for(var i=0,lis='';i<page_nums;i++){
					lis+='<li>'+(i+1)+'</li>';
				}
				$('.fenye').html(lis);
				$('.fenye>li').eq(0).addClass('active');
				$('.fenye>li').click(function(){
					var nums=parseInt($(this).html());
					$.market1(nums);
					$(this).addClass('active').siblings().removeClass('active');
				});

				/**********************************/
				$.each(list,function(index,array){
					var count=parseInt(index)+1;
					tbody+='<tr><td>'
							+count+
							'</td><td>'
							+array.create_time+
							'</td><td>'
							+array.channel+
							'</td><td>'
							+array.pv_count+
							'</td><td>'
							+array.uv_count+
							'</td><td>'
							+array.code_number+
							'</td><td>'
							+array.user_type+'</td></tr>';

				});
				tbody=tbody.replace('undefined','');
				$('.market_tbody').html(tbody);

			}
		}
	});
}
		
	