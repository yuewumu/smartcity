/**
 * 垃圾桶导航
 */
var trashInfo; //获取后台传过来的垃圾桶数据 设置为全局变量
var sysProjectId //后台获取项目ID 设置为全局变量
//查询所有项目列表
function getSysProjectList(currentLongitude, currentLatitude) {
	var params2 = "['{" + '"token":"' + appUserToken + '",'
			+ '"serviceName":"231FDB65C0A18240F137FCE53C290DF6",'
			+ '"serviceParams":' + "{}" + "}']";

//	var sysProjectId = "00";
	mui.post(esbProxyRequestStaticURL + "/map/mobileData", {
		"params" : params2
	}, function(data) {
		var jsonObj = eval('(' + data.result + ')');
		if (jsonObj) {
			if (jsonObj.ok) {
				//获取项目数据
				var sysObjectList = jsonObj.result;
				//项目的经度
				var longitude = "";
				//项目纬度
				var latitude = "";
				//项目区域半径
				var radius = 0;

				//根据当前位置创建一个点，用于判断当前位置属于哪个项目范围
				var point = new BMap.Point(currentLongitude, currentLatitude); // 创建点坐标

				for (var i = 0; i < sysObjectList.length; i++) {
					//获取每一个项目的经纬度
					longitude = sysObjectList[i].longitude;
					latitude = sysObjectList[i].latitude;
					radius = parseInt(sysObjectList[i].remark1);
					if (!radius) {
						radius = 1000;
					}

					//判断当前位置实在哪个项目范围内
					//创建一个范围圆
					var circle = new BMap.Circle(new BMap.Point(longitude,
							latitude), radius, {
						fillColor : "blue",
						strokeWeight : 1,
						fillOpacity : 0.3,
						strokeOpacity : 0.3
					});

					//判断当前位置生成的点是否在圆形区域内
					if (BMapLib.GeoUtils.isPointInCircle(point, circle)) {
						//如果当前位置在项目范围内，获取该项目id
						sysProjectId = sysObjectList[i].id;
						break;
					}
				}
			} else {
				mui.toast(jsonObj.errmsg);
			}
		} else {
			mui.toast("程序错误！");
		}

		//查询项目垃圾桶列表
		getTrashListByProjectId(sysProjectId,"full");
		getTrashListByProjectId(sysProjectId,"empty");
	}, 'json');
}

//根据项目id和垃圾桶状态获取垃圾桶列表，binOverFlow为垃圾桶状态，full表示查询装满的，empty表示查询空闲的，传""表示查询全部
function getTrashListByProjectId(sysProjectId, binOverFlow) {
	var serviceParams = '{sysProjectId:"' + sysProjectId + '",binOverFlow:"'
			+ binOverFlow + '"}';
	var params1 = "['{" + '"token":"' + appUserToken + '",'
			+ '"serviceName":"01C36AF4F12F436429A4FFF915483C9D",'
			+ '"serviceParams":' + serviceParams + "}']";
	mui.post(esbProxyRequestStaticURL + "/map/mobileMapData", {
		"params" : params1
	}, function(data) {
		var jsonObj = eval('(' + data.result + ')');
		var trashInfo = jsonObj;
		if (jsonObj) {
			if (jsonObj.ok) {
				/*console.log(jsonObj.result.result);*/
			} else {
				mui.toast(jsonObj.errmsg);
			}
			//页面请求成功时显示垃圾桶位置 
			getTrashInfo(trashInfo,binOverFlow);
		} else {
			vm.trashGif=true;
			mui.toast("该区域没有垃圾桶!");
		}

	}, 'json');
}
/**
 * 获取垃圾桶的信息,并调用生成点的方法
 * @param selectWhat 查询的垃圾桶状态
 * @returns
 */
function getTrashInfo(rubbishInfo,selectWhat) {
	/*map.clearOverlays();*/
	var markerArr;
	for (var i = 0; i < rubbishInfo.result.result.length; i++) {
		if (rubbishInfo.result.result[i].obj.composeCode == "DEVICE_TYPE_RUBBISHBIN") {
			//循环或者垃圾桶的经纬度和距离.
			var lat = rubbishInfo.result.result[i].obj.deviceInfolatitude;
			var lng = rubbishInfo.result.result[i].obj.deviceInfolongitude;
			var distance = getDistance(currentLongitude, currentLatitude, lng,
					lat);
			//把名称、经纬度、距离存入实体
			markerArr = [ {
				title : rubbishInfo.result.result[i].obj.deviceInfoName,
				point : lng + "," + lat,
				distance : distance
			} ];
			map_init(markerArr,selectWhat);//生成若干个点的方法
		}
	}
	getViewport(trashPoints);
}

//点击开始导航按钮的方法  会到百度导航进行导航
function beginNavigation() {
	window.location.href = "http://api.map.baidu.com/direction?origin=latlng:"
			+ currentLatitude
			+ ","
			+ currentLongitude
			+ "|name:当前位置&destination=latlng:"
			+ endlat
			+ ","
			+ endlng
			+ "|垃圾箱位置&mode=walking&region=重庆&output=html&src=yourCompanyName|yourAppName";
}
//点击结束导航按钮的方法 会清除导航路线 并重新搜索垃圾桶
function endNavigatrion() {
	//清楚地图上的点
	map.clearOverlays();
	//生成当前位置
	setCenterAndZoom(currentLongitude, currentLatitude);
	//重新搜索垃圾桶
	getTrashListByProjectId(sysProjectId,"full");
	getTrashListByProjectId(sysProjectId,"empty");
}
//获取当前坐标数组的最佳显示缩放大小
function getViewport(trashPoints) {
	map.setViewport(trashPoints);
}
//使用百度API的方法获取当前与垃圾桶的距离
function getDistance(currentLongitude, currentLatitude, lng, lat) {
	var p1 = new BMap.Point(currentLongitude, currentLatitude);
	var p2 = new BMap.Point(lng, lat);
	var distance = map.getDistance(p1, p2).toFixed(0) + "米";
	return distance;
}
