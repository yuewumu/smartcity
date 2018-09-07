/**应急求助js*/
(function() {
	
  	//选择快捷输入
	mui('.mui-popover').on('tap','li',function(e){
	  document.getElementById("question").value = document.getElementById("question").value + this.children[0].innerHTML;
	  mui('.mui-popover').popover('toggle');
	}); 
	
	//根据浏览器定位
	getLocationAddress();
	//得到项目菜单列表
	
	//判断经纬度，在哪一个项目区域内，不属于项目区域则属于九钰总公司
	
	var phoneBox=document.getElementById("phone");
	var memberInfo=app.getLoginState();
	phoneBox.value=memberInfo.phone;
	//监听提交触发
	var submitBox=document.getElementById("submit");
	submitBox.addEventListener('tap', function(){
		sendEmergencyHelp();
	});
	
})();


var currentLongitude="";//经度
var currentLatitude="";	//纬度
var addressBox=document.getElementById("address");
var sysProjectId="00";

//通过百度api获取地址信息
function getLocationAddress(){
	
	var geolocation = new BMap.Geolocation();
	geolocation.getCurrentPosition(function(r){
		var result=this.getStatus();
		if( result== BMAP_STATUS_SUCCESS){
			//获取经纬度
			currentLongitude=r.point.lng;
			currentLatitude=r.point.lat;
			
			//根据经纬度查询当前位置属于哪一个项目,用于保存应急信息
			getSysProjectList(currentLongitude,currentLatitude);
			//根据经纬度反向得到中文地址
			
			
			
			var point = new BMap.Point(currentLongitude,currentLatitude);
			var myGeo = new BMap.Geocoder();
			myGeo.getLocation(point, function(rs){
				addressBox.value=rs.address;
	          	//console.info(rs);
			});
			
		}
		else {
			var promptStr="";
			switch(result)
			{
				case BMAP_STATUS_UNKNOWN_LOCATION: promptStr="定位位置,结果未知";break;
				case BMAP_STATUS_SERVICE_UNAVAILABLE: promptStr="定位服务不可用";break;
				case BMAP_STATUS_TIMEOUT: promptStr="定位超时";break;
				default :promptStr="定位失败";break;
			}
			mui.toast(promptStr);
		}  
	},{enableHighAccuracy: true,timeout:5000});
}

//获取当前位置项目id
function getSysProjectList(currentLongitude,currentLatitude){
	var params2="['{"+
				'"token":"'+appUserToken+'",'+
				'"serviceName":"231FDB65C0A18240F137FCE53C290DF6",'+
				'"serviceParams":'+"{}"+
				"}']";
	sysProjectId="00";
	mui.post(esbProxyRequestStaticURL+"/map/mobileData",{"params":params2},function(data){
	var jsonObj=eval('(' + data.result + ')');
	if(jsonObj){
		if(jsonObj.ok){
			//获取项目数据
			var sysObjectList = jsonObj.result;
			//项目的经度
			var longitude="";
			//项目纬度
			var latitude ="";
			//项目区域半径
			var radius = 0;
	
			//根据当前位置创建一个点，用于判断当前位置属于哪个项目范围
			var point = new BMap.Point(currentLongitude,currentLatitude);    // 创建点坐标
	
			for(var i=0;i<sysObjectList.length;i++){
				//获取每一个项目的经纬度
				longitude = sysObjectList[i].longitude;
				latitude = sysObjectList[i].latitude;
				radius = parseInt(sysObjectList[i].remark1);
				if(!radius){
					radius = 1000;
				}
				//判断当前位置实在哪个项目范围内
				//创建一个范围圆
				var circle = new BMap.Circle(new BMap.Point(longitude,latitude),radius,{fillColor:"blue", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3});
				   
				//判断当前位置生成的点是否在圆形区域内
				if(BMapLib.GeoUtils.isPointInCircle(point,circle)){
					//如果当前位置在项目范围内，获取该项目id
					sysProjectId = sysObjectList[i].id;
					break;	   
				}
			}
		}else{mui.toast(jsonObj.errmsg);}
	}else{
		mui.toast("程序错误！");
		}
	},'json'
	);	
}

function sendEmergencyHelp(){
	mui.showLoading("正在提交..");
	var projectId = sysProjectId;
	var questionBox=document.getElementById("question");
	var question=questionBox.value;
	if(!question){
		mui.hideLoading();
		return mui.toast('求助内容不能为空');
	}
	if (question.length > 200) {
		mui.hideLoading();
		return mui.toast('内容超长,请重新填写~');
	}
	var phoneBox=document.getElementById("phone");
	var phone=phoneBox.value;
	if(!phone||phone.length<11||phone.length>11){
		mui.hideLoading();
		return mui.toast("请输入正确手机号"); 
	}
	
	var emailBox=document.getElementById("email");
	var email=emailBox.value;
	if(email&&(email.search(/^(\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+)|([1-9]\d{4,9})$/) != 0))
	{
		mui.hideLoading();
		return mui.toast("请输入正确的邮箱地址");
	}
	
	//提交应急求助
	var memberInfo=app.getLoginState();
	var memberInfoId=memberInfo.id;
	var serviceParams='{phone:"'+phone+'",question:"'+question+'",email:"'+email
						+'",longitude:"'+currentLongitude+'",latitude:"'+currentLatitude
						+'",address:"'+ addressBox.value +'",projectId:"'+projectId
						+'",memberInfoId:"'+memberInfoId+'"}';
	var params1="['{"+
					'"token":"'+appUserToken+'",'+
					'"serviceName":"BF1E029D008A80F22432D16E8F0A3C41",'+
					'"serviceParams":'+serviceParams+
				"}']";
	mui.ajax(esbProxyRequestStaticURL+"/map/mobileAlarm",
			{
				data:{"params":params1},
				dataType:'json',//服务器返回json格式数据
				type:'post',//HTTP请求类型
				success:function(data){
					mui.hideLoading();
					var jsonObj=eval('(' + data.result + ')');
					if(jsonObj){
						if(jsonObj.ok){
							mui.alert("你的求助，我们会尽快回复","应急求助","确定",function () {
								mui.back();
							});
						}else{
							mui.toast(jsonObj.errmsg);
						}
					}else{
						mui.toast("程序错误！");
					}
				},
				error:function(data){
					mui.hideLoading();
					mui.toast("超时或其他原因");
				}
		});
	
}
