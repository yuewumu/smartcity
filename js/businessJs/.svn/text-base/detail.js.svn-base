/**
 * 文章详情JS
 */
var articleId;
var params1;
if(mui.os.plus){
	mui.plusReady(function(){
		var self = plus.webview.currentWebview();
		articleId = self.articleId;
		//获取文章内容信息，请求参数
		params1="['{"+
				'"token":"'+appUserToken+'",'+
				'"serviceName":"BEFA9B258859077A5F8B002AFA49CE46",'+
				'"serviceParams":'+articleId+
			"}']";
		//获取文章内容信息
		getArticle();
		//获取文章最新评论
		getCommentNewst();
		judgeArticleCollectionFlag();
	});
}else{
	articleId = getUrlParam("articleId");
	//获取文章内容信息，请求参数
	params1="['{"+
			'"token":"'+appUserToken+'",'+
			'"serviceName":"BEFA9B258859077A5F8B002AFA49CE46",'+
			'"serviceParams":'+articleId+
		"}']";
	judgeArticleCollectionFlag();
	getArticle();
	getCommentNewst();
}
//判断文章是否被收藏
function judgeArticleCollectionFlag(){
	var memberInfo=app.getLoginState();
	var memberInfoId=memberInfo.id;
	if(memberInfoId){
		var serviceParams='{articleId:"'+articleId+'",memberInfoId:"'+memberInfoId+'"}';
		var paramsFlag="['{"+
							'"token":"'+appUserToken+'",'+
							'"serviceName":"9944B8A95AB067DC172907E12D65EC45",'+
							'"serviceParams":'+serviceParams+
						"}']";
		mui.post(esbProxyRequestStaticURL+"/map/member",{"params":paramsFlag},function(data){
			var jsonObj = eval('(' + data.result + ')');
			if(jsonObj){
				if(jsonObj.ok){
					var existflag=jsonObj.result;
					if (existflag.isExistFlag ==="true")
						starAndSharVM.isStar = true;
					else
						starAndSharVM.isStar = false;
				}else{mui.toast(jsonObj.errmsg);}
			}else{
				mui.toast("程序错误！");
			}
		},'json'
		);
	}
}

//获取文章内容信息
function getArticle(){
	mui.post(esbProxyRequestStaticURL+"/cms/cms",{"params":params1},function(data){
		var jsonObj = eval('(' + data.result + ')');
		if(jsonObj){  
			if(jsonObj.ok){
				var articleInfo=jsonObj.result;
				detailContentVM.articleContent = articleInfo.allContentView;
				detailContentVM.articleCategoryId = articleInfo.category.id;
				detailContentVM.articleCategory = articleInfo.category.name;
				detailContentVM.articleImage = articleInfo.image;
				detailContentVM.articleCreateDate = articleInfo.createDate;
				detailContentVM.articleTitle = articleInfo.title;
				detailContentVM.articleReadNum = articleInfo.hits;
				detailContentVM.allowComment = articleInfo.articleData.allowComment;
				privewImg();
				if(detailContentVM.allowComment === "0"){
					 $(".mui-bar-tab").css("display", "none");
				} 
			}else{mui.toast(jsonObj.errmsg);}
		}else{
			mui.toast("程序错误！");
		}
		},'json'
	);
}

//根据文章ID获取最新评论信息
function getCommentNewst(){
	var params2="['{"+
					'"token":"'+appUserToken+'",'+
					'"serviceName":"5425E6CC8BE1282922D86357CCA84AD7",'+
					'"serviceParams":'+articleId+
				"}']";
	//前一个post执行完后再执行获取最新评论信息post
	mui.post(esbProxyRequestStaticURL+"/cms/cms",{"params":params2},function(data){
		var jsonObj = eval('(' + data.result + ')');
		if(jsonObj){
			if(jsonObj.ok){
// 				detailContentVM.articleContent = jsonObj.result.allContentView;
				var commentList = jsonObj.result;
				detailContentVM.comments = commentList;
			}else{mui.toast(jsonObj.errmsg);}
		}else{
			mui.toast("程序错误！");
		}
		},'json'
	);
}


