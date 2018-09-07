/**搜索相关代码*/
(function($, search) {
	//设置搜索历史记录
	search.setSearchItem=function(items){
		var str = JSON.stringify(items);
		localStorage.setItem("SEARCHITEMS",str);
	};
	//获取搜索历史记录
	search.getSearchItem=function(){
		var srarchItem=localStorage.getItem("SEARCHITEMS");
		return JSON.parse(srarchItem);;
	};
	//增加搜索历史记录
	search.addSearchItem=function(item){
		var newSearchItem=new Array();
		var searchItems=search.getSearchItem();
		//重复搜索记录不添加
			newSearchItem[0]=item;
			if(searchItems !==null ){
				if(searchItems.indexOf(item)==-1){
					for(var i=0;i<searchItems.length&&i<4;i++){
						newSearchItem[i+1]=searchItems[i];
					}
				}else{
					newSearchItem=searchItems;
				}
		}
			search.setSearchItem(newSearchItem);
	};
	//删除一项：删除一个搜索记录
	search.deleteSearchItem=function(index){
		var searchItems=search.getSearchItem();
		var newSearchItems=searchItems.splice(index,1);
		if(newSearchItems.length>0){
			search.setSearchItem(searchItems);
		}else{
			search.deleteAllSearchItem();
		}
	};
	//清空搜索记录
	search.deleteAllSearchItem=function(){
		localStorage.removeItem("SEARCHITEMS");
	};
}(mui, window.search = {}));


var _initPageNo=1;//文章当前页码
var _intiPageSize=10;//文章页面大小
var _articlCount=0;
//得到搜索结果文章
function getSearchResult(searchKeyword,pageNo,pageSize){
	if(!pageNo){pageNo=_initPageNo;}
	if(!pageSize){pageSize=_intiPageSize;}
	var serviceParams='{searchKeyword:"'+searchKeyword+'",pageNo:"'+pageNo+'",pageSize:"'+pageSize+'"}';
	var params1="['{"+
				'"token":"'+appUserToken+'",'+
				'"serviceName":"C8F150A65CF3279916C7F1C5F35E1070",'+
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
	vm.searchedList = data;
}
