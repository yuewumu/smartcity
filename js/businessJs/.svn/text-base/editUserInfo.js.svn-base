/**
 * 个人信息修改JS
 */
//移动端人员信息获取
var memberInfoId = app.getLoginState('LOGINSTATE').id;
var serviceParams4Member = '{memberInfoId:"'+memberInfoId+'"}';
var params1="['{"+
				'"token":"'+appUserToken+'",'+
				'"serviceName":"028F6C5AAA0A25203A3DFA76A4AAC800",'+
				'"serviceParams":'+serviceParams4Member+
			"}']";
mui.post(esbProxyRequestStaticURL+"/map/member",{"params":params1},function(data){
	var jsonObj = eval('(' + data.result + ')');
	if(jsonObj){
		if(jsonObj.ok){
			var memberInfoObj = jsonObj.result;
			userInfoContentVM.userInfoList = memberInfoObj;
			userInfoContentVM.photo = ftpStaticURL + userInfoContentVM.userInfoList.filePath + userInfoContentVM.userInfoList.fileName;
			userInfoContentVM.userInfoList.birthday = new Date(userInfoContentVM.userInfoList.birthday).toLocaleDateString().replace('/','-').replace('/','-');
		}else{
			mui.toast(jsonObj.errmsg);
		}
	}else{
		mui.toast("程序错误！");
	}
	},'json'
);
//重写返回逻辑
var _back = mui.back; 
mui.back = function () {
	if (userInfoContentVM.showContent === false) {
		userInfoContentVM.showContent = true;
		userInfoContentVM.showEditNickName=false;
		userInfoContentVM.showChoiceCareer=false;
	} else{
		_back();
	}
}
//修改昵称
function changeNickname(){
	mui.showLoading("正在修改.."); 
	//var phone = app.getLoginState('LOGINSTATE').phone;
	var nickname = document.querySelector(".changedNickName").value;
	//修改参数为空直接返回，不发送请求
	if(!nickname){
		return;
	}
	var serviceParams = '{memberInfoId:"'+memberInfoId+'",nickname:"'+nickname+'"}';
	var params1="['{"+
		'"token":"'+appUserToken+'",'+
		'"serviceName":"295E9326D0A3D1A556626763F008F551",'+
		'"serviceParams":'+serviceParams+
	"}']";
	mui.post(esbProxyRequestStaticURL+"/map/member",{"params":params1},function(data){
		var jsonObj = eval('(' + data.result + ')');
		if(jsonObj){
			if(jsonObj.ok){
				mui.hideLoading(function(){
					mui.toast("修改昵称成功！");
				});
				app.updateLoginStateInfo('nickname',nickname);
			}else{
				mui.hideLoading();
				mui.toast(jsonObj.errmsg);
			}
		}else{
			mui.hideLoading();
			mui.toast("程序错误！");
		}
	},'json');
};
//修改职业
function changeProfession(text){
	mui.showLoading("正在修改..");
	//var phone = app.getLoginState('LOGINSTATE').phone;
	var profession = text;
	var serviceParams = '{memberInfoId:"'+memberInfoId+'",profession:"'+profession+'"}';
	var params1="['{"+
		'"token":"'+appUserToken+'",'+
		'"serviceName":"295E9326D0A3D1A556626763F008F551",'+
		'"serviceParams":'+serviceParams+
	"}']";
	mui.post(esbProxyRequestStaticURL+"/map/member",{"params":params1},function(data){
		var jsonObj = eval('(' + data.result + ')');
		if(jsonObj){
			if(jsonObj.ok){
				mui.hideLoading(function(){
					mui.toast("修改职业成功！");
				});
				app.updateLoginStateInfo('profession',profession);
			}else{
				mui.hideLoading();
				mui.toast(jsonObj.errmsg);
			}
		}else{
			mui.hideLoading();
			mui.toast("程序错误！");
		}
	},'json');
}
//修改生日
function changeBirthday(rs){
	mui.showLoading("正在修改.."); 
	//var phone = app.getLoginState('LOGINSTATE').phone;
	var birthday = rs.text;
	var serviceParams = '{memberInfoId:"'+memberInfoId+'",birthday:"'+birthday+'"}';
	var params1="['{"+
		'"token":"'+appUserToken+'",'+
		'"serviceName":"295E9326D0A3D1A556626763F008F551",'+
		'"serviceParams":'+serviceParams+
	"}']";
	mui.post(esbProxyRequestStaticURL+"/map/member",{"params":params1},function(data){
		var jsonObj = eval('(' + data.result + ')');
		if(jsonObj){
			if(jsonObj.ok){
				mui.hideLoading(function(){
					mui.toast("修改生日成功！");
				});
				app.updateLoginStateInfo('birthday',birthday);
			}else{
				mui.hideLoading();
				mui.toast(jsonObj.errmsg);
			}
		}else{
			mui.hideLoading();
			mui.toast("程序错误！");
		}
	},'json');
};
//修改性别
function changeSex(e){
	mui.showLoading("正在修改.."); 
	//var phone = app.getLoginState('LOGINSTATE').phone;
	var sex = e.target.getAttribute("data-text");
	var serviceParams = '{memberInfoId:"'+memberInfoId+'",sex:"'+sex+'"}';
	var params1="['{"+
		'"token":"'+appUserToken+'",'+
		'"serviceName":"295E9326D0A3D1A556626763F008F551",'+
		'"serviceParams":'+serviceParams+
	"}']";
	mui.post(esbProxyRequestStaticURL+"/map/member",{"params":params1},function(data){
		var jsonObj = eval('(' + data.result + ')');
		if(jsonObj){
			if(jsonObj.ok){
				mui.hideLoading(function(){
					mui.toast("修改性别成功！");
				});
				app.updateLoginStateInfo('sex',sex);
			}else{
				mui.hideLoading();
				mui.toast(jsonObj.errmsg);
			}
		}else{
			mui.hideLoading();
			mui.toast("程序错误！");
		}
	},'json');
}
//修改所在地址
function changeLocation(items){
	mui.showLoading("正在修改.."); 
	//var phone = app.getLoginState('LOGINSTATE').phone;
	var location = _getParam(items[0], 'text') + " " + _getParam(items[1], 'text') + " " + _getParam(items[2], 'text');
	var serviceParams = '{memberInfoId:"'+memberInfoId+'",location:"'+location+'"}';
	var params1="['{"+
		'"token":"'+appUserToken+'",'+
		'"serviceName":"295E9326D0A3D1A556626763F008F551",'+
		'"serviceParams":'+serviceParams+
	"}']";
	mui.post(esbProxyRequestStaticURL+"/map/member",{"params":params1},function(data){
		var jsonObj = eval('(' + data.result + ')');
		if(jsonObj){
			if(jsonObj.ok){
				mui.hideLoading(function(){
					mui.toast("修改所在地成功！");
				});
				app.updateLoginStateInfo('location',location);
			}else{
				mui.hideLoading();
				mui.toast(jsonObj.errmsg);
			}
		}else{
			mui.hideLoading();
			mui.toast("程序错误！");
		}
	},'json');
}


