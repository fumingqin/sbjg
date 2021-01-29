<template>
	<view>
		<!-- 业务选择 -->
		<view class="business-view">
			<view class="top-text">
				设备名称
			</view>
			<view class="tx_text">{{Remark}}</view>
			<!-- <view class="business-type">
				<radio-group @change="radioChange">
					<view v-for="(item,index) in types" :key="item.value">
						<view v-if="item.check" class="type">
							<view class="business-text">{{item.name}}</view>
							<view class="radio">
								<radio :value="item.value" :checked="index === current" color="#4CD964" />
							</view>
						</view>
					</view>
				</radio-group>
				<view v-if="!openType1" class="shangjiantou" @click="openList(1)">
					<image src="../static/shangjiantou.png" class="jiantou"></image>
				</view>
				<view v-if="openType1" class="shangjiantou" @click="closeList(1)">
					<image src="../static/xiajiantou.png" class="jiantou"></image>
				</view>
			</view> -->
		</view>
		<view class="business-view">
			<view class="top-text">
				联系人
			</view>
		<input type="text" value="" class="tx_text" placeholder="请输入联系人" v-model="reportname" @input="inputname"/>
		</view>
		
		<view class="business-view">
			<view class="top-text3">
				<text style="margin-left: 30rpx;margin-top: 5%;">手机号码</text>
				<view style="margin-left: 46%;margin-top: 2%;">
					<button style="font-size: 30upx;" @click="GetPhone">本机号码</button>
				</view>
			</view>
		<input type="number" value="" class="tx_text" placeholder="请输入手机号码" v-model="phone" maxlength="11" @input="inputphone"/>
		</view>
		<!-- 问题选择 -->
		<view class="problem-view">
			<view class="top-text2">
				<text style="font-weight: bold;">问题选择</text>
				<text class="top-text-right">（单选）</text>
			</view>
			<view class="problem-text">
				快速处理，精准分类
			</view>
			<!-- 问题类型 -->
			<view style="display: flex;flex-direction: row;flex-wrap: wrap;margin-top: 24upx;">
				<view v-for="(item,index) in Typetext" :key="index" @click="change(index)">
					<view class="top-view-Type" v-if="item.check">
						<view v-if="!item.checked" class="fontStyle">{{item.text}}</view>
						<view v-if="item.checked" class="changefontStyle">{{item.text}}</view>
					</view>
				</view>
				<view class="jiantou1">
					<view v-if="!openType2" class="shangjiantou1" @click="openList(2)">
						<image src="../static/xiajiantou.png" class="jiantou"></image>
					</view>
					<view v-if="openType2" class="shangjiantou1" @click="closeList(2)">
						<image src="../static/shangjiantou.png" class="jiantou"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 问题描述 -->
		<view class="problem-info">
			<view class="top-text">
				建议描述
			</view>
			<!-- 建议描述文本域 -->
			<view class="problem-textare-view">
				<textarea v-model="complaintInfo" class="problem-textare" placeholder="请描述问题，让维修人员更快帮您解决问题" maxlength="500" @input="Inputtext" />
				</view>
			<!-- 字数统计 -->
			<view class="top-view-bottomtext">
				{{textmarn}}/500字
			</view>
			<!-- <view>
				<view class="top-text">
					添加图片
				</view>
				<view class="problem-textare-view">
					<view class="problem-text">
						图片能更直观地表达及排查故障所在（最多四张）
					</view>
					</view>
				<scroll-view scroll-x="true" >
					<block v-for="(item,index) in imageList" :key="index">
					<image style="width: 122upx;height: 122upx;" :src="item"></image>
					</block>
					<image style="width: 122upx;height: 122upx;" src="../static/tianjia.png" @tap="chooseImage()"></image>
					</scroll-view>
				
			</view> -->
		</view>
		
		<view class="bottom-view">
					<view class="bottom-view-text">
						上传图片（选填）
					</view>
					<view class="bottom-view-ImageUpload">
						<robby-image-upload v-model="detailInfo.imageData" :server-url-delete-image="serverUrlDeleteImage"
						 :showUploadProgress="show" :form-data="formData" @delete="deleteImage" @add="addImage" :enable-del="enableDel"
						 :enable-add="enableAdd" limit="1"></robby-image-upload>
					</view>
		</view>
		<!-- 提交 -->
		<view v-if="!btncheck" class="btnClass changecolor1" hover-class="hover" @click="successClick2">提交</view>
		<view v-if="btncheck" class="btnClass changecolor2" hover-class="hover2" @click="successClick">提交</view>
	</view>
</template>