//发表评论
function addArticleComment(){
	//获取发表评论，请求参数
	//var articleId = getUrlParam("articleId");
	if(app.isBindPhone()){
		var categoryId = detailContentVM.articleCategoryId;
		var commentContent = document.getElementById("commentContent").value;
		var memberId = app.getLoginState('LOGINSTATE').id;
		var serviceParams = '{articleId:"'+articleId+'",categoryId:"'+categoryId+
		'",commentContent:"'+commentContent+'",memberId:"'+memberId+'"}';
		var params3="['{"+
		'"token":"'+appUserToken+'",'+
		'"serviceName":"8AC9D2537E8D8A3B0CB32C715D94927C",'+
		'"serviceParams":'+serviceParams+
		"}']";
		mui.post(esbProxyRequestStaticURL+"/cms/cms",{"params":params3},function(data){
			var jsonObj = eval('(' + data.result + ')');
			if(jsonObj){
				if(jsonObj.ok){
					mui.toast("发表成功！");
					//将发表内容清空
					commentVM.userInput = "";
				}else{mui.toast(jsonObj.errmsg);}
				//提交评论后重新最新评论
				getCommentNewst();
			}else{
				mui.toast("程序错误！");
			}
		},'json'
		);
	}
}

//添加收藏文章
function collectArticle(){
	//获取文章ID
	//var articleId = getUrlParam("articleId");
	if(app.isBindPhone()){
		var name = detailContentVM.articleTitle;
		var memberInfoId =  app.getLoginState('LOGINSTATE').id;
		var category = detailContentVM.articleCategory;
		var image = detailContentVM.articleImage;
		var serviceParams = '{articleId:"'+articleId+'",name:"'+name+'",memberInfoId:"'+memberInfoId+'",category:"'+category+'",image:"'+image+'"}';
		var params4="['{"+
						'"token":"'+appUserToken+'",'+
						'"serviceName":"461B915065EAEF62D5A47331085E5806",'+
						'"serviceParams":'+serviceParams+
					"}']";
		mui.post(esbProxyRequestStaticURL+"/map/member",{"params":params4},function(data){
			var jsonObj = eval('(' + data.result + ')');
			if(jsonObj){
				if(jsonObj.ok){
					starAndSharVM.isStar = true;
					mui.toast("收藏成功！");
				}else{mui.toast(jsonObj.errmsg);}
				
			}else{
				mui.toast("收藏失败！");
			}
			},'json'
		);
	}
}

//取消文章收藏
function cancelArticle(){
	var memberInfo=app.getLoginState();
	var memberInfoId=memberInfo.id;
	if(memberInfoId){
		var serviceParams='{articleIds:"'+articleId+'",memberInfoId:"'+memberInfoId+'"}';
		var paramsFlag="['{"+
							'"token":"'+appUserToken+'",'+
							'"serviceName":"786868717C97FBE0D71D40F1C6037A3A",'+
							'"serviceParams":'+serviceParams+
						"}']";
		mui.post(esbProxyRequestStaticURL+"/map/member",{"params":paramsFlag},function(data){
			var jsonObj = eval('(' + data.result + ')');
			if(jsonObj){
				if(jsonObj.ok){
					starAndSharVM.isStar = false;
					mui.toast("取消收藏成功！");
				}else{mui.toast(jsonObj.errmsg);}
			}else{
				mui.toast("取消收藏失败！");
			}
		},'json'
		);
	}
}

//点击预览大图
function privewImg(){
	setTimeout(function(){
		var imgs = mui("#article img");
		imgs.each(function(i,e){
			e.setAttribute("data-preview-src","");
			e.setAttribute("data-preview-group","1");
		});
	},50)
	mui.previewImage();
}
