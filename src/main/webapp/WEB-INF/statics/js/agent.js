
$(function(){
    var baseUrl="/";
    var token=sessionStorage.getItem("token");
    var brokerUsername = '';
    var brokerNickname = '';
    var brokeId = '';
    var team = '';
    var type1xu = 1;
    var type2xu = 1;
    var type3xu = 1;
    $('#select').click(function () {
        brokerUsername = $('#brokerUsername').val();
        brokerNickname = $('#brokerNickname').val();
        //brokeId = $('#brokeId').val();
        team = $('#team').val();
        type1xu = 1;
        type2xu = 1;
        type3xu = 1;
        $.agent(1,brokerUsername,brokerNickname,'',3,1,team);
    });
    $('.type1').click(function () {
        if(type1xu == 1){
            type1xu = 2;
        }else {
            type1xu = 1;
        }
        $.agent(1,'','','',1,type1xu,'');
    });
    $('.type2').click(function () {
        if(type2xu == 1){
            type2xu = 2;
        }else {
            type2xu = 1;
        }
        $.agent(1,'','','',2,type2xu,'');
    });
    $('.type3').click(function () {
        if(type3xu == 1){
            type3xu = 2;
        }else {
            type3xu = 1;
        }
        $.agent(1,'','','',3,type3xu,'');
    });
    /**
    $.selectOption = function () {
        $.ajax({
            type: "GET",
            url: baseUrl+"oss/broker/back/AllBroker",
            async: true,
            data: {
                token:token
            },
            success: function(obj){
                console.log(obj);
                if( obj.code == -999){
                    window.location.href = '/admin/index';
                    return false
                };
                if( obj.code == 100){
                    var brokerUsername='<option value="">请选择</option>';
                    // var brokerNickname='<option value="">请选择</option>';
                    // var brokeId='<option value="">请选择</option>';
                    var list=obj.data;
                    $.each(list,function(index,array){
                        brokerUsername+='<option value="'+array.userName+'">'+array.userName+'</option>';
                        // brokerNickname+='<option value="'+array.nickName+'">'+array.nickName+'</option>';
                        // brokeId+='<option value="'+array.uid+'">'+array.uid+'</option>';
                    });
                    $('#brokerUsername').html(brokerUsername);
                    // $('#brokerNickname').html(brokerNickname);
                    // $('#brokeId').html(brokeId);
                }
                $('#brokerUsername').change(function () {
                    $.ajax({
                        type: "GET",
                        url: baseUrl + "oss/broker/back/OneBroker",
                        async: true,
                        data: {
                            brokerUsername: $('#brokerUsername').val(),
                            token: token
                        },
                        success: function (obj) {
                            if (obj.code == 100) {
                                var brokerNickname = '<option value="">请选择</option>';
                                var brokeId = '<option value="">请选择</option>';
                                var user = obj.data;
                                $('#brokerNickname').html(brokerNickname + '<option value="' + user.nickName + '">' + user.nickName + '</option>');
                                $('#brokeId').html(brokeId + '<option value="' + user.uid + '">' + user.uid + '</option>');
                            }
                        }
                    })
                });
            }
        });
    };
     **/
    // $.selectOption();
    $.agent=function(page,brokerUsername,brokerNickname,brokeId,type,xu,team){
        $.ajax({
            type:"get",
            url:baseUrl+"oss/broker/back/query",
            async:true,
            data:{
                page_num:page,
                brokerUsername:brokerUsername,
                brokerNickname:brokerNickname,
                brokeId:brokeId,
                type:type,
                xu:xu,
                team:team,
                token:token
            },
            success:function(obj){
                if(obj.code == -999) {
                    window.location.href = "/admin/index";
                    return false;
                }
                if(obj.code=="100"){
                    var tbody='';
                    $('.agent_body').empty();
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
                        $.agent(nums,brokerUsername,brokerNickname,'',3,1,team);
                        $(this).addClass('active').siblings().removeClass('active');
                    });
					/**********************************/
                    $.each(list,function(index,array){
                        var count=parseInt(index)+1;
                        var span = '<span class="statement_view" style="cursor:pointer;color: green">报表</span>&nbsp;|&nbsp;' +
							'<span class="peizhi_view" style="cursor:pointer;color: rebeccapurple">配置</span>';

                        tbody+='<tr id="'
                            +array.id+'"><td style="width: 4%">'
                            +count+
                            '</td><td style="width: 8%">'
                            // +array.portrait+				//头像
							+'<img style="width:80px;height:80px;border-radius: 80px;" src="'+array.portrait+'">'+
                            '</td><td style="width: 12%">'
                            +array.userName+
                            '</td><td style="width: 8%">'
                            +array.compellation+
                            '</td><td style="width: 7%">'
                            +array.uid+
                            '</td><td style="width: 5%">'
                            +(array.grade == null?'--':array.grade)+
                            '</td><td style="width: 7%">'
                            +(array.clientNumber == null?'--':array.clientNumber)+
                            '</td><td style="width: 8%">'
                            +(array.totalIncome == null?'--':array.totalIncome)+
                            '</td><td style="width: 8%">'
                            +(array.brokerageBalance == null?'--':array.brokerageBalance)+
                            '</td><td style="width: 5%">'
                            +(array.revenueRanking == null?'--':array.revenueRanking)+
                            '</td><td style="width: 5%">'
                            // +array.placeSquadron+			//所在战队
							+'--'+
                            '</td><td style="width: 12%">'
                            +array.loginTime+
                            '</td><td>'+span+'</td></tr>';

                    });
                    $('.agent_body').html(tbody);
                    tbody=tbody.replace('undefined','');
                    $('.peizhi_view').click(function(){
                        var id = $(this).parent().parent().attr('id');
                        $.ajax({
                            type: "GET",
                            url: baseUrl+"oss/broker/back/edit",
                            async: true,
                            data: {
                            	id:id,
                                token:token
							},
                            success: function(obj){
                                console.log(obj);
                                if( obj.code == -999){
                                    window.location.href = '/admin/index';
                                    return false
                                };
                                if( obj.code == 100){
                                    var tabBrokerInfo=obj.data;
                                    var depositBank = 0;
                                    if(tabBrokerInfo.openBank != null){
                                        if(tabBrokerInfo.openBank == '中国工商银行'){
                                            depositBank = 1;
                                        }else if(tabBrokerInfo.openBank == '华夏银行'){
                                            depositBank = 2;
                                        }else if(tabBrokerInfo.openBank == '中国农业银行'){
                                            depositBank = 3;
                                        }else if(tabBrokerInfo.openBank == '中国邮政储蓄银行'){
                                            depositBank = 4;
                                        }else if(tabBrokerInfo.openBank == '中国银行'){
                                            depositBank = 5;
                                        }else if(tabBrokerInfo.openBank == '交通银行'){
                                            depositBank = 6;
                                        }else if(tabBrokerInfo.openBank == '招商银行'){
                                            depositBank = 7;
                                        }else if(tabBrokerInfo.openBank == '中信银行'){
                                            depositBank = 8;
                                        }else if(tabBrokerInfo.openBank == '中国光大银行'){
                                            depositBank = 9;
                                        }else if(tabBrokerInfo.openBank == '中国民生银行'){
                                            depositBank = 10;
                                        }else if(tabBrokerInfo.openBank == '中国建设银行'){
                                            depositBank = 11;
                                        }
                                    }
                                    $('#r_id').val(id);
                                    $('#r_token').val(token);
                                    $('#r_nickName').val(tabBrokerInfo.compellation);
                                    $('#r_identityMark').val(tabBrokerInfo.identityMark);
                                    $('#r_userName').val(tabBrokerInfo.userName);
                                    $('#r_mail').val(tabBrokerInfo.mail);
                                    $('#r_brokerPassword').val(tabBrokerInfo.brokerPwd);
                                    $('#r_businessManager').val(tabBrokerInfo.businessManager);
                                    $('#r_status').val(tabBrokerInfo.status);
                                    $('#r_depositBank').val(depositBank);
                                    $('#r_bankMark').val(tabBrokerInfo.bankMark);
                                    $('#r_brokerageRate').val(tabBrokerInfo.brokerageRate);
                                    $('#body').hide();
                                    $('#config').show();
                                }
                            }
                        });
                    })
                    $('.statement_view').click(function(){
                        var username = $(this).parent().parent().children('td').eq(2).text();
                        var nickname = $(this).parent().parent().children('td').eq(3).text();
                        var uid = $(this).parent().parent().children('td').eq(4).text();
                        var team = $(this).parent().parent().children('td').eq(10).text();
                        $('#statement').addClass('active').siblings().removeClass('active');
                        $('.msg').load('statement.html');
                        var myDate = new Date();
                        myDate.setMonth(myDate.getMonth() -1);
                        var endTime = Format(myDate,"yyyy-MM");
                        myDate.setMonth(myDate.getMonth() -5);
                        var startTime = Format(myDate,"yyyy-MM");
                        sessionStorage.setItem("brokerUsername", username);
                        sessionStorage.setItem("brokerNickname", nickname);
                        sessionStorage.setItem("brokeId", uid);
                        sessionStorage.setItem("team", team);
                        sessionStorage.setItem("startTime", startTime);
                        sessionStorage.setItem("endTime", endTime);
                        // getTime();
                        // $.statement(1,username,nickname,uid,"",startTime);
                    })
                }
            }
        })};
    $('#create').click(function(){
        var trainAccount = $('#trainAccount').val();
        var nickName = $('#nickName').val();
        var userName = $('#userName').val();
        var identityMark = $('#identityMark').val();
        var brokerPassword = $('#brokerPassword').val();
        var depositBank = $('#depositBank').val();
        var businessManager = $('#businessManager').val();
        var bankMark = $('#bankMark').val();
        var brokerageRate = $('#brokerageRate').val();
        if(trainAccount == ''){
            $('.info').html("*请输入培训账号");
            return false;
        }
        if(nickName == ''){
            $('.info').html("*请输入经纪人姓名");
            return false;
        }
        if(userName == ''){
            $('.info').html("*请输入电话号码");
            return false;
        }
        if(identityMark == ''){
            $('.info').html("*请输入身份证号");
            return false;
        }
        if(brokerPassword == ''){
            $('.info').html("*请输入经纪人密码");
            return false;
        }
        if(depositBank == ''){
            $('.info').html("*请选择开户银行");
            return false;
        }
        if(businessManager == ''){
            $('.info').html("*请选择商务经理");
            return false;
        }
        if(bankMark == ''){
            $('.info').html("*请输入银行卡号");
            return false;
        }
        if(brokerageRate == ''){
            $('.info').html("*请输入佣金率");
            return false;
        }
        $.ajax({
            type: "post",
            url: baseUrl+ "oss/broker/back/save",
            async: true,
            data: {
                trainAccount:trainAccount,
                nickName:nickName,
                userName:userName,
                identityMark:identityMark,
                brokerPassword:brokerPassword,
                depositBank:depositBank,
                businessManager:businessManager,
                bankMark:bankMark,
                brokerageRate:brokerageRate,
                token:token
            },
            success: function(obj){
                console.log(obj);
                if( obj.code == -999){
                    window.location.href = '/admin/index';
                    return false
                };
                if( obj.code == 100){
                    $('#createBroker').resetForm();
                    $.agent(1,'','','',3,1,'');
                }
            }
        });
    });
    $('#toUpye').click(function () {
        $('#config').hide();
        $('#body').show();
    });
    $('#toUpdate').click(function () {
        var r_id = $('#r_id').val();
        var r_nickName = $('#r_nickName').val();
        var r_identityMark =  $('#r_identityMark').val();
        var r_userName =  $('#r_userName').val();
        var r_mail =  $('#r_mail').val();
        var r_brokerPassword =  $('#r_brokerPassword').val();
        var r_businessManager =  $('#r_businessManager').val();
        var r_status =  $('#r_status').val();
        var r_depositBank =  $('#r_depositBank').val();
        var r_bankMark =  $('#r_bankMark').val();
        var r_brokerageRate =  $('#r_brokerageRate').val();
		$.ajax({
            type: "post",
			url: baseUrl+"oss/broker/back/update",
			async: true,
			data: {
				r_id:r_id,
				r_nickName:r_nickName,
				r_identityMark:r_identityMark,
				r_userName:r_userName,
				r_mail:r_mail,
				r_brokerPassword:r_brokerPassword,
				r_businessManager:r_businessManager,
				r_status:r_status,
				r_depositBank:r_depositBank,
				r_bankMark:r_bankMark,
                r_brokerageRate:r_brokerageRate,
				token:token
			},
			success: function(obj){
				console.log(obj);
				if( obj.code == -999){
					window.location.href = '/admin/index';
					return false
				};
				if( obj.code == 100){
					$('#config').hide();
					$('#body').show();
                    $.agent(1,'','','',3,1,'');
				}
			}
		});
    });
    $.agent(1,'','','',3,1,'');
    $('#toggle').click(function () {
        $('#suibian').toggle();
    })
    function Format(now,mask)
    {
        var d = now;
        var zeroize = function (value, length)
        {
            if (!length) length = 2;
            value = String(value);
            for (var i = 0, zeros = ''; i < (length - value.length); i++)
            {
                zeros += '0';
            }
            return zeros + value;
        };

        return mask.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g, function ($0)
        {
            switch ($0)
            {
                case 'd': return d.getDate();
                case 'dd': return zeroize(d.getDate());
                case 'ddd': return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][d.getDay()];
                case 'dddd': return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getDay()];
                case 'M': return d.getMonth() + 1;
                case 'MM': return zeroize(d.getMonth() + 1);
                case 'MMM': return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()];
                case 'MMMM': return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][d.getMonth()];
                case 'yy': return String(d.getFullYear()).substr(2);
                case 'yyyy': return d.getFullYear();
                case 'h': return d.getHours() % 12 || 12;
                case 'hh': return zeroize(d.getHours() % 12 || 12);
                case 'H': return d.getHours();
                case 'HH': return zeroize(d.getHours());
                case 'm': return d.getMinutes();
                case 'mm': return zeroize(d.getMinutes());
                case 's': return d.getSeconds();
                case 'ss': return zeroize(d.getSeconds());
                case 'l': return zeroize(d.getMilliseconds(), 3);
                case 'L': var m = d.getMilliseconds();
                    if (m > 99) m = Math.round(m / 10);
                    return zeroize(m);
                case 'tt': return d.getHours() < 12 ? 'am' : 'pm';
                case 'TT': return d.getHours() < 12 ? 'AM' : 'PM';
                case 'Z': return d.toUTCString().match(/[A-Z]+$/);
                // Return quoted strings with the surrounding quotes removed
                default: return $0.substr(1, $0.length - 2);
            }
        });
    };
});