/**
停车向导
*/
var _prevmarker;
//传入当前经纬度,给出中心经纬度并给出范围,返回当前经纬度范围内停车场的数据
function getParkingInfo (currentLongitude,currentLatitude,centerLng,centerLat){
	var serviceParams = '{currentLongitude:"'+currentLongitude+'",currentLatitude:"'+currentLatitude
							+'",centerLng:"'+centerLng+'",centerLat:"'+centerLat+'"}';
	var params1="['{"+
					'"token":"'+appUserToken+'",'+
					'"serviceName":"A54C23BA0C20F24B331C23CF38D4A3FF",'+
					'"serviceParams":'+serviceParams+
				"}']";
	
	mui.post(esbProxyRequestStaticURL+"/map/mobileMapData",{"params":params1},function(data){
		//服务器返回响应，根据响应结果，分析是否成功获取数据；
		var jsonObj = eval('(' + data.result + ')');
				
		if(jsonObj){
			if(jsonObj.ok){
				initParkingList(jsonObj.result);//提取返回的数据并生成点
			}else{
				mui.toast(jsonObj.errmsg);
			}
		}else{
			mui.toast("程序错误！");
		}
		},'json'
	);
}
/* 此方法为从后台获取获取附近的停车场名字，坐标，地址，电话 */
function initParkingList(arrObj){
	vm.sites = [];//清空停车列表
	for(var i=0;i<arrObj.length;i++){
		addParkPoint(arrObj[i]);
	}
}
//向地图添加停车场点，与添加停车场列表
function addParkPoint(obj){
	 var myIcon = new BMap.Icon("../img/icons/parkIcon.png", new BMap.Size(20,26));
	 var point = new BMap.Point(obj.lng, obj.lat); //循环生成新的地图点 
	 var marker = new BMap.Marker(point,{icon:myIcon}); //按照地图点坐标生成标记 
	 marker.obj=obj;
	 map.addOverlay(marker);
	 vm.sites.push(obj)
	 marker.addEventListener("click", function(e){
		 vm.marker();
		 var curMarker=e.currentTarget;
		 //判断切换图标
		 if(!_prevmarker){
			 _prevmarker = curMarker;
		 }else{
			 _prevmarker.setIcon(myIcon);
			 _prevmarker = curMarker;
		 }
		 var obj = e.target.obj;
       	 //设置一个选中的myIcon对象
		 var SelectedIcon = new BMap.Icon("../img/atv.png", new BMap.Size(30,40));
		 //切换marker的图标
		 curMarker.setIcon(SelectedIcon);
       	 var Park_name = document.getElementById("Park_Name");
       	 var Parking_Lot = document.getElementById("Parking_Lot");
       	 var Park_rice = document.getElementById("Park_rice");
       	 var CarsNavigation=document.getElementById("CarsNavigation");
       	 CarsNavigation.setAttribute("lng",obj.lng);
       	 CarsNavigation.setAttribute("lat",obj.lat);
       	 Park_Name.innerHTML=(obj.name);
       	 Parking_Lot.innerHTML=(obj.address);
       	 Park_rice.innerHTML=(obj.distance);
        });
}



