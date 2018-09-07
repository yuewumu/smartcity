
/*************************************对象定义*****************************************/
String.prototype.trim = function(){
	return this.replace(/(^\s*)|(\s*$)/g,"");
} ;


/********************************通用函数***********************************************/
var map;

var mapTools = {
	defaultParas : {
		isStop:false,//停止 打点
		delayDrawPoint : 500,//打点延时
		stroke:{strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5}//默认线样式
	},
	initialize : function () {  
		  map = new BMap.Map('mapDiv');  
		  map.centerAndZoom(new BMap.Point(106.530635, 29.544606), 15);  
		  // 可以向地图添加多个控件。在本例中我们向地图添加一个平移缩放控件、一个比例尺控件和一个缩略图控件。在地图中添加控件后，它们即刻生效。
		 
		   map.addControl(new BMap.ScaleControl());    
		  map.addControl(new BMap.OverviewMapControl());     
		  map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
		  
	},
	/**
	 * 鼠标选点
	 * e.point.lng + "," + e.point.lat
	 */
	selectPoint:function(paras){
		map.addEventListener("click",function(e){
			if(paras.callback){
				paras.callback(e);
			}
		});
	},
	/**
	 * 获取当前坐标
	 */
	getCurrentPoint:function(){
		//将当前位置信息上打到地图上
		var geolocation = new BMap.Geolocation();
		geolocation.getCurrentPosition(function(r){
			if(this.getStatus() == BMAP_STATUS_SUCCESS){
				var mk = new BMap.Marker(r.point);
				map.addOverlay(mk);
				map.panTo(r.point);
				$("#lng").html("经度："+r.point.lng);
				$("#lat").html("纬度："+r.point.lat);
				var address = r.address.province + " " + r.address.city + " " + r.address.district + " " + r.address.street;
				//	city: "重庆市"city_code: 0district: ""province: "重庆市"street: ""street_number: ""
				$("#address").html("您的地理位置："+address);
				//alert('您的位置：'+r.point.lng+','+r.point.lat);
				//mapTools.setCenter(r.poing.lng, r.poing.lat);
				//mapTools.setZoom(8);
			}
			else {
				alertx('failed'+this.getStatus());
			}        
		},{enableHighAccuracy: true});
	},
	/**
	 * 打点<br>
	 * @param point = {
	 * 		lng:
	 * 		lat:
	 * 		picpath :  传入此参数则以图标打点,否则以默认图标打点
	 * }
	 * @param isClear
	 */
	drawPoint : function (point, isClear) {
		//坐标转换
		var pt = new BMap.Point(point.lng,point.lat);
		var marker;
		
		//定义弹出框 这里可以写成默认的
		var opts = {
			width : 200,     // 信息窗口宽度
			height: 100,     // 信息窗口高度
			title : point.title , // 信息窗口标题
			enableMessage:false,//设置允许信息窗发送短息
			//message:point.content,
		};
		
		//1 默认打点
		if(!point.picpath){
				// 开始描点
			marker = new BMap.Marker(pt);        // 创建标注    这个point对象应该是错的
			marker.enableDragging();
			var infoWindow = new BMap.InfoWindow(point.content, opts);  // 创建信息窗口对象 
			//加入弹出框
			marker.addEventListener("click", function(){          
				map.openInfoWindow(infoWindow,pt); //开启信息窗口
			});
			//加入标签
			if(point.count){
				var label = new BMap.Label(point.count+": "+point.title,{offset:new BMap.Size(20,-10)});
			}else{
				var label = new BMap.Label(point.title,{offset:new BMap.Size(20,-10)});
			}
			marker.setLabel(label);
		//2 图标打点
		}else{
			var myIcon = new BMap.Icon(point.picpath, new BMap.Size(27,27));
			marker = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
			marker.enableDragging();
			var infoWindow = new BMap.InfoWindow(point.content, opts);  // 创建信息窗口对象 
			//加入弹出框
			marker.addEventListener("click", function(){          
				map.openInfoWindow(infoWindow,pt); //开启信息窗口
			});
		}
		
		map.addOverlay(marker);   // 将标注添加到地图中
		return marker;
	},
/**
 * 地图公共打点方法，包含标注和信息提示窗口 </br> LiuBoLin
 * @param point = {
 * 		lng: 经度
 * 		lat: 纬度
 * 		enable: boolean true 表示支持拖拽 （默认不支持）
 * 		isclear: boolean true表示清除地图上的点（默认不清除）
 * 		isLabel：是否 使用提示标签 ,默认提示 ,false 表示提示
 * 		label: 提示标签的提示信息
 * 		title : 信息窗口标题
 * 		content : 信息窗口内容
 * 		enableMessage: 设置不允许信息窗发送短息,false 表示不允许，默认为false
 * 		message : 发送短息的信息窗提示语
 * 		isNotCoord : 是否 不显示当前位置的经纬度（默认显示）,true 表示不显示
 * 		xl: 线路模块地图label判断
 * }
 * @param callback  callback(pt) {
 * 		pt.lng== 实时经度
 * 		pt.lat== 实时纬度
 * }
 */
addPointIncludeLableWindow:function(point,callback){
	var marker;
	if(!point.lng){//查询出来地图上没有坐标时，生成默认坐标点
		point.lng=106.530635;
		point.lat=29.544606;
	}
	//打点方法
	mapTools.addPoint({
		lng:point.lng,
		lat:point.lat,
		enable:point.enable, //支持拖拽 (默认不支持)
		isclear:point.isclear, //清除地图上已有的点（默认不清除）
	},function(mark){
		marker=mark;
	});
	if(!point.isLabel){//是否 不使用标签提示 ,默认提示 ,false/'' 表示提示
		//标签提示
		if(point.xl){
			mapTools.addXlLabel({
				label:point.label,
				x:point.lng,
				y:point.lat,
				name:point.name,
				mapstationid:point.mapstationid,
			},marker);
		}else{
			mapTools.addLabel({
				label:point.label,
			},marker);
		}
	}
	//信息窗口
	mapTools.addOpenInfoWindow({
		lng:point.lng,
		lat:point.lat,
		title:'<h3>'+point.title+'</h3>', //信息窗口标题
		content:point.content, //信息窗口内容
		enableMessage:point.enableMessage,// 设置不允许信息窗发送短息,false 表示不允许，默认为false
		message :point.message,// 发送短息的信息窗提示语
		isNotCoord :point.isNotCoord,// 是否 不显示当前位置的经纬度（默认显示）,true 表示不显示
	},marker,function(pt){
		callback(pt);//返回一个新的经纬度。
	});
	
},
/**
 * 在地图上添加一个点  </br> LiuBoLin
 * @param point = {
 * 		lng: 经度
 * 		lat: 纬度
 * 		enable: boolean true 表示支持拖拽，相反则不拖拽（默认不支持）
 * 		isclear: boolean true表示清除地图上的点，相反则不清除（默认不清除）
 * }
 * @param callback  callback(marker) {
 * 		marker== 标记
 * }
 */	
addPoint:function(point,callback){
	if(point.isclear) //是否清除地图上的点  
		mapTools.mapClear(); //清除地图上已有的所有点
	//坐标转换
	var pt = new BMap.Point(point.lng,point.lat);
	var marker = new BMap.Marker(pt); // 创建点
	if(point.enable) //是否可以拖拽（默认不支持）
		marker.enableDragging();//支持拖拽
	map.centerAndZoom(pt, 19);//以打点的位置为中心重新加载地图（以避免点坐标差距太大，地图上没有显示）
	map.addOverlay(marker);//加载点
	//回调
	callback(marker);
},
/**
 * 创建标注  </br> LiuBoLin
 * @param point= {
 * 		label: 提示信息
 * }
 * @param marker
 */
addLabel:function(point,marker){
	var label = new BMap.Label('<h4>'+point.label+'</h4>',{offset:new BMap.Size(20,-10)});//创建标签
	marker.setLabel(label);//加载标注
},

addXlLabel:function(obj,marker){
	$("#mapstationid").val(obj.mapstationid);
	$("#x").val(obj.x);
	$("#y").val(obj.y);
	$("#name").val(obj.name);
	var a=obj;
	var tips = new BMap.Label('<h4>'+a.label+'</h4>',{offset:new BMap.Size(20,-10)});//创建标签
	marker.setLabel(tips);//加载标注
	/*if(marker.isVisible(tips)){
		//mapTools.mapClear(); //清除地图上已有的所有点
		map.removeOverlay(marker);
	}*/
	var point = new BMap.Point(a.x, a.y);
//	var marker = new BMap.Marker(point);  // 创建标注
//	map.addOverlay(marker);               // 将标注添加到地图中
//  	marker.enableDragging();//可拖拽
//	map.enableScrollWheelZoom();  //启用滚轮放大缩小
//	
	//为这个站点注册拖动事件
	marker.addEventListener("dragend",attribute);
	//拖动事件之后操作
	var label=null;
	var p;
	function attribute(){
		if(marker.isVisible(tips)){
			map.removeOverlay(tips);
		}
		p = marker.getPosition();  //获取marker的位置
		$("#mapstationid").val(obj.mapstationid);
		$("#x").val(p.lng);
		$("#y").val(p.lat);
		//添加保存文字标签
		var opts = {
				  width : 200,     // 信息窗口宽度
				  height: 100,     // 信息窗口高度
				  title : "<h3>"+obj.name+"</h3>" , // 信息窗口标题(站点名称)
				  enableMessage:false,//设置不允许信息窗发送短息
//			 	  message:"亲耐滴，晚上一起吃个饭吧？戳下面的链接看下地址喔~"
				
				  position : p,    // 指定文本标注所在的地理位置
				//  offset   : new BMap.Size(30, -30)    //设置文本偏移量
				};
		if(marker.isVisible(label))map.removeOverlay(label);	
	    label = new BMap.Label('<h4>'+obj.name+'</h4>', opts);  // 创建文本标注对象
		
		label.setStyle({
			 fontSize : "12px",
			 height : "20px",
			 lineHeight : "20px",
			 fontFamily:"微软雅黑"
		 });
		map.addOverlay(label);  
		
		//保存操作
		var saveMarker = function(e,ee,marker){
			var url = contextPath +"/xl/common/xlDynamic/saveStationPoint.action";
			//禁止按钮
			$.jiuyuExt.buttonDisable();
			$.post(url,{"mapstationid":obj.mapstationid,"x":p.lng,"y":p.lat},function(data){
				var json= eval("(" + data +")");
				//根据业务属性ok判断成功或失败前提示相应信息
				if(json.ok){
					map.removeOverlay(label); 
					$.dialog.openSaveStationSucced({
						id:"stationDialogClose",
						content: "站点信息保存成功！",
					});
				}else{
					$.dialog.openFaild({
						content: "站点信息保存失败！",
					});
					$.jiuyuExt.consolePrint(json);
				}
			}).always(function(){
				$.jiuyuExt.buttonEnable();
			});
		};
		//label的单击事件
		//label.addEventListener("click", saveMarker.bind(marker));
		//点击站点后显示信息
		var station ='</br>实时经度：'+p.lng+'</br>实时纬度：'+p.lat;
		var infoWindow = new BMap.InfoWindow(station, opts);  // 创建信息窗口对象 
		if(marker.isVisible(infoWindow))map.removeOverlay(infoWindow);
		//点击这个站点显示信息
		marker.addEventListener("click", function(){
			map.openInfoWindow(infoWindow,p); //开启信息窗口
		});
		
	}
	
	//点击这个站点显示信息
	var opts = {
			  width : 200,     // 信息窗口宽度
			  height: 100,     // 信息窗口高度
			  title : "<h3>"+obj.name+"</h3>" , // 信息窗口标题(站点名称)
			  enableMessage:false,//设置不允许信息窗发送短息
//		 	  message:"亲耐滴，晚上一起吃个饭吧？戳下面的链接看下地址喔~"
			};
	var site ;
	var infoWindow;  
	if(p){
		site= '</br>实时经度：'+p.lng+'</br>实时纬度：'+p.lat;
		infoWindow= new BMap.InfoWindow(site, opts);  // 创建信息窗口对象
		marker.addEventListener("click", function(){
			map.openInfoWindow(infoWindow,p); //开启信息窗口
		});
	}else{
		site= '</br>实时经度：'+point.lng+'</br>实时纬度：'+point.lat;
		infoWindow= new BMap.InfoWindow(site, opts);  // 创建信息窗口对象
		marker.addEventListener("click", function(){
			map.openInfoWindow(infoWindow,point); //开启信息窗口
		});
	}
	
	
},

/**
 * 创建信息窗口  </br> LiuBoLin
 * @param point= {
 * 		lng: 经度
 * 		lat: 纬度
 * 		title : 信息窗口标题
 * 		content : 信息窗口内容
 * 		enableMessage: 设置不允许信息窗发送短息,false 表示不允许，默认为false
 * 		message : 发送短息的信息窗提示语
 * 		isNotCoord : 是否 不显示当前位置的经纬度（默认显示）,true 表示不显示
 * }
 * @param marker
 * @param callback callback(point) {
 * 		point.lng== 经度 
 * 		point.lat== 纬度
 * }
 */
addOpenInfoWindow:function(point,marker,callback){
	var opts = {
		width : 280,     // 信息窗口宽度
		height: 100,     // 信息窗口高度
		title : point.title||' ', // 信息窗口标题
		enableMessage:point.enableMessage||false,//设置不允许信息窗发送短息
		message:point.message||'  '  //发送短息的信息窗提示语
	};
	var content=point.content||' ';//记录传入数据
	//为这个站点注册拖动事件
	marker.addEventListener("dragend",function(){
		point=marker.getPosition();//获取marker的位置（point不能改名字）
		callback(point);
	});
	marker.addEventListener("click", function(){
		var coord= '</br>实时经度：'+point.lng+'</br>实时纬度：'+point.lat;
		var content1=' ';//避免多次叠加经纬度，所以换个变量名写入信息窗口
		if(!point.isNotCoord)   //是否 不显示当前位置的经纬度（默认显示）,true 表示不显示
			content1=content+coord;
		var infoWindow = new BMap.InfoWindow(content1, opts);  // 创建信息窗口对象 
		map.openInfoWindow(infoWindow,new BMap.Point(point.lng, point.lat)); //开启信息窗口
	});
},
/**
 * @param point
 * lng:100
 * lat:100
 */
setCenter:function(lng,lat){
	if(!lat) {
		map.setCenter(lng);
	}else{
		map.setCenter(new BMap.Point(lng,lat));
	}
},
/**
 * 运行轨迹批量打点, 必须转换gps坐标
 * @param points = {
 *  	lng:
 * 		lat:
 * 		head:
 * }
 */
drawPoints4Run : function (points,type){
	mapTools.defaultParas.isStop = false;
	
	var point;
	var array;
	var i= -1;
	var indexMax = points.arrays.length;
	//延时打点
	var interval = window.setInterval(function(){
		 i += 1; //从0开始
		var count = parseInt(i)+1;
		array = points.arrays[i];
		//计算head 以时钟方向计算
		var clock = mapTools.getClockByHead(array[points.head],type);
		//生成相应图片
		var picpath = mapTools.getPicpathByClock(clock);
		
		point = {
			 lng:array[points.lng],
			 lat:array[points.lat],
			 title:array[points.title],
			 head:array[points.head	],
			 content:"上传时间: "+array[points.content],
			 picpath:picpath,
			 count:count,
		};
		
		//百度坐标转换 0  表示gps坐标转换
		BMap.Convertor.translate(new BMap.Point(point.lng,point.lat),0,function(bPoint){
			point.lng = bPoint.lng;
			point.lat = bPoint.lat;
			mapTools.drawPoint(point,false);
			//按clock图片打点
			mapTools.setCenter(point.lng, point.lat);
		});
		
		//中途停止或打完后停止
		if((i+1)>=indexMax) window.clearInterval(interval);
		if(mapTools.defaultParas.isStop) window.clearInterval(interval);
	}, mapTools.defaultParas.delayDrawPoint);
},
/**
 * 为线路打点 不用使用百度坐标转换</br>
 * 测试数据</br>
 var point1 ={lng:106.530635,lat:29.544606,title:'渝A00009',picwidth:50}
 var point2 ={lng:106.530635,lat:29.534606,title:'渝A00009',picwidth:50}
 var points = []
 points.push(point1)
 points.push(point2)
 mapTools.drawPoints({
 	arrays : points,
 	lng:"lng",
 	lat:"lat"
 })
 * 
 * @param points  = { <br>
 * 		 arrays:arrays,<br>
 * 	    lng:"lng" 经度</br>
 * 		lat:"lat" 纬度</br>
 * 		head:方向 通过head来描述图片的方向,如果传入了此参数,图牌将使用箭头表示</br>
 * 		title:标题 点击后出现 默认空</br>
 * 		content:内容 点击后出现 默认空</br>
	}
 */
drawPoints4Line : function (points){
	var point;
	var array;
	for(i in points.arrays){
		var count = parseInt(i)+1;
		array = points.arrays[i];
		point = {
			 lng:array[points.lng],
			 lat:array[points.lat],
			 title:array[points.title],
			 content:array[points.content],
			 count:count,
		};
		mapTools.drawPoint(point,false);
	}
},
/**
 * 按每一个点规划线路
 * @param points
 */
drawDrivingLineByEveryPoints : function (points) {
	//使用默认参数
	points = $.extend({}, mapTools.defaultParas, points || {});
	
	if(!points.arrays) return;
	if(points.arrays.length < 2){ return;
		//console.info("点数小于2");
	}
	
	//按点分解多个起讫点
	var pointS ;
	var pointE ;
	for(var i = 0 ; i < points.arrays.length-1 ;i++){
		var	lngS = points.arrays[i][points.lng];
		var	latS = points.arrays[i][points.lat];
		var	lngE = points.arrays[i+1][points.lng];
		var	latE = points.arrays[i+1][points.lat];
		pointS =  new BMap.Point(lngS,latS);
		pointE =  new BMap.Point(lngE,latE);
		
		//规划路线
		driving = new BMap.DrivingRoute(map, {renderOptions:{
			map: map, 
			autoViewport: true,
			//panel: "r-result",
			enableDragging : true //起终点可进行拖拽
			}
		});
		//driving.search(p1, p2,{waypoints:["中华民族园","对外经贸大学"]});//waypoints表示途经点
		driving.search(pointS, pointE);
	}

},
/**
 * 规划线路
 * @param points
 */
drawDrivingLineByPoints : function (points) {
	//使用默认参数
	points = $.extend({}, mapTools.defaultParas, points || {});
	
	if(!points.arrays) return;
	if(points.arrays.length < 2){ return;
		//console.info("点数小于2");
	}
	
	//起讫点及途径点
	var pointS ;
	var pointE ;
	var waypoints = [];
	for(i in points.arrays){
		var	lng = points.arrays[i][points.lng];
		var	lat = points.arrays[i][points.lat];
		if(i == 0){ 
			pointS =  new BMap.Point(lng,lat);
			continue;
		}
	//	if(i == (points.arrays.length - 1)){
		if(i == (points.arrays.length - 1) || i == 9 ){//只支持十个
			pointE = new BMap.Point(lng,lat);
			continue;
		}
		waypoints.push(new BMap.Point(lng,lat));
		//只支持十个
		//if (waypoints.length > 9) break;
		
	}
	
	//规划路线
	driving = new BMap.DrivingRoute(map, {renderOptions:{
		map: map, 
		autoViewport: true,
		//panel: "r-result",
		enableDragging : true //起终点可进行拖拽
		}
	});
	//driving.search(p1, p2,{waypoints:["中华民族园","对外经贸大学"]});//waypoints表示途经点
	driving.search(pointS, pointE ,{
		waypoints : waypoints,
	} );
},
/**
 * 规划线路
 * @param points
 */
drawDrivingLineByPoints4Index : function (startPoint,endPoint) {
	//起讫点及途径点
	var pointS ;
	var pointE ;
			pointS =  new BMap.Point(startPoint.lng,startPoint.lat);
			pointE =  new BMap.Point(endPoint.lng,endPoint.lat);
	//规划路线
	driving = new BMap.DrivingRoute(map, {renderOptions:{
		map: map, 
		autoViewport: true,
		//panel: "r-result",
		enableDragging : true //起终点可进行拖拽
		}
	});
	driving.search(pointS, pointE);
},
/**
 * 建议使用: 以点画连接线，把点与点之间用线连接起来<br>
 * @param points = {<br>
	 * arrays: 数组 2或者以上<br>
	 * lng: 如"LNG" 纬度字段<br>
	 * lat: 如"LAT" 经度字段 <br>
	 *stroke：{strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5} 默认线对象<br>
 * }
 * 
 * 测试数据<br>
	 var arrays = []
	 arrays.push({lng:106.530635,lat:29.534606})
	 arrays.push({lng:106.530635,lat:29.544606})
	 mapTools.drawLineByPoints({
		 arrays:arrays,
		 lng:"lng",
		 lat:"lat",
		 stroke: {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5}
	 });
 */
drawLineByPoints : function (points) {
	//使用默认参数
	points = $.extend({}, mapTools.defaultParas, points || {});
	
	if(!points.arrays) return;
	if(points.arrays.length < 2){ return;
		//console.info("点数小于2");
	}
	
	//生成点数组
	var pointArray = [];
	var lat;
	var lng;
	for(i in points.arrays){
		lng = points.arrays[i][points.lng];
		lat = points.arrays[i][points.lat];
		pointArray.push(new BMap.Point(lng,lat));
	}
	
	//线对象
	var polyline = new BMap.Polyline(pointArray,points.stroke);  //定义折线
	map.addOverlay(polyline);     //添加折线到地图上
	
},
	/**
	 * 获取 百度坐标转换
	 * @param lng 经度
	 * @param lat 纬度
	 */
//	getPoint : function (lng,lat){
//		//坐标转换
//		//var pt = esri.geometry.geographicToWebMercator(new esri.geometry.Point(point.lng, point.lat));
//	return	BMap.Convertor.translate(new BMap.Point(lng,lat),0,function(point){
//			return point;
//		});
//		//return new BMap.Point(lng, lat);
//	},
	/**
	 * 根据 head获取Clock
	 */
	getClockByHead : function (head,type){
//		switch(head){
//		
//		}
		//console.info("方向为=" + head);
		//出租车方向计算
		if(type=="1"){
			//因为暂时只有8个方向的图标所以除以45
		  var  direction=parseInt(parseInt(head)/45);
		  //console.info("方向为=" + direction); 
		  return direction;
		}
		else{
		//数据目前还有问题,暂时以随机数代替
//	   var rand =  parseInt(Math.random() * 8);
	    return "defalut";
	    }
	},
	/**
	 * 根据时钟获取图片
	 */
	getPicpathByClock : function (clock){
		//系统图片路径来源于maplibls ${ctx2}/images/map/head/";
		if(clock>7) clock=clock-6;
		return piccontextpath + clock + ".png";
	},
	/**
	 * Zoom 15
	 */
	setZoom:function(zoom){
		if(zoom == 'max') zoom = 19;
		if(zoom == 'middle') zoom = 17;
		map.setZoom(zoom);
	},
	/**
	 * 定位数组中的最后一个坐标
	 * @param lng 经度
	 * @param lat 纬度
	 */
	setCenterAtByLastArray : function(arrays,lng,lat){
		pt = arrays[arrays.length - 1];
		lng = pt[lng];
		lat = pt[lat];
		mapTools.panTo(lng,lat);//定位到新的坐标时窗口不抖动
		//mapTools.setCenter(lng,lat);//定位到新的坐标时窗口要抖动
	},
	panTo : function(lng,lat){
		map.panTo(lng,lat);
	},
	/**
	 * 清理数据
	 * 不传参数为全部清楚
	 */
	mapClear : function(obj){
		if(obj){
			map.removeOverlay(makerFrom); 
		}else{
			map.clearOverlays();
		}
	},
	/**
	 * 添加比例尺
	 */
	addScalebar : function (){
	},
};
//document.ready



