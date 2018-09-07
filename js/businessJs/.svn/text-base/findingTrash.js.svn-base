var _startPlace = ""; //起点中文名称
var _endPlace="";	 //终点中文名称
var _startpoi="";//起点经纬度
var _endpoi="";//终点经纬度
var map;  
function initMap(){
	//创建地图实例  
	map= new BMap.Map("MapMyreconnaissance");
	//获取当前经纬度，展示地图
	var geolocation = new BMap.Geolocation();
	geolocation.getCurrentPosition(function(r){
		var result=this.getStatus();
		if( result== BMAP_STATUS_SUCCESS){
			//获得当前位置经纬度
			var currentLongitude=r.point.lng;
			var currentLatitude=r.point.lat;
		  	//设置点以展示地图
	       	var point =new BMap.Point(currentLongitude,currentLatitude);
	       	map.centerAndZoom(point, 11); 
	        //监听拖动结束事件
	       	map.addEventListener("moveend", moveEnd);
	       	showAddres();
		}else{
			var promptStr="";
			switch(result){
				case BMAP_STATUS_UNKNOWN_LOCATION: promptStr="定位位置,结果未知";break;
				case BMAP_STATUS_SERVICE_UNAVAILABLE: promptStr="定位服务不可用";break;
				case BMAP_STATUS_TIMEOUT: promptStr="定位超时";break;
				default :promptStr="定位失败";break;
			}
			mui.toast(promptStr);
		}  
	},{enableHighAccuracy: true,timeout:5000});
}
//监听拖动结束事件的回调函数
function moveEnd(e){
	//获取map可视区域
	var cp = map.getBounds();
	//获取区域中点的坐标
	var p = cp.getCenter();
	var point = new BMap.Point(p.lng,p.lat);
	//根据坐标获取中文地点
	var gc = new BMap.Geocoder();  
	gc.getLocation(point, function(rs) {
		var addComp = rs.addressComponents;
		var mapAddress = addComp.city + addComp.district
		+ addComp.street + addComp.streetNumber;
		showAddres(mapAddress);
		if(0){
			_startPlace = mapAddress;
			_startpoi=p.lng+","+p.lat;
		}else{
			_endPlace = mapAddress;
			_endpoi=p.lng+","+p.lat;
		}
	}); 
}
//获取地图中心点的的中文名称
function showAddres(address){
	var geo = new BMap.Geocoder();  
	var mapCenter = map.getCenter();	
	if(address){
		if(vm.choiceStartOrEnd === "start"){
			vm.choiceStartAddr = address;
			vm.choiceStartAddrPoint = mapCenter.lng+","+mapCenter.lat;
		}else{
			vm.choiceEndAddr = address;
			vm.choiceEndAddrPoint = mapCenter.lng+","+mapCenter.lat;
		}
	}else{
		geo.getLocation(mapCenter, function(rs) {
			var addComp = rs.addressComponents;
			var address = addComp.city + addComp.district+ addComp.street + addComp.streetNumber;
			if(vm.choiceStartOrEnd === "start"){
				vm.choiceStartAddr = address;
				vm.choiceStartAddrPoint = mapCenter.lng+","+mapCenter.lat;
			}else{
				vm.choiceEndAddr = address;
				vm.choiceEndAddrPoint = mapCenter.lng+","+mapCenter.lat;
			}
		});
	}
}
//根据当前经纬度查询对应的中文地点
/*	var gc = new BMap.Geocoder(); 
	gc.getLocation(point, function(rs) {
   	var addComp = rs.addressComponents;
   	//得到地址
   	var mapAddress = addComp.province+addComp.city + addComp.district
   	+ addComp.street + addComp.streetNumber;
   	//TODO if条件待补充
   		 
   	_startPlace = mapAddress;
   	_startpoi=currentLongitude+","+currentLatitude;
   	_endPlace = mapAddress;
   	_endpoi=currentLongitude+","+currentLatitude;
	}); */

/**
 * @param rubishArray 垃圾桶点位数组
 * @param startpoi 起点经纬度 
 * @param endpoi 终点经纬度
 * 根据起点终点和垃圾桶坐标设置回收线路
 */
