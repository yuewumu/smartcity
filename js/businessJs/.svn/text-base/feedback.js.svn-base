/**反馈意见js*/
(function() {
	var index = 1;
	var imageIndexIdNum = 0;
	var maxUploadImageNum=3;//最大图片上传数
	var feedback = {
		question: document.getElementById('question'), 
		imageList: document.getElementById('image-list'),
		submitBtn: document.getElementById('submit')
	};  
	feedback.files = [];
	feedback.uploader = null;  
	feedback.deviceInfo = null; 
	/**
	 *提交成功之后，恢复表单项 
	 */
	feedback.clearForm = function() {
		feedback.question.value = '';
		feedback.imageList.innerHTML = '';
		feedback.newPlaceholder();
		feedback.files = [];
		index = 0;
		imageIndexIdNum = 0;
	};
	
	feedback.getFileInputArray = function() {
		return [].slice.call(feedback.imageList.querySelectorAll('.file'));
	};
	feedback.addFile = function(path) {
		feedback.files.push({name:"images"+index,path:path,id:"img-"+index});
		index++;
	};
	/**
	 * 初始化图片域占位
	 */
	feedback.newPlaceholder = function() {
		var fileInputArray = feedback.getFileInputArray();
		if (fileInputArray &&
			fileInputArray.length > 0 &&
			fileInputArray[fileInputArray.length - 1].parentNode.classList.contains('space')) {
			return;
		};
		imageIndexIdNum++;
		//创建图片区域
		var placeholder = document.createElement('div');
		placeholder.setAttribute('class', 'image-item space');
		//创建图片 "+" 代表上传
		var up = document.createElement("div");
		up.setAttribute('class','image-up');
		//创建删除“X”图片
		var closeButton = document.createElement('div');
		closeButton.setAttribute('class', 'image-close');
		closeButton.innerHTML = 'X';
		closeButton.id = "img-"+index;
		
		//创建“input file”
		var inputFile=document.createElement('input');
		inputFile.setAttribute('type','file');
		inputFile.setAttribute('id','imageFile-'+imageIndexIdNum);
		inputFile.setAttribute('class', 'file');
		inputFile.setAttribute('accept', 'image/*');
		inputFile.setAttribute('name', 'uploadPic');
		
		//小X的点击事件
		closeButton.addEventListener('tap', function(event) {
			setTimeout(function() {
				for(var temp=0;temp<feedback.files.length;temp++){
					if(feedback.files[temp].id==closeButton.id){
						feedback.files.splice(temp,1);
					}
				}
				feedback.imageList.removeChild(placeholder);
				if(feedback.files.length<maxUploadImageNum){
					//当上传图片小于定义的图片最大数量的时候，添加新的上传图片区域
					feedback.newPlaceholder();
				}
			}, 0);
			return false;
		}, false);
		//"+"的事件
		inputFile.addEventListener('change', function(event){
			var self = this;
			var index = (this.id).substr(-1);
			event.stopPropagation();  
			event.preventDefault();  
		    var file = event.dataTransfer !== undefined ? event.dataTransfer.files[0] : event.target.files[0];  
		    if (!file.type.match(/image.*/)) {return;}  
		    var reader = new FileReader();
		    
		    reader.onload = (function(){
		        return function(e){
		        			//压缩图片处理
		        			dealCompressImage(e.target.result,{wight:800},function(base64Str){
		        				//上传图片
			        			//var fileFtpUrl=uploadImage4Base64(base64Str);
			        			
			        			//图片显示界面处理
				            	if (!self.parentNode.classList.contains('space')) { //已有图片
									feedback.files.splice(index-1,1,{name:"images"+index,path:base64Str});
								} else { //加号
									placeholder.classList.remove('space');
									feedback.addFile(base64Str);
									if(feedback.files.length<maxUploadImageNum){
										//当上传图片小于定义的图片最大数量的时候，添加新的上传图片区域
										feedback.newPlaceholder();
									}
								}
								up.classList.remove('image-up');
								placeholder.style.backgroundImage = 'url(' + base64Str + ')';
		        			});
		        	}
		        })(file);
		    
		    reader.readAsDataURL(file);  
			
		});
		
		placeholder.appendChild(closeButton);
		placeholder.appendChild(up);
		placeholder.appendChild(inputFile);
		feedback.imageList.appendChild(placeholder);
	};
	feedback.newPlaceholder();
	
	//提交监听
	feedback.submitBtn.addEventListener('tap', function(event) {
		mui.showLoading("正在提交..");
		if(!feedback.question.value){
			mui.hideLoading();
			return mui.toast('请输入你宝贵的意见');
		}
		if (feedback.question.value.length > 200) {
			mui.hideLoading();
			return mui.toast('信息超长,请重新填写~');
		}
		//组装数据
		var member=app.getLoginState();
		var memberId=member.id;
		
		var imageArr=feedback.files;
		var imageStr="";
		for(var i=0;i<imageArr.length;i++){
			imageStr+=imageArr[i].path+";;";
		}
		
		if(imageStr.length>0){
			imageStr.substring(0, imageStr.length-2);
		}
		
		feedback.send(feedback.question.value,imageStr,memberId); 
//		mui.hideLoading();
	}, false);
	
	feedback.send = function(content,imagerStr,memberId) {
		var serviceParams='{content:"'+content+'",images:"'+imagerStr+'",memberInfoId:"'+memberId+'"}';
		var params1="['{"+
						'"token":"'+appUserToken+'",'+
						'"serviceName":"79E36F7C5FCDD3EB93D07A3B43209CD5",'+
						'"serviceParams":'+serviceParams+
					"}']";
		mui.post(esbProxyRequestStaticURL+"/map/member",{"params":params1},function(data){
			mui.hideLoading();
			//服务器返回响应，根据响应结果，分析是否成功；
			mui.alert("感谢反馈，点击确定关闭","问题反馈","确定",function () {
				feedback.clearForm();
				mui.back();
			});
			
		},'json'
	);
		
		
	};
	
  	//选择快捷输入
	mui('.mui-popover').on('tap','li',function(e){
	  document.getElementById("question").value = document.getElementById("question").value + this.children[0].innerHTML;
	  mui('.mui-popover').popover('toggle');
	});
	
})();

