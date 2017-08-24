
$(function(){
    var baseUrl="/";
    var token=sessionStorage.getItem("token");

    $("#startTime").jeDate({
        isinitVal:false,
        festival:true,
        ishmsVal:false,
        //minDate: $.nowDate(0),
        maxDate: $.nowDate(0),
        format:"YYYY-MM-DD hh:mm:ss",
        zIndex:3000,

    }) ;
    $("#endTime").jeDate({
        isinitVal:false,
        festival:true,
        ishmsVal:false,
        //minDate: $.nowDate(0),
        maxDate: $.nowDate(0),
        format:"YYYY-MM-DD hh:mm:ss",
        zIndex:3000,

    }) ;

   	$('#select').click(function () {
		var brokerUsername = $('#brokerUsername').val();
        var brokerNickname = $('#brokerNickname').val();
        var status = $('#status').val();
        var startTime = $('#startTime').val();
        var endTime = $('#endTime').val();
        $.tixianLog(1,brokerUsername,brokerNickname,status,startTime,endTime);
    });
    $.tixianLog=function(page,brokerUsername,brokerNickname,status,startTime,endTime){
    	$.ajax({
        type:"get",
        url:baseUrl+"oss/broker/back/tixianLog",
        async:true,
        data:{
        	page_num:page,
            brokerUsername:brokerUsername,
            brokerNickname:brokerNickname,
            status:status,
            startTime:startTime,
            endTime:endTime,
            token:token
		},
        success:function(obj){
            if(obj.code == -999) {
                window.location.href = "/admin/index";
                return false;
            }
            if(obj.code=="100"){
                var tbody='';
                $('.tixian_body').empty();
                var list=obj.data.list;
                var total=obj.data.count;
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
                    $.tixianLog(nums,brokerUsername,brokerNickname,status,startTime,endTime);
                    $(this).addClass('active').siblings().removeClass('active');
                });
				/**********************************/
                $.each(list,function(index,array){
                    // var span = '<span class="statement_view" style="cursor:pointer;color: green">报表</span>&nbsp;|&nbsp;' +
                    //     '<span class="peizhi_view" style="cursor:pointer;color: rebeccapurple">配置</span>';
                    var count=parseInt(index)+1;
                	//佣金收入
                    var commissionIncome = array.agentCommission * (array.feesAccountedFor/100);
                    tbody+='<tr id="'
                        +array.id+'"><td style="width: 5%">'
                        +count+
                        '</td><td style="width: 10%">'
                        +array.userName+
                        '</td><td style="width: 6%">'
                        +array.uid+
                        '</td><td style="width: 7%">'
                        +array.tixianCome+
                        '</td><td style="width: 7%">'
                        // +array.status+
                        +'成功'+
                        '</td><td style="width: 10%">'
                        +array.tixianDate+
                        '</td><td style="width: 10%">'
                        +'</td></tr>';

                });
                $('.tixian_body').html(tbody);
                tbody=tbody.replace('undefined','');
            }
        }
    })};
    $.tixianLog(1,'','','','','');
});