<template>
	<view class="content" v-bind:style="{height:imgHeight+'px'}">
		<!-- 背景图 -->
		<image :src="background" class="backClass"></image>
		<image src="../../static/GRZX/loginReturn.png" class="returnClass" @click="returnClick"></image>

		<view class="inputContent">
			<!-- 手机号 -->
			<view class="inputItem phoneNum">
				<image src="../../static/GRZX/shouji.png" class="iconClass1"></image>
				<input type="number" placeholder="手机号码" maxlength="11" class="inputClass" data-key="phoneNumber" @input="inputChange1" />
			</view>
			<!-- 验证码 -->
			<view class="inputItem Captcha">
				<image src="../../static/GRZX/yanzhengma.png" class="iconClass2"></image>
				<input type="number" placeholder="输入验证码" maxlength="4" class="inputClass" data-key="captchaCode" @input="inputChange2" />
			</view>
			<!-- 按钮颜色和发送验证码的样式 -->
			<view class="getCode style" @click="getCodeClick" id="Code">{{textCode}}</view>
			<text class="fontStyle" @click="loginClick">确定</text>
		</view>

		<!-- logo -->
		<image :src="logo||'/static/GRZX/logo.png'" class="logoClass"></image>

		<!-- 第三方登录 -->
		<view class="loginMode">第三方登录</view>
		<view class="leftLine"></view>
		<view class="rightLine"></view>
		<!-- <image src="../../static/GRZX/qqLogo.png" class="qqClass" @click="qqLogin"></image> -->
		<!-- 苹果登录 -->
		<!-- <image src="../../static/GRZX/appleLogo.png" class="appleClass" @click="appleLogin" v-if="platform=='ios'"></image> -->
		<image src="../../static/GRZX/wxLogo.png" :class="platform=='ios'?'wxClass':'wxClass1'" @click="wxLogin" ></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				textCode: "获取验证码", //获取验证码
				phoneNumber: '', //手机号
				captchaCode: '', //验证码
				imgHeight: '', //背景图高度
				urlData: '', //用来判断进入该页面的地址
				background: '', //背景图路径
				logo: '', //logo路径

				state: true, //是否允许点击
				system: '', 	// 系统版本
				platform: '',   // 平台
				whetherClick:true,//是否允许点击
			}
		},
		onLoad(options) {
			this.loadImg();//加载图片
			this.urlData = options.urlData;//用来判断进入该页面的地址
			this.load();//加载页面高度
			
			// 先判断 系统版本
			uni.getSystemInfo({
				success: (res) => {
					console.log("系统",res);
					this.system = res.system;
					this.platform = res.platform;
				}
			})
		},
		onShow() {
			this.whetherClick=true;
		},
		onUnload() {
			uni.hideLoading();//退出页面时，关闭所有的弹窗
		},
		methods: {
			//----------------------------------加载图片----------------------------------
			loadImg: function() {
				var that = this;
				that.$ChangeImage.GetImage("设备管理", "登录背景图").then(function(data) {
					that.background = data;
				});
				// that.$ChangeImage.GetImage("南平综合出行", "nanpinglogo").then(function(data) {
				// 	that.logo = data;
				// });
			},

			//----------------------------------加载页面高度----------------------------------
			load: function() {
				var that = this;
				uni.getSystemInfo({
					success: function(res) { // res - 各种系统参数
						that.imgHeight = res.windowHeight;
					}
				});
			},

			//-------------------------------------判断是否为数字----------------------------------
			judgeNum: function(val) {
				var regPos = /^\d+(\.\d+)?$/; //非负浮点数
				var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
				if (regPos.test(val) || regNeg.test(val)) {
					return true;
				} else {
					return false;
				}
			},

			//-------------------------------------监听input的变化----------------------------------
			inputChange1: function(e) {
				var num = e.detail.value;
				if (this.judgeNum(num)) {

				} else {
					uni.showToast({
						title: '请输入正确的手机号码',
						icon: 'none',
					})
				}
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},

			//-------------------------------------监听input的变化----------------------------------
			inputChange2: function(e) {
				var num = e.detail.value;
				if (this.judgeNum(num)) {

				} else {
					uni.showToast({
						title: '请输入正确的验证码',
						icon: 'none',
					})
				}
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},		
			
			//-------------------------------------登录按钮----------------------------------
			loginClick: function() {
				uni.showLoading({
					title: '登录中...'
				})
				var that = this;
				const {
					phoneNumber,
					captchaCode
				} = this;
				var phone = this.phoneNumber;
				var captcha = this.captchaCode;
				if (phone == null || phone == "") {
					uni.showToast({
						title: "请输入手机号码",
						icon: "none"
					})
				} else {
					if (captcha == null || captcha == "") {
						uni.showToast({
							title: "请输入验证码",
							icon: "none"
						})
					} else {
						that.requestInter(phone, captcha);
					}
				}
			},

			//-------------------------------------请求登录接口----------------------------------
			requestInter: function(phone, captcha) {
				var that = this;
				uni.getStorage({
					key: 'captchaCode',
					success(res) {
						if (captcha == res.data.code && phone == res.data.phone) {
							uni.request({
								url: that.$GrzxInter.Interface.login.value,
								data: {
									phoneNumber: phone,
									systemname:that.$GrzxInter.systemConfig.appName,//应用名称
									openidtype:that.$GrzxInter.systemConfig.openidtype,//应用类型
								},
								method: that.$GrzxInter.Interface.login.method,
								success(res) {
									console.log(res)
									uni.removeStorageSync('captchaCode');
									uni.setStorageSync('userInfo', res.data.data);
									uni.hideLoading();
									that.successReturn(); //登陆成功后返回
								}
							})
						} else {
							uni.showToast({
								title: "验证码错误",
								icon: "none"
							})
						}
					},
					fail() {
						uni.showToast({
							title: "验证码已过期，请重新获取",
							icon: "none"
						})
					}
				})
				uni.setStorage({
					key:'phone',
					data:{
						phone:phone
					}
				})
			},

			//-------------------------------------登陆成功后返回----------------------------------
			successReturn: function() {
				var that = this;
				uni.showToast({
					title: "登录成功!",
					icon: "success"
				})
				setTimeout(function(){
					console.log("返回上一页")
					uni.navigateBack(); //返回上一页
				},500);
			},

			//-------------------------------------微信授权登录----------------------------------
			wxLogin: function() {
				var that = this;
				if(that.whetherClick){
					that.whetherClick=false;
					uni.showLoading({
						title:'授权登录中...',
						mask:true,
					})
					uni.getProvider({
					    service: 'oauth',
					    success: function(oauthRes) {
					        console.log(oauthRes,"授权1");
							if(~oauthRes.provider.indexOf('weixin')){
								uni.login({
									provider: 'weixin',
									success: function(loginRes) {
										console.log(loginRes,"授权2");
										uni.getUserInfo({
											provider: 'weixin',
											success: function(res) {
												that.requestInterface(res.userInfo,"wx");
											},
											fail: function(err1) {
												uni.hideLoading();
												console.log(err1,'获取用户信息失败');
												uni.showModal({
													title: '获取用户信息失败',
													content: JSON.stringify(err1)
												});
											}
										})
									},
									fail(err) {
										uni.hideLoading();
										console.log(err,"获取失败");
										uni.showModal({  
											title: '获取失败',  
											content: JSON.stringify(err)  
										}) 
									}
								})
							}
						},
					})
				}
			},
			
			//-------------------------------------QQ微信授权登录请求接口----------------------------------
			requestInterface:function(userInfo,type){
				var that=this;
				if(type=="wx"){ //微信授权登录
					uni.request({
						url:that.$GrzxInter.Interface.GetUserInfoByOpenId_xcx.value,
						data:{
							openid:userInfo.openId,
							systemname:that.$GrzxInter.systemConfig.appName,//应用名称
							openidtype:that.$GrzxInter.systemConfig.openidtype,//应用类型
						},
						method:that.$GrzxInter.Interface.GetUserInfoByOpenId_xcx.method,
						success(res) {
							uni.hideLoading();
							console.log(res,"提示！！！！");
							if(!res.data.status&&res.data.msg=="获取用户信息失败,不存在该openID用户信息"){
								uni.setStorageSync('appUserInfo',userInfo);
								uni.navigateTo({
									url: '/pages/GRZX/bindPhone?type=appWxLogin&&urlData='+that.urlData,
								})
							}else if(res.data.status){
								uni.setStorageSync('userInfo',res.data.data);
								setTimeout(function(){
									that.successReturn(); //登陆成功后返回
								},500);
							}
						},
						fail() {
							uni.hideLoading();	
						}
					})
				}else if(type=="qq"){  //QQ授权登录
					uni.request({
						url:that.$GrzxInter.Interface.GetUserInfoByOpenId_xcx.value,
						data:{
							openid:userInfo.openId,
							systemname:that.$GrzxInter.systemConfig.appName,//应用名称
							openidtype:that.$GrzxInter.systemConfig.openidtype,//应用类型
						},
						method:that.$GrzxInter.Interface.GetUserInfoByOpenId_xcx.method,
						success(res) {
							uni.hideLoading();
							if(!res.data.status&&res.data.msg=="获取用户信息失败,不存在该openID用户信息"){
								uni.setStorageSync('appUserInfo',userInfo);
								uni.navigateTo({
									url: '/pages/GRZX/bindPhone?type=appQQLogin&&urlData='+that.urlData,
								})
							}else if(res.data.status){
								uni.setStorageSync('userInfo',res.data.data);
								that.successReturn(); //登陆成功后返回
							}
						},
						fail() {
							uni.hideLoading();	
						}
					})
				}else if(type=="apple"){  //苹果授权登录
					uni.request({
						url:that.$GrzxInter.Interface.GetUserInfoByOpenId_xcx.value,
						data:{
							openid:userInfo.openId,
							systemname:that.$GrzxInter.systemConfig.appName,//应用名称
							openidtype:that.$GrzxInter.systemConfig.openidtype,//应用类型
						},
						method:that.$GrzxInter.Interface.GetUserInfoByOpenId_xcx.method,
						success(res) {
							uni.hideLoading();
							if(!res.data.status&&res.data.msg=="获取用户信息失败,不存在该openID用户信息"){
								uni.setStorageSync('appUserInfo',userInfo);
								uni.navigateTo({
									url: '/pages/GRZX/bindPhone?type=appleLogin&&urlData='+that.urlData,
								})
							}else if(res.data.status){
								uni.setStorageSync('userInfo',res.data.data);
								that.successReturn(); //登陆成功后返回
							}
						},
						fail() {
							uni.hideLoading();	
						}
					})
				}
			},
			
			//-------------------------------------苹果授权登录----------------------------------
			appleLogin:function(){
				var that = this;
				uni.showLoading({
					title:'授权登录中...',
					mask:true,
				})
				uni.login({
					provider: 'apple',
					success: function(loginRes) {
						console.log("苹果信息",loginRes);
						uni.getUserInfo({
							provider: 'apple',
							success: function(res) {
								console.log("苹果用户信息",res);
								that.requestInterface(res.userInfo,"apple");
							},
							fail: function() {
								uni.showToast({
									title: '获取用户信息失败',
									icon: "none"
								});
							}
						})
					},
					fail(err) {
						console.log("获取失败",err);
						uni.showToast({
							title: '获取失败',
							icon: "none"
						});
					}
				})
			},
			
			//-------------------------------------QQ授权登录----------------------------------
			qqLogin: function() {
				var that = this;
				if(that.whetherClick){
					that.whetherClick=false;
					uni.showLoading({
						title:'授权登录中...',
						mask:true,
					})
					uni.login({
						provider: 'qq',
						success: function(loginRes) {
							uni.getUserInfo({
								provider: 'qq',
								success: function(res) {
									console.log(res,"qq用户信息");
									that.requestInterface(res.userInfo,"qq");
								},
								fail: function() {
									uni.hideLoading();
									uni.showToast({
										title: '获取用户信息失败',
										icon: "none"
									});
								}
							})
						},
						fail() {
							uni.hideLoading();
							uni.showToast({
								title: '获取失败',
								icon: "none"
							});
						}
					})
				}
			},

			//-------------------------------------获取验证码----------------------------------
			getCodeClick: function(e) {
				var that = this;
				const {
					phoneNumber,
					captchaCode
				} = this;
				if (that.judgeNum(that.phoneNumber)) {
					var timer = null, //定时器
						second = 60; //倒计时的时间
					if (that.textCode == "获取验证码" && that.state) {
						that.state = false;
						that.getCode(timer, second, that.phoneNumber);
					}
				} else {
					uni.showToast({
						title: '请输入正确的手机号码',
						icon: 'none',
					})
				}
			},

			//-------------------------------------获取验证码的请求----------------------------
			getCode: function(timer, second, phoneNumber) {
				var that = this;
				timer = setInterval(function() {
					second--;
					if (second <= 0) {
						that.textCode = "获取验证码";
						clearInterval(timer);
						second = 60;
						that.state = true;
					} else {
						that.textCode = second + "秒后重发";
					}
				}, 1000)
				uni.request({
					url: that.$GrzxInter.Interface.getLoginCode.value,
					data: {
						phoneNumber: phoneNumber,
					},
					method: that.$GrzxInter.Interface.getLoginCode.method,
					success: (res) => {
						console.log(res, "340");
						console.log(res.data.data);
						if (res.data.status == false) { //发送验证码次数上限
							that.state = true;
							that.textCode = "获取验证码";
							clearInterval(timer);
							uni.showToast({
								title: "今日验证码发送次数已上限!",
								icon: "none"
							})
						} else { //成功发送验证码
							uni.setStorage({
								key: 'captchaCode',
								data: {
									code: res.data.data,
									phone: phoneNumber,
								}
							})
							uni.showToast({
								title: "验证码已发送，仅在5分钟内有效!",
								icon: "none"
							})
							setTimeout(function() {
								uni.removeStorage({
									key: 'captchaCode',
								})
							}, 300000);
						}
					}
				})
			},

			//-------------------------------------返回按钮------------------------------------
			returnClick: function() {
				var that = this;
				if(that.urlData == 1){
					that.$GrzxInter.navToHome();//返回首页
				}else if (that.urlData == 2) {
					uni.switchTab({ //返回订单页
						url: '/pages/order/OrderList',
					})
				} else {
					console.log("返回上一页")
					uni.navigateBack(); //返回上一页
				}
			},

			//-----------------------------------判断是否为base64格式----------------------------
			isBase64: function(str) {
				if (str === '' || str.trim() === '') {
					return false;
				}
				try {
					return btoa(atob(str)) == str;
				} catch (err) {
					return false;
				}
			},

		}
	}
