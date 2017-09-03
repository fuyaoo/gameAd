
$(function(){
    var baseUrl="/";

	$.agent=function(page){$.ajax({
        type:"get",
        url:baseUrl+"gameAd/tAgency/selRelation",
        async:true,
        data:{page_num:page},
        success:function(obj){
            if(obj.code == -999) {
                window.location.href = "/gameAd/admin/index";
                return false;
            }
            if(obj.code=="100"){
                $('.info_make').empty();
                var make_info=' ';
                var list=obj.data.agentArray.list;
                var total=obj.data.count;
                $('#agent_total').html(total);
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
                    $.push(nums);
                    $(this).addClass('active').siblings().removeClass('active');
                });
				/**********************************/
                $.each(list,function(index,array){
                    var count=parseInt(index)+1;
                    make_info += '<li>'
                        +'<div>'
                        +'<div style="width: 15%;text-align: center">'+count+'</div>'
                        +'<div class="state" style="text-align: center"><img src="/img/上.svg" alt="" /></div>'
                        +'<div style="width: 15%;text-align: center">'+array.tAgency.parentagencyid+'</div>'
                        +'<div style="width: 15%;text-align: center">'+array.tAgency.nickname+'</div>'
                        +'<div style="width: 15%;text-align: center">'+array.tAgencyusername+'</div>'
                        +'<div style="width: 15%;text-align: center">'+array.tAgency.agencyid+'</div>'
                        +'<div style="width: 15%;text-align: center">'+array.tAgency.userid+'</div>'
                        +'</div>'
                        +'<div class="make_msg">'
                        +'</div>'
                        +'</li>';

                });
                $('.info_make').html(make_info);
                $('.make_msg').hide();
                $('.info_make').on('click','li',function(){
                    $(this).find('.make_msg').slideDown();
                    $(this).find('.state>img').attr('src','/img/下.svg');
                    $(this).siblings().find('.make_msg').slideUp();
                    $(this).siblings().find('.state>img').attr('src','/img/上.svg');
                });
            }
        }
    })};
    $.agent(1);
});