/**
 * 个人信息头像文件上传、修改
 */
//运用html画布压缩尺寸
function readData(evt) {
	mui.showLoading("正在修改.."); 
	evt.stopPropagation();  
	evt.preventDefault();  
    var file = evt.dataTransfer !== undefined ? evt.dataTransfer.files[0] : evt.target.files[0];  
    if (!file.type.match(/image.*/)) {return;}  
    var reader = new FileReader();
    reader.onload = (function(){
        return function(e){
            var img = new Image();
            img.src = e.target.result;  
              
            img.onload = (function(){  
                  
                var canvas = document.createElement('canvas');  
                canvas.width = 300;  
                canvas.height = 300;  
                  
                var ctx = canvas.getContext("2d");   
                  
                ctx.clearRect(0, 0, canvas.width, canvas.height); // canvas清屏  
                  
                //重置canvans宽高 canvas.width = img.width; canvas.height = img.height;  
                  
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // 将图像绘制到canvas上   
                  
                canvas.toDataURL("image/jpeg");//必须等压缩完才读取canvas值，否则canvas内容是黑帆布  
                /**如果传入的类型非“image/png”，但是返回的值以“data:image/png”开头，那么该传入的类型是不支持的。Chrome支持“image/webp”类型。
                 * canvas.toDataURL(type, encoderOptions);
                 * type 可选
				 * 图片格式，默认为 image/png
				 * encoderOptions 可选
				 * 在指定图片格式为 image/jpeg 或 image/webp的情况下，可以从 0 到 1 的区间内选择图片的质量。如果超出取值范围，将会使用默认值 0.92。其他参数会被忽略。
                 * */  
                cropAndUploadImage(canvas.toDataURL("image/jpeg"));  
            });  
        }  
    })(file);  
  
    reader.readAsDataURL(file);  
          
}  

function cropAndUploadImage(base64){  
	document.getElementById("photoImg").setAttribute("src", base64);    
    var b64 = base64.split(",")[1];//去除base64编码 前置编码
    /**ajax 提交图片base64编码到后台上传图片，更新用户信息上的图片地址 ，图片上传方法为FtpCilentUtil的uploadImageByBase64*/
    //var phone = app.getLoginState('LOGINSTATE').phone;
    var serviceParams = '{memberInfoId:"'+memberInfoId+'",b64:"'+b64+'"}';
	var params1="['{"+
		'"token":"'+appUserToken+'",'+
		'"serviceName":"295E9326D0A3D1A556626763F008F551",'+
		'"serviceParams":'+serviceParams+
	"}']";
	mui.post(esbProxyRequestStaticURL+"/map/member",{"params":params1},function(data){
		var jsonObj = eval('(' + data.result + ')');
		if(jsonObj){
			if(jsonObj.ok){
				mui.hideLoading(function(){
					app.setLoginState(jsonObj.result);
					mui.toast("修改头像成功！");
				});
			}else{
				mui.hideLoading();
				mui.toast(jsonObj.errmsg);
			}
		}else{
			mui.hideLoading();
			mui.toast("程序错误！");
		}
	},'json');
}