/* 接口参数区 */
// 示例1
import $oSit from '@/common/overallSituation.js'
// const Url='http://zntc.145u.net';
// const Url = 'https://zntc.145u.net:9099';//接口地址
//const ddtUrl='http://111.231.109.113:8004' //达达通接口地址
//const Url = 'https://zntc.145u.net:9098';//综合出行接口地址
//const Url = 'http://zntc.145u.net'; //http请求 

//接口域名
const Url=$oSit.Interface.address.Url;
const Url2=$oSit.Interface.address.Url2;

//接口对象
const SbjgInterface = {
	//GET-POST
	//--------------------------------------获取所有的车站--------------------------------------
	GetStarte:{
		Url: Url2 + '/Home/GetStarte',
		name:'获取所有的车站',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	//--------------------------------------获取设备种类--------------------------------------
	GetNumAll:{
		Url: Url2 + '/Home/GetNumAll',
		name:'获取设备种类',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	//--------------------------------------获取对应种类设备--------------------------------------
	GetSerialsByID:{
		Url: Url2 + '/Home/GetSerialsByID',
		name:'获取对应种类设备',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	//--------------------------------------获取车站所有设备--------------------------------------
	GetSerialsByLoctationId:{
		Url: Url2 + '/Home/GetSerialsByLoctationId',
		name:'获取车站所有设备',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	//--------------------------------------设备关机/重启--------------------------------------
	GetCommndAdd:{
		Url: Url2 + '/Home/GetCommndAdd',
		name:'设备关机/重启',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	//--------------------------------------获取设备售票参数--------------------------------------
	GetBySettingAID:{
		Url: Url2 + '/Home/GetBySettingAID',
		name:'获取设备售票参数',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	//--------------------------------------获取设备参数--------------------------------------
	GetSettingByID:{
		Url: Url2 + '/Home/GetSettingByID',
		name:'获取设备数据参数',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	//--------------------------------------获取cpu占用率和剩余内存--------------------------------------
	GetAllCpu:{
		Url: Url2 + '/Home/GetAllCpu',
		name:'获取cpu占用率和剩余内存',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	//--------------------------------------获取cpu占用率和剩余内存--------------------------------------
	// AddStateBy:{
	// 	Url: Url2 + '/Home/AddStateBy',
	// 	name:'保修接口',
	// 	method:'POST',
	// 	header:{'content-type':'application/x-www-form-urlencoded'},
	// },
	//--------------------------------------根据设备ID获取单个设备--------------------------------------
	GetmachineBy:{
		Url: Url2 + '/Home/GetmachineBy',
		name:'单个设备',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	//--------------------------------------根据设备ID获取断线详情--------------------------------------
	GetOfflineByID:{
		Url: Url2 + '/Home/GetOfflineByID',
		name:'断线详情',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	//---------------------------------------------获取所有公司----------------------------------------
	GetCompany:{
		Url: Url2 + '/Home/GetCompany',
		name:'获取所有公司',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	//---------------------------------------------根据ID获取地区----------------------------------------
	GetLocation:{
		Url: Url2 + '/Home/GetLocation',
		name:'根据ID获取地区',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	
	
	//---------------------------------------------报修-------------------------------------------------
	//---------------------------------------------上传报修清单----------------------------------------
	AddStateBy:{
		Url: Url2 + '/Repair/AddStateBy',
		name:'上传报修清单',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	//---------------------------------------------上传报修进度----------------------------------------
	AddTaskLog:{
		Url: Url2 + '/Repair/AddTaskLog',
		name:'上传报修进度',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	//--------------------------------------获取所有维修订单--------------------------------------
	GetBook:{
		Url: Url2 + '/Home/GetBook',
		name:'获取所有维修订单',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	//--------------------------------------在线状态报表--------------------------------------
	GetOnlineState:{
		Url: Url2 + '/Home/GetOnlineState',
		name:'在线状态报表',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	//--------------------------------------添加维修单--------------------------------------
	AddTask:{
		Url: Url2 + '/Repair/AddTask',
		name:'添加维修单',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	//--------------------------------------获取工作业绩--------------------------------------
	GetPerformance:{
		Url: Url2 + '/Home/GetPerformance',
		name:'获取工作业绩',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
	//--------------------------------------获取维修次数--------------------------------------
	GetRepair:{
		Url: Url2 + '/Home/GetRepair',
		name:'获取维修次数',
		method:'POST',
		header:{'content-type':'application/x-www-form-urlencoded'},
	},
}
// 接口声明区
export default {
	SbjgInterface
}