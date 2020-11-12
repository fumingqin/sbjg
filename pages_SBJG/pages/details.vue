<template>
	<view class="dt_top">
		<image class="top_image" src="../../static/HOME/beijin2.png" mode="aspectFill"></image>
		<view class="tp_outerLayer">
			<view class="ol_image">
				<image class="im_image" style="height: 58%;" v-if="parameter.Type == 5" src="../../static/HOME/bancixinxiping.png"
				 mode="aspectFit"></image>
				<image class="im_image" style="height: 58%;" v-if="parameter.Type == 4" src="../../static/HOME/fachewei.png" mode="aspectFit"></image>
				<image class="im_image" v-if="parameter.Type == 3" src="../static/baobanji.png" mode="aspectFit"></image>
				<image class="im_image" v-if="parameter.Type == 2" src="../../static/HOME/pindanji.png" mode="aspectFit"></image>
				<image class="im_image" v-if="parameter.Type == 1" src="../static/shoupiaoji.png" mode="aspectFit"></image>
				<image class="im_image" style="height: 70%;" v-if="parameter.Type == 0" src="../../static/HOME/jianpiaoji.png" mode="aspectFit"></image>
			</view>

			<view class="ol_equipmentStatus">
				<text class="es_text animated">设备状态</text>
				<text class="es_text2" v-if="parameter.State==0">硬件状态未定义</text>
				<text class="es_text2" v-if="parameter.State==1">硬件在线</text>
				<text class="es_text2" v-if="parameter.State==2">硬件疑似离线</text>
				<text class="es_text2" v-if="parameter.State==5">硬件下班关机</text>
				<text class="es_text3 animated flash" v-if="parameter.State==3 ||parameter.State==4">硬件异常</text>
				<text class="es_text2" v-if="parameter.State==0">软件状态未定义</text>
				<text class="es_text2" v-if="parameter.State==1">软件在线</text>
				<text class="es_text2" v-if="parameter.State==2">软件疑似离线</text>
				<text class="es_text2" v-if="parameter.State==5">软件下班关机</text>
				<text class="es_text3 animated flash" v-if="parameter.State ==3||parameter.State ==4">软件异常</text>
			</view>

			<view class="ol_networkStatus">
				<text class="ns_text">网络状态</text>
				<!-- <text class="ns_text2" v-if="parameter.Online==true">外网正常</text>
				<text class="ns_text3" v-if="parameter.Online==false">外网异常</text> -->
				<text class="ns_text2" >{{DeviceState[parameter.State].state}}</text>
				<!-- <text class="ns_text3 animated flash" v-if="parameter.Online==false">内网异常</text> -->
			</view>

			<view class="ol_ticketSalesAmount" v-if="parameter.Type == 0 || parameter.Type == 1 || parameter.Type == 2">
				<text class="tsa_text">{{emptyTicketReset(ticketSum)}}/{{emptyTicketReset(moneySum)}}</text>
				<!-- <text class="tsa_text animated flash" >---/---</text> -->
				<view style="display: flex;">
					<image class="tsa_icon" src="../static/shoupiao.png" mode="aspectFit"></image>
					<text class="tsa_text2" v-if="parameter.Type == 2">开单数/金额</text>
					<text class="tsa_text2" v-if="parameter.Type == 1">售票数/金额</text>
					<text class="tsa_text2" v-if="parameter.Type == 0">检票数/金额</text>
				</view>
			</view>

			<view class="ol_ticketSalesAmount" v-if="parameter.Type == 3 || parameter.Type == 4 || parameter.Type == 5">
				<text class="tsa_text" v-if="parameter.Online==true">{{emptyTicketReset(ticketSum)}}</text>
				<text class="tsa_text animated flash" v-if="parameter.Online==false">---</text>
				<view style="display: flex;">
					<image class="tsa_icon" src="../static/shoupiao.png" mode="aspectFit"></image>
					<text class="tsa_text2" v-if="parameter.Type == 3">班次数</text>
					<text class="tsa_text2" style="margin-left: 4upx;" v-if="parameter.Type == 4">发车数</text>
					<text class="tsa_text2" v-if="parameter.Type == 5">报班数</text>
				</view>
			</view>

			<view class="ol_cpuConsumption">
				<!-- <text class="cc_text" v-if="parameter.Online==true">{{memoryConversion(freeMemory)}}</text> -->
				<text class="cc_text animated flash">---</text>
				<view style="display: flex;">
					<image class="cc_icon" src="../static/neicun.png" mode="aspectFit"></image>
					<text class="cc_text2">可用内存</text>
				</view>
			</view>

			<view class="ol_cpuTemperature">
				<!-- <text class="ct_text" v-if="parameter.Online==true">{{shareConversion(cpuProportion)}}</text> -->
				<text class="ct_text animated flash">---</text>
				<view style="display: flex;">
					<image class="ct_icon" style="" src="../static/cpu.png" mode="aspectFit"></image>
					<text class="ct_text2">CPU占用率</text>
				</view>
			</view>

			<view class="ol_seeMore">
				<text class="ct_text" @click="checkAttention(1)">查看更多></text>
			</view>

			<!-- 现状图 -->
			<view class="ol_LineChart" :hidden="sellTicketDataIndex == 0 && cpuMemoryIndex == 0">
				<!-- 折线Line纯数字-->
				<view class="line" :hidden="sellTicketDataIndex == 0 && cpuMemoryIndex == 0">
					<line-chart ref="lineData2" canvasId="index_line_2" :dataAs="lineData2" />
				</view>
				<!-- 折线Line带百分比 -->
				<!-- <view class="line" :hidden="cpuMemoryIndex == 0">
					<line-chart canvasId="index_line_1" ref="lineData1" :dataAs="lineData" :yAxisAs="{
							formatter: {
								type: 'percent', //type:number percent String,额外参数:fixed:NUmber,name:String
								fixed: 2
							}
						}" />
				</view> -->
			</view>

			<!-- 按钮 -->
			<view>
				<view class="ol_shutDown" hover-class="ol_hover" @click="notYetOpen()">
					<image class="sd_icon" style="width: 30upx;" src="../static/guanji.png" mode="aspectFit"></image>
					<text class="sd_text">设备关机</text>
				</view>
				<view class="ol_shutDown" hover-class="ol_hover" @click="notYetOpen()">
					<image class="sd_icon" style="width: 36upx;" src="../static/chongqi.png" mode="aspectFit"></image>
					<text class="sd_text">设备重启</text>
				</view>
				<view class="ol_shutDown" hover-class="ol_hover" @click="notYetOpen()">
					<image class="sd_icon" style="width: 30upx;" src="../static/zijian.png" mode="aspectFit"></image>
					<text class="sd_text">查看进程</text>
				</view>
				<view class="ol_shutDown" hover-class="ol_hover" style="margin-bottom: 56upx;" @click="notYetOpen()">
					<image class="sd_icon" style="width: 30upx;" src="../static/dengji.png" mode="aspectFit"></image>
					<text class="sd_text">保修登记</text>
				</view>
				<!-- <view class="ol_register"></view> -->
			</view>


		</view>

		<!-- 查看须知popup -->
		<popup ref="popup" type="bottom">
			<view class="boxView2">
				<view class="titleView2">
					<text class="Nb_text3">设备参数</text>
					<text class="Nb_text4 jdticon icon-fork" @click="close(1)"></text>
				</view>
				<scroll-view class="noticeBox2" scroll-y="ture">
					<view class="tv_title">
						<view class="tl_content">
							<text class="ct_text">设备年限</text>
							<text class="ct_text2" v-if="parameter.Online==true">5</text>
							<text class="ct_text2 animated flash" v-if="parameter.Online==false">--</text>
						</view>
						<view class="tl_content">
							<text class="ct_text">开机时间</text>
							<text class="ct_text2" v-if="parameter.Online==true">{{parameter.OpenTime}}</text>
							<text class="ct_text2 animated flash" v-if="parameter.Online==false">--</text>
						</view>
						<view class="tl_content">
							<text class="ct_text">掉线时长</text>
							<text class="ct_text2" v-if="parameter.Online==true">{{parameter.OnlineTime}}</text>
							<text class="ct_text2 animated flash" v-if="parameter.Online==false">--</text>
						</view>
						<view class="tl_content" :hidden="parameter.Type == 3 || parameter.Type == 4 || parameter.Type == 5">
							<text class="ct_text" v-if="parameter.Type == 2">开单数量</text>
							<text class="ct_text" v-if="parameter.Type == 1">售票数量</text>
							<text class="ct_text" v-if="parameter.Type == 0">检票数量</text>
							<text class="ct_text2" v-if="parameter.Online==true">{{emptyTicketReset(ticketSum)}}</text>
							<text class="ct_text2 animated flash" v-if="parameter.Online==false">--</text>
						</view>
						<view class="tl_content" :hidden="parameter.Type == 3 || parameter.Type == 4 || parameter.Type == 5">
							<text class="ct_text" v-if="parameter.Type == 2">开单金额</text>
							<text class="ct_text" v-if="parameter.Type == 1">售票金额</text>
							<text class="ct_text" v-if="parameter.Type == 0">检票金额</text>
							<text class="ct_text2" v-if="parameter.Online==true">{{emptyTicketReset(moneySum)}}</text>
							<text class="ct_text2 animated flash" v-if="parameter.Online==false">--</text>
						</view>
						<view class="tl_content">
							<text class="ct_text">掉线次数</text>
							<text class="ct_text2" v-if="parameter.Online==true">{{parameter.BreakNum}}</text>
							<text class="ct_text2 animated flash" v-if="parameter.Online==false">--</text>
						</view>
						<view class="tl_content">
							<text class="ct_text">维修次数</text>
							<text class="ct_text2" v-if="parameter.Online==true">{{frequency}}</text>
							<text class="ct_text2 animated flash" v-if="parameter.Online==false">--</text>
						</view>
						<view class="tl_content">
							<text class="ct_text">设备状态</text>
							<text class="ct_text2" style="color: #3CB96B;" >{{DeviceState[parameter.State].state}}</text>
							<!-- <text class="ct_text2 animated flash" style="color: #FF6969;" v-if="parameter.Online==false">离线</text> -->
						</view>
						<view class="tl_content">
							<text class="ct_text">网络状态</text>
							<text class="ct_text2" style="color: #3CB96B;" >{{DeviceState[parameter.State].state}}</text>
							<!-- <text class="ct_text2 animated flash" style="color: #FF6969;" v-if="parameter.Online==false">异常</text> -->
						</view>
						<view class="tl_content">
							<text class="ct_text">CPU占用率</text>
							<!-- <text class="ct_text2" v-if="parameter.Online==true">{{shareConversion(cpuProportion)}}</text> -->
							<text class="ct_text2 animated flash">--</text>
						</view>
						<view class="tl_content">
							<text class="ct_text">可用内存</text>
							<!-- <text class="ct_text2" v-if="parameter.Online==true">{{memoryConversion(freeMemory)}}</text> -->
							<text class="ct_text2 animated flash">--</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</popup>

		<!-- 查看须知popup -->
		<popup ref="popup2" type="bottom">
			<view class="boxView2">
				<view class="titleView2">
					<text class="Nb_text3">运行进程</text>
					<text class="Nb_text4 jdticon icon-fork" @click="close(2)"></text>
				</view>
				<scroll-view class="noticeBox2" scroll-y="ture">
					<view class="tv_title">
						<view class="tl_content" style="display: flex;" v-for="(item,index) in parameter.t" :key="index">
							<text class="ct_text3">{{item.MainWindowTitle}}{{'('+item.ProgressName+')'}}</text>
							<text class="ct_text4">{{timestampConversion(item.StartTime)}}</text>
							<!-- <text class="ct_text4" v-if="parameter.Online==false">--</text> -->
						</view>
					</view>
				</scroll-view>
			</view>
		</popup>
	</view>
