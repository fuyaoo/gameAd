$(function(){
    var startTime = '';
    var endTime = '';
    var baseUrl="/";
    var excelurl = sessionStorage.getItem("excelurl");
   	$('#upload').click(function () {
        $('.info').html("");
        startTime = $('#balance_start').val();
        endTime = $('#balance_end').val();
        $('#fileupload').click();
    })
    $('#fileupload').fileupload({
        dataType: 'json',
        url:baseUrl+"oss/broker/excel/fileupload",
        formData:{
            startTime:startTime,
            endTime:endTime
        },
        add: function (e, data) {
            $('#file_name').text(data.files[0].name);
            $('#file_size').text(bytesToSize(data.files[0].size));
            if(!startTime || !endTime){
                $('.info').html("请选择起始和结束时间！");
            }else{
                data.submit();
            }
        },
        done: function (e, data) {
            console.log(JSON.stringify(data.result));
            if(data.result.data == 1){
                $('.info').html("文件格式不正确！");
            }else if(data.result.code == 100){
                $('.info').html("文件上传成功！");
                $.settingfile(1);
            }
        }
    });
    //文件上传前触发事件
    $('#fileupload').bind('fileuploadsubmit', function (e, data) {
        data.formData = {
            startTime:startTime,
            endTime:endTime
        };  //如果需要额外添加参数可以在这里添加
    });
    function bytesToSize(bytes) {
        if (bytes === 0) return '0 B';
        var k = 1024,
            sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
    }
    $.settingfile=function(page){$.ajax({
        type:"get",
        url:baseUrl+"oss/broker/excel/list",
        async:true,
        data:{page_num:page},
        success:function(obj){
            if(obj.code == -999) {
                window.location.href = "/admin/index";
                return false;
            }
            if(obj.code=="100"){
                var tbody='';
                $('.settingfile_tbody').empty();
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
                    $.settingfile(nums);
                    $(this).addClass('active').siblings().removeClass('active');
                });
                /**********************************/
                $.each(list,function(index,array){
                    var count=parseInt(index)+1;
                    var totalAgentFee,totalCommissionFee,brokerTotalFee,type,span = '';
                    if(!array.totalAgentFee){
                        totalAgentFee = '--';
                    }
                    if(!array.totalCommissionFee){
                        totalCommissionFee = '--';
                    }
                    if(!array.brokerTotalFee){
                        brokerTotalFee = '--';
                    }
                    if(array.type == 1){
                        type = '审核中';
                        span = '<span class="agree_view" style="cursor:pointer;color: green">同意</span>&nbsp;|&nbsp;<span class="noagree_view" style="cursor:pointer;color: rebeccapurple">驳回</span>';
                    }if(array.type == 2){
                        type = '安排放款';
                    }if(array.type == 3){
                        span = '<span class="delete_view" style="cursor:pointer;color: rebeccapurple">删除</span>';
                        type = '驳回';
                    }if(array.type == 4){
                        span = '<span class="delete_view" style="cursor:pointer;color: rebeccapurple">删除</span>';
                        type = '数据校验失败';
                    }if(array.type == 5){
                        type = '放款成功';
                    }if(array.type == 6){
                        span = '<span class="delete_view" style="cursor:pointer;color: rebeccapurple">删除</span>';
                        type = '放款失败';
                    }
                    tbody+='<tr id="'
                        +array.id+'"><td style="width: 6%">'
                        +count+
                        '</td><td style="width: 10%">'
                        +array.startTime+
                        '</td><td style="width: 10%">'
                        +array.endTime+
                        '</td><td style="width: 12%"><a style="color: blue" title="点击下载" href="'+excelurl+array.filePath.split('/')[4]+'">'
                        +array.fileName+
                        '</a></td><td style="width: 10%">'
                        +totalAgentFee+
                        '</td><td style="width: 10%">'
                        +totalCommissionFee+
                        '</td><td style="width: 10%">'
                        +brokerTotalFee+
                        '</td><td style="width: 8%">'
                        +type+
                        '</td><td style="width: 10%">'
                        +array.updateTime+
                        '</td><td>'+span+'</td></tr>';

                });
                $('.settingfile_tbody').html(tbody);
                tbody=tbody.replace('undefined','');
                /*点击删除该行数据*/
                $('.delete_view').click(function(){
                    var id = $(this).parent().parent().attr('id');
                    $.ajax({
                        type: "post",
                        url: baseUrl+"oss/broker/excel/delete",
                        async: true,
                        data: {id:id},
                        success: function(obj){
                            console.log(obj);
                            if( obj.code == -999){
                                window.location.href = '/admin/index';
                                return false
                            };
                            if( obj.code == 100){
                                $.settingfile(1);
                            }
                        }
                    });
                })
                /*点击同意该行数据*/
                $('.agree_view').click(function(){
                    var id = $(this).parent().parent().attr('id');
                    $.ajax({
                        type: "post",
                        url: baseUrl+"oss/broker/excel/update",
                        async: true,
                        data: {id:id,type:2},
                        success: function(obj){
                            console.log(obj);
                            if( obj.code == -999){
                                window.location.href = '/admin/index';
                                return false
                            };
                            if( obj.code == 100){
                                $.settingfile(1);
                            }
                        }
                    });
                })
                /*点击驳回该行数据*/
                $('.noagree_view').click(function(){
                    var id = $(this).parent().parent().attr('id');
                    $.ajax({
                        type: "post",
                        url: baseUrl+"oss/broker/excel/update",
                        async: true,
                        data: {id:id,type:3},
                        success: function(obj){
                            console.log(obj);
                            if( obj.code == -999){
                                window.location.href = '/admin/index';
                                return false
                            };
                            if( obj.code == 100){
                                $.settingfile(1);
                            }
                        }
                    });
                })
            }
        }
    })};
    $.settingfile(1);
});