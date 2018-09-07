/**
 * 移动端智慧应用菜单
 */
var _userID = app.getLoginState('LOGINSTATE').id;
//移动端智慧应用根据人员ID保存人员所选的应用
function savaDisplaySmartappByChosed(memberInfoId,smartappGroup){
	mui.showLoading("正在保存..");
	var serviceParams = '{memberInfoId:"'+memberInfoId+'",smartappGroup:"'+smartappGroup+'"}';
	var params1="['{"+
					'"token":"'+appUserToken+'",'+
					'"serviceName":"36EEDCA541E51AD6B30ED7D28E7205CF",'+
					'"serviceParams":'+serviceParams+
				"}']";
	mui.post(esbProxyRequestStaticURL+"/map/mobileSmartApp",{"params":params1},function(data){
		//服务器返回响应，根据响应结果，分析是否成功获取数据；
		var jsonObj = eval('(' + data.result + ')');
		if(jsonObj){
			if(jsonObj.ok){
				mui.hideLoading(function(){
					mui.toast("编辑成功");
				});
			}else{
				mui.hideLoading(function(){
					mui.toast("编辑失败");
				});
				mui.toast(jsonObj.errmsg);
			}
		}else{
			mui.toast("程序错误！");
		}
		},'json'
	);
}

//移动端智慧应用根据人员ID获取应用列表
function getMobileSmartappListByMemberInfoId(memberInfoId){
//	mui.showLoading("正在保存..");
//	getAllMobileSmartappList();
	var serviceParams = '{memberInfoId:"'+memberInfoId+'"}';
	var params1="['{"+
					'"token":"'+appUserToken+'",'+
					'"serviceName":"983DE8EC0EF7D9CCF51A05CC0CAB9E20",'+
					'"serviceParams":'+serviceParams+
				"}']";
	mui.post(esbProxyRequestStaticURL+"/map/mobileSmartApp",{"params":params1},function(data){
		//服务器返回响应，根据响应结果，分析是否成功获取数据；
		var jsonObj = eval('(' + data.result + ')');
		if(jsonObj){
			if(jsonObj.ok){
//				mui.hideLoading();
				vm.checkedIntelligents = jsonObj.result;
				changeIntelligentsArr();
				createAppstrin(jsonObj.result);
			}else{
//				mui.hideLoading();
				mui.toast(jsonObj.errmsg);
			}
		}else{
			mui.toast("程序错误！");
		}
		},'json'
	);
}

//移动端智慧应用获取所有应用列表
function getAllMobileSmartappList(){
//	mui.showLoading("正在保存..");
	var serviceParams = '{}';
	var params1="['{"+
					'"token":"'+appUserToken+'",'+
					'"serviceName":"790BB4698333CD5D08F83494385D13C2",'+
					'"serviceParams":'+serviceParams+
				"}']";
	mui.post(esbProxyRequestStaticURL+"/map/mobileSmartApp",{"params":params1},function(data){
		//服务器返回响应，根据响应结果，分析是否成功获取数据；
		var jsonObj = eval('(' + data.result + ')');
		if(jsonObj){
			if(jsonObj.ok){
				vm.Intelligents = jsonObj.result;
				//判断url参数是否带有moreApplaction，有即代表从首页的‘添加更多’按钮进入此页面
				 if(getUrlParam("moreApplaction")){
					 getMobileSmartappListByMemberInfoId(_userID);
				 }
			}else{
				mui.hideLoading();
//				mui.toast(jsonObj.errmsg);
			}
		}else{
			mui.toast("程序错误！");
		}
		},'json'
	);
}
//比对两个数组，并依据其中一个数组改变另一个数组
function changeIntelligentsArr(){
	var allArr = vm.Intelligents;
	var checkedArr = vm.checkedIntelligents;
	for(var i = 0;i<allArr.length;i++){
		if(checkedArr.length === 0){
			vm.$set(vm.Intelligents[i], 'isChecked', false);
		}else{
			for(var j = 0;j<checkedArr.length;j++){
				if(checkedArr[j].name === allArr[i].name){
					if(!vm.Intelligents[i].isChecked){
						vm.$set(vm.Intelligents[i], 'isChecked', true);
						break;
					}
				}else{
					vm.$set(vm.Intelligents[i], 'isChecked', false);
				}
			}
		}
	}
}

//提取数组中的每个对象的ID属性拼接为字符串
function createAppstrin(arr){
	if(arr){
		mui.each(arr,function(index,item){
			var id=item.id;
			if(!vm.cacheIntelligents){
				vm.cacheIntelligents = id;
			}else{
				vm.cacheIntelligents+= ","+id;
			}
		});
	}else{
		return;
	}
	
}