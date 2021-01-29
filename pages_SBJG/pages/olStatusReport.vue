<template>
	<view class="">
		<wyb-drop-down
		 ref="dropDown"
		 min-height="310"
		 v-if="wxKey"
		 :key="key"
		 :options="options"
		 :default-index-list="defaultIndexList"
		 :active-weight="activeWeight"
		 :active-color="activeColor"
		 :default-color="defaultColor"
		 :bg-color="bgColor"
		 :drop-icon="dropIcon"
		 :autoHeight="false"
		 @change="onHeaderSelect" 
		 @select="onItemSelect">
			<view class="drop-down-content">
				<view v-if="page === 0" class="page-one">
					<view class="input-box">
						<picker :mode="pickerMode" :value="sDate" :start="startDate" :end="endDate" @change="bindDateChange($event, 0)">
							<view class="date-select uni-input">{{sDate}}</view>
						</picker>
						<text class="date-select-div">到</text>
						<picker :mode="pickerMode" :value="eDate" :start="startDate" :end="endDate" @change="bindDateChange($event, 1)">
							<view class="date-select uni-input">{{eDate}}</view>
						</picker>
					</view>
					<view class="btn-box">
						<wyb-button class="btns" width="150rpx" height="70rpx" type="hollow" @click="onBtnTap(0)">确定</wyb-button>
						<wyb-button class="btns" width="150rpx" height="70rpx" type="hollow" @click="onBtnTap(1)">取消</wyb-button>
					</view>
				</view>
				<view v-if="page === 2" class="page-three">
					我是栏目三的自定义内容
				</view>
			</view>
		</wyb-drop-down>
		
		<view class="boxClass">
			<wyb-table ref="table"
			:headers="headers" 
			:contents="contents"
			:height="height" 
			:url-col="urlCol" 
			:first-line-fixed="true"
			/>
		</view>
	</view>
</template>

