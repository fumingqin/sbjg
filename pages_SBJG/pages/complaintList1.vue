<template>
	<view>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper activeColor="#f29100" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false"
				 swiperWidth="750" :load-text="loadText"></u-tabs-swiper>
			</view>

			<!-- 订单列表 （@transition="transition"）-->
			<swiper class="swiper-box" :current="swiperCurrent" @animationfinish="animationfinish">
				<!-- 全部 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(item, index) in info" :key="index">
								<view class="top">
									<view class="left">
										<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{ item.userName }}</view>
										<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
									</view>
									<view class="right">{{ item.orderList.state }}</view>
								</view>
								<view class="item">
									<view class="left">
										<image :src="JSON.parse(item.product.image)[0]" mode="aspectFill"></image>
									</view>
									<view class="content">
										<view class="title u-line-2">{{ item.product.name }}</view>
										<view class="type">{{ item.product.sale_unit }}/{{item.product.unit_price }}元</view>
										<view v-if="item.orderList.state!='已发货'" class="delivery-time">下单时间 {{ gettime(item.orderList.create_time)}}</view>
										<view v-if="item.orderList.state=='已发货'" class="delivery-time">发货时间 {{ gettime(item.orderList.update_time)}}</view>
										<view class="type" v-if="item.product.del_flag==1">已下架</view>
									</view>
									<view class="right">
										<view class="price">
											
										</view>
										<view class="number">x{{ item.orderList.quantity }}</view>
									</view>
								</view>
								<view class="total">
									共{{ item.orderList.quantity }}件商品 合计:
									<text class="total-price">
										￥{{ item.orderList.total_amount}}
									</text>
								</view>
								<view class="bottom">
									<view class="more">
										<u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon>
									</view>
									<view v-if="item.orderList.state=='支付成功'" class="evaluate btn" @click="refund(item.orderList.order_number)">退款</view>
									<view v-if="item.orderList.state=='已发货'" class="evaluate btn" @click="shipments(item.orderList.order_number)">确认收货</view>
									<view v-if="item.orderList.state=='待支付'" class="cancelbtn btn" @click="cancel(item.orderList.order_number)">取消</view>
									<view v-if="item.orderList.state=='待支付'" class="Deletebtn btn" @click="Delete(item.orderList.order_number)">删除</view>
									<view v-if="item.orderList.state=='待支付'" class="evaluate btn" @click="confirm(item.orderList.order_number)">付款</view>
									<view v-if="item.orderList.state=='已完成'||item.orderList.state=='已取消'" class="Deletebtn btn" @click="Delete(item.orderList.order_number)">删除</view>
								</view>
							</view>
							<view v-if="info==''" style="margin-top: 500upx;">
								<u-empty :isShow="info==''" text="暂无数据" textColor="#999999"></u-empty>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<!-- 已取消 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(item, index) in unfinishinfo" :key="index">
								<view class="top">
									<view class="left">
										<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{ item.userName }}</view>
										<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
									</view>
									<view class="right">{{ item.orderList.state }}</view>
								</view>
								<view class="item">
									<view class="left">
										<image :src="JSON.parse(item.product.image)[0]" mode="aspectFill"></image>
									</view>
									<view class="content">
										<view class="title u-line-2">{{ item.product.name }}</view>
										<view class="type">{{ item.product.sale_unit }}/{{item.product.unit_price }}元</view>
										<view class="delivery-time">下单时间 {{ gettime(item.orderList.create_time)}}</view>
										<view class="type" v-if="item.product.del_flag==1">已下架</view>
									</view>
									<view class="right">
										<view class="number">x{{ item.orderList.quantity }}</view>
									</view>
								</view>
								<view class="total">
									共{{ item.orderList.quantity }}件商品 合计:
									<text class="total-price">
										￥{{ item.orderList.total_amount}}
									</text>
								</view>
								<view class="bottom">
									<view class="more">
										<u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon>
									</view>
									<!-- <view class="logistics btn">查看物流</view>
									<view class="exchange btn">卖了换钱</view> -->
									<view class="Deletebtn btn" @click="Delete(item.orderList.order_number)">删除</view>
								</view>
							</view>
							<view v-if="unfinishinfo==''" style="margin-top: 500upx;">
								<u-empty :isShow="unfinishinfo==''" text="暂无数据" textColor="#999999"></u-empty>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<!-- 待付款 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(item, index) in unpaidinfo" :key="index">
								<view class="top">
									<view class="left">
										<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{ item.userName }}</view>
										<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
									</view>
									<view class="right">{{ item.orderList.state }}</view>
								</view>
								<view class="item">
									<view class="left">
										<image :src="JSON.parse(item.product.image)[0]" mode="aspectFill"></image>
									</view>
									<view class="content">
										<view class="title u-line-2">{{ item.product.name }}</view>
										<view class="type">{{ item.product.sale_unit }}/{{item.product.unit_price }}元</view>
										<view class="delivery-time">下单时间 {{ gettime(item.orderList.create_time)}}</view>
										<view class="type" v-if="item.product.del_flag==1">已下架</view>
									</view>
									<view class="right">
										<view class="number">x{{ item.orderList.quantity }}</view>
									</view>
								</view>
								<view class="total">
									共{{ item.orderList.quantity }}件商品 合计:
									<text class="total-price">
										￥{{ item.orderList.total_amount}}
									</text>
								</view>
								<view class="bottom">
									<view class="more">
										<u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon>
									</view>
									<!-- <view class="logistics btn">查看物流</view>
									<view class="exchange btn">卖了换钱</view> -->
									<view class="cancelbtn btn" @click="cancel(item.orderList.order_number)">取消</view>
									<view class="Deletebtn btn" @click="Delete(item.orderList.order_number)">删除</view>
									<view class="evaluate btn"@click="confirm(item.orderList.order_number)">付款</view>
								</view>
							</view>
							<view v-if="unpaidinfo==''" style="margin-top: 500upx;">
								<u-empty :isShow="unpaidinfo==''" text="暂无数据" textColor="#999999"></u-empty>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<!-- 待发货 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(item, index) in unshipmentsinfo" :key="index">
								<view class="top">
									<view class="left">
										<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{ item.userName }}</view>
										<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
									</view>
									<view class="right">{{ item.orderList.state }}</view>
								</view>
								<view class="item">
									<view class="left">
										<image :src="JSON.parse(item.product.image)[0]" mode="aspectFill"></image>
									</view>
									<view class="content">
										<view class="title u-line-2">{{ item.product.name }}</view>
										<view class="type">{{ item.product.sale_unit }}/{{item.product.unit_price }}元</view>
										<view class="delivery-time">下单时间 {{ gettime(item.orderList.create_time)}}</view>
										<view class="type" v-if="item.product.del_flag==1">已下架</view>
									</view>
									<view class="right">
										<view class="number">x{{ item.orderList.quantity }}</view>
									</view>
								</view>
								<view class="total">
									共{{ item.orderList.quantity }}件商品 合计:
									<text class="total-price">
										￥{{ item.orderList.total_amount}}
									</text>
								</view>
								<view class="bottom">
									<view class="more">
										<u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon>
									</view>
									<!-- <view class="logistics btn">查看物流</view>
									<view class="exchange btn">卖了换钱</view> -->
									<!-- <view class="evaluate btn" >付款</view> -->
								</view>
							</view>
							<view v-if="unshipmentsinfo==''" style="margin-top: 500upx;">
								<u-empty :isShow="unshipmentsinfo==''" text="暂无数据" textColor="#999999"></u-empty>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<!-- 已发货 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(item, index) in shipmentsinfo" :key="index">
								<view class="top">
									<view class="left">
										<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{ item.userName }}</view>
										<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
									</view>
									<view class="right">{{ item.orderList.state }}</view>
								</view>
								<view class="item">
									<view class="left">
										<image :src="JSON.parse(item.product.image)[0]" mode="aspectFill"></image>
									</view>
									<view class="content">
										<view class="title u-line-2">{{ item.product.name }}</view>
										<view class="type">{{ item.product.sale_unit }}/{{item.product.unit_price }}元</view>
										<view class="delivery-time">发货时间 {{ gettime(item.orderList.update_time)}}</view>
										<view class="type" v-if="item.product.del_flag==1">已下架</view>
									</view>
									<view class="right">
										<view class="number">x{{ item.orderList.quantity }}</view>
									</view>
								</view>
								<view class="total">
									共{{ item.orderList.quantity }}件商品 合计:
									<text class="total-price">
										￥{{ item.orderList.total_amount}}
									</text>
								</view>
								<view class="bottom">
									<view class="more">
										<u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon>
									</view>
									<!-- <view class="logistics btn">查看物流</view>
									<view class="exchange btn">卖了换钱</view> -->
									<view class="evaluate btn" @click="shipments(item.orderList.order_number)">确认收货</view>
								</view>
							</view>
							<view v-if="shipmentsinfo==''" style="margin-top: 500upx;">
								<u-empty :isShow="shipmentsinfo==''" text="暂无数据" textColor="#999999"></u-empty>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<!-- 已完成 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(item, index) in finishinfo" :key="index">
								<view class="top">
									<view class="left">
										<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{ item.userName }}</view>
										<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
									</view>
									<view class="right">{{ item.orderList.state }}</view>
								</view>
								<view class="item">
									<view class="left">
										<image :src="JSON.parse(item.product.image)[0]" mode="aspectFill"></image>
									</view>
									<view class="content">
										<view class="title u-line-2">{{ item.product.name }}</view>
										<view class="type">{{ item.product.sale_unit }}/{{item.product.unit_price }}元</view>
										<view class="delivery-time">下点时间 {{ gettime(item.orderList.update_time)}}</view>
										<view class="type" v-if="item.product.del_flag==1">已下架</view>
									</view>
									<view class="right">
										<view class="number">x{{ item.orderList.quantity }}</view>
									</view>
								</view>
								<view class="total">
									共{{ item.orderList.quantity }}件商品 合计:
									<text class="total-price">
										￥{{ item.orderList.total_amount}}
									</text>
								</view>
								<view class="bottom">
									<view class="more">
										<u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon>
									</view>
									<!-- <view class="logistics btn">查看物流</view>
									<view class="exchange btn">卖了换钱</view> -->
									<!-- <view class="evaluate btn" >付款</view> -->
									<view class="Deletebtn btn" @click="Delete(item.orderList.order_number)">删除</view>
								</view>
							</view>
							<view v-if="finishinfo==''" style="margin-top: 500upx;">
								<u-empty :isShow="finishinfo==''" text="暂无数据" textColor="#999999"></u-empty>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<!-- 已超时 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(item, index) in timeoutinfo" :key="index">
								<view class="top">
									<view class="left">
										<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{ item.userName }}</view>
										<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
									</view>
									<view class="right">{{ item.orderList.state }}</view>
								</view>
								<view class="item">
									<view class="left">
										<image :src="JSON.parse(item.product.image)[0]" mode="aspectFill"></image>
									</view>
									<view class="content">
										<view class="title u-line-2">{{ item.product.name }}</view>
										<view class="type">{{ item.product.sale_unit }}/{{item.product.unit_price }}元</view>
										<view class="delivery-time">下单时间 {{ gettime(item.orderList.create_time)}}</view>
										<view class="type" v-if="item.product.del_flag==1">已下架</view>
									</view>
									<view class="right">
										<view class="number">x{{ item.orderList.quantity }}</view>
									</view>
								</view>
								<view class="total">
									共{{ item.orderList.quantity }}件商品 合计:
									<text class="total-price">
										￥{{ item.orderList.total_amount}}
									</text>
								</view>
								<view class="bottom">
									<view class="more">
										<u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon>
									</view>
									<!-- <view class="logistics btn">查看物流</view>
									<view class="exchange btn">卖了换钱</view> -->
									<!-- <view class="evaluate btn" >付款</view> -->
								</view>
							</view>
							<view v-if="timeoutinfo==''" style="margin-top: 500upx;">
								<u-empty :isShow="timeoutinfo==''" text="暂无数据" textColor="#999999"></u-empty>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '实在没有了'
				},
				list: [{
						name: '全部'
					},
					{
						name: '已取消'
					},
					{
						name: '待付款'
					},
					{
						name: '待发货'
					},
					{
						name: '已发货'
					},
					{
						name: '已完成'
					},
					{
						name: '已超时'
					}
				],
				info: [], //全部
				finishinfo: [], //已完成
				unfinishinfo: [], //已取消
				shipmentsinfo: [], //已发货
				unshipmentsinfo: [], //待发货
				unpaidinfo: [], //待支付
				timeoutinfo: [], //已超时
				current: 0,
				swiperCurrent: 0,
				tabsHeight: 0,
				dx: 0,
				userInfo: '',
				orderInfo:'',
			}
		},

		onShow() {
			uni.showLoading({
				title: '加载列表中...',
			})
			this.userData(); 
		},

		onPullDownRefresh: function() {
			uni.showLoading({
				title: '加载列表中...',
			})
			this.userData();
		},

		methods: {
			//-------------------------------乘客数据读取-------------------------------
			userData: function() {
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						this.userInfo = res.data;
						this.ddlbData();
						// console.log('获取个人信息', this.userInfo)
					},
					fail: (err) => {
						uni.hideLoading()
						uni.showToast({
							title: '您暂未登录，已为您跳转登录页面',
							icon: 'none',
							success: () => {
								uni.navigateTo({
									url: '../../../pages/GRZX/userLogin'
								})
							}
						})
					}
				});
			},

			//-----------------------加载接口数据------------------------

			ddlbData: function() {
				var that = this;
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						uni.request({
							url: that.$wssc.KyInterface.getOrederList.Url,
							method: that.$wssc.KyInterface.getOrederList.method,
							data: {
								userId: that.userInfo.userId,
							},
							success: (res) => {
								console.log('列表数据', res)
								that.info = [];
								that.finishinfo = [];
								that.unfinishinfo = [];
								that.timeoutinfo = [];
								that.unpaidinfo = [];
								that.shipmentsinfo = [];
								that.unshipmentsinfo = [];
								if (res.data.status == true) {
									for (var i = 0; i < res.data.data.length; i++) {
										that.info.push(res.data.data[i])
										if (res.data.data[i].orderList.state == '待支付') {
											that.unpaidinfo.push(res.data.data[i]);
										} else if (res.data.data[i].orderList.state == '支付成功') {
											that.unshipmentsinfo.push(res.data.data[i]);
										} else if (res.data.data[i].orderList.state == '已发货') {
											that.shipmentsinfo.push(res.data.data[i]);
										} else if (res.data.data[i].orderList.state == '订单超时') {
											that.timeoutinfo.push(res.data.data[i]);
										} else if (res.data.data[i].orderList.state == '已取消' || res.data.data[i].orderList.state == '已退款') {
											that.unfinishinfo.push(res.data.data[i]);
										} else if (res.data.data[i].orderList.state == '已完成') {
											that.finishinfo.push(res.data.data[i]);
										}

									};
									uni.stopPullDownRefresh();
									uni.hideLoading();
								} else {
									uni.stopPullDownRefresh();
									uni.hideLoading();
									uni.showToast({
										title: '暂无列表信息',
										icon: 'none'
									})
								}
							},
							fail(res) {
								uni.stopPullDownRefresh();
								uni.hideLoading();
								uni.showToast({
									title: '服务器异常',
									icon: 'none'
								})
								// console.log(res)
							},
							complete() {
								setTimeout(function() {
									if (this.groupTitle == '') {
										uni.hideLoading();
										uni.showToast({
											title: '服务器异常',
											icon: 'none'
										})
									}
								}, 3000);
							}
						})
					}
				})
			},
			checkOrderState: function(e) {
				uni.request({
					url: this.$wssc.KyInterface.checkOrderState.Url,
					method: this.$wssc.KyInterface.checkOrderState.method,
					data: {
						orderNumber: e,
					},
					success: (res) => {
						console.log(res)
						if (res.data.status) {
							uni.startPullDownRefresh();
						} else {
							uni.showToast({
								title: '该订单状态异常请联系客服',
								icon: 'none'
							})
						}
						uni.stopPullDownRefresh();
						uni.hideLoading();
					},
					fail(res) {
						uni.stopPullDownRefresh();
						uni.hideLoading();
						uni.showToast({
							title: '服务器异常',
							icon: 'none'
						})
						// console.log(res)
					},
					complete() {
						setTimeout(function() {
							if (this.groupTitle == '') {
								uni.hideLoading();
								uni.showToast({
									title: '服务器异常',
									icon: 'none'
								})
							}
						}, 3000);
					}
				})
			},
			//---------------------退款---------------------
			refund: function(e) {
				uni.showModal({
					title: '您确认退款吗？',
					success: (res) => {
						console.log(res)
						if (res.confirm == true) {
							uni.showLoading({
								title: '正在退款....'
							})
							uni.request({
								url: this.$wssc.KyInterface.OrderRefund.Url,
								method: this.$wssc.KyInterface.OrderRefund.method,
								data: {
									orderNumber: e,
								},
								success: (res) => {
									console.log(res)
									if (res.data.status) {
										uni.hideLoading()
										uni.showToast({
											title: '退款成功',
											icon: 'success'
										})
										this.checkOrderState(e);

									} else {
										uni.hideLoading()
										uni.showToast({
											title: '退款失败',
											icon: 'success'
										})
										uni.startPullDownRefresh();
									}

								},
								fail: () => {
									uni.hideLoading()
									uni.showToast({
										title: '服务器异常，请重试',
										icon: 'success'
									})
									uni.startPullDownRefresh();
								}
							})
						} else {

						}
					}
				})
			},
			//---------------------删除---------------------
			Delete: function(e) {
				uni.getStorage({
					key: 'userInfo',
					success: (param) => {
						console.log(param)
						uni.showModal({
							title: '您确认删除吗？',
							success: (res) => {
								console.log(res)
								if (res.confirm == true) {
									uni.showLoading({
										title: '正在删除....'
									})
									uni.request({
										url: this.$wssc.KyInterface.deleteOrder.Url,
										method: this.$wssc.KyInterface.deleteOrder.method,
										data: {
											orderNumber: e,
											userId: param.data.userId,
										},
										success: (res) => {
											console.log(res)
											if (res.data.status) {
												uni.hideLoading()
												uni.showToast({
													title: '删除成功',
													icon: 'success'
												})
												this.checkOrderState(e);

											} else {
												uni.hideLoading()
												uni.showToast({
													title: '删除失败',
													icon: 'success'
												})
												uni.startPullDownRefresh();
											}

										},
										fail: () => {
											uni.hideLoading()
											uni.showToast({
												title: '服务器异常，请重试',
												icon: 'success'
											})
											uni.startPullDownRefresh();
										}
									})
								}
							}
						})
					}
				})
			},
			//---------------------取消---------------------
			cancel: function(e) {
				uni.getStorage({
					key: 'userInfo',
					success: (param) => {
						uni.showModal({
							title: '您确认取消吗？',
							success: (res) => {
								console.log(res)
								if (res.confirm == true) {
									uni.showLoading({
										title: '正在取消....'
									})
									uni.request({
										url: this.$wssc.KyInterface.cancelOrder.Url,
										method: this.$wssc.KyInterface.cancelOrder.method,
										data: {
											orderNumber: e,
											userId: param.data.userId,
										},
										success: (res) => {
											console.log(res)
											if (res.data.status) {
												uni.hideLoading()
												uni.showToast({
													title: '取消成功',
													icon: 'success'
												})
												this.checkOrderState(e);

											} else {
												uni.hideLoading()
												uni.showToast({
													title: '取消失败',
													icon: 'success'
												})
												uni.startPullDownRefresh();
											}

										},
										fail: () => {
											uni.hideLoading()
											uni.showToast({
												title: '服务器异常，请重试',
												icon: 'success'
											})
											uni.startPullDownRefresh();
										}
									})
								} else {

								}
							}
						})
					}
				})
			},
			//---------------------确认收货---------------------
			shipments: function(e) {
				uni.getStorage({
					key: 'userInfo',
					success: (param) => {
						console.log(param)
						uni.showModal({
							title: '您确认收货吗？',
							success: (res) => {
								console.log(res)
								if (res.confirm == true) {
									uni.showLoading({
										title: '请稍等....'
									})
									uni.request({
										url: this.$wssc.KyInterface.ConfirmReceipt.Url,
										method: this.$wssc.KyInterface.ConfirmReceipt.method,
										data: {
											orderNumber: e,
											userId: param.data.userId,
										},
										success: (res) => {
											console.log(res)
											if (res.data.status) {
												uni.hideLoading()
												uni.showToast({
													title: '确认成功',
													icon: 'success'
												})
												this.checkOrderState(e);
			
											} else {
												uni.hideLoading()
												uni.showToast({
													title: '确认失败',
													icon: 'success'
												})
												uni.startPullDownRefresh();
											}
			
										},
										fail: () => {
											uni.hideLoading()
											uni.showToast({
												title: '服务器异常，请重试',
												icon: 'success'
											})
											uni.startPullDownRefresh();
										}
									})
								}
							}
						})
					}
				})
			},
			//-------------------支付----------------
			confirm:function(e) {
				uni.showLoading({
					title: '拉起支付中...'
				})
				var that=this;
				uni.request({
					url: that.$wssc.KyInterface.checkOrderState.Url,
					method: that.$wssc.KyInterface.checkOrderState.method,
					data: {
						orderNumber: e,
					},
					success: function(res) {
						console.log(res)
						if (res.data.data == '订单目前状态为：尚未获取二维码') {
							uni.request({
								url: this.$wssc.KyInterface.againPay.Url,
								method: this.$wssc.KyInterface.againPay.method,
								data:{
									userId:this.userInfo.userId,
									orderNumber:e
								},
								success: (res) => {
									if (res.data.status == true) {
										uni.hideLoading()
										this.orderInfo=res.data.data;
										uni.requestPayment({
											provider: 'wxpay',
											orderInfo: {
												appid:res.data.data.AppId,
												noncestr:res.data.data.Noncestr,
												package: 'Sign=WXPay',
												partnerid:res.data.data.PartnerId,
												prepayid:res.data.data.PrepayId,
												timestamp:res.data.data.Timestamp,
												sign:res.data.data.Sign,
											},
											success: function(res) {
												console.log(res)
												if(res.errMsg == 'requestPayment:ok'){
													uni.request({
														url: that.$wssc.KyInterface.checkOrderState.Url,
														method: that.$wssc.KyInterface.checkOrderState.method,
														data: {
															orderNumber: e,
														},
														success: function(res) {
															console.log(res)
															if (res.data.status == true) {
																uni.showToast({
																	title: '支付成功',
																	icon: 'none',
																	duration: 3000
																})
															} else {
																uni.showToast({
																	title: '支付失败',
																	icon: 'none',
																	duration: 3000
																})
															}
															uni.startPullDownRefresh();
														},
														fail: function() {
															uni.showToast({
																title: '购买失败',
																icon: 'none',
																duration: 3000
															})
														}
													})
												}
											},
															
											fail: function(e) {
												console.log(e)
												if (e.errMsg == 'requestPayment:fail canceled') {
													uni.showToast({
														title: '您放弃了支付',
														icon: 'none',
														duration: 3000
													})
												} else if (e.errMsg == 'requestPayment:fail errors') {
													uni.showToast({
														title: '支付失败，请重试',
														icon: 'none',
														duration: 3000
													})
												} else {
													uni.showToast({
														title: '网络异常，请检查网络后重试',
														icon: 'none',
														duration: 3000
													})
												}
															
											}
										})
									} else {
										uni.showToast({
											title: res.data.msg,
											icon: 'none'
										})
									}
								},
								fail: function() {
									uni.showToast({
										title: '支付异常',
										icon: 'none'
									})
								}
							})
						} else {
							uni.showToast({
								title: '订单已超时请从新下单',
								icon: 'none',
								duration: 3000
							})
						}
						uni.startPullDownRefresh();
					},
					fail: function() {
						uni.showToast({
							title: '查询失败',
							icon: 'none',
							duration: 3000
						})
					}
				})
				
			},
			//-------------------时间切割---------------------------
			gettime: function(param) {
				let array = param.split('T');
				var a = array[0] + ' ' + array[1];
				return a;
			},

			// -------------------- tab栏切换 --------------------------
			change(index) {
				this.swiperCurrent = index;
				this.current = index;
				// this.getOrderList(index);
			},

			reachBottom() {
				// 此tab为空数据
				// setTimeout(() => {
				// 	this.getOrderList(this.current);
				// }, 1200);
			},

			//tab滑动过度效果
			transition({
				detail: {
					dx
				}
			}) {
				this.$refs.tabs.setDx(dx);
			},

			//tab滑动动画
			animationfinish({
				detail: {
					current
				}
			}) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			}
		}
	}
