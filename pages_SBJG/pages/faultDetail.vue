<template>
	<view>
		<view class="progress">
			<view class="top-text">
				审核进度
			</view>
			<view class="progress-status">
				<uni-steps :options="options" direction="column" :active='active'></uni-steps>
			</view>
		</view>
		<view class="type">
			<view class="top-text">
				类别
			</view>
			<view class="type-text">
				{{formate(list.Type)}}
			</view>
		</view>
		<view class="complaintinfo">
			<view class="top-text">
				报修详细
			</view>
			<view class="complaintinfo-text">
				{{list.Details}}
			</view>
		</view>

		<view class="complaintinfo">
			<view class="top-text">
				报修图片
			</view>
			<view class="">
				<image :src="photo" @tap="showimage(photo)" mode="widthFix" class="image"></image>
			</view>
		</view>
		<!-- 		<view class="backinfo" v-if="active==2">
			<view class="top-text">
				回复内容 
			</view>
			<view class="complaintinfo-text">
				感谢您的意见，我们衷心为您服务，如有不妥当的地方请多包涵，谢谢您的支持和理解，我们正在完善软件的用户体验。 </view>
		</view> -->
	</view>
</template>

<script>
	import uniSteps from '@/pages_SBJG/components/uni-steps/uni-steps.vue'
	import {
		pathToBase64,
		base64ToPath
	} from '../components/js_sdk/gsq-image-tools/image-tools/index.js';
	export default {
		data() {
			return {
				status: 0,
				active: 0,
				photo: '',
				options: [{
						title: '已登记',
					},
					{
						title: '处理中',
					},
					{
						title: '保修结果',
					}
				],
				list: '',
			}
		},
		components: {
			uniSteps
		},
		onLoad() {
			this.load();
		},
		methods: {
			load() {
				uni.showLoading({
						title: '正在加载中...',
						mask: true,
					}),
					uni.getStorage({
						key: 'faultDetail',
						success: (res) => {
							var that = this;
							that.list = res.data;
							console.log(that.list.PhotoBase64)
							if(that.list.PhotoBase64 !=null){
							base64ToPath(that.list.PhotoBase64).then(path => {
									that.photo = path;
									console.log(that.photo)
								})
								.catch(error => {
									console.error(error)
								})};

							if (this.list.State == 1) {
								this.active = 0;
							} else if (this.list.State == 2 || this.list.State == 3) {
								this.active = 1;
							} else {
								this.active = 2;
								this.options[2].title = "已完成";
							}
							uni.setNavigationBarTitle({
								title: this.list.CustomName,
							})
							console.log(this.list);
						},
						complete: () => {
							uni.hideLoading();
						}
					})
			},
			formate: function(e) {
				switch (e) {
					case 0:
						return '未定义';
					case 1:
						return '硬件故障';
					case 2:
						return '软件故障';
					case 3:
						return '主板故障';
					case 4:
						return '电源故障';
					case 5:
						return '屏幕故障';
					case 6:
						return '内存问题';
				}
			},
			showimage:function(image) {
							var imgArr = [];
							imgArr.push(image);
							//预览图片
							uni.previewImage({
								urls: imgArr,
								current: imgArr[0]
							});
						},
			 
		}
	}
</script>

<style>
	page {
		background-color: #F4F6F8;
	}

	.progress {
		width: 90%;
		margin-left: 5%;
		margin-top: 5%;
		background-color: #FFFFFF;
		border-radius: 20upx;
	}

	.progress-status {
		margin-left: 4upx;
		margin-top: 20upx;
	}

	.top-text {
		font-size: 34upx;
		color: #333333;
		margin-left: 5%;
		padding-top: 2%;
		font-weight: 551;
	}

	.type {
		width: 90%;
		margin-left: 5%;
		margin-top: 5%;
		background-color: #FFFFFF;
		border-radius: 20upx;
	}

	.complaintinfo {
		width: 90%;
		margin-left: 5%;
		margin-top: 5%;
		background-color: #FFFFFF;
		border-radius: 20upx;
	}

	.backinfo {
		width: 694upx;
		height: 299upx;
		margin: 0upx 20upx 28upx 28upx;
		background-color: #FFFFFF;
		border-radius: 20upx;
	}

	.type-text {
		font-size: 32upx;
		color: #999999;
		margin-left: 5%;
		margin-top: 2%;
		padding-bottom: 5%;
	}

	.complaintinfo-text {
		font-size: 32upx;
		color: #999999;
		width: 90%;
		text-align: justify;
		margin-left: 5%;
		margin-top: 1%;
		padding-bottom: 4%;
		/* 		color: #606264; */
		line-height: 50upx;
	}

	.image {
		height: 170rpx;
		width: 170rpx;
		margin-left: 5%;
		margin-top: 2%;
		margin-bottom: 2%;
	}
</style>
