<template>
	<view>
		<!-- 顶部滑动 -->
		<view class="screen">
			<view class="screenView">
				<view class="screenText" :class="{current:type===0}" @click="tabClick(0)">
					登记
				</view>
				<view class="screenText" :class="{current:type===1}" @click="tabClick(1)">
					进行中
				</view>
				<view class="screenText" :class="{current:type===2}" @click="tabClick(2)">
					已完成
				</view>
			</view>
		</view>
	<!-- 	<view class="tab">
		   <uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#3DABFC"></uni-segmented-control>
		  </view> -->

		<!-- 登记 -->
		<view v-if="type==0">
			<!-- 暂无数据 -->
			<view class="pd_image" v-if="complaintListIndex1==0">
				<view>
					<image class="im_image" src="../static/tslb.gif"></image>
				</view>
				<view>
					<text class="im_text">暂无数据</text>
				</view>
			</view>
			<view class="order-view" v-for="(item,index) in complaintList" :key="index" v-if="item.State==1">
				<view class="order-top">
					<!-- <image src="../../static/baoche.png" class="order-icon"></image> -->
					<text class="order-title">{{item.MyLocation.Memo}}</text>
					<text class="order-status">{{formatState(item.State)}}</text>
				</view>
				<view class="order-info">
					<text class="order_contentText">报修人：{{item.ReportName}}</text>
					<text class="order_contentText">手机号码：{{item.PhoneNumber}}</text>
					<text class="order_contentText">设备名称：{{item.CustomName}}</text>
					<text class="order_contentText">报修时间：{{item.ReportTime}}</text>
					<!-- <text class="order_contentText">报修内容：{{item.Details}}</text> -->
				</view>
				<view class="order-bottom" @click="gotoStatus">
					详细
				</view>
			</view>

		</view>
		<!-- 进行中 -->
		<view v-if="type==1">
			<view class="pd_image" v-if="complaintListIndex2==0">
				<view>
					<image class="im_image" src="../static/tslb.gif"></image>
				</view>
				<view>
					<text class="im_text">暂无数据</text>
				</view>
			</view>
			<view class="order-view" v-for="(item,index) in complaintList" :key="index" v-if="item.State!=1&&item.State!=4">
				<view class="order-top">
					<!-- <image src="../../static/baoche.png" class="order-icon"></image> -->
					<text class="order-title">{{item.MyLocation.Memo}}</text>
					<text class="order-status">{{formatState(item.State)}}</text>
				</view>
				<view class="order-info">
					<text class="order_contentText">报修人：{{item.ReportName}}</text>
					<text class="order_contentText">手机号码：{{item.PhoneNumber}}</text>
					<text class="order_contentText">报修时间：{{item.ReportTime}}</text>
					<text class="order_contentText">报修内容：{{item.Details}}</text>
				</view>
				<view class="order-bottom" @click="gotoStatus">
					详细
				</view>
			</view>
		</view>
		<!-- 完成 -->
		<view v-if="type==2">
			<view class="pd_image" v-if="complaintListIndex3==0">
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
					<text class="order_contentText">报修时间：{{item.ReportTime}}</text>
					<text class="order_contentText">报修内容：{{item.Details}}</text>
				</view>
				<view class="order-bottom" @click="gotoStatus">
					详细
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import $Sbjg from "@/common/sbjg.js"
	import unisegmentedcontrol from "@/pages_SBJG/components/uni-segmented-control.vue"
	export default {
		components:{
			unisegmentedcontrol,
		},
		data() {
			return {
				items:['登记','进行中','已完成'],
				current:0,
				type: 0, //默认审核中
				complaintListIndex1: 1, //判断是否有数据
				complaintListIndex2: 0, //判断是否有数据
				complaintListIndex3: 1, //判断是否有数据
				
				
				complaintList: [],
			}
		},
		onLoad: function() {
			this.GetBook();
		},
		methods: {
			// 顶部Tab
			tabClick(e) {
				if (e == 0) {
					this.type = 0;
				} else if (e == 1) {
					this.type = 1;
				} else if (e == 2) {
					this.type = 2;
				}
			},
			// onClickItem:function(e){
			// 	if (this.current !== e.currentIndex) {
			// 		this.current = e.currentIndex
   //  }},
			formatState: function(status) {
				switch (status) {
					case 1:
						return '登记';
						break;
					case 2:
						return '处理中';
						break;
					case 3:
						return '处理中';
						break;
					case 4:
						return '维修完成';
						break;
					default:
						return '';
				}
			},
			
			GetBook:function(){
				var that = this;
				uni.request({
					url: $Sbjg.SbjgInterface.GetBook.Url,
					method: $Sbjg.SbjgInterface.GetBook.method,
					header: $Sbjg.SbjgInterface.GetBook.header,
					data: {},
					success: (res) => {
						this.complaintList = res.data;
							console.log(this.complaintList)
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
		width: 694upx;
		height: 395upx;
		background-color: #FFFFFF;
		border-radius: 20upx;
		margin: 40upx 20upx 28upx 28upx;
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
		margin-left: 20upx;
		margin-top: 24upx;
		width: 384upx;
	}

	.order-top {
		display: flex;
		flex-direction: row;
		margin-top: 10upx;
	}

	.order-status {
		font-size: 29upx;
		margin-top: 30upx;
		margin-left: 150upx;
		color: red;
	}

	.order-info {
		display: flex;
		flex-direction: column;
		margin-left: 84upx;
		margin-top: 30upx;
	}

	.order_contentText {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		width: 550upx;
		margin-top: 10upx;
		color: #66686A;
		font-size: 32upx;
	}

	.order-bottom {
		border: 2upx solid #dddddd;
		border-radius: 10upx;
		padding: 16upx 0upx;
		width: 134upx;
		text-align: center;
		margin-left: 519upx;
		margin-top: 10upx;
		color: #66686A;
		font-size: 32upx;
	}
	.tab{
		position: sticky;
		  top: 0upx;
		  background: #f5f5f5;
		  padding: 16upx 0;
		  height: 108upx;
		  z-index: 99999;
	}
</style>
