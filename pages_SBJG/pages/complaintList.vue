<template>
	<view>
		<!-- 顶部滑动 -->
		<view class="screen">
			<view class="screenView">
				<view class="screenText" :class="{current:type===1}" @click="tabClick(1)">
					登记
				</view>
				<view class="screenText" :class="{current:type===3}" @click="tabClick(3)">
					进行中
				</view>
				<view class="screenText" :class="{current:type===4}" @click="tabClick(4)">
					已完成
				</view>
			</view>
		</view>
		<!-- 登记 -->
		<view v-if="type==1">
			<!-- 暂无数据 -->
			<view class="pd_image" v-if="!show1">
				<view>
					<image class="im_image" src="../static/tslb.gif"></image>
				</view>
				<view>
					<text class="im_text">暂无数据</text>
				</view>
			</view>
			<view class="order-view" v-for="(item,index) in complaintList" :key="index" v-if="item.State==1">
				<view class="order-top">
					<text class="order-title">{{item.MyLocation.Memo}}</text>
					<text class="order-status">{{formatState(item.State)}}</text>
				</view>
				<view class="order-info">
					<text class="order_contentText">报修人：{{item.ReportName}}</text>
					<text class="order_contentText">手机号码：{{item.PhoneNumber}}</text>
					<text class="order_contentText">设备名称：{{item.CustomName}}</text>
					<text class="order_contentText">报修时间：{{formatTime(item.ReportTime)}}</text>
				</view>
				<view v-if="!isadmin" class="success-order-bottom" @click="gotoStatus(item)">
					详细
				</view>
				<view v-if="isadmin" style="display: flex;flex-direction: row; margin-left:50%">
					<view class="order-bottom" @click="gotoStatus(item)">
						详细
					</view>
					<view class="order-bottom" @click="changeStatus(item)" >
						接单
					</view>
				</view>
			</view>

		</view>
		<!-- 进行中 -->
		<view v-if="type==3">
			<view class="pd_image" v-if="!show2">
				<view>
					<image class="im_image" src="../static/tslb.gif"></image>
				</view>
				<view>
					<text class="im_text">暂无数据</text>
				</view>
			</view>
			<view class="order-view" v-for="(item,index) in complaintList" :key="index" v-if="item.State!=1&&item.State!=4">
				<view class="order-top">
					<text class="order-title">{{item.MyLocation.Memo}}</text>
					<text class="order-status">{{formatState(item.State)}}</text>
				</view>
				<view class="order-info">
					<text class="order_contentText">报修人：{{item.ReportName}}</text>
					<text class="order_contentText">手机号码：{{item.PhoneNumber}}</text>
					<text class="order_contentText">设备名称：{{item.CustomName}}</text>
					<text class="order_contentText">登记时间：{{formatTime(item.LastTime)}}</text>
				</view>
				<view v-if="!isadmin" class="success-order-bottom" @click="gotoStatus(item)">
					详细
				</view>
				<view v-if="isadmin" style="display: flex;flex-direction: row; margin-left:50%">
					<view class="order-bottom" @click="gotoStatus(item)">
						详细
					</view>
					<view class="order-bottom" @click="changeStatus(item)" >
						完成
					</view>
				</view>
			</view>
		</view>
		<!-- 完成 -->
		<view v-if="type==4">
			<view class="pd_image" v-if="!show3">
				<view>
					<image class="im_image" src="../static/tslb.gif"></image>
				</view>
				<view>
					<text class="im_text">暂无数据</text>
				</view>
			</view>
			<view class="order-view" v-for="(item,index) in complaintList" :key="index" v-if="item.State==4">
				<view class="order-top">
					<!-- <image src="../../static/baoche.png" class="order-icon"></image> -->
					<text class="order-title">{{item.MyLocation.Memo}}</text>
					<text class="order-status">{{formatState(item.State)}}</text>
				</view>
				<view class="order-info">
					<text class="order_contentText">报修人：{{item.ReportName}}</text>
					<text class="order_contentText">手机号码：{{item.PhoneNumber}}</text>
					<text class="order_contentText">设备名称：{{item.CustomName}}</text>
					<text class="order_contentText">完成时间：{{formatTime(item.LastTime)}}</text>
				</view>
				<view v-if="isadmin" class="success-order-bottom" @click="gotoStatus(item)">
					详细
				</view>
				<view v-if="!isadmin" style="display: flex;flex-direction: row; margin-left:50%">
					<view class="order-bottom" @click="gotoStatus(item)">
						详细
					</view>
					<view class="order-bottom" @click="gotoStatus(item)" >
						评价
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import $Sbjg from "@/common/sbjg.js"
	export default {
		data() {
			return {
				items: ['登记', '进行中', '已完成'],
				current: 0,
				type: 1, //默认审核中
				show1: false, //判断是否有数据
				show2: false, //判断是否有数据
				show3: false, //判断是否有数据
				isadmin:true,//判断是否为维修人员

				complaintList: [],
			}
		},
		onLoad: function() {
			this.GetBook(1);
		},
		methods: {
			// 顶部Tab
			tabClick(e) {
				this.type = e;
				this.GetBook(e);
			},
			formatState: function(status) {
				switch (status) {
					case 1:
						return '已登记';
					case 2:
						return '处理中';
					case 3:
						return '处理中';
					case 4:
						return '已完成';
					default:
						return '';
				}
			},

			formatTime: function(timestamp) {
				//return timestamp;
				//var timestamp = fileTable[i].UploadDate;
				 var date = new Date(parseInt(timestamp.replace("/Date(", "").replace(")/", ""), 10));
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
				var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
				var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes());
				//var s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
				 var NewDtime = Y + M + D + h + m
				 return NewDtime;
			},

			GetBook: function(e) {
				// this.show1 = false;
				// this.show2 = false;
				// this.show3 = false;
				uni.showLoading({
					title: '正在加载中...',
					mask: true,
				})
				uni.request({
					url: $Sbjg.SbjgInterface.GetBook.Url,
					method: $Sbjg.SbjgInterface.GetBook.method,
					header: $Sbjg.SbjgInterface.GetBook.header,
					data: {
						state:e,
					},
					success: (res) => {
						console.log(res);
						this.complaintList = res.data;
						var item1 = this.complaintList.filter(item => {
							return item.State == 1;
						})
						var item2 = this.complaintList.filter(item => {
							return item.State == 2 || item.State == 3;
						})
						var item3 = this.complaintList.filter(item => {
							return item.State == 4;
						})
						if(item1.length>0){
							this.show1 = true;
						}
						if(item2.length>0){
							this.show2 = true;
						}
						if(item3.length>0){
							this.show3 = true;
						}
						console.log(this.complaintList);
					},
					complete: () => {
						uni.hideLoading();
					}
				})
			},
			
			gotoStatus: function(item){
				uni.setStorageSync('faultDetail',item);
				uni.navigateTo({
					url:'./faultDetail'
				})
			},
			changeStatus:function(item){
				console.log(item);
				uni.showLoading({
					title: '正在接单中...',
					mask: true,
				})
				
				uni.request({
					url: $Sbjg.SbjgInterface.AddTask.Url,
					method: $Sbjg.SbjgInterface.AddTask.method,
					header: $Sbjg.SbjgInterface.AddTask.header,
					data:{
						companycode:item.CompanyCode,
						deviceid:item.DeviceID,
						devicetype:item.DeviceType,
						devicename:item.CustomName,
						bookid:item.AID,
						reporttime:this.formatTime(item.ReportTime),
						state:item.State,
					},
					success: (res) => {
						console.log(this.type);
						this.GetBook(this.type)
					},
					complete: () => {
						uni.hideLoading();
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

	//筛选样式
	.screen {
		height: 87upx;
		background-color: #f6f6f6;
		position: sticky;
		top: 0;
		z-index: 999;

		.screenView {
			left: 0;
			display: flex;
			width: 100%;
			height: 87upx;
			z-index: 10;
			position: sticky;
			top: 0;
			// background-color: #F5F5F5;
			margin-top: 20upx;

			.screenText {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100%;
				font-size: 30upx;
				color: #333333;
				position: relative;

				&.current {
					color: #00aaff;
					// background-color: #FFFFFF;

					&:after {
						content: '';
						position: absolute;
						left: 50%;
						bottom: 0;
						transform: translateX(-50%);
						width: 77upx;
						height: 0;
						border-bottom: 4upx solid #55aaff;
					}
				}
			}
		}
	}

	// 暂无数据
	.pd_image {
		text-align: center;
		line-height: 50%;
		padding-top: 250upx;

		.im_image {
			width: 273upx;
			height: 296upx;
		}

		.im_text {
			font-size: 30upx;
			color: #999999;
			line-height: 106upx;
		}
	}

	.order-view {
		width: 90%;
		background-color: #FFFFFF;
		border-radius: 20upx;
		margin: 30upx 5%;
		padding-bottom: 30upx;
	}

	.order-icon {
		margin-top: 30upx;
		margin-left: 30upx;
		width: 34upx;
		height: 38upx;
	}

	.order-title {
		font-size: 37upx;
		font-weight: 500;
		margin-left: 5%;
		margin-top: 20upx;
		width: 75%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.order-status {
		font-size: 29upx;
		margin-top: 25upx;
		color: red;
		margin-left: 3%;
	}

	.ml {
		margin-left: 5%;
	}

	.order-top {
		display: flex;
		flex-direction: row;
		margin-top: 10upx;
	}



	.order-info {
		display: flex;
		flex-direction: column;
		margin-left: 5%;
		margin-top: 20upx;
	}

	.order_contentText {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		width: 82%;
		margin-top: 10upx;
		color: #66686A;
		font-size: 32upx;
	}

	.order-bottom {
		border: 2upx solid #dddddd;
		border-radius: 10upx;
		padding: 15upx 0upx;
		width: 134upx;
		text-align: center;
		margin-top: 20upx;
		margin-left: 5%;
		color: #66686A;
		font-size: 32upx;
	}

	.tab {
		position: sticky;
		top: 0upx;
		background: #f5f5f5;
		padding: 16upx 0;
		height: 108upx;
		z-index: 99999;
	}
	.success-order-bottom{
		border: 2upx solid #dddddd;
		border-radius: 10upx;
		padding: 15upx 0upx;
		width: 134upx;
		text-align: center;
		margin-top: 20upx;
		margin-left: 75%;
		color: #66686A;
		font-size: 32upx;
	}
</style>