<script>
import wybTable from '@/pages_SBJG/components/wyb-table/wyb-table.vue'
import wybDropDown from '@/pages_SBJG/components/wyb-drop-down/wyb-drop-down.vue'
export default {
	components: {
        wybTable,wybDropDown
    },
	data() {
		//const theUrl = '/pages_SBJG/pages/complaintList' // 本地的某个页面
		return {
			//表头
			headers: [{
                label: '设备单位',
                key: 'unit',
				width:280,
            }, {
                label: '设备类型',
                key: 'type',
				width:230,
            }, {
                label: '设备名称',
                key: 'name',
				width:230,
            }, {
                label: '状态',
                key: 'state'
            },],
			//表格内容
			contents:[],
			
			wxKey:true,
			//下拉框
			options: [{
				header: '用户单位',
				contents: ['福建省泉运实业集团有限公司', '龙洲运输股份有限公司', '漳州长运集团公司', '武夷交通运输股份有限公司',
				'福建华威','安溪恒兴新车站'],
			}, {
				header: '设备类型',
				contents: ['全部', '自助售票机', '自助检票机', '自助凭单机','信息屏','车位摄像头'],
			}, {
				header: '状态',
				contents: ['全部','长时离线', '短时离线','疑似离线','下班关机'],
			},
			{
				header: '仅离线',
				contents: ['仅离线','全部'],
			}],
			company:'quanzhou',
			type:0,
			state:0,
			online:true,
			height:'1000rpx',//高度
		}
	},
	
	onLoad() {
		this.loadData('quanzhou',0,0,true);
		this.height = JSON.stringify(uni.getSystemInfoSync().screenHeight - 120)+'px';
		console.log(this.height,"屏幕高度");
		console.log(uni.getSystemInfoSync().screenHeight,"屏幕高度");
		
	},
	onShow() {
		//plus.screen.lockOrientation('landscape-primary');
	},
	onUnload() {
		//plus.screen.lockOrientation('portrait-primary')
	},
	methods: {
		loadData(company,type,state,online){
			uni.showLoading({
				title:'加载中...',
				mask:true,
			})
			this.contents = [];
			console.log(company,'1');
			console.log(type,'2');
			console.log(state,'3');
			console.log(online,'4');
			uni.request({
				url: this.$Sbjg.SbjgInterface.GetOnlineState.Url,
				method: this.$Sbjg.SbjgInterface.GetOnlineState.method,
				header: this.$Sbjg.SbjgInterface.GetOnlineState.header,
				data: {
					company:company,
					type:type, 
					state:state, 
					online:online,
				},
				success: res => {
					console.log(res);
					for(var item of res.data){
						var obj = {
							unit:item.MyLocation.Memo,
							name:item.CustomName,
							type:this.formateType(item.Type),
							state:this.formateState(item.State),
						}
						this.contents.push(obj);
					}
					console.log(this.contents);
				},
				fail: () => {},
				complete: () => {
					uni.hideLoading();
				}
			});
		},
		formateState(status){
			switch (status) {
				case 0:
					return '全部';
				case 1:
					return '在线';
				case 2:
					return '疑似离线';
				case 3:
					return '短时离线';
				case 4:
					return '长时离线';
				case 5:
					return '下班关机';
				case '全部':
					return 0;
				case '在线':
					return 1;
				case '疑似离线':
					return 2;
				case '短时离线':
					return 3;
				case '长时离线':
					return 4;
				case '下班关机':
					return 5;
				default:
					return '';
			}
		},
		
		formateType(type){
			switch (type) {
				case 0:
					return '全部';
				case 2:
					return '自助售票机';
				case 3:
					return '自助检票机';
				case 4:
					return '自助凭单机';
				case 7:
					return '车位摄像头';
				case 8:
					return '信息屏';
					
				case '全部':
					return 0;
				case '自助售票机':
					return 2;
				case '自助检票机':
					return 3;
				case '自助凭单机':
					return 4;
				case '车位摄像头':
					return 7;
				case '信息屏':
					return 8;
				default:
					return '';
			}
		},
		
		formateCompany(Company){
			switch (Company) {
				case '福建省泉运实业集团有限公司':
					return 'QuanZhou';
				case '龙洲运输股份有限公司':
					return 'LongYan';
				case '漳州长运集团公司':
					return 'ZhangZhou';
				case '武夷交通运输股份有限公司':
					return 'NanPing';
				case '福建华威':
					return 'HuaWei';
				case '安溪恒兴新车站':
					return 'HengXing';
				default:
					return '';
			}
		},
		
		onHeaderSelect(e) {
			this.page = e.headerIndex;
		},
		
		onItemSelect(e) {
			this.callback = `栏目名：${e.header}\n
							 栏目索引：${e.headerIndex}\n
							 选项名：${e.content}\n
							 选项索引：${e.contentIndex}\n
							 每一栏目选中的选项[${e.contentActiveIndexList}]`
			console.log(JSON.stringify(e, null, 2))
			if(e.headerIndex == 0){
				this.company = this.formateCompany(e.content);
				//if(e.content.length)
				console.log(e.content.length,"长度");
				if(e.content.length>5){
					this.options[0].header = e.content.substring(0,4)+'...';
				}else{
					this.options[0].header = e.content;
				}
			}
			if(e.headerIndex == 1){
				this.type = this.formateType(e.content);
				this.options[1].header = e.content;
			}
			if(e.headerIndex == 2){
				this.state = this.formateState(e.content);
				this.options[2].header = e.content;
			}
			if(e.headerIndex == 3){
				if(e.content=="仅离线"){
					if(this.state == 1){
						this.state = 4;
						this.options[2].header="长时离线";
					}
					this.options[2].contents=['全部','长时离线', '短时离线','疑似离线','下班关机'];
				}else{
					this.options[2].contents=['全部','在线','长时离线', '短时离线','疑似离线','下班关机'];
				}
				this.options[3].header = e.content;
				if(e.content == '全部'){
					this.online = false;
				}else{
					this.online = true;
				}
			}
			console.log(this.company);
			console.log(this.type);
			console.log(this.state);
			console.log(this.online);
			this.loadData(this.company,this.type,this.state,this.online);
			this.$refs.dropDown.close();
		},
	}
}
</script>

<style lang="scss">
	.boxClass{
		margin-top: 100upx;
	}
</style>