</script>

<style lang="scss">
	//该界面的全局样式
	page {
		margin: 0;
		padding: 0;
	}

	.content {
		width: 100%;
		position: relative;
	}

	.backClass {
		//背景图
		position: absolute;
		bottom: 0px;
		width: 100%;
		height: 100%;
	}

	.returnClass {
		//返回按钮
		width: 2.53%;
		height: 35upx;
		top: 80upx;
		left: 4.13%;
		position: absolute;
	}

	.logoClass {
		//logo的样式
		width: 32.4%;
		height: 233upx;
		top: 200upx;
		left: 33.87%;
		position: absolute;
		border-radius: 50%;
	}

	.iconClass1 {
		//手机图标
		width: 26upx;
		height: 36upx;
		top: 58upx;
		left: 2%;
		position: absolute;
	}

	.iconClass2 {
		//验证码图标
		width: 31upx;
		height: 38upx;
		top: 56upx;
		left: 2%;
		position: absolute;
	}

	.inputContent {
		//登录区域的样式
		width: 90.4%;
		//height: 874upx;
		height: 800upx;
		position: absolute;
		top: 324upx;
		left: 4.8%;
		background-color: white;
		border-radius: 20upx;
	}

	.inputItem {
		//输入区域的样式
		width: 87.6%;
		height: 140upx;
		border-bottom: 1upx solid #EAEAEA;
	}

	.phoneNum {
		position: absolute;
		top: 130upx;
		left: 6.19%;
	}

	.Captcha {
		position: absolute;
		top: 272upx;
		left: 6.19%;
	}

	.inputClass {
		//输入框的位置
		position: absolute;
		left: 12%;
		top: 51upx;
		font-size: 32upx;
		height: 50upx;
		line-height: 50upx;
		color: #999999;
	}

	.btnLogin {
		//按钮
		position: absolute;
		top: 421upx;
		width: 100%;
		height: 180upx;
	}

	.wxClass {
		//微信
		position: absolute;
		left: 33%;
		top: 1015upx;
		width: 67upx;
		height: 54upx;
	}

	.wxClass1 {
		//微信1
		position: absolute;
		left: 44%;
		top: 1022upx;
		width: 67upx;
		height: 54upx;
	}

	.qqClass {
		//QQ
		position: absolute;
		left: 60%;
		top: 1015upx;
		width: 47upx;
		height: 50upx;
	}
	.appleClass {
		//QQ
		position: absolute;
		left: 60%;
		top: 1015upx;
		width: 50upx;
		height: 54upx;
	}

	.loginMode {
		//第三方登录
		position: absolute;
		top: 945upx;
		width: 100%;
		text-align: center;
		font-size: 30upx;
		color: #999999;
	}

	.leftLine {
		border-top: 1upx solid #EAEAEA;
		height: 1upx;
		width: 22.48%;
		position: absolute;
		top: 965upx;
		left: 12.73%;
	}

	.rightLine {
		border-top: 1upx solid #EAEAEA;
		height: 1upx;
		width: 22.48%;
		position: absolute;
		top: 965upx;
		left: 64.78%;
	}

	.getCode {
		//获取验证码
		position: absolute;
		top: 308upx;
		left: 64%;
		width: 30%;
		font-size: 28upx;
		border-radius: 12upx;
		text-align: center;
		line-height: 64upx;
		height: 64upx;
	}

	.style{
		border: 1px solid #1D2087;
		color: #1D2087;
	}

	.fontStyle {
		//确定字体样式
		position: absolute;
		top: 480upx;
		left: 5%;
		text-align: center;
		font-size: 36upx;
		color: #FFFFFF;
		width: 90%;
		padding: 25upx 0;
		border-radius: 20upx;
		background:linear-gradient(270deg,rgba(94,109,255,1),rgba(73,152,251,1));
	}
</style>
