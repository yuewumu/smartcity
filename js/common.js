(function($, common) {
	/**持久化 登录信息*/
	common.setLoginState=function(loginState){
		if(mui.os.plus){
			//app环境
			localStorage.setItem("LOGINSTATE",JSON.stringify(loginState));
		}else{
			//网页环境
			sessionStorage.setItem("LOGINSTATE",JSON.stringify(loginState));
		}
	};
	/**获取登录信息*/
	common.getLoginState=function(){
		var loginState;
		if(mui.os.plus){
			//app环境
			 loginState = localStorage.getItem('LOGINSTATE') || "{}";
		}else{
			 //网页环境
			 loginState = sessionStorage.getItem('LOGINSTATE') || "{}";
			
		}
		return JSON.parse(loginState);
	};
	/**保存登录信息持久化操作*/
	common.createLoginState=function(memberInfoObj){
		var loginState=common.getLoginState();
		loginState.accunt=memberInfoObj.phone;
		loginState.memberInfo=memberInfoObj;
		common.setLoginState(loginState);
	};
	/**效验是否登录状态*/
	common.isLoginFlag=function(){
		var loginState=common.getLoginState();
		if(loginState&&(loginState.id||loginState.wxOpenId)){//已登录
			return true;
		}else{//未登录
			var isFlag=false;
			var wxOpenId=getUrlParam("wxOpenId");
			if(wxOpenId){
				var serviceParams='{wxOpenId:"'+wxOpenId+'"}';
				var params1="['{"+
								'"token":"'+appUserToken+'",'+
								'"serviceName":"5705F1E121CB6147E0475053A1F4B755",'+
								'"serviceParams":'+serviceParams+
							"}']";
				mui.ajax(esbProxyRequestStaticURL+"/map/member",
					{
						data:{"params":params1},
						dataType:'json',//服务器返回json格式数据
						type:'post',//HTTP请求类型
						async:false,
						success:function(data){
							//服务器返回响应，根据响应结果，分析是否登录成功；
							var jsonObj=eval('(' + data.result + ')');
							if(jsonObj){
								if(jsonObj.ok){
									app.setLoginState(jsonObj.result);//持久化登录状态
									isFlag=true;
								}else{
									mui.toast(jsonObj.errmsg+"请重新登录");
									isFlag=false;
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
				return isFlag;
			}
	};
	/**退出登录*/
	common.signOut=function(callback){
		var loginState=common.setLoginState("");
		return callback();
	};
	/** 通过键值跟新登录信息中对应键信息 */
	common.updateLoginStateInfo = function(key,value){
		var loginState = common.getLoginState();
		loginState[key] = value;
		if(mui.os.plus){
			//app环境
			localStorage.setItem("LOGINSTATE",JSON.stringify(loginState));
		}else{
			//网页环境
			sessionStorage.setItem("LOGINSTATE",JSON.stringify(loginState));
		}
	};
	/** 判断是否绑定了手机号*/
	common.isBindPhone=function(){
		var loginState=common.getLoginState();
		if(loginState&&loginState.wxOpenId){
			if(loginState&&loginState.id&&loginState.phone){//已绑定
				return true;
			}else{//未绑定
					mui.openWindow({
						id:"bindPhone",
						url:'bindPhone.html'
					});
					return false;
			}
		}
	};
	
}(mui, window.app = {}));

//扩展mui.showLoading
(function($, window) {
    //显示加载框
    $.showLoading = function(message,type) {
        if ($.os.plus && type !== 'div') {
            $.plusReady(function() {
                plus.nativeUI.showWaiting(message);
            });
        } else {
            var html = '';
            html += '<i class="mui-spinner mui-spinner-white"></i>';
            html += '<p class="text">' + (message || "数据加载中") + '</p>';

            //遮罩层
            var mask=document.getElementsByClassName("mui-show-loading-mask");
            if(mask.length==0){
                mask = document.createElement('div');
                mask.classList.add("mui-show-loading-mask");
                document.body.appendChild(mask);
                mask.addEventListener("touchmove", function(e){e.stopPropagation();e.preventDefault();});
            }else{
                mask[0].classList.remove("mui-show-loading-mask-hidden");
            }
            //加载框
            var toast=document.getElementsByClassName("mui-show-loading");
            if(toast.length==0){
                toast = document.createElement('div');
                toast.classList.add("mui-show-loading");
                toast.classList.add('loading-visible');
                document.body.appendChild(toast);
                toast.innerHTML = html;
                toast.addEventListener("touchmove", function(e){e.stopPropagation();e.preventDefault();});
            }else{
                toast[0].innerHTML = html;
                toast[0].classList.add("loading-visible");
            }
        }   
    };
     //隐藏加载框
      $.hideLoading = function(callback) {
        if ($.os.plus) {
            $.plusReady(function() {
                plus.nativeUI.closeWaiting();
                callback && callback();
            });
        } 
        var mask=document.getElementsByClassName("mui-show-loading-mask");
        var toast=document.getElementsByClassName("mui-show-loading");
        if(mask.length>0){
            mask[0].classList.add("mui-show-loading-mask-hidden");
        }
        if(toast.length>0){
            toast[0].classList.remove("loading-visible");
            callback && callback();
        }
      }
})(mui, window);

/**
 * 封装hasClass方法
 * https://segmentfault.com/q/1010000002501794/a-1020000002511152
 */
var _hasClass = (function(){
    var div = document.createElement("div");
    if( "classList" in div && typeof div.classList.contains === "function" ) {
        return function(elem, className){
            return elem.classList.contains(className) ;
        } ;
    } else {
        return function(elem, className){
            var classes = elem.className.split(/\s+/) ;
            for(var i= 0 ; i < classes.length ; i ++) {
                if( classes[i] === className ) {
                    return true ;
                }
            }
            return false ;
        } ;
    }
})() ;
/**
 * 获取对象属性的值
 * 主要用于过滤三级联动中，可能出现的最低级的数据不存在的情况，实际开发中需要注意这一点；
 * @param {Object} obj 对象
 * @param {String} param 属性名
 */
var _getParam = function(obj, param) {
	return obj[param] || '';
};
/**
 * 根据值删除数组中的一项
 */
Array.prototype.remove = function(val){
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
}
/**
 * 从url上获取参数 
 * http://xxx.com?A=a1&B=b1
 * 传入A ，从url上获取到a1
 * @param name
 * @returns
 */
function getUrlParam (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r!= null) {
       return decodeURI(r[2]);
    }else{
       return null;
    }
}  
/**
 * 清除字符串两端空格，包含换行符、制表符
 * http://www.jb51.net/article/109522.htm
 */
if (!String.prototype.trim){
	 String.prototype.trim = function () { 
	  return this.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, "");
	 }
}
/**
 * 去掉字符串中所有空格，第二个参数需为g
 * @param str
 * @param is_global 
 * @returns 去除空格的字符串 
 */
function _trim(str,is_global){
 if(!str)
	 return;
 var result;
 result = str.replace(/(^\s+)|(\s+$)/g,"");
 if(is_global.toLowerCase()=="g")
 {
  result = result.replace(/\s/g,"");
  }
 return result;
}

/**
 * 图片压缩处理，默认同比例压缩
 * @param  path 
 *   pc端传入的路径可以为相对路径，但是在移动端上必须传入的路径是照相图片储存的绝对路径
 *   也可以为图片的base64字符串数据
 * @param {Object} obj
 *   obj 对象 有 width， height， quality(0-1) obj为null或“”时，直接按原图比例压缩图片
 *  return 返回base64的字符串数据
 */
function dealCompressImage(path, obj,callback){
	 var img = new Image();
	 img.src = path;
	 img.onload = function(){
		  var that = this;
		  // 默认按比例压缩
		  var w = that.width;
		  var h = that.height;
		   scale = w / h;
		   if(obj){
			   w = obj.width || w;
			   h = obj.height || (w / scale);
		   }
		  var quality = 0.7;  // 默认图片质量为0.7
		  //生成canvas
		  var canvas = document.createElement('canvas');
		  var ctx = canvas.getContext('2d');
		  // 创建属性节点
		  var anw = document.createAttribute("width");
		  anw.nodeValue = w;
		  var anh = document.createAttribute("height");
		  anh.nodeValue = h;
		  canvas.setAttributeNode(anw);
		  canvas.setAttributeNode(anh); 
		  ctx.drawImage(that, 0, 0, w, h);
		  // 图像质量
		  if(obj&&obj.quality && obj.quality <= 1 && obj.quality > 0){
		   quality = obj.quality;
		  }
		  // quality值越小，所绘制出的图像越模糊
		  var base64 = canvas.toDataURL('image/jpeg', quality );
		  // 回调函数返回base64的值
		  return callback(base64);
	 };
}