</template>

<script>
	import LineChart from '@/components/stan-ucharts/LineChart.vue';
	import popup from "@/components/uni-popup/uni-popup.vue";
	import $Sbjg from "@/common/sbjg.js"
	export default {
		components: {
			LineChart,
			popup
		},
		data() {
			return {
				equipmentStatus: 0,
				networkStatus: 0,
				sellTicket: 177,
				money: 2050,
				lineData: {
					//带百分比的图--折线图数据
					categories: [],
					series: [{
						name: 'CPU占用率',
						data: [],
					}]
				},
				DeviceState: [{
					"state": "未定义",
				},{
					"state": "在线"
				},{
					"state": "疑似离线"
				},{
					"state": "短时离线"
				},{
					"state": "长时离线"
				},{
					"state": "下班关机"
				}],
				lineData2: {
					//数字的图--折线图数据
					categories: [],
					series: [],
				},
				title: '今点通报班机OJ2988',
				frequency: 5,
				numberTickets: 175,
				cpu: '56%',
				memory: '60%',
				abnormalTimes: 15,
				state: 0,
				runFunction: "联网售票系统",
				time: 240,

				parameter: '', //设备数据
				sellTicketData: '', //售票数据
				sellTicketDataIndex: 0, // 售票统计图默认值
				cpuMemory: '', //cpu占用率和剩余内存
				cpuMemoryIndex: 0, //cpu统计图默认值
				timer: '', //定时器参数
				ticketSum: '', //售票总数
				moneySum: '', //金额总数
				cpuProportion: '---', //CPU占比率
				freeMemory: '---', //剩余内存
			}
		},
		onLoad: function() {
			this.RequestDeviceParameters();
		},
		onUnload: function() {
			clearInterval(this.timer)
		},
		methods: {
			// 页面第一次获取设备数据
			RequestDeviceParameters: function() {
				var that = this;
				var data = uni.getStorageSync('equipmentParameters')
				uni.request({
					url: $Sbjg.SbjgInterface.GetmachineBy.Url,
					method: $Sbjg.SbjgInterface.GetmachineBy.method,
					header: $Sbjg.SbjgInterface.GetmachineBy.header,
					data: {
						AID: data.Device.AID,
					},
					success: (res) => {
						console.log('设备参数', res)
						this.parameter = '';
						this.parameter = res.data[0];
						this.titleData();
						that.lineData2.categories = []; //清空X轴数据
						this.lineData2.series = []; //清空Y轴数据
						console.log(that.parameter.AID);
						//请求设备售出的票数接口
						uni.request({
							url: $Sbjg.SbjgInterface.GetBySettingAID.Url,
							method: $Sbjg.SbjgInterface.GetBySettingAID.method,
							header: $Sbjg.SbjgInterface.GetBySettingAID.header,
							data: {
								AID: that.parameter.AID,
							},
							success: (res) => {
								console.log('设备售票', res)
								that.sellTicketData = res.data;
								that.sellTicketDataIndex = res.data.length;
								that.ticketSum = 0;
								that.moneySum = 0;
								//筛选数据，重组数组
								if (res.data.length !== 0) {
									var ticketSales = {
										name: '',
										data: [],
									}

									if (that.parameter.Type == 3) {
										ticketSales.name = '检票数';
									} else if (that.parameter.Type == 2) {
										ticketSales.name = '售票数';
									} else if (that.parameter.Type == 4) {
										ticketSales.name = '开单数';
									} else if (that.parameter.Type == 5) {
										ticketSales.name = '报班数';
									}


									for (var i = 0; i < res.data.length; i++) {
										//重组时段
										var a = res.data[i].Hour;
										that.lineData2.categories.push(a + '时')
										// console.log(that.lineData2.categories) 

										//重组票数
										var b = res.data[i].Score1;
										ticketSales.data.push(b);
										// console.log(ticketSales.data) 

										//累加票数
										that.ticketSum += res.data[i].Score1;
										// console.log('票数',that.ticketSum)
										//累加金额
										that.moneySum += res.data[i].Score2;
										// console.log('金额',that.moneySum)
									}
									that.lineData2.series.push(ticketSales)
									//生成图形
									that.$nextTick(() => {
										that.$refs['lineData2'].showCharts();
									});
								}
								uni.hideLoading()
							},
							fail: () => {
								uni.showToast({
									title: '服务器异常，请重试，重试后不行请联系客服',
									icon: 'none'
								})
							}
						})

						// setTimeout(function(){
						// 	//请求cpu占用率和剩余内存
						// 	uni.request({
						// 		url: $Sbjg.SbjgInterface.GetAllCpu.Url,
						// 		method: $Sbjg.SbjgInterface.GetAllCpu.method,
						// 		header: $Sbjg.SbjgInterface.GetAllCpu.header,
						// 		data: {
						// 			AID: that.parameter.AID,
						// 			// AID: '2020-08-17-46621d8a-4e64-4b78-bb05-ae24a89342a9',
						// 		},
						// 		success: (res) => {
						// 			console.log('cpu内存', res)
						// 			that.cpuMemory = res.data;
						// 			that.cpuMemoryIndex = res.data.length;


						// 			//筛选数据，重组数组
						// 			if (res.data.length !== 0) {
						// 				that.cpuProportion = res.data[res.data.length-1].Score1; //获取数组最后一个为cpu占用率
						// 				that.freeMemory = res.data[res.data.length-1].Score3; //获取数组最后一个为剩余内存

						// 				var cpuObject = {
						// 					name: 'cpu占用率',
						// 					data: [],
						// 				}

						// 				if (that.sellTicketDataIndex !== 0) {
						// 					var a1 = that.lineData2.series[0].data.concat(that.lineData2.series[0].data);
						// 					var b2 = a1.sort((a, b) => b - a)
						// 					for (var i = 0; i < res.data.length; i++) {
						// 						//重组票数
						// 						// console.log(b2)
						// 						var e = res.data[i].Score1 * b2[0] / 100;
						// 						// console.log(e)
						// 						if( e == 0){
						// 							cpuObject.data.push(e2);
						// 						}else{
						// 							var e2 = e.toFixed(2);
						// 							cpuObject.data.push(e2);
						// 						}
						// 					}
						// 					that.lineData2.series.push(cpuObject)
						// 					//生成图形
						// 					that.$nextTick(() => {
						// 						that.$refs['lineData2'].showCharts();
						// 					});
						// 				} else {
						// 					for (var i = 0; i < res.data.length; i++) {
						// 						//重组时段
						// 						var a = res.data[i].Time;
						// 						that.lineData2.categories.push(a + '时')
						// 						// console.log(that.lineData2.categories) 

						// 						//重组票数
						// 						var d = res.data[i].Score1;
						// 						var d2 = d.slice(0,6);
						// 						cpuObject.data.push(d2);
						// 					}
						// 					that.lineData2.series.push(cpuObject)
						// 					//生成图形
						// 					that.$nextTick(() => {
						// 						that.$refs['lineData2'].showCharts();
						// 					});
						// 				}
						// 			}
						// 			uni.hideLoading()
						// 		},
						// 		fail: () => {
						// 			uni.showToast({
						// 				title: '服务器异常，请重试，重试后不行请联系客服',
						// 				icon: 'none'
						// 			})
						// 		}
						// 	})
						// },1000)


					},
					fail: () => {
						uni.showToast({
							title: '服务器异常，请重试，重试后不行请联系客服',
							icon: 'none'
						})
					}
				})

			},


			//--------------------开头标题--------------------------
			titleData: function() {
				uni.setNavigationBarTitle({
					title: this.parameter.CustomName
				})
			},

			//-------------------------------查看须知-----------------------------
			checkAttention(e) {
				if (e == 1) {
					this.$refs.popup.open()
				} else if (e == 2) {
					this.$refs.popup2.open()
				}
			},
			close(e) {
				if (e == 1) {
					this.$refs.popup.close()
				} else if (e == 2) {
					this.$refs.popup2.close()
				}
			},
			// --------------------------------------设备关机------------------
			equipmentShutDown: function() {
				uni.showModal({
					title: '您确认要把设备 "关机" 吗？',
					success: (res) => {
						console.log(res)
						if (res.confirm == true) {
							console.log(this.parameter.AID)
							uni.showLoading({
								title: '正在请求关机'
							})
							uni.request({
								url: $Sbjg.SbjgInterface.GetCommndAdd.Url,
								method: $Sbjg.SbjgInterface.GetCommndAdd.method,
								header: $Sbjg.SbjgInterface.GetCommndAdd.header,
								data: {
									SettingAID: this.parameter.AID,
									Msg: '关机',
								},
								success: (res) => {
									console.log(res)
									if (res.data == '指令发送成功') {
										uni.hideLoading()
										uni.showToast({
											title: '关机成功',
											icon: 'success'
										})
									} else {
										uni.hideLoading()
										uni.showToast({
											title: '关机失败，请重试',
											icon: 'success'
										})
									}

								},
								fail: () => {
									uni.hideLoading()
									uni.showToast({
										title: '服务器异常，请重试',
										icon: 'success'
									})
								}
							})
						} else {

						}
					}
				})
			},
			// --------------------------------------设备重启------------------
			equipmentRestart: function() {
				uni.showModal({
					title: '您确认要把设备 "重启" 吗？',
					success: (res) => {
						console.log(res)
						if (res.confirm == true) {
							console.log(this.parameter.AID)
							uni.showLoading({
								title: '正在请求重启'
							})
							uni.request({
								url: $Sbjg.SbjgInterface.GetCommndAdd.Url,
								method: $Sbjg.SbjgInterface.GetCommndAdd.method,
								header: $Sbjg.SbjgInterface.GetCommndAdd.header,
								data: {
									SettingAID: this.parameter.AID,
									Msg: '重启',
								},
								success: (res) => {
									console.log(res)
									if (res.data == '指令发送成功') {
										uni.hideLoading()
										uni.showToast({
											title: '重启成功',
											icon: 'success'
										})
									} else {
										uni.hideLoading()
										uni.showToast({
											title: '重启失败，请重试',
											icon: 'success'
										})
									}

								},
								fail: () => {
									uni.hideLoading()
									uni.showToast({
										title: '服务器异常，请重试',
										icon: 'success'
									})
								}
							})
						} else {

						}
					}
				})
			},

			//------------------------暂未开放----------------------------
			notYetOpen: function() {
				uni.showToast({
					title: '暂未开放',
					icon: 'none'
				})
			},

			guarantee: function() {
				uni.navigateTo({
					url: './complaint?AID=' + this.parameter.AID + '&Remark=' + this.parameter.Remark + '&Code=' + this.parameter.Code
				})
			},

			//售票参数重置
			emptyTicketReset: function(e) {
				if (e == '') {
					return '---'
				} else {
					return e
				}
			},

			//时间戳转换
			timestampConversion: function(e) {
				// #ifndef APP-PLUS
				var a = new Date(parseInt(e.slice(6, 19)) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
				return a.slice(6)
				// #endif
				// #ifdef APP-PLUS
				//月份为0-11，所以+1，月份小于10时补个0
				var date = new Date(parseInt(e.slice(6, 19).replace("/Date(", "").replace(")/", ""), 10));
				var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
				var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
				var hour = date.getHours();
				var minute = date.getMinutes();
				var second = date.getSeconds();
				var dd = date.getFullYear() + "-" + month + "-" + currentDate + " " + hour + ":" + minute + ":" + second;
				// console.log(dd.slice(5))
				return dd.slice(5)
				// #endif
			},

			//小数点转百分比 - CPU占比转换
			shareConversion: function(e) {
				var str = Number(e).toFixed(1);
				// console.log(str)
				if (str !== 'NaN') {
					str += "%";
					return str;
				} else {
					return '---';
				}
			},

			//小数点转百分比 - CPU占比转换
			memoryConversion: function(e) {
				if (e !== '---') {
					return e + 'MB';
				} else {
					return e;
				}

			}
		}
	}
</script>

<style lang="scss">
	//默认背景颜色
	page {
		background-color: #f5f5f6;
	}

	.top_image {
		position: absolute;
		width: 100%;
		height: 100%;
		overflow: hidden;
		margin: 0 auto;
		z-index: 1;
	}

	.dt_top {
		width: 100%;

		.tp_outerLayer {
			position: absolute;
			z-index: 2;
			padding-top: 40upx;

			.ol_image {
				position: relative;
				height: 296upx;
				width: 1334upx;
				text-align: center;
				display: table-cell;
				vertical-align: middle;

				.im_image {
					width: 100%;
					height: 100%;

				}
			}

			.im_abnormal {
				position: absolute;
				display: flex;
				top: 100upx;
				left: 476upx;

				.al_image {
					width: 41upx;
					height: 33upx;
				}

				.al_text {
					color: #FF6969;
					font-size: 28upx;
					padding-left: 16upx;
				}
			}
		}
	}

	//状态
	.zl_click {
		background: #FFFFFF;
		border-radius: 20upx;
		margin: 20upx 30upx 0 30upx;
		padding: 30upx;

		.zl_topClick {
			display: flex;

			// 设备区域
			.zl_independentTravel {
				position: relative;
				width: 33%;
				text-align: center;

				.zl_itImage {
					position: absolute;
					width: 35upx;
					height: 40upx;
					top: 8upx;
				}

				.zl_itText {
					font-size: 34upx;
					color: #3CB96B;
					font-weight: bold;
					line-height: 84upx;
					font-family: Source Han Sans SC;
				}
			}

			// 在线状态
			.zl_independentTravel2 {
				position: relative;
				width: 33%;
				text-align: center;

				.zl_itImage2 {
					position: absolute;
					width: 38upx;
					height: 34upx;
					top: 14upx;
				}

				.zl_itText2 {
					font-size: 34upx;
					color: #FF6969;
					font-weight: bold;
					font-family: Source Han Sans SC;
				}

				.zl_stateText {
					display: block;
					font-size: 26upx;
					padding-top: 6upx;
					color: #666666;
				}
			}

			// 设备分布
			.zl_independentTravel3 {
				position: relative;
				width: 33%;
				text-align: center;

				.zl_itImage3 {
					position: absolute;
					width: 38upx;
					height: 38upx;
					top: 12upx;
				}

				.zl_itText3 {
					font-size: 34upx;
					font-weight: bold;
				}

				.zl_stateText2 {
					display: block;
					font-size: 26upx;
					padding-top: 6upx;
					color: #666666;
				}
			}
		}
	}

	//状态
	.zl_click2 {
		background: #FFFFFF;
		border-radius: 20upx;
		margin: 20upx 30upx 0 30upx;
		padding: 30upx;

		.zl_topClick2 {
			display: flex;

			// 设备区域
			.zl_independentTravel {
				position: relative;
				width: 33%;
				text-align: center;

				.zl_itImage {
					position: absolute;
					width: 35upx;
					height: 40upx;
					top: 8upx;
				}

				.zl_itText {
					font-size: 34upx;
					font-weight: bold;
					font-family: Source Han Sans SC;
				}

				.zl_stateText {
					display: block;
					font-size: 26upx;
					padding-top: 6upx;
					color: #666666;
				}
			}

			// 在线状态
			.zl_independentTravel2 {
				position: relative;
				width: 33%;
				text-align: center;

				.zl_itImage2 {
					position: absolute;
					width: 38upx;
					height: 34upx;
					top: 14upx;
				}

				.zl_itText2 {
					font-size: 34upx;
					font-weight: bold;
					font-family: Source Han Sans SC;
				}

				.zl_stateText2 {
					display: block;
					font-size: 26upx;
					padding-top: 6upx;
					color: #666666;
				}
			}

			// 设备分布
			.zl_independentTravel3 {
				position: relative;
				width: 33%;
				text-align: center;

				.zl_itImage3 {
					position: absolute;
					width: 38upx;
					height: 38upx;
					top: 12upx;
				}

				.zl_itText3 {
					font-size: 34upx;
					font-weight: bold;
				}

				.zl_stateText3 {
					display: block;
					font-size: 26upx;
					padding-top: 6upx;
					color: #666666;
				}
			}
		}

		.zl_bottomPopup {
			position: relative;
			width: 100%;
			text-align: center;
			padding-top: 26upx;

			.bp_text {
				color: #999999;
				font-size: 26upx;
			}
		}
	}

	//设备关机
	.ol_shutDown {
		background: #FFFFFF;
		display: flex;
		float: left;
		width: 23%;
		padding: 36upx 78upx;
		margin-top: 24upx;
		margin-left: 32upx;
		border-radius: 24upx;

		.sd_icon {
			// width: 36upx;
			height: 36upx;
		}

		.sd_text {
			font-size: 30upx;
			font-weight: bold;
			line-height: 38upx;
			padding-left: 16upx;
		}
	}

	//保修登记
	.ol_register {
		font-size: 30upx;
		float: left;
		border-radius: 24upx;
		margin: 24upx 32upx;
		padding: 32upx 279upx;
		font-weight: bold;
		margin-bottom: 64rpx;
	}


	//途径点弹框
	.boxView2 {
		width: 90%;
		padding: 16upx 40upx;
		padding-bottom: 40upx;
		background: #FFFFFF;
		z-index: 999;

		.titleView2 {
			margin-top: 24upx;

			//弹框标题
			.Nb_text3 {
				position: relative;
				font-size: 38upx;
				font-weight: bold;
				top: 8upx;
			}

			//弹框关闭按钮
			.Nb_text4 {
				margin-top: 8upx;
				float: right;
				color: #333;
				font-size: 32upx;
			}
		}

		.noticeBox2 {
			line-height: 32upx;
			height: 600upx;
			margin-top: 8upx;

			.tv_title {
				display: block;
				width: 100%;
				// margin-bottom: 220upx;

				//售票次数
				.tl_content {
					position: relative;
					padding-top: 56upx;
					width: 100%;

					.ct_text {
						left: 0;
						font-size: 30upx;
						padding-left: 20upx;
					}

					.ct_text2 {
						position: absolute;
						right: 0;
						font-size: 28upx;
						padding-right: 20upx;
					}

					.ct_text3 {
						left: 0;
						font-size: 28upx;
						padding-left: 20upx;
						display: flex;
						text-overflow: ellipsis; //文章超出宽度隐藏并用...表示
						white-space: nowrap;
						overflow: hidden;
						width: 360upx;
					}

					.ct_text4 {
						position: absolute;
						float: right;
						right: 0;
						color: #aaa;
						font-size: 24upx;
						text-overflow: ellipsis; //文章超出宽度隐藏并用...表示
						white-space: nowrap;
						overflow: hidden;
						width: 200upx;
					}
				}
			}
		}
	}

	.ol_LineChart {
		background: #FFFFFF;
		border-radius: 20upx;
		margin: 0 30upx 0 30upx;
		padding-bottom: 30upx;
	}

	.ol_seeMore {
		text-align: center;
		/* #ifndef APP-PLUS */
		margin: 64upx 20upx 56upx 20upx;
		/* #endif */
		/* #ifdef APP-PLUS */
		margin: 72upx 20upx 48upx 20upx;
		/* #endif */


		.ct_text {
			padding: 12upx 30upx;
			font-size: 24upx;
			width: 178upx;
			color: #999999;
			border: 1px solid rgba(153, 153, 153, 1);
			border-radius: 50upx;
		}
	}

	.ol_equipmentStatus {
		position: absolute;
		width: 120upx;
		text-align: center;
		top: 48upx;
		left: 96upx;

		.es_text {
			font-size: 30upx;
			font-weight: 500;
			color: #212121;
		}

		.es_text2 {
			font-size: 26upx;
			color: #3CB96B;
		}

		.es_text3 {
			font-size: 26upx;
			color: #FF6969;
		}
	}

	.ol_networkStatus {
		position: absolute;
		width: 120upx;
		text-align: center;
		/* #ifdef APP-PLUS */
		top: 262upx;
		/* #endif */
		/* #ifndef APP-PLUS */
		top: 264upx;
		/* #endif */
		left: 96upx;

		.ns_text {
			font-size: 30upx;
			font-weight: 500;
			color: #212121;
		}

		.ns_text2 {
			font-size: 26upx;
			color: #3CB96B;
		}

		.ns_text3 {
			font-size: 26upx;
			color: #FF6969;
		}
	}


	.ol_ticketSalesAmount {
		position: absolute;
		width: 180upx;
		text-align: center;
		top: 50upx;
		right: 48upx;

		.tsa_text {
			font-size: 30upx;
			font-weight: 500;
			color: #212121;
		}

		.tsa_icon {
			width: 26upx;
			height: 22upx;
			margin-top: 10upx;
			margin-right: 8upx;
		}

		.tsa_text2 {
			font-size: 26upx;
			color: #666666;
		}
	}

	.ol_cpuConsumption {
		position: absolute;
		width: 180upx;
		text-align: center;
		top: 160upx;
		right: 48upx;

		.cc_text {
			font-size: 30upx;
			font-weight: 500;
			color: #212121;
		}

		.cc_icon {
			width: 24upx;
			height: 26upx;
			margin-top: 8upx;
			margin-right: 12upx;
		}

		.cc_text2 {
			font-size: 26upx;
			color: #666666;
		}
	}

	.ol_cpuTemperature {
		position: absolute;
		width: 180upx;
		text-align: center;
		top: 274upx;
		right: 48upx;

		.ct_text {
			font-size: 30upx;
			font-weight: 500;
			color: #212121;
		}

		.ct_icon {
			width: 24upx;
			height: 36upx;
			margin-right: 12upx
		}

		.ct_text2 {
			font-size: 26upx;
			color: #666666;
		}
	}

	//设备详情页面点击状态
	.ol_hover {
		transition: all .3s; //过度
		border-radius: 24upx;
		opacity: 0.1;
		color: #FFFFFF;
		background: #5694fb;
	}
</style>
