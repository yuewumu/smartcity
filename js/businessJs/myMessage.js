/**我的消息js*/
(function() {
	getNewstEmergencyInfo();
	getNewstMemberFeedBack();
	mui.previewImage();
})();

//查询出最新的意见反馈列表
function getNewstMemberFeedBack(){
	var memberInfoId=app.getLoginState().id;
	var serviceParams='{memberInfoId:"'+memberInfoId+'",type:"newst'+'"}';
	var params1="['{"+
					'"serviceName":"EE34D8C5EF6317D802AFAC0B46D0B5BA",'+
					'"token":"'+appUserToken+'",'+
					'"serviceParams":'+serviceParams+
				"}']";
	
	mui.post(esbProxyRequestStaticURL+"/map/member",{"params":params1},function(data){
		//服务器返回响应，根据响应结果，分析是否成功获取数据；
		var jsonObj=eval('(' + data.result + ')');
		if(jsonObj){
			if(jsonObj.ok){
				//反馈列表
				var feedBack = {
						type:"fadeBack",
						typeName:"意见反馈",
						image:"../img/feedBack.png",
						title:jsonObj.result[0].feedbackContent,
						date:jsonObj.result[0].updateDate
				}
				Vue.set(vm.typeList,1,feedBack);
			}else{
				mui.toast(jsonObj.errmsg);
			}
		}else{
			mui.toast("程序错误！");
		}
	},'json');
}


//查询我的意见反馈列表
function getMemberFeedBackList(){
	var memberInfoId=app.getLoginState().id;
	var serviceParams='{memberInfoId:"'+memberInfoId+'",type:"normal'+'"}';
	var params1="['{"+
					'"token":"'+appUserToken+'",'+
					'"serviceName":"EE34D8C5EF6317D802AFAC0B46D0B5BA",'+
					'"serviceParams":'+serviceParams+
				"}']";
	mui.post(esbProxyRequestStaticURL+"/map/member",{"params":params1},function(data){
		//服务器返回响应，根据响应结果，分析是否成功获取数据；
		var jsonObj=eval('(' + data.result + ')');
		if(jsonObj){
			if(jsonObj.ok){
				//反馈列表
				vm.feedBackMessageList = jsonObj.result;
			}else{
				mui.toast(jsonObj.errmsg);
			}
		}else{
			mui.toast("程序错误！");
		}
	},'json');
}

//查询我的意见反馈列表详情
function getMemberFeedBackDetail(id){
	var feedBackId=id;
	var memberInfoId=app.getLoginState().id;
	var serviceParams='{memberInfoId:"'+memberInfoId+'",feedBackId:"'+feedBackId+'"}';
	var params1="['{"+
					'"token":"'+appUserToken+'",'+
					'"serviceName":"2A4277016F90A353A5B95D8198CE1B3F",'+
					'"serviceParams":'+serviceParams+
				"}']";
	
	mui.post(esbProxyRequestStaticURL+"/map/member",{"params":params1},function(data){
		//服务器返回响应，根据响应结果，分析是否成功获取数据；
		var jsonObj=eval('(' + data.result + ')');
		if(jsonObj){
			if(jsonObj.ok){
				//反馈详情数据
				vm.messageItemList = [jsonObj.result];
			}else{
				mui.toast(jsonObj.errmsg);
			}
		}else{
			mui.toast("程序错误！");
		}
	},'json');
}

//获取最新的应急求助信息
function getNewstEmergencyInfo(){
	var memberInfoId=app.getLoginState().id;
	var serviceParams='{memberInfoId:"'+memberInfoId+'"}';
	var params1="['{"+
					'"serviceName":"667859AA41C03605403C37629266B6EA",'+
					'"token":"'+appUserToken+'",'+
					'"serviceParams":'+serviceParams+
				"}']";
	
	mui.post(esbProxyRequestStaticURL+"/map/mobileAlarm",{"params":params1},function(data){
		//服务器返回响应，根据响应结果，分析是否成功获取数据；
		var jsonObj=eval('(' + data.result + ')');
		if(jsonObj){
			if(jsonObj.ok){
				//应急求助列表
				var emergencyHelp = {
						type:"emergencyHelp",
						typeName:"应急求助",
						image:"../img/emergencyHelp.png",
						title:jsonObj.result.question,
						date:jsonObj.result.updateDate
				}
				Vue.set(vm.typeList,0,emergencyHelp);
			}else{
				mui.toast(jsonObj.errmsg);
			}
		}else{
			mui.toast("程序错误！");
		}
	},'json');
}
//获取应急求助列表
function getEmergencyInfoList(){
	var memberInfoId=app.getLoginState().id;
	var serviceParams='{memberInfoId:"'+memberInfoId+'"}';
	var params1="['{"+
					'"serviceName":"BBE90B1F6D9B5E95C226A8F7166DD118",'+
					'"token":"'+appUserToken+'",'+
					'"serviceParams":'+serviceParams+
				"}']";
	mui.post(esbProxyRequestStaticURL+"/map/mobileAlarm",{"params":params1},function(data){
		//服务器返回响应，根据响应结果，分析是否成功获取数据；
		var jsonObj=eval('(' + data.result + ')');
		if(jsonObj){
			if(jsonObj.ok){
				//应急求助列表
				vm.emergencyHelpMessageList = jsonObj.result;
			}else{
				mui.toast(jsonObj.errmsg);
			}
		}else{
			mui.toast("程序错误！");
		}
	},'json');
}
//获取应急求助详情
function getEmergencyInfoDetail(emergencyHelpId){
	var memberInfoId=app.getLoginState().id;
	var serviceParams='{memberInfoId:"'+memberInfoId+'",emergencyHelpId:"'+emergencyHelpId+'"}';
	var params1="['{"+
					'"serviceName":"A5E9EA1F1612D323D4370160452994D1",'+
					'"token":"'+appUserToken+'",'+
					'"serviceParams":'+serviceParams+
				"}']";
	
	mui.post(esbProxyRequestStaticURL+"/map/mobileAlarm",{"params":params1},function(data){
		//服务器返回响应，根据响应结果，分析是否成功获取数据；
		var jsonObj=eval('(' + data.result + ')');
		if(jsonObj){
			if(jsonObj.ok){
				//应急求助
				console.info(jsonObj.result);
				vm.emergencyHelpList = [jsonObj.result];
			}else{
				mui.toast(jsonObj.errmsg);
			}
		}else{
			mui.toast("程序错误！");
		}
	},'json');
}


//显示具体消息列表
/*function showMessageList(){
	vm.mainMessage = false;
	vm.subMessage = true;
}*/
//显示主列表（最新信息）
function showTypelist(){
	vm.title = "我的消息";
	vm.mainMessage = true;
	vm.feedBackSubMessage = false;
	vm.emergencyHelpSubMessage = false;
	vm.messageItem = false;
	//返回时，设置checkbox未选中、选中条数为0.
	vm.check = false;
	vm.checkedNum = 0;
}
//显示子列表
function showSubMessage(){
	if(vm.title === "意见反馈详情"){
		vm.title = "意见反馈列表";
		vm.feedBackSubMessage = true;
		vm.messageItem = false;
	}
	else{
		vm.title = "应急求助列表";
		vm.emergencyHelpSubMessage = true;
		vm.emergencyHelpDetail = false;
	}
	vm.canEdit = true;
}