function doSearchRoad(rubishArray,startpoi,endpoi){
	console.info("do....");
	//先清除地图上的打点再进行打点
	map.clearOverlays();
	/* mapTools.mapClear(); */
	//途经点,暂时写死的，垃圾桶数组
	var pointArray=new Array();
	for(var i=0;i<rubishArray.length;i++){
		var p = new BMap.Point(rubishArray[i].substring(0,rubishArray[i].indexOf(',')),rubishArray[i].substring(rubishArray[i].indexOf(',')+1,rubishArray[i].length));
		pointArray.push(p);
	}
	//垃圾桶的点位数组
	var trashpintArray=new Array();
	//起点打点
	var startpoint = new BMap.Point(startpoi.substring(0,startpoi.indexOf(',')),startpoi.substring(startpoi.indexOf(',')+1,startpoi.length));
	var startpointmyIcon = new BMap.Icon("../img/icons/star.png", new BMap.Size(22,47));
	var startpointmarker = new BMap.Marker(startpoint,{icon:startpointmyIcon});  // 创建标注
	map.addOverlay(startpointmarker);
	//终点打点
	var endpoint = new BMap.Point(endpoi.substring(0,endpoi.indexOf(',')),endpoi.substring(endpoi.indexOf(',')+1,endpoi.length));
	var endpointmyIcon = new BMap.Icon("../img/icons/feedBack.png", new BMap.Size(22,47));
	var endpointmarker = new BMap.Marker(endpoint,{icon:endpointmyIcon});  // 创建标注
	map.addOverlay(endpointmarker);
	
	function permutate(array,permutatedArray) {
        if (!permutatedArray) {
            permutatedArray = [];
        }
        if (array.length > 1) {
            //弹出第一个数
            var elementCur = array.shift();
            //排列剩余的数组
            permutate(array, permutatedArray);
            //返回剩余的数组的排列长度
            var permutatedArrayLen = permutatedArray.length;
            //第一个数与其他剩余数组所有数组组合
            for (var j = 0; j < permutatedArrayLen; j++) {
                //弹出不齐的组
                var p = permutatedArray.shift();
                //把当前元素放到排列好的数组的所有位置
                for (var i = 0; i <= p.length; i++) {
                    //复制排列好的数组
                    var r = p.slice(0);
                    //插入数据到数组的位置
                    r.splice(i, 0, elementCur);
                    //保存
                    permutatedArray.push(r);
                }
            }
            //退出条件
        } else {
            permutatedArray.push([array[0]]);
        }
        return permutatedArray;
    }
	//所有布点组合类型数组
	var allpointArray=permutate(pointArray);
	
	//根据百度api遍历每个点的距离远近，根据距离远近排序，放入途经点使其能够按点远近寻路
	getDistance(startpoint,endpoint,allpointArray,0);
	//获取点位的驾车距离
	function getDistance(startpoint,endpoint,allpointArray,i){  
		console.info("获取点位的驾车距离");
		//先清除地图上的打点再进行打点
		/* mapTools.mapClear(); */
		map.clearOverlays();
		var driving = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true}});
		 driving.search(startpoint,endpoint,{waypoints:allpointArray[i]});
	 	 driving.setSearchCompleteCallback(function(){
			  var numRoutes=driving.getResults().getPlan(0).getNumRoutes();  
				var pts=[];
				for(var j=0;j<numRoutes;j++)
				{
					pts=pts.concat(driving.getResults().getPlan(0).getRoute(j).getPath());  	 
				}		
				var paths = pts.length;  
			 allpointArray[i].paths=paths;
			    if(i<allpointArray.length-1){
			    	i++;
			    	getDistance(startpoint,endpoint,allpointArray,i); 
			    }else{
			    	function compare(property){
					    return function(a,b){
					        var value1 = a[property];
					        var value2 = b[property];
					        return value1 - value2;
					    };
					}
			    	allpointArray.sort(compare('paths'));
			    	pointArray=allpointArray[0];
					setTimeout(function(){
						run();
					},1500); 	
			    }
		 }); 
	}
	 window.run = function (){  
			//先清除地图上的打点再进行打点
			console.info("run");
			map.clearOverlays();
			//起点打点
			var startpoint = new BMap.Point(startpoi.substring(0,startpoi.indexOf(',')),startpoi.substring(startpoi.indexOf(',')+1,startpoi.length));
			var startpointmyIcon = new BMap.Icon("../img/icons/star.png", new BMap.Size(22,47));
			var startpointmarker = new BMap.Marker(startpoint,{icon:startpointmyIcon});  // 创建标注
			map.addOverlay(startpointmarker);
			//终点打点
			var endpoint = new BMap.Point(endpoi.substring(0,endpoi.indexOf(',')),endpoi.substring(endpoi.indexOf(',')+1,endpoi.length));
			var endpointmyIcon = new BMap.Icon("../img/icons/feedBack.png", new BMap.Size(22,47));
			var endpointmarker = new BMap.Marker(endpoint,{icon:endpointmyIcon});  // 创建标注
			map.addOverlay(endpointmarker);
			//再进行打点
			for ( var i=0 ; i < trashpintArray.length; i++ ){
				var point = new BMap.Point(trashpintArray[i].obj.deviceInfolongitude,trashpintArray[i].obj.deviceInfolatitude);
				   var myIcon = new BMap.Icon("../img/banner.png", new BMap.Size(22,47));
					var marker = new BMap.Marker(point,{icon:myIcon});  // 创建标注
					var label = new BMap.Label(trashpintArray[i].obj.deviceComposeValueName,{offset:new BMap.Size(-26,30)});
					label.setStyle({
						'background-color':'#e7f6fd',
						border :"0" 
						});
					marker.setLabel(label);
					map.addOverlay(marker); // 将标注添加到地图中
			}
			var myIcon = new BMap.Icon("../img/garbageCar_move.png", new BMap.Size(52, 70), {    //小车图片
//				imageOffset: new BMap.Size(0, 0)    //图片的偏移量。为了是图片底部中心对准坐标点。
			  });
			//驾车线路规划路线
		    var driving = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true}}); 
		 	//先清除地图上的打点再进行打点
			driving.clearResults();
			driving.search(startpoint,endpoint,{waypoints:pointArray});	 
			driving.setSearchCompleteCallback(function(){
				var numRoutes=driving.getResults().getPlan(0).getNumRoutes();
				var pts=[];
				for(var i=0;i<numRoutes;i++)
				{
					pts=pts.concat(driving.getResults().getPlan(0).getRoute(i).getPath()); 	
				}		
				var paths = pts.length;    //获得有几个点
				var carMk = new BMap.Marker(pts[0],{icon:myIcon});
				map.addOverlay(carMk);
				i=0;
				function resetMkPoint(i){
					carMk.setPosition(pts[i]);
					if(i < paths){
						setTimeout(function(){
							i++;
							resetMkPoint(i);
						},100);
					}
				}
				setTimeout(function(){
					resetMkPoint(5);
				},100);
			});
		};
}
/**
 * @param sysProjectId 项目ID
 * @param binOverFlow 垃圾桶状态 {full:满溢,empty:空闲,"":全部}
 * 根据项目id和垃圾桶状态获取垃圾桶列表
 */
