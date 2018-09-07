/**
 * 登录主页面相关代码
 **/
(function($) {
	
		//登录监听
		var loginBox = document.getElementById('loginButton');
		loginBox.addEventListener("tap",function(){
			var accountBox = document.getElementById('LoginAccount');
			var passwordBox = document.getElementById('LoginPassword');
			var phone=accountBox.value;
			var password=passwordBox.value;
			var myreg=/^[1][3,4,5,7,8,9][0-9]{9}$/;  
	        if (!myreg.test(phone)) {
	        	 mui.toast("请输入正确手机号"); return;  
	        }
			if(!password){mui.toast("请输入密码"); return;}
			var serviceParams='{phone:"'+phone+'",password:"'+password+'"}';
			var params1="['{"+
							'"token":"'+appUserToken+'",'+
							'"serviceName":"51861F3F986B896E4D9DACBC7F05B14D",'+
							'"serviceParams":'+serviceParams+
						"}']";
			mui.ajax(esbProxyRequestStaticURL+"/map/loginData",
				{
					data:{"params":params1},
					dataType:'json',//服务器返回json格式数据
					type:'post',//HTTP请求类型
					timeout:10000,//超时时间设置为10秒；
					success:function(data){
						//服务器返回响应，根据响应结果，分析是否登录成功；
						var jsonObj=eval('(' + data.result + ')');
						//console.log(jsonObj);
						if(jsonObj){
							if(jsonObj.ok){
								//mui.toast("正确返回");
								app.setLoginState(jsonObj.result);//持久化登录状态
								mui.openWindow({
									url:'../index.html'
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
		});
		
		//获取注册验证码
		var regVidateCodeButton = document.getElementById("getRegVidateCode");
		regVidateCodeButton.addEventListener('tap', function(event) {
				var accountBox = document.getElementById('RegAccount');
				var phone=accountBox.value;
				var myreg=/^[1][3,4,5,7,8,9][0-9]{9}$/;  
		        if (!myreg.test(phone)) {
		        	 mui.toast("请输入正确手机号"); return;  
		        }	
				var serviceParams='{phone:'+phone+'}';
				var params1="['{"+
								'"token":"'+appUserToken+'",'+
								'"serviceName":"2258235C0301AE58649288D6992079F6",'+
								'"serviceParams":'+serviceParams+
							"}']";
				mui.ajax(esbProxyRequestStaticURL+"/map/verificationCode",
					{
						data:{"params":params1},
						dataType:'json',//服务器返回json格式数据
						type:'post',//HTTP请求类型
						timeout:10000,//超时时间设置为10秒；
						//headers:{'Content-Type':'application/json'},//加入此句，后台接收不到data传递的参数
						success:function(data){
							//服务器返回响应，根据响应结果，分析是否登录成功；
							//console.log(data);
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
		});
		
			//注册
			var regButton = document.getElementById('regButton');
			regButton.addEventListener('tap', function(event) {
				var accountBox = document.getElementById('RegAccount');
				var passwordBox = document.getElementById('RegPassword');
				var password_confirmBox=document.getElementById('RegPassword_confirm');
				var validateCodeBox=document.getElementById('RegVidateCode');
				
				var phone=accountBox.value;
				var password=passwordBox.value;
				var password_confirm=password_confirmBox.value;
				var validateCode=validateCodeBox.value;
				var myreg=/^[1][3,4,5,7,8,9][0-9]{9}$/;  
		        if (!myreg.test(phone)) {
		        	 mui.toast("请输入正确手机号"); return;  
		        }
				if(!password){mui.toast("请输入密码"); return;}
				if(password!=password_confirm){mui.toast("两次输入密码不一致"); return;}
				if(!validateCode){mui.toast("请输入验证码"); return;}
				
				var serviceParams='{phone:"'+phone+'",password:"'+password+'",identifyCode:"'+validateCode+'"}';
				
				var params1="['{"+
								'"token":"'+appUserToken+'",'+
								'"serviceName":"A08348645D4AEFA0D64D2ABA40CD7097",'+
								'"serviceParams":'+serviceParams+
							"}']";
				mui.ajax(esbProxyRequestStaticURL+"/map/loginData",
					{
						data:{"params":params1},
						dataType:'json',//服务器返回json格式数据
						type:'post',//HTTP请求类型
						timeout:10000,//超时时间设置为10秒；
						//headers:{'Content-Type':'application/json'},//加入此句，后台接收不到data传递的参数
						success:function(data){
							//服务器返回响应，根据响应结果，分析是否登录成功；
							//console.log(data);
							var jsonObj=eval('(' + data.result + ')');
							if(jsonObj){
								if(jsonObj.ok){
									//mui.toast("回到登录页");
									mui.alert("注册成功");
									accountBox.value="";
									passwordBox.vlue="";
									validateCodeBox.value="";
									mui.back();
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
			});
			
			//获取找回密码注册码
		 	var backVidateCodeButton = document.getElementById("getBackVidateCode");
		 	backVidateCodeButton.addEventListener('tap', function(event) {
				var accountBox = document.getElementById('BackAccount');
				var phone=accountBox.value;
				var myreg=/^[1][3,4,5,7,8,9][0-9]{9}$/;  
		        if (!myreg.test(phone)) {
		        	 mui.toast("请输入正确手机号"); return;  
		        }				
				var serviceParams='{phone:"'+phone+'"}';
				var params1="['{"+
								'"token":"'+appUserToken+'",'+
								'"serviceName":"AF37206AC8AF98E9E5415B14F0F7A91B",'+
								'"serviceParams":'+serviceParams+
							"}']";
				mui.ajax(esbProxyRequestStaticURL+"/map/verificationCode",
					{
						data:{"params":params1},
						dataType:'json',//服务器返回json格式数据
						type:'post',//HTTP请求类型
						timeout:10000,//超时时间设置为10秒；
						//headers:{'Content-Type':'application/json'},//加入此句，后台接收不到data传递的参数
						success:function(data){
							//服务器返回响应，根据响应结果，分析是否登录成功；
							//console.log(data);
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
			});
		 	
		 	//找回密码
		 	var backPwdButton = document.getElementById('backButton');
		 	backPwdButton.addEventListener('tap', function(event) {
				var accountBox = document.getElementById('BackAccount');
				var passwordBox = document.getElementById('BackPassword');
				var validateCodeBox=document.getElementById('BackVidateCode');
				
				var phone=accountBox.value;
				var password=passwordBox.value;
				var validateCode=validateCodeBox.value;
				var myreg=/^[1][3,4,5,7,8,9][0-9]{9}$/;  
		        if (!myreg.test(phone)) {
		        	 mui.toast("请输入正确手机号"); return;  
		        }
				if(!password){mui.toast("请输入密码"); return;}
				if(!validateCode){mui.toast("请输入验证码"); return;}
				
				var serviceParams='{phone:"'+accountBox.value+'",password:"'+passwordBox.value+'",identifyCode:"'+validateCodeBox.value+'"}';
				
				var params1="['{"+
								'"token":"'+appUserToken+'",'+
								'"serviceName":"756CEFC6920320B2E4C537754DBB0425",'+
								'"serviceParams":'+serviceParams+
							"}']";
				mui.ajax(esbProxyRequestStaticURL+"/map/loginData",
					{
						data:{"params":params1},
						dataType:'json',//服务器返回json格式数据
						type:'post',//HTTP请求类型
						timeout:10000,//超时时间设置为10秒；
						//headers:{'Content-Type':'application/json'},//加入此句，后台接收不到data传递的参数
						success:function(data){
							//服务器返回响应，根据响应结果，分析是否登录成功；
							//console.log(data);
							var jsonObj=eval('(' + data.result + ')');
							if(jsonObj){
								if(jsonObj.ok){
									//mui.toast("回到登录页");
									accountBox.value="";
									passwordBox.vlue="";
									validateCodeBox.value="";
									mui.back();
									window.reload();
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
			});
}(mui));