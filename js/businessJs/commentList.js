/**
 * 文章评论列表JS
 */
//获取文章内容信息，请求参数
//var articleId = getUrlParam("articleId");
//获取文章更多评论列表
function findArticleMoreComment(pageNo,pageSize){
	if(!pageNo){pageNo=_initPageNo;}
	if(!pageSize){pageSize=_intiPageSize;}
	var serviceParams='{articleId:"'+articleId+'",pageNo:"'+pageNo+'",pageSize:"'+pageSize+'"}';
	//获取更多评论请求参数
	var params1="['{"+
					'"token":"'+appUserToken+'",'+
					'"serviceName":"19E7F54416A905C1FE6775839FCA5BA9",'+
					'"serviceParams":'+serviceParams+
				"}']";
	
	mui.post(esbProxyRequestStaticURL+"/cms/cms",{"params":params1},function(data){
		var jsonObj = eval('(' + data.result + ')');
		if(jsonObj){
			if(jsonObj.ok){
				var commentList = jsonObj.result;
				_commentCount=commentList.commentCount;
				initCommentData(commentList.commentList);
			}else{mui.toast(jsonObj.errmsg);}
		}else{
			mui.toast("程序错误！");
		}
		},'json'
	);
}

//显示评论数据
function initCommentData(data){
	commentListVM.addComment(data);
}

//更多评论列表页面对文章进行评论
function addArticleComment(){
	//获取发表评论，请求参数
	var articleId = getUrlParam("articleId");
	var categoryId = getUrlParam("categoryId");
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
			//提交评论后重新获取文章更多评论
			/**findArticleMoreComment();*/
		}else{
			mui.toast("程序错误！");
		}
		},'json'
	);
}
