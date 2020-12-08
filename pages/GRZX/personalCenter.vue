<template>
	<view>
		<view class="topBox">
			<!-- 背景图 -->
			<image src="../../static/GRZX/backImg.png" class="backClass"></image>
			<!-- 头像 -->
			<view class="portraitBox" @click="checkLogin">
				<image :src="portrait|| '/static/GRZX/icon-headImg.png'" class="portraitClass"></image>
			</view>
			<!-- 公司名称 -->
			<text class="nameClass" @click="checkLogin">{{userName}}</text>
			<!-- 企业车站数 -->
			<view class="stationBox commonBox">
				<text class="numClass">{{typeNum}}<text class="fs">种</text></text>
				<text class="fontClass">设备类型</text>
			</view>
			<!-- 企业设备数 -->
			<view class="equipmentBox commonBox">
				<text class="numClass">{{equipmentNum}}<text class="fs">台</text></text>
				<text class="fontClass">设备总数</text>
			</view>
			<!-- 分隔线 -->
			<view class="lineClass"></view>
		</view>
		
		<!-- 企业车站，企业设备，智慧中心 -->
		<view class="centerBox">
			<view v-for="(item,index) in modularList" :key="index" class="modularClass" @click="operation(item.title)" hover-class="btnClass">
				<image :src="item.icon" :class="item.style"></image>
				<text class="titleClass">{{item.title}}</text>
			</view>
		</view>
		
		<!-- 联系客服，设置，帮助与反馈 -->
		<view class="bottomBox">
			<view v-for="(item,index) in functionList" :key="index" class="functionClass" @click="operation(item.title)" hover-class="btnClass">
				<image :src="item.icon" :class="item.style"></image>
				<text class="titleClass">{{item.title}}</text>
				<image src="../../static/GRZX/icon-right.png" :class="item.rightClass"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				userName:'', //公司名称
				portrait:'', //头像
				equipmentNum:0,//设备总台数
				typeNum:0,//设备分类数
				login:false, //是否登录
				
				modularList:[{  //企业车站，企业设备，智慧中心功能
					title:'企业车站',
					style:'stationClass',
					icon:'../../static/GRZX/icon-station.png',
					IsUse:true,
				},
				{
					title:'企业设备',
					style:'equipmentClass',
					icon:'../../static/GRZX/icon-equipment.png',
					IsUse:true,
				},
				{
					title:'智慧中心',
					style:'smartClass',
					icon:'../../static/GRZX/icon-smart.png',
					IsUse:true,
				}],
				
				functionList:[{ //联系客服，设置，帮助与反馈功能
					title:'报修记录',
					style:'serviceClass',
					icon:'../../static/GRZX/icon-baoxiu.png',
					IsUse:true,
					rightClass:'rightClass ml1',
				},
				{ //联系客服，设置，帮助与反馈功能
					title:'联系客服',
					style:'serviceClass',
					icon:'../../static/GRZX/icon-service.png',
					IsUse:true,
					rightClass:'rightClass ml1',
				},
				{
					title:'设置',
					style:'setClass',
					icon:'../../static/GRZX/icon-set.png',
					IsUse:true,
					rightClass:'rightClass ml2',
				},
				{
					title:'帮助与反馈',
					style:'helpClass',
					icon:'../../static/GRZX/icon-help.png',
					IsUse:true,
					rightClass:'rightClass ml3',
				}]
			}
		},
		onLoad() {
			//#ifdef H5
				this.getCode();
			//#endif
		},
		onShow() {
			this.loadData();//加载用户信息
			this.loadStation();//加载设备总台数和设备分类数
		},
		methods:{
			//----------------------------加载用户信息-------------------------------
			loadData(){
				uni.getStorage({
					key:'userInfo',
					success:res=> {
						this.login=true;
						this.portrait=res.data.portrait;
						this.userName=res.data.nickname;
					},
					fail:err=> {
						this.login=false;
						this.portrait="";
						this.userName="立即登录";
					}
				})
			},
			
			//----------------------------加载设备总台数和设备分类数-------------------------------
			loadStation(){
				this.typeNum=0;
				this.equipmentNum=0;
				uni.getStorage({
					key:'stationNum',
					success:res=> {
						this.typeNum=res.data.typeNum;
						this.equipmentNum=res.data.equipmentNum;
					},
					fail() {
						this.typeNum=0;
						this.equipmentNum=0;
					}
				})
			},
			
			//----------------------------操作-------------------------------
			operation(title){
				switch (title){
					case '企业车站':
						uni.showToast({
							title:'暂未开放',
							icon:'none'
						})
						break;
					case '企业设备':
						uni.showToast({
							title:'暂未开放',
							icon:'none'
						})
						break;
					case '智慧中心':
						uni.showToast({
							title:'暂未开放',
							icon:'none'
						})
						break;
					case '联系客服':
						uni.makePhoneCall({
							phoneNumber: '15260779766', //仅为示例
						});
						break;
					case '设置':
						uni.navigateTo({
							url:'../../pages_GRZX/pages/set',
						})
						break;
					case '帮助与反馈':
						uni.navigateTo({
							url:'../../pages_GRZX/pages/feedback',
						})
						break;
					case '报修记录':
						uni.navigateTo({
							url:'../../pages_SBJG/pages/complaintList',
						})
					default:
						return '';
				}
			},
			
			//----------------------------检查是否登录-------------------------------
			checkLogin(){
				uni.getStorage({
					key:'userInfo',
					fail() {
						uni.showToast({
							title:'暂未登录，即将跳转登录',
							icon:'none'
						})
						// #ifdef APP-PLUS 
						//#endif
							setTimeout(function() {
								uni.navigateTo({
									url: '/pages/GRZX/appLogin',
								})
							}, 500);
						
					}
				})
			},
			
			// #ifdef  H5
			//----------------------------获取openid开始----------------------------
			getCode() {
				let that = this;
				let Appid = that.$GrzxInter.appConfig.H5Config.H5AppId; //H5AppId
				let AppSecret = that.$GrzxInter.appConfig.H5Config.H5AppSecret; //H5AppSecre
				let code = this.getUrlParam('code'); //是否存在code
				console.log(code);
				let local = that.$GrzxInter.appConfig.local.url;
				if (code == null || code === "") {
					//不存在就打开上面的地址进行授权
					window.location.href =
						"https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
						Appid +
						"&redirect_uri=" +
						encodeURIComponent(local) +
						"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
				} else {
					// 存在则通过code传向后台调用接口返回微信的个人信息
					uni.request({
						url: that.$GrzxInter.Interface.getWxUserinfo.value + '?code=' + code +
							'&Appid=' + Appid + '&Appsecret=' + AppSecret,
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						method: that.$GrzxInter.Interface.getWxUserinfo.method,
						success(res) {
							console.log(res, "res")
							uni.setStorageSync('wxuserInfo', res.data)
							if (res.data.openid != "" && res.data.openid != null && res.data.openid != undefined) {
								uni.request({
									url: that.$GrzxInter.Interface.GetUserInfoByOpenId_xcx.value,
									data: {
										openid:res.data.openid,
										systemname:that.$GrzxInter.systemConfig.appName,//应用名称
										openidtype:that.$GrzxInter.systemConfig.openidtype,//应用类型
									},
									method: that.$GrzxInter.Interface.GetUserInfoByOpenId_xcx.method,
									success(res1) {
										console.log(res1, 'res1')
										//判断是否有绑定手机号
										if (res1.data.msg == "获取用户信息失败,不存在该openID用户信息"||res1.data.msg == "获取用户信息失败,请输入Openid") {
											uni.showModal({
												content: '您暂未绑定手机号，是否绑定',
												confirmText: '去绑定',
												cancelText: '暂不绑定',
												success(res1) {
													if (res1.confirm) {
														uni.navigateTo({
															url: '/pages/GRZX/bindPhone'
														})
													} else if (res1.cancel) {
														uni.showToast({
															title: '未绑定手机号，将会影响部分功能的正常运行',
															icon: 'none'
														})
													}
												}
											})
										}else if (res.data.openid != "" && res1.data.status) {
											uni.setStorageSync('userInfo', res1.data.data)
											that.loadData();//加载用户信息
										}
									},
									fail() {
										uni.showToast({
											title: "获取用户信息失败",
											icon: 'none'
										})
									}
								})
							}
						},
						fail(err) {
							console.log(err)
							uni.showToast({
								title: "获取openid失败",
								icon: 'none'
							})
						}
					})
				}
			},
			//判断code信息是否存在
			getUrlParam(name) {
				var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
				let url = window.location.href.split('#')[0]
				let search = url.split('?')[1]
				if (search) {
					var r = search.substr(0).match(reg)
					if (r !== null) return unescape(r[2])
					return null
				} else {
					return null
				}
			},
			//----------------------------获取openid结束----------------------------
			//#endif
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #FFFFFF;
	}
	
	.topBox{
		width: 90%;
		position: relative;
		top:150upx;
		left: 5%;
		
		/* #ifdef H5 */
			top:20upx;
		/* #endif */
		
		//背景图
		.backClass{ 
			width: 100%;
			height: 320upx;
		}
		
		//头像外框
		.portraitBox{ 
			width: 110upx;
			height: 110upx;
			border-radius: 50%;
			position: absolute;
			left: 7%;
			top: 25upx;
		}
		
		//头像
		.portraitClass{
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
		
		//公司名称
		.nameClass{
			position: absolute;
			left: 26.5%;
			top: 52upx;
			font-size: 38upx;
			font-weight:500;
			color:#333333;
		}
		
		//------------------------------开始------------------------------
		//企业车站数，企业设备数
		.commonBox{
			width: 50%;
			position: absolute;
			top: 185upx;
			display: flex;
			flex-direction: column;
			color: #333333;
			text-align: center;
		}
		.stationBox{
			left: 0%;
		}
		.equipmentBox{
			left: 50%;
		}
		.fs{
			font-size: 28upx;
			margin-left: 8upx;
		}
		.numClass{
			font-size:36upx;
			font-weight:400;
			margin-bottom: 15upx;
		}  
		.fontClass{
			font-size:26upx;
			font-weight:300;
		}
		//------------------------------结束------------------------------
		
		//分割线
		.lineClass{
			border-left: 1upx solid #696969;
			height: 80upx;
			position: absolute;
			top: 195upx;
			left: 50%;
		}
	}
	
	.centerBox{
		width: 90%;
		margin-top: 155upx;
		/* #ifdef H5 */
			margin-top:25upx;
		/* #endif */
		
		margin-left: 5%;
		display: flex;
		flex-direction: row;
		
		//每个模块--企业车站，企业设备，智慧中心 
		.modularClass{
			width: 33%;
			display: flex;
			flex-direction: column;
			border-radius: 10upx;
		}
		
		//图标
		.stationClass{
			width: 60upx;
			height: 60upx;
			padding: 20upx 82upx 15upx 82upx;
		}
		.equipmentClass{
			width: 54upx;
			height: 54upx;
			padding: 25upx 82upx 15upx 90upx;
		}
		.smartClass{
			width: 58upx;
			height: 55upx;
			padding: 25upx 82upx 15upx 82upx;
		}
		
		//文字
		.titleClass{
			text-align: center;
			font-size:28upx;
			font-weight:300;
			color:#333333;
			padding-bottom: 10upx;
		}
	}
	
	.bottomBox{
		width: 90%;
		margin-top: 30upx;
		margin-left: 5%;
		display: flex;
		flex-direction: column;
		//每个功能---联系客服，设置，帮助与反馈
		.functionClass{
			width: 100%;
			display: flex;
			flex-direction: row;
			border-bottom: 1upx solid #E7E7E7;
			border-radius: 10upx;
		}
		
		//联系客服
		.serviceClass{
			width: 41upx;
			height: 41upx;
			padding: 45upx 20upx;
		}
		//设置
		.setClass{
			width: 40upx;
			height: 39upx;
			padding: 46upx 20upx;
		}
		//帮助与反馈
		.helpClass{
			width: 41upx;
			height: 37upx;
			padding: 47upx 20upx;
		}
		//文字
		.titleClass{
			font-size:34upx;
			font-weight:300;
			color:#333333;
			padding-top: 40upx;
		}
		.rightClass{
			width: 30upx;
			height: 30upx;
			margin-top: 48upx;
		}
		.ml1{
			margin-left: 60%;
		}
		.ml2{
			margin-left: 70%;
		}
		.ml3{
			margin-left: 55%;
		}
	}
	
	//按钮点击的效果
	.btnClass{
		transition: all .3s; /*过渡 */ 
		opacity: 0.9;
		background-color:#E4E7ED;
	}
</style>
