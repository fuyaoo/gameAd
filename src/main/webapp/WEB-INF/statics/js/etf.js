
$(function(){
    var baseUrl="/";

    $('.g_submit').click(function(){
        var type = 1;
        var etfDate = $('.g_etfDate').val();
        var positionNum = $('.g_positionNum').val();
        var totalValue = $('.g_totalValue').val();
        var changeNum = $('.g_changeNum').val();
        $.ajax({
            type: "post",
            url: baseUrl+"oss/etf/insert",
            async: true,
            data: {
                type:type,
                etfDate:etfDate,
                positionNum:positionNum,
                totalValue:totalValue,
                changeNum:changeNum
            },
            success: function(obj){
                console.log(obj);
                if( obj.code == -999){
                    window.location.href = '/admin/index';
                    return false
                };
                if( obj.code == 100){
                    if(obj.data == 1){
                        $('.g_info').text('#日期已存在!');
                    }else{
                        $('.g_info').text('');
                        $('#etfGold').resetForm();
                        $.etf(1,type);
                    }
                }
            }
        });
    })
    $('.s_submit').click(function(){
        var type = 2;
        var etfDate = $('.s_etfDate').val();
        var positionNum = $('.s_positionNum').val();
        var totalValue = $('.s_totalValue').val();
        var changeNum = $('.s_changeNum').val();
        $.ajax({
            type: "post",
            url: baseUrl+"oss/etf/insert",
            async: true,
            data: {
                type:type,
                etfDate:etfDate,
                positionNum:positionNum,
                totalValue:totalValue,
                changeNum:changeNum
            },
            success: function(obj){
                console.log(obj);
                if( obj.code == -999){
                    window.location.href = '/admin/index';
                    return false
                };
                if( obj.code == 100){
                    if(obj.data == 1){
                        $('.s_info').text('#日期已存在!');
                    }else{
                        $('.s_info').text('');
                        $('#etfSilver').resetForm();
                        $.etf(1,type);
                    }
                }
            }
        });
    })
    $('.de_submit').click(function(){
        var deferredDate = $('.deferredDate').val();
        var minigold = $('.minigold').val();
        var gold = $('.gold').val();
        var silver = $('.silver').val();
        if(minigold == '' || gold == '' || silver == ''){
            if($('.de_submit').parent().children().length == 1) {
                $('.de_submit').after('&nbsp;&nbsp;<span style="color: red" class="info">#请选择方向!</span>');
            }
            return;
        }
        $.ajax({
            type: "post",
            url: baseUrl+"oss/deferred/insert",
            async: true,
            data: {
                deferredDate:deferredDate,
                minigold:minigold,
                gold:gold,
                silver:silver
            },
            success: function(obj){
                console.log(obj);
                if( obj.code == -999){
                    window.location.href = '/admin/index';
                    return false
                };
                if( obj.code == 100){
                    if(obj.data == 1){
                        $('.de_info').text('#日期已存在!');
                    }else{
                        $('.de_info').text('');
                        $('#costAdministration').resetForm();
                        $.def(1);
                    }
                }
            }
        });
    })
    $('.sta_submit').click(function(){
        var tradingDay = $('.tradingDay').val();
        var earlyPrice = $('.earlyPrice').val();
        var middayPrice = $('.middayPrice').val();
        $.ajax({
            type: "post",
            url: baseUrl+"oss/standard_price/insert",
            async: true,
            data: {
                tradingDay:tradingDay,
                earlyPrice:earlyPrice,
                middayPrice:middayPrice
            },
            success: function(obj){
                console.log(obj);
                if( obj.code == -999){
                    window.location.href = '/admin/index';
                    return false
                };
                if( obj.code == 100){
                    if(obj.data == 1){
                        $('.sta_info').text('#日期已存在!');
                    }else{
                        $('.sta_info').text('');
                        $('#staAdministration').resetForm();
                        $.sta(1);
                    }
                }
            }
        });
    })
	$.etf=function(page,type){$.ajax({
        type:"get",
        url:baseUrl+"oss/etf/list",
        async:true,
        data:{page_num:page,type:type},
        success:function(obj){
            if(obj.code == -999) {
                window.location.href = "/admin/index";
                return false;
            }
            if(obj.code=="100"){
                if(type == 1){
                    var tbody='';
                    $('.etfGold_tbody').empty();
                    var list=obj.data.list;
                    var total=obj.data.count;
                    //$('#push_total').html(total);
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
                        $.etf(nums,type);
                        $(this).addClass('active').siblings().removeClass('active');
                    });
                    /**********************************/
                    $.each(list,function(index,array){
                        var count=parseInt(index)+1;

                        tbody+='<tr id="'
                            +array.id+'"><td>'
                            +count+
                            '</td><td style="width: 40%">'
                            +array.etfDate+
                            '</td>'+
                            '<td>'+array.positionNum+'</td>'+
                            '<td>'+array.totalValue+'</td>';
                        if(array.changeNum >0){
                            tbody+= '<td style="color: red">'+'+'+array.changeNum+'</td>';
                        }else if(array.changeNum < 0){
                            tbody+= '<td style="color: green">'+array.changeNum+'</td>';
                        }else{
                            tbody+= '<td>'+array.changeNum+'</td>';
                        }
                        tbody+= '<td><span class="etf_del" style="cursor:pointer;color: darkblue">删除</span>&nbsp;&nbsp;<span class="etf_edit" style="cursor:pointer;color: #1E90FF">编辑</span></td></tr>';

                    });
                    $('.etfGold_tbody').html(tbody);
                    tbody=tbody.replace('undefined','');
                }else if(type == 2){
                    var tbody='';
                    $('.etfSilver_tbody').empty();
                    var list=obj.data.list;
                    var total=obj.data.count;
                    //$('#push_total').html(total);
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
                        $.etf(nums,type);
                        $(this).addClass('active').siblings().removeClass('active');
                    });
                    /**********************************/
                    $.each(list,function(index,array){
                        var count=parseInt(index)+1;

                        tbody+='<tr id="'
                            +array.id+'"><td>'
                            +count+
                            '</td><td style="width: 40%">'
                            +array.etfDate+
                            '</td>'+
                            '<td>'+array.positionNum+'</td>'+
                            '<td>'+array.totalValue+'</td>';
                        if(array.changeNum >0){
                            tbody+= '<td style="color: red">'+'+'+array.changeNum+'</td>';
                        }else if(array.changeNum < 0){
                            tbody+= '<td style="color: green">'+array.changeNum+'</td>';
                        }else{
                            tbody+= '<td>'+array.changeNum+'</td>';
                        }
                        tbody+='<td><span class="etf_del" style="cursor:pointer">删除</span>&nbsp;&nbsp;<span class="etf_edit" style="cursor:pointer;color: #1E90FF">编辑</span></td></tr>';

                    });
                    $('.etfSilver_tbody').html(tbody);
                    tbody=tbody.replace('undefined','');
                }

                /*点击删除该行数据*/
                $('.etf_del').click(function(){
                    var id = $(this).parent().parent().attr('id');
                    $.ajax({
                        type: "post",
                        url: baseUrl+"oss/etf/del",
                        async: true,
                        data: {
                            id:id
                        },
                        success: function(obj){
                            console.log(obj);
                            if( obj.code == -999){
                                window.location.href = '/admin/index';
                                return false
                            };
                            if( obj.code == 100){
                                if(type == 1){
                                    $.etf(1,1);
                                }else {
                                    $.etf(1,2);
                                }
                            }
                        }
                    });
                })
                /*点击编辑该行数据*/
                $('.etf_edit').click(function(){
                    if($(this).parent().parent().children('td').eq(5).children('span').eq(1).text() == '编辑'){
                        var id = $(this).parent().parent().children('td').eq(0).text();
                        var g_etfDate = $(this).parent().parent().children('td').eq(1).text();
                        var g_positionNum = $(this).parent().parent().children('td').eq(2).text();
                        var g_totalValue = $(this).parent().parent().children('td').eq(3).text();
                        var g_changeNum = $(this).parent().parent().children('td').eq(4).text();
                        if(g_changeNum > 0){
                            g_changeNum = parseInt(g_changeNum)
                        }
                        $(this).parent().parent().children('td').eq(0).text(id);
                        $(this).parent().parent().children('td').eq(1).html('<input type="date" class="g_etfDate" value="'+g_etfDate+'"/>');
                        $(this).parent().parent().children('td').eq(2).html('<input type="number" placeholder="持仓量不能为空!" class="g_positionNum" value="'+g_positionNum+'"/>');
                        $(this).parent().parent().children('td').eq(3).html('<input type="number" placeholder="总价值不能为空!" class="g_totalValue" value="'+g_totalValue+'"/>');
                        $(this).parent().parent().children('td').eq(4).html('<input type="number" placeholder="较上日变动不能为空!" class="g_changeNum" value="'+g_changeNum+'"/>');
                        $(this).parent().parent().children('td').eq(5).children('span').eq(1).text('提交');

                    }else {
                        var id = $(this).parent().parent().attr('id');
                        var etfDate = $(this).parent().parent().children('td').eq(1).children('input').val();
                        var positionNum = $(this).parent().parent().children('td').eq(2).children('input').val();
                        var totalValue = $(this).parent().parent().children('td').eq(3).children('input').val();
                        var changeNum = $(this).parent().parent().children('td').eq(4).children('input').val();
                        $.ajax({
                            type: "post",
                            url: baseUrl+"oss/etf/update",
                            async: true,
                            data: {
                                id:id,
                                type:type,
                                etfDate:etfDate,
                                positionNum:positionNum,
                                totalValue:totalValue,
                                changeNum:changeNum
                            },
                            success: function(obj){
                                console.log(obj);
                                if( obj.code == -999){
                                    window.location.href = '/admin/index';
                                    return false
                                };
                                if( obj.code == 100){
                                    if(type == 1){
                                        $.etf(1,1);
                                    }else{
                                        $.etf(1,2);
                                    }
                                }
                            }
                        });
                    }

                })
            }
        }
    })};
    $.etf(1,1);
    $.def=function(page){$.ajax({
        type:"get",
        url:baseUrl+"oss/deferred/list",
        async:true,
        data:{page_num:page},
        success:function(obj){
            if(obj.code == -999) {
                window.location.href = "/admin/index";
                return false;
            }
            if(obj.code=="100"){
                    var tbody='';
                    $('.cost_tbody').empty();
                    var list=obj.data.list;
                    var total=obj.data.count;
                    //$('#push_total').html(total);
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
                        $.def(nums);
                        $(this).addClass('active').siblings().removeClass('active');
                    });
                    /**********************************/
                    $.each(list,function(index,array){
                        var count=parseInt(index)+1;
                        var minigold = '';
                        var gold = '';
                        var silver = '';
                        if(array.minigold ==1){
                            minigold = '多付空';
                        }else{
                            minigold = '空付多';
                        }
                        if(array.gold ==1){
                            gold = '多付空';
                        }else{
                            gold = '空付多';
                        }
                        if(array.silver ==1){
                            silver = '多付空';
                        }else{
                            silver = '空付多';
                        }
                        tbody+='<tr id="'
                            +array.id+'"><td>'
                            +count+
                            '</td><td style="width: 20%">'
                            +array.deferredDate+
                            '</td >';
                        if(array.minigold ==1){
                            tbody+= '<td style="color: red">'+minigold+'</td>';
                        }else{
                            tbody+= '<td style="color: green">'+minigold+'</td>';
                        }
                        if(array.gold ==1){
                            tbody+= '<td style="color: red">'+gold+'</td>';
                        }else{
                            tbody+= '<td style="color: green">'+gold+'</td>';
                        }
                        if(array.silver ==1){
                            tbody+= '<td style="color: red">'+silver+'</td>';
                        }else{
                            tbody+= '<td style="color: green">'+silver+'</td>';
                        }
                        tbody+='<td><span class="def_del" style="cursor:pointer">删除</span>&nbsp;&nbsp;<span class="def_edit" style="cursor:pointer;color: #1E90FF">编辑</span></td></tr>';

                    });
                    $('.cost_tbody').html(tbody);
                    tbody=tbody.replace('undefined','');
                }

                /*点击删除该行数据*/
                $('.def_del').click(function(){
                    var id = $(this).parent().parent().attr('id');
                    $.ajax({
                        type: "post",
                        url: baseUrl+"oss/deferred/del",
                        async: true,
                        data: {
                            id:id
                        },
                        success: function(obj){
                            console.log(obj);
                            if( obj.code == -999){
                                window.location.href = '/admin/index';
                                return false
                            };
                            if( obj.code == 100){
                                $.def(1);
                            }
                        }
                    });
                })
            /*点击编辑该行数据*/
            $('.def_edit').click(function(){
                if($(this).parent().parent().children('td').eq(5).children('span').eq(1).text() == '编辑'){
                    var id = $(this).parent().parent().children('td').eq(0).text();
                    var deferredDate = $(this).parent().parent().children('td').eq(1).text();
                    var minigold = $(this).parent().parent().children('td').eq(2).text();
                    var gold = $(this).parent().parent().children('td').eq(3).text();
                    var silver = $(this).parent().parent().children('td').eq(4).text();
                    $(this).parent().parent().children('td').eq(0).text(id);
                    $(this).parent().parent().children('td').eq(1).html('<input type="date" class="deferredDate" value="'+deferredDate+'"/>');
                    if(minigold == '多付空'){
                        $(this).parent().parent().children('td').eq(2).html('<select name="minigold" class="minigold" style="width: 40%">'+
                            '<option value="">选择方向</option>'+
                            '<option value="1" selected>多付空</option>'+
                            '<option value="2">空付多</option>'+'</select>');
                    }else {
                        $(this).parent().parent().children('td').eq(2).html('<select name="minigold" class="minigold" style="width: 40%">'+
                            '<option value="">选择方向</option>'+
                            '<option value="1">多付空</option>'+
                            '<option value="2" selected>空付多</option>'+'</select>');
                    }
                    if(gold == '多付空'){
                        $(this).parent().parent().children('td').eq(3).html('<select name="gold" class="gold" style="width: 40%">'+
                            '<option value="">选择方向</option>'+
                            '<option value="1" selected>多付空</option>'+
                            '<option value="2">空付多</option>'+'</select>');
                    }else {
                        $(this).parent().parent().children('td').eq(3).html('<select name="gold" class="gold" style="width: 40%">'+
                            '<option value="">选择方向</option>'+
                            '<option value="1">多付空</option>'+
                            '<option value="2" selected>空付多</option>'+'</select>');
                    }
                    if(silver == '多付空'){
                        $(this).parent().parent().children('td').eq(4).html('<select name="silver" class="silver" style="width: 40%">'+
                            '<option value="">选择方向</option>'+
                            '<option value="1" selected>多付空</option>'+
                            '<option value="2">空付多</option>'+'</select>');
                    }else {
                        $(this).parent().parent().children('td').eq(4).html('<select name="silver" class="silver" style="width: 40%">'+
                            '<option value="">选择方向</option>'+
                            '<option value="1">多付空</option>'+
                            '<option value="2" selected>空付多</option>'+'</select>');
                    }
                    $(this).parent().parent().children('td').eq(5).children('span').eq(1).text('提交');
                }else {
                    var id = $(this).parent().parent().attr('id');
                    var deferredDate = $(this).parent().parent().children('td').eq(1).children('input').val();
                    var minigold = $(this).parent().parent().children('td').eq(2).children('select').val();
                    var gold = $(this).parent().parent().children('td').eq(3).children('select').val();
                    var silver = $(this).parent().parent().children('td').eq(4).children('select').val();
                    if(minigold == '' || gold == '' || silver == ''){
                        if($(this).parent().parent().children('td').eq(5).children('span').length == 2){
                            $(this).parent().parent().children('td').eq(5).children('span').eq(1).after('&nbsp;&nbsp;<span style="color: red" class="info">#请选择方向!</span>');
                        }
                        return;
                    }
                    $.ajax({
                        type: "post",
                        url: baseUrl+"oss/deferred/update",
                        async: true,
                        data: {
                            id:id,
                            deferredDate:deferredDate,
                            minigold:minigold,
                            gold:gold,
                            silver:silver
                        },
                        success: function(obj){
                            console.log(obj);
                            if( obj.code == -999){
                                window.location.href = '/admin/index';
                                return false
                            };
                            if( obj.code == 100){
                                $.def(1);
                            }
                        }
                    });
                }

            })
            }
    })};
    $.sta=function(page){$.ajax({
        type:"get",
        url:baseUrl+"oss/standard_price/list",
        async:true,
        data:{page_num:page},
        success:function(obj){
            if(obj.code == -999) {
                window.location.href = "/admin/index";
                return false;
            }
            if(obj.code=="100"){
                var tbody='';
                $('.sta_tbody').empty();
                var list=obj.data.list;
                var total=obj.data.count;
                //$('#push_total').html(total);
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
                    $.sta(nums);
                    $(this).addClass('active').siblings().removeClass('active');
                });
                /**********************************/
                $.each(list,function(index,array){
                    var count=parseInt(index)+1;

                    tbody+='<tr id="'
                        +array.id+'"><td>'
                        +count+
                        '</td><td style="width: 40%">'
                        +array.tradingDay+
                        '</td>'+
                        '<td  style="color: red">'+array.earlyPrice+'</td>'+
                        '<td  style="color: blue">'+array.middayPrice+'</td>';
                    tbody+= '<td><span class="sta_del" style="cursor:pointer;color: darkblue">删除</span>&nbsp;&nbsp;<span class="sta_edit" style="cursor:pointer;color: #1E90FF">编辑</span></td></tr>';

                });
                $('.sta_tbody').html(tbody);
                tbody=tbody.replace('undefined','');
                /*点击删除该行数据*/
                $('.sta_del').click(function(){
                    var id = $(this).parent().parent().attr('id');
                    $.ajax({
                        type: "post",
                        url: baseUrl+"oss/standard_price/del",
                        async: true,
                        data: {
                            id:id
                        },
                        success: function(obj){
                            console.log(obj);
                            if( obj.code == -999){
                                window.location.href = '/admin/index';
                                return false
                            };
                            if( obj.code == 100){
                                $.sta(page);
                            }
                        }
                    });
                })
                /*点击编辑该行数据*/
                $('.sta_edit').click(function(){
                    if($(this).parent().parent().children('td').eq(4).children('span').eq(1).text() == '编辑'){
                        var id = $(this).parent().parent().children('td').eq(0).text();
                        var tradingDay = $(this).parent().parent().children('td').eq(1).text();
                        var earlyPrice = $(this).parent().parent().children('td').eq(2).text();
                        var middayPrice = $(this).parent().parent().children('td').eq(3).text();

                        $(this).parent().parent().children('td').eq(0).text(id);
                        $(this).parent().parent().children('td').eq(1).html('<input type="date" class="t_tradingDay" value="'+tradingDay+'"/>');
                        $(this).parent().parent().children('td').eq(2).html('<input type="number" placeholder="早盘价不能为空!" class="t_earlyPrice" value="'+earlyPrice+'"/>');
                        $(this).parent().parent().children('td').eq(3).html('<input type="number" placeholder="午盘价不能为空!" class="t_middayPrice" value="'+middayPrice+'"/>');
                        $(this).parent().parent().children('td').eq(4).children('span').eq(1).text('提交');

                    }else {
                        var id = $(this).parent().parent().attr('id');
                        var tradingDay = $(this).parent().parent().children('td').eq(1).children('input').val();
                        var earlyPrice = $(this).parent().parent().children('td').eq(2).children('input').val();
                        var middayPrice = $(this).parent().parent().children('td').eq(3).children('input').val();
                        $.ajax({
                            type: "post",
                            url: baseUrl+"oss/standard_price/update",
                            async: true,
                            data: {
                                id:id,
                                tradingDay:tradingDay,
                                earlyPrice:earlyPrice,
                                middayPrice:middayPrice
                            },
                            success: function(obj){
                                console.log(obj);
                                if( obj.code == -999){
                                    window.location.href = '/admin/index';
                                    return false
                                };
                                if( obj.code == 100){
                                    $.sta(page);
                                }
                            }
                        });
                    }

                })
            }
        }
    })};
});