function getTrashListByProjectId(sysProjectId,binOverFlow){
	var serviceParams='{sysProjectId:"'+sysProjectId+'",binOverFlow:"'+binOverFlow+'"}';
	var params1="['{"+
					'"token":"'+appUserToken+'",'+
					'"serviceName":"01C36AF4F12F436429A4FFF915483C9D",'+
					'"serviceParams":'+serviceParams+
				"}']";
	mui.post(esbProxyRequestStaticURL+"/map/mobileMapData",{"params":params1},function(data){
		var jsonObj=eval('(' + data.result + ')');
		if(jsonObj){
			if(jsonObj.ok){
				//成功！！
				var treeData = jsonObj.result.result;
				toTreeData(treeData);
			}else{
				mui.toast(jsonObj.errmsg);
			}
		}else{
			mui.toast("程序错误！");
		}
		},'json'
	);	
}
//将后台返回的数据重新组装 
function toTreeData(data) {
	var pos = {};
	var tree = [];
	var i = 0;
	while (data.length != 0) {
		//TODO 这里的代码现目前必须要一个项目名称来判断为根节点，但前面查询项目给出的项目名称同这里查询设备给出的项目名称不一致，手动改为一致
		if(vm.currentProject === "九钰总公司"){
			vm.currentProject = "九钰智慧科技";
		}
		if(vm.currentProject === "洪崖洞"){
			vm.currentProject = "渝中区洪崖洞";
		}
		if (data[i].name == vm.currentProject) {
			tree.push({
				id: data[i].id,
				name: data[i].name,
				latitude:data[i].obj.deviceInfolatitude?data[i].obj.deviceInfolatitude:"",
				longitude:data[i].obj.deviceInfolongitude?data[i].obj.deviceInfolongitude:"",
				children: []
			});
			pos[data[i].id] = [tree.length - 1];
			data.splice(i, 1);
			i--;
		} else {
			var posArr = pos[data[i].pId];
			if (posArr != undefined) {
				var obj = tree[posArr[0]];
				for (var j = 1; j < posArr.length; j++) {
					obj = obj.children[posArr[j]];
				}
				obj.children.push({
					id: data[i].id,
					name: data[i].name,
					latitude:data[i].obj.deviceInfolatitude?data[i].obj.deviceInfolatitude:"",
					longitude:data[i].obj.deviceInfolongitude?data[i].obj.deviceInfolongitude:"",
					children: []
				});
				pos[data[i].id] = posArr.concat([obj.children.length - 1]);
				data.splice(i, 1);
				i--;
			}
		}
		i++;
		if (i > data.length - 1) {
			i = 0;
		}
	}
	vm.rubbishcontents = tree[0].children;
	vm.showChoiceContent();
	return tree[0].children;
}
//查询所有项目列表
function getSysProjectList(){
	var params2="['{"+
					'"token":"'+appUserToken+'",'+
					'"serviceName":"231FDB65C0A18240F137FCE53C290DF6",'+
					'"serviceParams":'+"{}"+
				"}']";
	mui.post(esbProxyRequestStaticURL+"/map/mobileData",{"params":params2},function(data){
		var jsonObj=eval('(' + data.result + ')');
		if(jsonObj){
			if(jsonObj.ok){
				//获取项目数据
				vm.itemList = jsonObj.result;
			}else{mui.toast(jsonObj.errmsg);}
		}else{
			mui.toast("程序错误！");
		}
		},'json'
	);	
}
/**
 * 依据位置查询一个当前的项目
 */
function getCurrentProjectByLocation(){
	var currentProjectName = "九钰智慧科技";
	var currentProjectId = "00";
//	vm.currentProject = currentProjectName;
//	vm.currentProjectId = currentProjectId;
	getTrashListByProjectId(currentProjectId,"");
}
getSysProjectList();
getCurrentProjectByLocation();