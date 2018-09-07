/**用户设置js*/
var _countdown=60; 
/**密码修改*/
function pwdEdit(){
	var memberInfo=app.getLoginState();
	if(!memberInfo||!memberInfo.id){
		mui.openWindow({
			url:'login.html'
		});
	}
	var memberInfoId=memberInfo.id;
	var oldPwdBox = document.getElementById('oldPwd');
	var newPwdBox = document.getElementById('newPwd');
	var oldPwd=oldPwdBox.value;
	var newPwd=newPwdBox.value;
	if(!oldPwd){
		mui.toast("请输入旧密码"); return false;
	}
	if(!newPwd){
		mui.toast("请输入新密码"); return false;
	}
	if(oldPwd == newPwd){
		mui.toast("新密码不能和旧密码相同"); return false;
	}
	var serviceParams='{oldPwd:"'+oldPwd+'",newPwd:"'+newPwd+'",memberInfoId:"'+memberInfoId+'"}';
	var params1="['{"+
					'"token":"'+appUserToken+'",'+
					'"serviceName":"E54A40903CF94EFADBC158B54CF180E6",'+
					'"serviceParams":'+serviceParams+
				"}']";
	
		mui.ajax(esbProxyRequestStaticURL+"/map/member",
			{
				data:{"params":params1},
				dataType:'json',//服务器返回json格式数据
				type:'post',//HTTP请求类型
				//timeout:10000,//超时时间设置为10秒；
				success:function(data){
					//服务器返回响应，根据响应结果，分析是否登录成功；
					var jsonObj=eval('(' + data.result + ')');
					if(jsonObj){
						if(jsonObj.ok){
							mui.alert("密码修改成功，请重新登录。","提示",['确认'],function(e){
								app.signOut(function(){
									mui.openWindow({
										url:'login.html'
									});
								})
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
/**修改手机号，获取短信验证码*/
function getEditPhoneValidateCode(self){
	var memberInfo=app.getLoginState();
	if(!memberInfo||!memberInfo.phone){
		mui.openWindow({
			url:'login.html'
		});
	}
	var newPhoneBox=document.getElementById("editNewPhone");
	var newPhone=newPhoneBox.value;
	var myreg=/^[1][3,4,5,7,8,9][0-9]{9}$/;  
    if (!myreg.test(newPhone)) {
    	 mui.toast("请输入正确手机号"); return;  
    }	
	var serviceParams='{phone:'+newPhone+'}';
	var params1="['{"+
					'"token":"'+appUserToken+'",'+
					'"serviceName":"7D45EF52AFF5D58C2D77FB37CE8A44C0",'+
					'"serviceParams":'+serviceParams+
				"}']";
//	倒计时
	settime(self);
	mui.ajax(esbProxyRequestStaticURL+"/map/verificationCode",
			{
				data:{"params":params1},
				dataType:'json',//服务器返回json格式数据
				type:'post',//HTTP请求类型
				//timeout:10000,//超时时间设置为10秒；
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
    	vm.isClick = false;
    	self.removeAttribute("disabled");    
    	self.firstElementChild.innerHTML = "获取验证码";
        self.lastElementChild.innerHTML = _countdown;
        return;
    } else { 
    	vm.isClick = true;
    	self.setAttribute("disabled", true); 
        self.firstElementChild.innerHTML = "重新发送";
        self.lastElementChild.innerHTML = _countdown;
        //self.value="重新发送(" + countdown + ")"; 
        _countdown--; 
    } 
setTimeout(function() { 
    settime(self) }
    ,1000) 
}
/**修改手机号*/
function editPhone(){
	var memberInfo=app.getLoginState();
	if(!memberInfo||!memberInfo.phone){
		mui.openWindow({
			url:'login.html'
		});
	}
	var memberPhone=memberInfo.phone;
	var newPhoneBox=document.getElementById("editNewPhone");
	var newPhone=newPhoneBox.value;
	var validateCode= document.getElementById("editphoneVidateCode");
	
	var myreg=/^[1][3,4,5,7,8,9][0-9]{9}$/;  
    if (!myreg.test(newPhone)) {
    	 mui.toast("请输入正确手机号"); return;  
    }
	if(!validateCode){mui.toast("请输入验证码"); return;}
	var serviceParams='{memberInfoId:"'+ memberInfoId+'",oldPhone:"'+memberPhone+'",newPhone:"'+newPhone+'",identifyCode:"'+validateCode+'"}';
	var params1="['{"+
					'"token":"'+appUserToken+'",'+
					'"serviceName":"A1553732E0E1D7A3893223376E7C3A9D",'+
					'"serviceParams":'+serviceParams+
				"}']";
	mui.ajax(esbProxyRequestStaticURL+"/map/member",
			{
				data:{"params":params1},
				dataType:'json',//服务器返回json格式数据
				type:'post',//HTTP请求类型
				//timeout:10000,//超时时间设置为10秒；
				success:function(data){
					//服务器返回响应，根据响应结果，分析是否登录成功；
					var jsonObj=eval('(' + data.result + ')');
					if(jsonObj){
						if(jsonObj.ok){
							mui.alert("手机号修改成功，请重新登录。","提示",['确认'],function(e){
									app.signOut(function(){
										mui.openWindow({
											url:'login.html'
										});
									})
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
//清除修改密码输入框
function clearEditPwdFrom(){
	var oldPwdBox=document.getElementById("oldPwd");
	var newPwdBox=document.getElementById("newPwd");
	oldPwdBox.value="";
	newPwdBox.value="";
}
//清除修改手机号输入框
function clearEditPhoneFrom(){
	var editNewPhoneBox=document.getElementById("editNewPhone");
	var editphoneVidateCodeBox=document.getElementById("editphoneVidateCode");
	editNewPhoneBox.value="";
	editphoneVidateCodeBox.value="";
}