/**************************************函数定义*****************************************/
/**
 * 将搜索出来的站点 在地图上展示
 * @param data
 */
function drawStationPoint(data) {
	map.graphics.clear();
	// 设置地图级别
	map.setZoom(9);
	var html = "";
	for(var i = 0; i < data.length; i++) {
		drawPoint(data[i], false);
		// 组装左边显示站点
		html += "<div style='line-height:25px; border-bottom: 1px dotted #ccc; width:234px; table-layout:fixed; word-break: break-all; '>";
		html += "<span class='bus_title'>站点名称：<a href='javascript:stationClick(" +data[i].lng+ ", " +data[i].lat+ ",\"" +data[i].sname+ "\",1)'>" +data[i].sname+ "</a></span><br/>";
		html += "<span>途径线路：";
		var passLines = data[i].passLine.split(",");
		for (var j = 0; j < passLines.length; j++) {
			if (j == passLines.length - 1) {
				html += "<a href='javascript:lineClick(\"" +passLines[j].trim()+ "\", 1)'>" +passLines[j]+ "</a>";
			} else {
				html += "<a href='javascript:lineClick(\"" +passLines[j].trim()+ "\", 1)'>" +passLines[j]+ "</a>,";
			}
		}
		html += "</span>";
		html += "</div>";
	}
	// 设置中心点
	map.centerAt(new esri.geometry.Point(data[data.length -1].lng, data[data.length -1].lat));
	//定义点击事件
	dojo.connect(map.graphics, "onClick", showPopup);
	$("#listDiv").html(html);
}