</script>

<style>
	/* #ifndef H5 */
	page {
		height: 100%;
		background-color: #f2f2f2;
	}

	/* #endif */
</style>

<style lang="scss" scoped>
	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}

	.order {
		width: 710rpx;
		background-color: #ffffff;
		margin: 20rpx auto;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 20rpx;
		font-size: 28rpx;

		.top {
			display: flex;
			justify-content: space-between;

			.left {
				display: flex;
				align-items: center;

				.store {
					margin: 0 10rpx;
					font-size: 32rpx;
					font-weight: bold;
				}
			}

			.right {
				color: $u-type-warning-dark;
			}
		}

		.item {
			display: flex;
			margin: 20rpx 0 0;

			.left {
				margin-right: 20rpx;

				image {
					width: 200rpx;
					height: 200rpx;
					border-radius: 10rpx;
				}
			}

			.content {
				.title {
					font-size: 34rpx;
					line-height: 50rpx;
					width: 400rpx;
					font-weight: bold;
				}

				.type {
					margin: 10rpx 0;
					font-size: 28rpx;
					color: $u-tips-color;
				}

				.delivery-time {
					color: $u-tips-color;
					font-size: 28rpx;
				}
			}

			.right {
				margin-left: 10rpx;
				margin-top: 54rpx;
				text-align: right;

				.price {
					font-size: 24rpx;
					margin-top: 4rpx;
					position: absolute;
					right: 30px;
				}

				.number {
					color: $u-tips-color;
					font-size: 24rpx;
				}
			}
		}

		.total {
			margin-top: 20rpx;
			text-align: right;
			font-size: 24rpx;

			.total-price {
				font-size: 32rpx;
			}
		}
			.bottom {
					display: flex;
					margin-top: 40rpx;
					padding: 0 10rpx;
					justify-content: space-between;
					align-items: center;
			
					.btn {
						line-height: 52rpx;
						width: 160rpx;
						border-radius: 26rpx;
						border: 2rpx solid $u-border-color;
						font-size: 26rpx;
						text-align: center;
						color: $u-type-info-dark;
					}
			
					.evaluate {
						color: $u-type-warning-dark;
						border-color: $u-type-warning-dark;
					}
					.Deletebtn {
						color:#F43530;
						border-color:#F43530;
					}
					.cancelbtn {
						color:#C0C0C0;
						border-color:#C0C0C0;
					}
				}
			
		}
		
</style>
