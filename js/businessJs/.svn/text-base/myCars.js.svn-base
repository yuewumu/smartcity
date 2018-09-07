/**
 * 车辆信息
 */
//存储车辆信息 车牌号 车牌颜色  车辆类型 车辆人员ID
var userId = app.getLoginState().id;
function saveVehicle(plateNumber,plateNumberColor,plateNumberType,memberInfoId){
	//showLoading加载框
	mui.showLoading("正在保存..");
	var serviceParams = '{plateNumber:"'+plateNumber+'",plateNumberColor:"'+plateNumberColor+'",memberInfoId:"'+memberInfoId+'",plateNumberType:"'+plateNumberType+'"}';
	var params1="['{"+
					'"token":"'+appUserToken+'",'+
					'"serviceName":"E94FE9BACF4A965F6EF202EBA74F7EFC",'+
					'"serviceParams":'+serviceParams+
				"}']";
	mui.post(esbProxyRequestStaticURL+"/map/member",{"params":params1},function(data){
		//服务器返回响应，根据响应结果，分析是否成功获取数据；
		var jsonObj = eval('(' + data.result + ')');
		if(jsonObj){
			if(jsonObj.ok){
				getVehicleListByMemberInfoId(userId);
				vm.ShowAddcontent=false;
				vm.ShowMyCars=true;
				vm.title="我的车辆";
				mui.hideLoading(function(){
					mui.toast("添加车辆成功！");
				});
			}else{
				mui.hideLoading();
				mui.toast(jsonObj.errmsg);
			}
		}else{
			mui.toast("程序错误！");
		}
		},'json'
	);
}

//通过人员车辆ID 查询车辆的信息
function getVehicleListByMemberInfoId(memberInfoId){
	var serviceParams = '{memberInfoId:"'+memberInfoId+'"}';
	var params1="['{"+
					'"token":"'+appUserToken+'",'+
					'"serviceName":"FCFCCC39E39B3B9A84F8D09983F03BFF",'+
					'"serviceParams":'+serviceParams+
				"}']";
	mui.post(esbProxyRequestStaticURL+"/map/member",{"params":params1},function(data){
		//服务器返回响应，根据响应结果，分析是否成功获取数据；
		var jsonObj = eval('(' + data.result + ')');
		if(jsonObj){
			if(jsonObj.ok){
				var result = jsonObj.result;
				result.forEach(function(e,i){
					switch(result[i].plateNumberColor){
					case "plate_number_color_yellow":
						result[i].color = "yellow";
						break;
					case "plate_number_color_black":
						result[i].color = "black";
						break;
					case "plate_number_color_blue":
						result[i].color = "blue";
						break;
					}
					switch(result[i].plateNumberType){
					case "mobile_member_plateNumberType_newenergy":
						result[i].type = "新能源";
						break;
					case "mobile_member_plateNumberType_gasoline":
						result[i].type = "汽油车";
						break;
					}
				});
				if(jsonObj.result && jsonObj.result.length>0){
					vm.myCars = result;
					vm.ShowMyCars = true;
					vm.showNoCars = false;
				}else{
					vm.myCars = result;
					vm.ShowMyCars = false;
					vm.showNoCars = true;
				}
			}else{
				mui.toast(jsonObj.errmsg);
			}
		}else{
			mui.toast("程序错误！");
		}
		},'json'
	);
}

//通过车辆ID 查询单个车辆的信息
function getVehicleByMemberVehicleId(memberVehicleId){
	var serviceParams = '{memberVehicleId:"'+memberVehicleId+'"}';
	var params1="['{"+
					'"token":"'+appUserToken+'",'+
					'"serviceName":"BE4F2C525C772855A667A7AED9FB76B9",'+
					'"serviceParams":'+serviceParams+
				"}']";
	mui.post(esbProxyRequestStaticURL+"/map/member",{"params":params1},function(data){
		//服务器返回响应，根据响应结果，分析是否成功获取数据；
		var jsonObj = eval('(' + data.result + ')');
		if(jsonObj){
			if(jsonObj.ok){
				vm.messageList = jsonObj.result;
			}else{
				mui.toast(jsonObj.errmsg);
			}
		}else{
			mui.toast("程序错误！");
		}
		},'json'
	);
}

//通过车辆ID 修改车辆的信息
function updateVehicleByMemberVehicleId(memberVehicleId,plateNumber,plateNumberColor,plateNumberType){
	var serviceParams = '{plateNumber:"'+plateNumber+'",plateNumberColor:"'+plateNumberColor+'",memberVehicleId:"'+memberVehicleId+'",plateNumberType:"'+plateNumberType+'"}';
	var params1="['{"+
					'"token":"'+appUserToken+'",'+
					'"serviceName":"2B56EAD45639A33173C962E5802917FB",'+
					'"serviceParams":'+serviceParams+
				"}']";
	mui.post(esbProxyRequestStaticURL+"/map/member",{"params":params1},function(data){
		//服务器返回响应，根据响应结果，分析是否成功获取数据；
		var jsonObj = eval('(' + data.result + ')');
		if(jsonObj){
			if(jsonObj.ok){
				getVehicleListByMemberInfoId(userId);
				vm.ShowAddcontent=false;
				vm.showEditCars = true;
				vm.ShowMyCars=true;
				vm.title="我的车辆";
				layer.closeAll();
			}else{
				mui.toast(jsonObj.errmsg);
			}
		}else{
			mui.toast("程序错误！");
		}
		},'json'
	);
}

//通过车辆ID的字符串  删除车辆信息
function deleteVehicleByMemberVehicleIds(memberVehicleIds){
	var serviceParams = '{memberVehicleIds:"'+memberVehicleIds+'"}';
	var params1="['{"+
					'"token":"'+appUserToken+'",'+
					'"serviceName":"0164BF2642147D526A3700477017AC8C",'+
					'"serviceParams":'+serviceParams+
				"}']";
	mui.post(esbProxyRequestStaticURL+"/map/member",{"params":params1},function(data){
		//服务器返回响应，根据响应结果，分析是否成功获取数据；
		var jsonObj = eval('(' + data.result + ')');
		if(jsonObj){
			if(jsonObj.ok){
				getVehicleListByMemberInfoId(userId);
				mui.hideLoading(function(){
					mui.toast("删除车辆成功！");
				});
			}else{
				mui.toast(jsonObj.errmsg);
			}
		}else{
			mui.toast("程序错误！");
		}
		},'json'
	);
}