/**
 * 创建infoWindow显示的html内容
 * @param data
 * @param pageSize
 * @param currPage
 */
function createInfoWindowContent(data, pageSize, currPage) {
	var html = "<table border='1'>";
	html += "<tr>";
	html += "<td width='60' align='center'><b>线路</b></td>";
	html += "<td width='60'><b>距离站数</b></td>";
	html += "<td width='60'><b>距离(米)</b></td>";
	html += "<td width='60'><b>进站车辆</b></td>";
	html += "</tr>";
	for (var i in data) {
		html += "<tr>";
		html += "<td align='center'><a href='javascript:lineClick(\"" +data[i].LINENAME+ "\", "+data[i].FBACKSIGN+")'>" +data[i].LINENAME+ "</a></td>";
		html += "<td align='center'>" +data[i].V_NODE+ "</td>";
		html += "<td align='center'>" +data[i].V_DISTANCE+ "</td>";
		html += "<td>" +data[i].V_NO+ "</td>";
		html += "</tr>";
	}
	html += "</table>";
	
	return html;
}
/**
 * 线路站点新增拖动站点事件
 * @param obj
 * @param marker
 */
function draggingPointEvent(obj,marker){
	var tips = {
			  width : 200,     // 信息窗口宽度
			  height: 100,     // 信息窗口高度
			  enableMessage:false,//设置不允许信息窗发送短息
			  position : obj,    // 指定文本标注所在的地理位置
			  offset:new BMap.Size(10,25)
			};
	var tips = new BMap.Label("<a style = 'cursor:pointer'>拖动站点更改位置信息</a>",tips);//创建标签
	marker.setLabel(tips);//加载标注
	
	var point = new BMap.Point(obj.x, obj.y);
	//为这个站点注册拖动事件
	marker.addEventListener("dragend",attribute);
	//拖动事件之后操作
	var label=null;
	var p;
	function attribute(){
		if(marker.isVisible(tips)){
			map.removeOverlay(tips);
		}
		p = marker.getPosition();  //获取marker的位置
		$("#x").val(p.lng);
		$("#y").val(p.lat);
		var opts = {
				  width : 200,     // 信息窗口宽度
				  height: 100,     // 信息窗口高度
				  enableMessage:false,//设置不允许信息窗发送短息
				  position : p,    // 指定文本标注所在的地理位置
				};
		//添加提示标签
		if(marker.isVisible(label))map.removeOverlay(label);	
	    label = new BMap.Label("<a style = 'cursor:pointer'>拖动站点更改位置信息</a>",opts);
		
		label.setStyle({
			 fontSize : "12px",
			 height : "20px",
			 lineHeight : "20px",
			 fontFamily:"微软雅黑"
		 });
		map.addOverlay(label);
		
	}
}
