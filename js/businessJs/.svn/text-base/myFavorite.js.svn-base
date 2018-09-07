/**
 * 我的收藏js
 */
//获取收藏列表
function getMyFavoriteList(){
	var memberInfoId = app.getLoginState('LOGINSTATE').id;
	var serviceParams = '{memberInfoId:"'+memberInfoId+'"}';
	var params1="['{"+
					'"token":"'+appUserToken+'",'+
					'"serviceName":"C8800D3DA1A0A2FFDF7021EA38D58AD4",'+
					'"serviceParams":'+serviceParams+
				"}']";
	mui.post(esbProxyRequestStaticURL+"/map/member",{"params":params1},function(data){
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

//删除单个或多个收藏      ids为收藏文章id以,隔开的字符串
function deleteFavorites(ids){
	var memberInfoId = app.getLoginState('LOGINSTATE').id;
	//var serviceParams = '{memberInfoId:"'+memberInfoId+'"ids:"'+ids+'"}';
	
	var serviceParams = '{"memberInfoId":'+memberInfoId+',"articleIds":"'+ids+'"}';
	
	var params2="['{"+
					'"token":"'+appUserToken+'",'+
					'"serviceName":"786868717C97FBE0D71D40F1C6037A3A",'+
					'"serviceParams":'+serviceParams+
				"}']";
	mui.post(esbProxyRequestStaticURL+"/map/member",{"params":params2},function(data){
		var jsonObj  = eval('(' + data.result + ')'); ;
		if(jsonObj.ok){
			getMyFavoriteList();
			vm.checkedNum = 0;
			mui.toast("删除成功");
		}else{
			mui.toast("程序错误！");
		}
	},'json'
	);
}
