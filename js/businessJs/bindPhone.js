/**
 * wx登录用户绑定手机号
 */


/**监听保存手机号事件*/
var bindPhoneButton=document.getElementById("editPhoneButton");
bindPhoneButton.addEventListener("tap",function(event){
		editPhone();
	}); 

/**用户设置js*/
var _countdown=60; 

/**绑定手机号，获取短信验证码*/
function getEditPhoneValidateCode(self){
	var memberInfo=app.getLoginState();
	if(memberInfo&&memberInfo.phone&&memberInfo.id){
		mui.openWindow({
			url:'../index.html'
		});
	}
	var newPhoneBox=document.getElementById("editNewPhone");
	var newPhone=newPhoneBox.value;
	var myreg=/^[1][3,4,5,7,8,9][0-9]{9}$/;  
    if (!myreg.test(newPhone)) {
    	 mui.toast("请输入正确手机号"); return;  
    }	
	var serviceParams='{phone:"'+newPhone+'",wxOpenId:"'+memberInfo.wxOpenId+'"}';
	var params1="['{"+
					'"token":"'+appUserToken+'",'+
					'"serviceName":"1C4E3E4C3C1B7928BEBB9974CB6841E2",'+
					'"serviceParams":'+serviceParams+
				"}']";
//	倒计时
	settime(self);
	mui.ajax(esbProxyRequestStaticURL+"/map/verificationCode",
			{
				data:{"params":params1},
				dataType:'json',//服务器返回json格式数据
				type:'post',//HTTP请求类型
				success:function(data){
					var jsonObj=eval('(' + data.result + ')');
					if(jsonObj){
						if(jsonObj.ok){
							mui.toast("获取验证码成功");
						}else{
							mui.toast(jsonObj.errmsg);
						}
					}else{
						mui.toast("程序错误！");
					}
				},
				error:function(data){
					mui.alert("超时或其他原因");
				}
		});
}
/**验证码倒计时 */
function settime(self) { 
    if (_countdown == 0) { 
    	_countdown = 60; 
    	//vm.isClick = false;
    	self.lastElementChild.style.display="none";
    	self.removeAttribute("disabled");    
    	self.firstElementChild.innerHTML = "获取验证码";
        self.lastElementChild.innerHTML = _countdown;
        return;
    } else { 
    	//vm.isClick = true;
    	self.lastElementChild.style.display="inline-block";
    	self.setAttribute("disabled", "disabled"); 
        self.firstElementChild.innerHTML = "重新发送";
        self.lastElementChild.innerHTML = _countdown;
        //self.value="重新发送(" + countdown + ")"; 
        _countdown--; 
    } 
setTimeout(function() { 
    settime(self) }
    ,1000) 
}
/**绑定手机号*/
function editPhone(){
	var memberInfo=app.getLoginState();
	if(memberInfo&&memberInfo.phone&&memberInfo.id){
		mui.openWindow({
			url:'../index.html' 
		}); 
	}
	var wxOpenId=memberInfo.wxOpenId;
	var newPhoneBox=document.getElementById("editNewPhone");
	var newPhone=newPhoneBox.value;
	var validateCode= document.getElementById("editphoneVidateCode").value;
	
	var myreg=/^[1][3,4,5,7,8,9][0-9]{9}$/;  
    if (!myreg.test(newPhone)) {
    	 mui.toast("请输入正确手机号"); return;  
    }
	if(!validateCode){mui.toast("请输入验证码"); return;}
	var serviceParams='{wxOpenId:"'+ wxOpenId+'",phone:"'+newPhone+'",identifyCode:"'+validateCode+'"}';
	var params1="['{"+
					'"token":"'+appUserToken+'",'+
					'"serviceName":"3AAE29BD98DD134037B77781CED04011",'+
					'"serviceParams":'+serviceParams+
				"}']";
	mui.ajax(esbProxyRequestStaticURL+"/map/member",
			{
				data:{"params":params1},
				dataType:'json',//服务器返回json格式数据
				type:'post',//HTTP请求类型
				success:function(data){
					//服务器返回响应，根据响应结果，分析是否登录成功；
					var jsonObj=eval('(' + data.result + ')');
					if(jsonObj){
						if(jsonObj.ok){
							app.setLoginState(jsonObj.result);//持久化登录状态
							mui.alert("手机号绑定成功。","提示",['确认'],function(e){
										mui.openWindow({
											url:'../index.html'
										});
							});
						}else{
							mui.toast(jsonObj.errmsg);
						}
					}else{
						mui.toast("程序错误！");
					}
				},
				error:function(data){
					mui.toast("超时或其他原因");
				}
		});
}
