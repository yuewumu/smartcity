var provinces = new Array("京","沪","浙","苏","粤","鲁","晋","冀",
            "豫","川","渝","辽","吉","黑","皖","鄂",
            "津","贵","云","桂","琼","青","新","藏",
            "蒙","宁","甘","陕","闽","赣","湘");

var keyNums = new Array("0","1","2","3","4","5","6","7","8","9",
            "Q","W","E","R","T","Y","U","I","O","P",
            "A","S","D","F","G","H","J","K","L",
            "OK","Z","X","C","V","B","N","M","Del");



var next=0;			
	function showProvince(){
			$("#pro").html("");
			var ss="";
			for(var i=0;i<provinces.length;i++){
				ss=ss+addKeyProvince(i)
			} 
			$("#pro").html("<ul class='clearfix ul_pro'>"+ss+"<li class='li_close' onclick='closePro();'><span>关闭</span></li><li class='li_clean' onclick='cleanPro();'><span>清空</span></li></ul>");
	} 
	function showKeybord(){
		$("#pro").html("");
		var sss="";
		for(var i=0;i<keyNums.length;i++){
			if(i===37){
				sss=sss+'<li class="ikey ikey'+i+' '+(i>9?"li_zm":"li_num")+' '+(i>28?"li_w":"")+'" ><span id="del" onclick="choosekey(this,'+i+');">'+keyNums[i]+'</span></li>'
			}else if(i===29){
				sss=sss+'<li class="ikey ikey'+i+' '+(i>9?"li_zm":"li_num")+' '+(i>28?"li_w":"")+'" ><span id="sure" onclick="choosekey(this,'+i+');">'+keyNums[i]+'</span></li>'
			}else{
				sss=sss+'<li class="ikey ikey'+i+' '+(i>9?"li_zm":"li_num")+' '+(i>28?"li_w":"")+'" ><span onclick="choosekey(this,'+i+');">'+keyNums[i]+'</span></li>'
			}
		}
		$("#pro").html("<ul class='clearfix ul_keybord'>"+sss+"</ul>");	
		
	} 
    function addKeyProvince(provinceIds){
        var addHtml = '<li>';
            addHtml += '<span onclick="chooseProvince(this);">'+provinces[provinceIds]+'</span>';
            addHtml += '</li>';
            return addHtml;
    }

    function chooseProvince(obj){
       $(".input_pro span").text($(obj).text());
	   $(".input_pro").addClass("hasPro");
	   $(".input_pp").find("span").text("");
       $(".ppHas").removeClass("ppHas");
	   next=0;
	   showKeybord();
	}	
	function addOk()
	{
		var Mycar = encodeURIComponent($(".car_input").attr("data-pai"));
		var oldCar = encodeURIComponent(bianji);
		if(Mycar==""||Mycar.length==0){
			mui.toast("请输入正确车牌");
		}
		else{
			/*window.location.href="Mycars.html?chepai="+Mycar+"&oldchepai="+oldCar;*/
		}
	}
	
	function choosekey(obj,jj){	
		if(jj==29){
			var Mycar = encodeURIComponent($(".car_input").attr("data-pai"));
			if(Mycar.length==""){
				alert("不能为空");
			}else{
				layer.closeAll();
			}
		}else if(jj==37){
			if($(".ppHas").length==0){
				$(".hasPro").find("span").text("");			
				$(".hasPro").removeClass("hasPro");	
				showProvince();
				next=0;
			}
			$(".ppHas:last").find("span").text("");			
			$(".ppHas:last").removeClass("ppHas");	
			getpai();
			next=next-1;
			if(next<1){
				next=0;
			}
		}else{
			//新能源车长度多一位 
			if(_isNenergy){
				if(next === 6){
					layer.closeAll();
				}
			//常规能源车
			}else{
				if(next === 5){
					layer.closeAll();
				}
			}
			/*console.log(next);*/
			for(var i = 0; i<$(".input_pp").length;i++){
				if(next==0 & jj<10 & $(".input_pp:eq("+next+")").hasClass("input_zim")){
					mui.toast("车牌第二位为字母")
					/*layer.open({
						content: '车牌第二位为字母',
						skin: 'msg',
						time: 1
					});*/
					return
				}
				$(".input_pp:eq("+next+")").find("span").text($(obj).text());
				$(".input_pp:eq("+next+")").addClass("ppHas");
				next=next+1;
				getpai();
				return
			}
		}
	}
	function closePro(){
       layer.closeAll()
	}		
	function cleanPro(){
       $(".ul_input").find("span").text("");
       $(".hasPro").removeClass("hasPro");
       $(".ppHas").removeClass("ppHas");
	   next=0;
	}	
	function trimStr(str){return str.replace(/(^\s*)|(\s*$)/g,"");}
	function getpai(){
		var pai=_trim($(".car_input").text(),"g");
		$(".car_input").attr("data-pai",pai);
	}
window.onload = function() {
	$(".input_pro").click(function(){
		 layer.open({
			type: 1
			,content: '<div id="pro"></div>'
			,anim: 'up'
			,shade :false 
			,style: 'position:fixed; bottom:0; left:0; width: 100%; height: auto; padding:0; border:none;'
		  });
		 showProvince()
	})
	$(".input_pp").click(function(){
		 if($(".input_pro").hasClass("hasPro")){ // 如果已选择省份
			 layer.open({
				type: 1
				,content: '<div id="pro"></div>'
				,anim: 'up'
				,shade :false 
				,style: 'position:fixed; bottom:0; left:0; width: 100%; height: auto; padding:0; border:none;'
			  });
			 showKeybord()
		 }else{
			 $(".input_pro").click()
		 }
	})
	

}

