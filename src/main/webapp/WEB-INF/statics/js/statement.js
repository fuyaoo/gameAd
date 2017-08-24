
$(function(){
    var baseUrl="/";
    var token=sessionStorage.getItem("token");
    var startTime = sessionStorage.getItem("startTime");
    var endTime = sessionStorage.getItem("endTime");
    var brokerUsername = sessionStorage.getItem("brokerUsername");
    var brokerNickname = sessionStorage.getItem("brokerNickname");
    var brokeId = sessionStorage.getItem("brokeId");
    var team = sessionStorage.getItem("team");
    var arrayObj = new Array();
    $("#startTime").jeDate({
        isinitVal:false,
        festival:true,
        ishmsVal:false,
        //minDate: $.nowDate(0),
        maxDate: $.nowDate({MM:'-1'}),
        format:"YYYY-MM",
        zIndex:3000,
        choosefun:function(elem, val, date) {
            startTime = val;
        },
    }) ;
    $("#endTime").jeDate({
        isinitVal:false,
        festival:true,
        ishmsVal:false,
        //minDate: $.nowDate(0),
        maxDate: $.nowDate({MM:'-1'}),
        format:"YYYY-MM",
        zIndex:3000,
        choosefun:function(elem, val, date) {
            endTime = val;
        },
    }) ;
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
    $.selectOption();
   	$('#select').click(function () {
        getTime();
		brokerUsername = $('#brokerUsername').val();
        brokerNickname = $('#brokerNickname').val();
        brokeId = $('#brokeId').val();
        getHighcharts(brokerUsername,brokerNickname,brokeId,startTime,endTime);
        team = $('#team').val();
        // var startTime = $('#startTime').val();
        // var endTime = $('#endTime').val();
        var dateTime = startTime;
        $.statement(1,brokerUsername,brokerNickname,brokeId,team,dateTime);
    });
    $.statement=function(page,brokerUsername,brokerNickname,brokeId,team,dateTime){
    	$.ajax({
        type:"get",
        url:baseUrl+"oss/broker/back/report/list",
        async:true,
        data:{
        	page_num:page,
            brokerUsername:brokerUsername,
            brokerNickname:brokerNickname,
            brokeId:brokeId,
            team:team,
            dateTime:dateTime,
            token:token
		},
        success:function(obj){
            if(obj.code == -999) {
                window.location.href = "/admin/index";
                return false;
            }
            if(obj.code=="100"){
                var tbody='';
                $('.statement_body').empty();
                $('#monthCome').empty();
                var list=obj.data.list;
                var total=obj.data.count;
                var monthCome=obj.data.monthCome == null?0.00:obj.data.monthCome;
                var brokerName = obj.data.brokerName;
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
                    $.statement(nums,brokerUsername,brokerNickname,brokeId,startTime,endTime,dateTime);
                    $(this).addClass('active').siblings().removeClass('active');
                });
				/**********************************/
                $.each(list,function(index,array){
                    var count=parseInt(index)+1;

                    tbody+='<tr id="'
                        +array.id+'"><td style="width: 5%">'
                        +count+
                        '</td><td style="width: 10%">'
                        +array.customerNumber+
                        '</td><td style="width: 6%">'
                        +array.customerName+
                        '</td><td style="width: 7%">'
                        +array.accountType+
                        '</td><td style="width: 7%">'
                        +array.brokerName+
                        '</td><td style="width: 10%">'
                        +array.exchangeFees+
                        '</td><td style="width: 10%">'
                        +array.agentCommission+
                        '</td><td style="width: 8%">'
                        +array.feesAccountedFor+
                        '</td><td style="width: 10%">'
                        +array.detailCome+					//佣金收入(元)
                        '</td></tr>';

                });
                $('.statement_body').html(tbody);
                $('#monthCome').html(dateTime+' | '+brokerName+' | 当期总收入：'+monthCome+'元');
                tbody=tbody.replace('undefined','');
            }
        }
    })};
    function getTime () {
        $('.timesuibian').html('');
        arrayObj.splice(0,arrayObj.length);
        /**
		 * 初始化
         * @type {number}
         */
        var k = 0;
        var i = 0;
        var j = 0; //最大为9
        var startYear = startTime.split('-')[0];
        var endYear = endTime.split('-')[0];
        var startMonth = startTime.split('-')[1];
        startMonth = Math.floor(startMonth);
        startYear = Math.floor(startYear);
        var endMonth = endTime.split('-')[1];
        endMonth = Math.floor(endMonth);
        console.log(startYear);
        console.log(endYear);
        var time = ''
        if (startYear == endYear) {
            for(var i=startMonth;i<endMonth + 1; i++){
            	var yue;
            	if(i < 10){
                    yue = '0'+i;
				}else {
                    yue = i;
				}
                time += '<li>'+startYear + '-'+yue+'</li>'
                arrayObj.push(startYear + '-'+yue);
            };
        } else {
            var num = endYear - startYear;
            for (var i=0; i<num; i++){
                for (var j=startMonth; j<13; j++){
                    var yue;
                    if(j < 10){
                        yue = '0'+j;
                    }else {
                        yue = j;
                    }
                    time += '<li>'+(startYear+i) + '-'+yue+'</li>'
                    arrayObj.push(startYear+i + '-'+yue);
                }
            };
            for(var k=1; k<endMonth + 1; k++){
                var yue;
                if(k < 10){
                    yue = '0'+k;
                }else {
                    yue = k;
                }
                time += '<li>'+endYear + '-'+yue+'</li>'
                arrayObj.push(endYear + '-'+yue);
            }
        }
        console.log(time)
        $('.timesuibian').html(time);
        $('.timesuibian li').eq(0).addClass('active');
        $('.timesuibian li').click(function () {
            $(this).addClass('active').siblings('.active').removeClass('active');
            var dateTime = $('.timesuibian .active').text();
            $.statement(1,brokerUsername,brokerNickname,brokeId,team,dateTime);
        });
    };
    /**
     * 按条件显示曲线图
     * @param brokerUsername
     * @param brokerNickname
     * @param brokeId
     * @param startTime
     * @param endTime
     */
    function getHighcharts(brokerUsername,brokerNickname,brokeId,startTime,endTime){
        //nickname,brokerIncome,avgIncome
        var nickname = brokerNickname;
        var brokerIncome = new Array(arrayObj.length);
        var avgIncome = new Array(arrayObj.length);
        for (var i=0; i<arrayObj.length; i++){
            brokerIncome[i] = 0;
            avgIncome[i] = 0;
        };
        var title = {
            text: '佣金收入趋势'
        };
        var xAxis = {
            categories: arrayObj
        };
        var yAxis = {
            title: {
                text: '每月佣金收入（元）'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        };

        var tooltip = {
            valueSuffix: '（元）'
        }

        var legend = {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        };
        $.ajax({
            type: "GET",
            url: baseUrl+"oss/broker/back/getHighcharts",
            async: true,
            data: {
                brokerUsername:brokerUsername,
                brokerNickname:brokerNickname,
                brokeId:brokeId,
                startTime:startTime,
                endTime:endTime,
                token:token
            },
            success: function(obj){
                console.log(obj);
                if( obj.code == -999){
                    window.location.href = '/admin/index';
                    return false
                };
                if( obj.code == 100){
                    var broker = obj.data.broker;
                    nickname = broker.nickName;
                    var brokerIncomes = obj.data.brokerIncomes;
                    var avgIncomes = obj.data.avgIncomes;
                    if(brokerIncomes != null){
                        for (var i=0; i<brokerIncomes.length; i++){
                            if(arrayObj.indexOf(brokerIncomes[i].broker_date) != -1){
                                var index = arrayObj.indexOf(brokerIncomes[i].broker_date);
                                brokerIncome[index] = brokerIncomes[i].income;
                            }
                        };
                    }
                    if(avgIncomes != null){
                        for (var j=0; j<avgIncomes.length; j++){
                            if(arrayObj.indexOf(avgIncomes[j].broker_date) != -1){
                                var index = arrayObj.indexOf(avgIncomes[j].broker_date);
                                avgIncome[index] = avgIncomes[j].income;
                            }
                        };
                    }
                    var series =  [
                        {
                            name: nickname,
                            data: brokerIncome
                        },
                        {
                            name: '平均收入',
                            data: avgIncome
                        }
                    ];
                    var json = {};

                    json.title = title;
                    json.xAxis = xAxis;
                    json.yAxis = yAxis;
                    json.tooltip = tooltip;
                    json.legend = legend;
                    json.series = series;
                    json.credits = '{ enabled: false }';
                    $('#container').css('width: 80%; height: 400px; margin: 0 auto');
                    $('#container').highcharts(json);
                }
            }
        });
    }

    var k = 0;
    var i = 0;
    var j = 0; //最大为9
    $('#left').click(function () {
        if (i == 0) {
           return;
        }
        if (j>0 && j<=8) {
            j--;
            $('.timesuibian li').eq(--i).addClass('active').siblings('.active').removeClass('active');
        }else if(i < $('.timesuibian li').length -1){
            k = k + 84.33;
            $('.timesuibian li').eq(--i).addClass('active').siblings('.active').removeClass('active');
            $('.timesuibian').css('left',k + 'px');
		}
        var dateTime = $('.timesuibian .active').text();
        $.statement(1,brokerUsername,brokerNickname,brokeId,team,dateTime);
    });
    $('#right').click(function () {
    	if(i == $('.timesuibian li').length -1){
    		return;
		}
        if (j < 8) {
        	j++;
            $('.timesuibian li').eq(++i).addClass('active').siblings('.active').removeClass('active');
        } else if(i < $('.timesuibian li').length -1){
			k = k - 84.33;
			$('.timesuibian li').eq(++i).addClass('active').siblings('.active').removeClass('active');
			$('.timesuibian').css('left',k + 'px');
        }
        var dateTime = $('.timesuibian .active').text();
        $.statement(1,brokerUsername,brokerNickname,brokeId,team,dateTime);
    });

    if((sessionStorage.getItem("startTime") != null && sessionStorage.getItem("startTime") != '') &&
       (sessionStorage.getItem("endTime") != null && sessionStorage.getItem("endTime") != '') &&
       (sessionStorage.getItem("brokerUsername") != null && sessionStorage.getItem("brokerUsername") != '') &&
       (sessionStorage.getItem("brokerNickname") != null && sessionStorage.getItem("brokerNickname") != '') &&
       (sessionStorage.getItem("brokeId") != null && sessionStorage.getItem("brokeId") != '')){
        getTime();
        $('#brokerUsername').val(brokerUsername);
        $("#brokerUsername").find("option[value='"+brokerUsername+"']").attr("selected",true);
        $('#startTime').val(startTime);
        $('#endTime').val(endTime);
        var dateTime = startTime;
        getHighcharts(brokerUsername,brokerNickname,brokeId,startTime,endTime);
        $.statement(1,brokerUsername,brokerNickname,brokeId,team,dateTime);
        sessionStorage.setItem("brokerUsername", "");
        sessionStorage.setItem("brokerNickname", "");
        sessionStorage.setItem("brokeId", "");
        sessionStorage.setItem("team", "");
        sessionStorage.setItem("startTime", "");
        sessionStorage.setItem("endTime", "");
    }
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