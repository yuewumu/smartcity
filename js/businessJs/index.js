/**
 * 主页面相关代码
 **/
var _initPageNo=1;//文章当前页码
var _intiPageSize=10;//文章页面大小
var _articlCount=0;
var _userID = app.getLoginState().id; //用户ID

//加载文章列表数据
function getArticleData(categoryID,pageNo,pageSize){
	if(!pageNo){pageNo=_initPageNo;}
	if(!pageSize){pageSize=_intiPageSize;}
	var serviceParams='{categoryID:"'+categoryID+'",pageNo:"'+pageNo+'",pageSize:"'+pageSize+'"}';
	var params1="['{"+
				'"token":"'+appUserToken+'",'+
				'"serviceName":"A58245A89638A80D1C75E595C71CBC13",'+
				'"serviceParams":'+serviceParams+
			"}']";
	mui.ajax(esbProxyRequestStaticURL+"/cms/cms",
			{
				data:{"params":params1},
				dataType:'json',
				type:'post',
				timeout:10000,//超时时间设置为10秒；
				async:false,
				success:function(data){
					//服务器返回响应，根据响应结果，分析是否登录成功；
					var jsonObj=eval('(' + data.result + ')');
					if(jsonObj){
						if(jsonObj.ok){
							//mui.toast("正确返回");
							var data= jsonObj.result;
							_articlCount=data.articleCount;
							initArticleData(data.articleList);
						}else{
							mui.toast(jsonObj.errmsg);
						}
					}
				},
				error:function(xhr,type,errorThrown){
					//异常处理；
					mui.toast(type);
				}
		}
	);	
}

//显示文章数据
function initArticleData(data){
	vm.addArticle(data);
}

//加载广告
function getBanerData(menuBannerId){
	var serviceParams='{menuId:"'+menuBannerId+'"}';
	var params1="['{"+
					'"token":"'+appUserToken+'",'+
					'"serviceName":"401ACEC26E348C357B67A93F20A224AD",'+
					'"serviceParams":'+serviceParams+
				"}']";
	mui.post(esbProxyRequestStaticURL+"/map/mobileData",{"params":params1},function(data){
			var jsonObj=eval('(' + data.result + ')');
			if(jsonObj){
				if(jsonObj.ok){
					initBanerData(jsonObj.result);
				}else{mui.toast(jsonObj.errmsg);}
			}else{
				mui.toast("程序错误！");
			}
		},'json'
	);	
}
//显示广告
function initBanerData(data){
	mui.each(data,function(index,item){
		var n = Math.floor(Math.random() * data.length + 1)-1;
		if(item.advertiseType=="advertise_page"){
			var banerObj=document.getElementById("bannerImageAdvertise");
			banerObj.src=ftpStaticURL+data[n].previewimgurl;
		}
	});
}

//加载轮播图
function getCarouseData(menuCarouseId){
	var serviceParams='{menuId:"'+menuCarouseId+'"}';
	var params1="['{"+
					'"token":"'+appUserToken+'",'+
					'"serviceName":"401ACEC26E348C357B67A93F20A224AD",'+
					'"serviceParams":'+serviceParams+
				"}']";
	mui.post(esbProxyRequestStaticURL+"/map/mobileData",{"params":params1},function(data){
			var jsonObj=eval('(' + data.result + ')');
			if(jsonObj){
				if(jsonObj.ok){
					var data =  jsonObj.result;
					initCarouseData(data);
				}else{mui.toast(jsonObj.errmsg);}
			}else{
				mui.toast("程序错误！");
			}
		},'json'
	);	
}
//显示轮播图
function initCarouseData(data){
	data.forEach(function(e,i,arr){
		data[i].previewimgurl = ftpStaticURL+e.previewimgurl;
	});
	//若数据为空，会导致vue循环imgList时报错。 
	if(data.length === 0 ){
		data = {};
	}
	vmloop.imgList = data;
	//TODO 直接在节点上@click无法绑定，手动循环绑定
	vmloop.boundClick();
}
//根据人员ID获取智慧应用列表
function getMobileSmartappListByMemberInfoId(memberInfoId){
//	mui.showLoading("正在保存..");
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
				var result=jsonObj.result;
				if(result){
					result.forEach(function(e,i,arr){
						arr[i].iconurl = e.iconurl.substring(3);
						if(arr[i].name === "智慧能源"){ //外部链接，不用更改地址
							arr[i].forwardurl = e.forwardurl;
						}
						arr[i].forwardurl = "html/"+e.forwardurl;
					});
				}
				vmApp.intelligents = result;
				vmApp.openApplication();
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
//获取微信JSSDK调用所需变量
function getWxJsSDKSignature(){
	var currentUrl =location.href.split('#')[0];
	var serviceParams = '{url:"'+currentUrl+'"}';
	var params1="['{"+
					'"token":"'+appUserToken+'",'+
					'"serviceName":"23796DF22DE2E308664CCB4D08FEA20F",'+
					'"serviceParams":'+serviceParams+
				"}']";
	mui.post(esbProxyRequestStaticURL+"/map/mobileData",{"params":params1},function(data){
		//服务器返回响应，根据响应结果，分析是否成功获取数据；
		var jsonObj = eval('(' + data.result + ')');
		if(jsonObj){
			if(jsonObj.ok){
				var resultObj=jsonObj.result;
				var wxJsTimestamp=resultObj.timestamp;
				var wxJsNonceStr=resultObj.noncestr;
				var wxJsSignature=resultObj.signature;
				var wxAPPID=resultObj.appid;
				
				wx.config({
				    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				    appId: wxAPPID, // 必填，公众号的唯一标识
				    timestamp:wxJsTimestamp , // 必填，生成签名的时间戳
				    nonceStr: wxJsNonceStr, // 必填，生成签名的随机串
				    signature: wxJsSignature,// 必填，签名，见附录1
				    jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
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