<script>
	import $Sbjg from "@/common/sbjg.js"
	import { pathToBase64, base64ToPath } from '../components/js_sdk/gsq-image-tools/image-tools/index.js';
	import robbyImageUpload from '../components/robby-image-upload/robby-image-upload.vue';
	export default {
		data() {
			return {
				imageList:[],
				complaintInfo:'',
				choice:'',
				openType1:false,//默认不开启列表
				openType2:false,//默认不开启列表
				current:0,
				locationID:'',//部署位置
				textmarn:0,//字数
				btncheck:false,//默认提交按钮样式
				// 上传图片
								enableDel: true, //是否启动del
								enableAdd: true, //是否启动删除
								enableDrag: false, //是否启动拖动
								show: true, //是否显示
								serverUrl: 'http://localhost:2000/work/uploadWorkPicture', //模拟服务器地址
								serverUrlDeleteImage: 'http://localhost:2000/work/deleteWorkPicture', //模拟服务器删除
								formData: { //表格数据
									userId: 2
								},
								imagelist: [], //图像列表框
								detailInfo: { //详细信息
									imageData: [], //图像日期	
								},
								img:[],
				types: [{
						value: 'Traditional',
						name: '传统客运',
						check:true
					},
					{
						value: 'Customized',
						name: '定制巴士',
						check:true
					},
					{
						value: 'taxi',
						name: '出租车',
						check:false
					},{
						value: 'Special',
						name: '专线车',
						check:false
					},
					{
						value: 'Free',
						name: '顺风车',
						check:false
					},
					{
						value: 'Charter',
						name: '包车服务',
						check:false
					},
					{
						value: 'Tourism',
						name: '旅游服务',
						check:false
					}
					
					
				],
				typetext:[],//储存问题选择数据
				//类型文字
				Typetext:[
					{
						text:'硬件故障',
						checked:false,//判断是否选中
						btncheck:false,//判断提交是否变色
						check:true//判断是否显示
					},
					{
						text:'软件故障',
						checked:false,//判断是否选中
						btncheck:false,//判断提交是否变色
						check:true//判断是否显示
					},
					{
						text:'主板故障',
						checked:false,//判断是否选中
						btncheck:false,//判断提交是否变色
						check:true//判断是否显示
					},
					{
						text:'电源故障',
						checked:false,//判断是否选中
						btncheck:false,//判断提交是否变色
						check:false//判断是否显示
					},
					{
						text:'屏幕故障',
						checked:false,//判断是否选中
						btncheck:false,//判断提交是否变色
						check:false//判断是否显示
					},
					{
						text:'内存问题',
						checked:false,//判断是否选中
						btncheck:false,//判断提交是否变色
						check:false//判断是否显示
					}
				],
				AID:'',
				Remark:'',
				Code:'',
				datestring:'',
				companycode:'',
				Devicetype:'',
				phone:'',
				reportname:''
			}
		},
				components: {
					robbyImageUpload, // 导入图片上传
				},
		onLoad(param) {
			this.AID = param.AID;
			this.Remark = param.Remark;
			this.Devicetype= param.Type;
			this.companycode=param.CompanyCode;
			console.log(param);
			uni.getStorage({
				key:'equipmentParameters',
				success: (res) => {
					this.locationID=res.data.Device.LocationID;
					console.log(this.locationID);
				}
			})
			uni.getStorage({
				key:'phone',
				success: (res) =>{
					//this.phone=res.data.phone;
					//console.log(res.data);
					//console.log(this.companycode);
					//console.log(this.datestring);
					//console.log(this.textmarn);
					console.log(this.phone);
				},
				fail() {
					uni.showToast({
						title:'暂未登录，即将跳转登录',
						icon:'none'
					})
					
						setTimeout(function() {
							uni.navigateTo({
								url: '/pages/GRZX/appLogin',
							})
						}, 500);
				}
			})
		},
		methods: {
			openList:function(e){
				console.log(e);
				if(e == 1)
				{
					for(var i=0;i<this.types.length;i++){
					this.types[i].check=true;
					}
				this.openType1=true;
				}
				if(e == 2)
				{
					for(var i=0;i<this.Typetext.length;i++){
						this.Typetext[i].check=true;
					}
					this.openType2=true;
					}
			},
			deleteImage: function(e){
							console.log(e)
								var index = this.imageList.findIndex(item => {
									for(var i=0;i<e.allImages.length;i++){
								    if (item ==this.Typetext[i].text) {
											return true;
											}
										}
									})
								this.imageList.splice(index,1);
						},
						addImage: function(e){
							console.log(e)
							for(var i=0;i<e.allImages.length;i++){
								pathToBase64(e.allImages[i])
								.then(base64 => {
									this.imageList.push(base64);
								})
							}
						},
			closeList:function(e){
				if(e==1)
				{
					for(var i=0;i<this.types.length;i++){
					if(i>1){
						this.types[i].check=false;
					}
				}
				this.openType1=false;
				}
				if(e==2)
				{
					for(var i=0;i<this.Typetext.length;i++){
						if(i>2){
							this.Typetext[i].check=false;
						}
					}
					this.openType2=false;
				}
			},
			// radio单选框
			radioChange: function(e) {
				console.log(e.detail.value);
				for (let i = 0; i < this.types.length; i++) {
					if (this.types[i].value === e.target.value) {
						this.current = i;
						this.choice = this.types[i].name;
						break;
					}
				}
			},
			//问题选择
			change:function(e) {
					var that =this;
					for (var i = 0; i < that.Typetext.length; i++) {
						if (e == i) {
							if(that.Typetext[i].checked == false)
							{
								if(!that.Typetext[i].check){
									
								}else if(that.typetext.length<1){
									that.Typetext[i].checked = true;
									that.btncheck=true;
									that.typetext.push(that.Typetext[i].text);
								}else{
									uni.showToast({
										icon:'none',
										title:'意见类型最多选中1个'
									})
								}
							}
							else{
								that.Typetext[i].checked = false;	
								var index = that.typetext.findIndex(item => {
								    if (item ==that.Typetext[e].text) {
											return true;
										}
									})
								that.typetext.splice(index,1);
							}
						}
					}
					console.log(that.typetext);
					var list=that.Typetext.filter(item => {
						return item.checked == true;
					})
					if(list.length==0){
						that.btncheck=false;
					}
			},
			//字数统计
			Inputtext:function(e){
				var that = this;
				that.textmarn=e.detail.cursor; 
			},
			inputname:function(e)
			{
				this.reportname=e.detail.value;
			},
			inputphone:function(e)
			{
				this.phone=e.detail.value;
			},
			formate:function(e){
				switch(e)
				{
					case '硬件故障':
						return 1;
					case '软件故障':
						return 2;
					case '主板故障':
						return 3;
					case '电源故障':
						return 4;
					case '屏幕故障':
						return 5;
					case '内存问题':
						return 6;
					
				}
			},
			
			//------------------------请选择问题----------------------------
			successClick2: function() {
				uni.showToast({
					title: '请选择问题',
					icon: 'none'
				})
			},
			
			//------------------------获取当前时间----------------------------
			currentTime:function(){
				
				//获取当前时间
				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var day = date.getDate();
				var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
				var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
				month >= 1 && month <= 9 ? (month = "0" + month) : "";
				day >= 0 && day <= 9 ? (day = "0" + day) : "";
				var timer = year + '-' + month + '-' + day+' '+hour+':'+minutes; //当前年月日时分
				this.datestring = timer; //截取日期
				console.log('获取当前时间',this.datestring)
			},
			chooseImage:function(){
				let that=this;
				uni.chooseImage({
				    count: 4, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: function (res) {
						that.imageList=res.tempFilePaths;
				        that.urlTobase64(res.tempFilePaths[0])
				    }
				});
			},
			GetPhone:function(){
				uni.getStorage({
					key:'phone',
					success: (res) =>{
						this.phone=res.data.phone;
						//console.log(res.data);
						//console.log(this.companycode);
						//console.log(this.datestring);
						//console.log(this.textmarn);
						console.log(this.phone);
					},
					fail() {
						uni.showToast({
							title:'暂未登录，即将跳转登录',
							icon:'none'
						})
						
							setTimeout(function() {
								uni.navigateTo({
									url: '/pages/GRZX/appLogin',
								})
							}, 500);
					}
				})
			},
			 
			urlTobase64(url){
			    uni.request({
				url: url,
				method:'GET',
				responseType: 'arraybuffer',
				success: ress => {
					let base64 = wx.arrayBufferToBase64(ress.data); //把arraybuffer转成base64 
					base64 = 'data:image/jpeg;base64,' + base64 //不加上这串字符，在页面无法显示的哦
					//console.log(base64)
				},
				fail:res =>{
					console.log(e)
				}
			    })
			}, 
		
			//------------------------提交数据----------------------------
			successClick:function(){
				
				this.currentTime(),
				console.log(this.complaintInfo)
				console.log(this.phone)
				console.log(this.reportname)
				console.log(this.imageList[0])
				// uni.showLoading({
				// 	title:'提交中...'
				// })
				// this.AddBook();
			},
			AddBook:function(){
				uni.request({
									url: $Sbjg.SbjgInterface.AddStateBy.Url,
									method: $Sbjg.SbjgInterface.AddStateBy.method,
									header: $Sbjg.SbjgInterface.AddStateBy.header,
									data: {
										type:this.formate(this.typetext[0]),
										reportname:this.reportname, 
										companycode:this.companycode,
										locationid:this.locationID,
										devicetype:this.Devicetype, 
										deviceid:this.AID,
										phonenumber:this.phone,
										lasttime:this.datestring,
										details:this.complaintInfo,
										customname:this.Remark,
										photo:this.imageList[0],
										//byte:this.imageList
									},
									success: (res) => {
										console.log(res)
										if (res.data== "提交成功") {
											uni.hideLoading()
											uni.showToast({
												title:'报修成功',
												icon: 'success',
											})
											setTimeout(function(){
												uni.navigateBack();
											},1000);
										} 
									},
									fail: () => {
										uni.hideLoading()
										uni.showToast({
											title:'网络异常，请重试',
											icon:'none'
										})
									}
								})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F4F6F8;
	}
	
	.business-view {
		/* height: 319upx; */
		background-color: #FFFFFF;
		margin: 30upx 28upx;
		border-radius: 20upx;
	}

	.top-text {
		font-size: 34upx;
		color: #333333;
		margin-left: 30upx;
		padding-top: 25upx;
		padding-bottom: 10upx;
		font-weight: bold;
	}
	.top-text2 {
		font-size: 34upx;
		color: #333333;
		margin-left: 30upx;
		padding-top: 25upx;
		font-weight: 500;
	}
	.tx_text{
		font-size: 28upx;
		color: #555555;
		margin-left: 30upx;
		padding: 40upx 0;
		padding-top: 16rpx;
		width: 630upx;
		text-overflow: ellipsis; //文章超出宽度隐藏并用...表示
		white-space: nowrap;
		overflow: hidden;
	}
	.business-type {
		margin-left: 30upx;
		margin-right: 30upx;
		
	}

	.business-text {
		font-size: 32upx;
	}

	.radio {
		position: absolute;
		right: 0;
	}

	.type {
		margin-top: 30upx;
		display: flex;
		position: relative;
	}
	
	.problem-view{
		/* height: 510upx; */
		border-radius: 20upx;
		background-color: #FFFFFF;
		margin: 30upx 28upx;
	}
	.top-text-right{
		color: #999999;
		font-size: 28upx;
		margin-left: 12upx;
	}
	.problem-text{
		color: #999999;
		font-size: 28upx;
		margin-left: 30upx;
		margin-top: 15upx;
	}
	.top-view-Type{
		width: 193upx;
		/* height: 68upx; */
		border-radius: 34upx;
		background-color: #ECEEF0;
		margin-left: 29upx;
		margin-top: 30upx;
		text-align: center;
		line-height: 63upx;
	}
	.fontStyle{
		font-size: 28upx;
		color: #2C2D2D;
		width: 100%;
		text-align: center;
	}
	.changefontStyle{
		font-size: 28upx;
		  color: #FFFFFF;
		  background-color: #5694fb;
		  width: 100%;
		  text-align: center;
		  border-radius: 34upx;
	}
	.problem-info{
		background-color: #FFFFFF;
		border-radius: 20upx;
		margin:0 28rpx 30rpx 28rpx;
	}
	.problem-textare-view{
		margin-left: 30upx;
		margin-top: 10upx;
	}
	.problem-textare{
		width: 634upx;
		height: 160upx;
		font-size: 28upx;
	}
	.top-view-bottomtext{
		font-size: 28upx;
		color: #AAAAAA;
		text-align: right;
		padding: 40upx;
/* 		position: absolute;
		left: 539upx;
		top: 589upx; */
	}
	
	.btnClass{
		text-align: center;
		font-size: 34upx;
		border-radius: 20upx;
		padding: 30upx 0;
		margin: 0 28upx;
	}
	.changecolor1{
		background-color: #FFFFFF;
		color: #999999;
	}
	.changecolor2{
		background-color: #5694fb;
		color: #FFFFFF;
	}
	.jiantou{
		width: 28upx;
		height: 13upx;
	}
	.shangjiantou{
		margin-top: 20upx;
		margin-left: 302upx;
		padding-bottom: 20upx;
	}
	.jiantou1{
		padding: 24upx 0;
		width: 100%;
		text-align: center;
	}
	
	.hover{
		transition: all .3s; //过度
		border-radius: 24upx;
		opacity: 0.1;
		color: #FFFFFF;
		background: #5694fb;
	}
	
	.hover2{
		transition: all .3s; //过度
		border-radius: 24upx;
		opacity: 0.6;
		color: #FFFFFF;
		background: #5694fb;
	}
	.bottom-view {
			width: 694upx;
			height: 339upx;
			background-color: #FFFFFF;
			border-radius: 20upx;
			margin: 0upx 20upx 28upx 28upx;
	
			.bottom-view-text {
				font-size: 34upx;
				color: #333333;
				margin-left: 28upx;
				padding-top: 43upx;
				font-weight: 500;
			}
		}
	.top-text3{
		display: flex;
		flex-direction: row;
		font-size: 34upx;
		color: #333333;
		font-weight: bold;
	}
</style>
