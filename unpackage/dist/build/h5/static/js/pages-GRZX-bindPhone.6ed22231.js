(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-GRZX-bindPhone"],{"0b39":function(e,n,t){var a=t("9c70");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var o=t("4f06").default;o("036674bb",a,!0,{sourceMap:!1,shadowMode:!1})},"19db":function(e,n,t){"use strict";var a=t("0b39"),o=t.n(a);o.a},4158:function(e,n){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAATCAYAAACZZ43PAAAB+ElEQVQ4T63Uv4sTQRQH8O8b3YvgTxA06fwB4rUiiNhdkJR2HjYKNjPZQDBBC61GDhsLiyQwM+AZwUrxH1BIbCyuExXEQi1EuOWwsLiwkGT3yRx7kgu5NYLbDDPz3mces2+XMPUYY04QURlAORsJQD9N0x4z98Iw/DaZQs65w2maVoQQZWb2SXt8IBH1hRC98XjMAJay/SUi8mAvA1954DMzf2Tm10KIvpTy63RVk/N2u30yCAIPXWbm8x4YSCn35yXttueciz2wKaU88N8AY8wlIjo4C0ySZLNWq73d3ptZgXPuIREd90HMvMjMC0KI936epumGUupOLjB5snPuFoAjUko9q6K/3sG8wK5vYS7AWrsex/Fio9H4NV1mHtBqtQ4VCoUvZK19AuCdUqr9L4Ax5iYRVXwfXGDmZ1EUndVap5OIMebYaDRaqNfrPybXtdaiVCp9IKKa72s4554C+CmlvD1PQ1lrVwCcUUotbwGdTudoEARrzHxXKfUyD7HWXgHwiJkvVqvVjS0gq+I0M78BcF8ptToLsdZeJ6IHzFxRSn3yMX+ADCkBeAFgfTAY3Gg2m7Ff73a7+4bD4SoznyKiZSnl9+0DdgB+UWu9t1gs3gNQZ+arRDQG8BzA4yiKVrTWwx0/lJxP9RwAfx+UJMm1MAzXZsX+BpGTEhtPCYDEAAAAAElFTkSuQmCC"},"4f94":function(e,n){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAASCAYAAACAa1QyAAAA7UlEQVQ4T+2SvUrFQBCFZ4YEi5vOKoWNgjaWt7cREd/AMkjYJVa+QbDNA+xOCpE8gC+hjWBl4w+ob6CVkEDIkS0uCP6s7QVPO/MxP+dw27Y7AByAFYqImd/HcTxiVb0TkYOyLF9ikHNuW0TO2Xv/aK3djAGLuvf+KUx6MMZs/UPL94iu62Z938/TNL0uiqL/7OGP5qrqDRExEb0ZY3ajUF3Xkuf5K4BTZj4xxqxFodCgqnsADqdpOquq6vILFHa01m78NXuq+hxSfgHgFsDVb2CSJARgH8AqN00zy7LsWETWAYTjvxUzg4juh2FwH2ZArMyPfTK/AAAAAElFTkSuQmCC"},"91b1":function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var t={data:function(){return{textCode:"获取验证码",phoneNumber:"",captchaCode:"",bindPhoneImg:"",type:"",urlData:""}},onLoad:function(e){uni.showToast({title:"首次授权需要绑定手机号",icon:"none"}),this.type=e.type,this.urlData=e.urlData},methods:{loadImg:function(){var e=this;e.$ChangeImage.GetImage("南平综合出行","绑定手机号").then((function(n){e.bindPhoneImg=n}))},judgeNum:function(e){var n=/^\d+(\.\d+)?$/,t=/^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;return!(!n.test(e)&&!t.test(e))},inputChange1:function(e){var n=e.detail.value;this.judgeNum(n)||uni.showToast({title:"请输入正确的手机号码",icon:"none"});var t=e.currentTarget.dataset.key;this[t]=e.detail.value},inputChange2:function(e){var n=e.detail.value;this.judgeNum(n)||uni.showToast({title:"请输入正确的验证码",icon:"none"});var t=e.currentTarget.dataset.key;this[t]=e.detail.value},bindPhone:function(){this.H5bindPhone()},H5bindPhone:function(){var e=uni.getStorageSync("captchaCode"),n=uni.getStorageSync("wxuserInfo"),t=this.phoneNumber,a=this.captchaCode;null==t||""==t?uni.showToast({title:"请输入手机号码",icon:"none"}):null==a||""==a?uni.showToast({title:"请输入验证码",icon:"none"}):null==e||""==e?uni.showToast({title:"验证码已过期，请重新获取",icon:"none"}):t==e.phone&&a==e.code?this.login("H5",n,t):uni.showToast({title:"验证码输入错误，请重新输入",icon:"none"})},appbindPhone:function(){var e=this,n=uni.getStorageSync("captchaCode"),t=uni.getStorageSync("appUserInfo"),a=e.phoneNumber,o=e.captchaCode;null==a||""==a?uni.showToast({title:"请输入手机号码",icon:"none"}):null==o||""==o?uni.showToast({title:"请输入验证码",icon:"none"}):null==n||""==n?uni.showToast({title:"验证码已过期，请重新获取",icon:"none"}):a==n.phone&&o==n.code?e.login(e.type,t,a):uni.showToast({title:"验证码输入错误，请重新输入",icon:"none"})},login:function(e,n,t){var a=this;uni.showLoading({mask:!0,title:"正在绑定中..."}),uni.request({url:a.$GrzxInter.Interface.login.value,data:{phoneNumber:t,systemname:a.$GrzxInter.systemConfig.appName,openidtype:a.$GrzxInter.systemConfig.openidtype},method:a.$GrzxInter.Interface.login.method,success:function(o){var i=o.data.data,r=new Object;if("appWxLogin"==e)r={userId:i.userId,phoneNumber:t,nickname:n.nickName,address:n.province+n.city,openId_wx:i.openId_wx,gender:n.gender,openId_qq:i.openId_qq,openId_xcx:i.openId_xcx,openId_ios:i.openId_ios,openId_app:n.openId,birthday:i.birthday,autograph:i.autograph,portrait:n.avatarUrl};else if("appQQLogin"==e){var s=0;"男"==n.gender?s=1:"女"==n.gender&&(s=2),r={userId:i.userId,phoneNumber:t,nickname:n.nickName,address:n.province+n.city,openId_wx:i.openId_wx,gender:s,openId_qq:n.openId,openId_xcx:i.openId_xcx,openId_ios:i.openId_ios,openId_app:i.openId_app,birthday:i.birthday,autograph:i.autograph,portrait:n.figureurl_2}}else"H5"==e&&(r={userId:i.userId,phoneNumber:t,nickname:n.nickname,address:n.province+n.city,openId_wx:n.openid,gender:i.gender,openId_qq:i.openId_qq,openId_xcx:i.openId_xcx,openId_ios:i.openId_ios,openId_app:i.openId_app,birthday:i.birthday,autograph:i.autograph,portrait:n.headimgurl});a.changeInfo(r)},fail:function(e){uni.hideLoading()}})},changeInfo:function(n){var t=this;uni.request({url:t.$GrzxInter.Interface.changeInfo.value,data:{userId:n.userId,phoneNumber:n.phoneNumber,nickname:n.nickname,address:n.address,openId_wx:n.openId_wx,gender:n.gender,openId_qq:n.openId_qq,openId_xcx:n.openId_xcx,openId_ios:n.openId_ios,openId_app:n.openId_app,birthday:n.birthday,autograph:n.autograph,systemname:t.$GrzxInter.systemConfig.appName,openidtype:t.$GrzxInter.systemConfig.openidtype},method:t.$GrzxInter.Interface.changeInfo.method,success:function(a){e.log(a,"res"),uni.request({url:t.$GrzxInter.Interface.changeInfoPortrait.value,data:{userId:n.userId,portrait:n.portrait},method:t.$GrzxInter.Interface.changeInfoPortrait.method,success:function(n){e.log(n),uni.setStorageSync("userInfo",n.data.data),uni.hideLoading(),uni.showToast({title:"绑定成功！",icon:"success"}),uni.removeStorageSync("captchaCode"),uni.removeStorageSync("appUserInfo"),uni.removeStorageSync("wxuserInfo"),setTimeout((function(){t.returnPage()}),500)},fail:function(e){uni.hideLoading()}})},fail:function(e){uni.hideLoading()}})},returnPage:function(){uni.navigateBack()},getCodeClick:function(n){var t=this;this.phoneNumber,this.captchaCode;if(t.judgeNum(t.phoneNumber)){var a=null,o=59;"获取验证码"==t.textCode&&(t.textCode=o+"秒后重发","59秒后重发"==t.textCode&&(a=setInterval((function(){o--,o<=0?(t.textCode="获取验证码",clearInterval(a),o=59):t.textCode=o+"秒后重发"}),1e3),uni.request({url:t.$GrzxInter.Interface.getLoginCode.value,data:{phoneNumber:t.phoneNumber},method:t.$GrzxInter.Interface.getLoginCode.method,success:function(n){e.log(n.data.data,"158");var a={phone:t.phoneNumber,code:n.data.data};uni.setStorageSync("captchaCode",a),uni.showToast({title:"验证码已发送，仅在5分钟内有效!",icon:"none"}),setTimeout((function(){uni.removeStorage({key:"captchaCode"}),e.log("删除成功！")}),3e5)}})))}else uni.showToast({title:"请输入正确的手机号码",icon:"none"})}}};n.default=t}).call(this,t("5a52")["default"])},"9c70":function(e,n,t){var a=t("24fb");n=a(!1),n.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.content[data-v-3cf1aac8]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.iconClass1[data-v-3cf1aac8]{width:%?26?%;height:%?36?%;top:%?57?%;left:5%;position:absolute}.iconClass2[data-v-3cf1aac8]{width:%?31?%;height:%?38?%;top:%?54?%;left:5%;position:absolute}.inputItem[data-v-3cf1aac8]{width:87.6%;height:%?140?%;border:%?1?% solid #eaeaea;position:relative;margin-left:6%;border-radius:%?20?%}.phoneNum[data-v-3cf1aac8]{margin-top:%?50?%}.Captcha[data-v-3cf1aac8]{margin-top:%?35?%}.inputClass[data-v-3cf1aac8]{position:absolute;left:14%;top:%?51?%;font-size:%?32?%;height:%?30?%;line-height:%?30?%;color:#999}.getCode[data-v-3cf1aac8]{position:absolute;top:%?40?%;left:64%;width:30%;font-size:%?28?%;border-radius:%?12?%;text-align:center;line-height:%?64?%;height:%?64?%}.style[data-v-3cf1aac8]{border:1px solid #ff971e;color:#ff971e}.btnClass[data-v-3cf1aac8]{background:-webkit-linear-gradient(36deg,#ff8008,#ffc837);background:linear-gradient(54deg,#ff8008,#ffc837);color:#fff;margin-top:%?50?%;margin-left:5%;width:90%;height:%?100?%;line-height:%?100?%}.returnClass[data-v-3cf1aac8]{width:2.53%;height:%?35?%;top:%?80?%;left:5.13%;position:absolute}.backClass[data-v-3cf1aac8]{width:100%;height:%?350?%}.titleClass[data-v-3cf1aac8]{color:#ff971e;font-size:%?48?%;margin-top:%?30?%;margin-left:6%}',""]),e.exports=n},afee:function(e,n,t){"use strict";t.r(n);var a=t("bbd6"),o=t("d03a");for(var i in o)"default"!==i&&function(e){t.d(n,e,(function(){return o[e]}))}(i);t("19db");var r,s=t("f0c5"),d=Object(s["a"])(o["default"],a["b"],a["c"],!1,null,"3cf1aac8",null,!1,a["a"],r);n["default"]=d.exports},bbd6:function(e,n,t){"use strict";var a;t.d(n,"b",(function(){return o})),t.d(n,"c",(function(){return i})),t.d(n,"a",(function(){return a}));var o=function(){var e=this,n=e.$createElement,a=e._self._c||n;return a("v-uni-view",{staticClass:"content"},[a("v-uni-text",{staticClass:"titleClass"},[e._v("手机绑定")]),a("v-uni-view",{staticClass:"inputItem phoneNum"},[a("v-uni-image",{staticClass:"iconClass1",attrs:{src:t("4f94")}}),a("v-uni-input",{staticClass:"inputClass",attrs:{type:"number",placeholder:"手机号码",maxlength:"11","data-key":"phoneNumber"},on:{input:function(n){arguments[0]=n=e.$handleEvent(n),e.inputChange1.apply(void 0,arguments)}}})],1),a("v-uni-view",{staticClass:"inputItem Captcha"},[a("v-uni-image",{staticClass:"iconClass2",attrs:{src:t("4158")}}),a("v-uni-input",{staticClass:"inputClass",attrs:{type:"number",placeholder:"输入验证码",maxlength:"4","data-key":"captchaCode"},on:{input:function(n){arguments[0]=n=e.$handleEvent(n),e.inputChange2.apply(void 0,arguments)}}}),a("v-uni-view",{staticClass:"getCode style",attrs:{id:"Code"},on:{click:function(n){arguments[0]=n=e.$handleEvent(n),e.getCodeClick.apply(void 0,arguments)}}},[e._v(e._s(e.textCode))])],1),a("v-uni-button",{staticClass:"btnClass",on:{click:function(n){arguments[0]=n=e.$handleEvent(n),e.bindPhone.apply(void 0,arguments)}}},[e._v("确定")])],1)},i=[]},d03a:function(e,n,t){"use strict";t.r(n);var a=t("91b1"),o=t.n(a);for(var i in a)"default"!==i&&function(e){t.d(n,e,(function(){return a[e]}))}(i);n["default"]=o.a}}]);