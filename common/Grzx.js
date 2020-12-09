import $oSit from '@/common/overallSituation.js';

const Url=$oSit.Interface.address.Url;
const Url2=$oSit.Interface.address.Url2;

const systemConfig={
	appName:$oSit.Interface.system.appName,	
	applyName:$oSit.Interface.system.applyName,		//应用名称
	openidtype:$oSit.Interface.system.openidtype,	//应用类型：app，小程序，公众号
}


const appConfig={
	H5Config:{
		name:'公众号的Appid和App秘钥',
		H5AppId:$oSit.appConfig.H5Config.H5AppId,
		H5AppSecret:$oSit.appConfig.H5Config.H5AppSecret,
	},
	local:{
		url:$oSit.appConfig.local.url,
		name:'公众号请求地址',
	},
}

const Interface={
	getWxUserinfo:{
		value:'http://27.148.155.9:9056/CTKY/getWxUserinfo',
		name:'公众号获取OpenID',
		method:'POST',
		pages: [],
	},
	AddSuggestion:{
		value:Url+'/api/person/AddSuggestion',
		name:'上传意见',
		method:'POST',
		pages: [],
	}, 
	login:{
		value:Url+'/api/person/login',
		name:'用户登录',
		method:'POST',
		pages: [],
	},
	changeInfo:{
		value:Url+'/api/person/changeInfo',
		name:'修改个人信息（除头像外）',
		method:'POST',
		pages: [],
	},
	changeInfoPortrait:{
		value:Url+'/api/person/changeInfoPortrait',
		name:'只修改头像',
		method:'POST',
		pages: [],
	},
	getLoginCode:{
		value:Url+'/api/person/getLoginCode',
		name:'获取手机验证码',
		method:'POST',
		pages: [],
	},
	GetUserInfoByOpenId_xcx:{
		value:Url+'/api/person/GetUserInfoByOpenId_xcx',
		name:'传什么openid就返回什么openid以及相应的用户信息',
		method:'POST',
		pages: [],
	 },
	 GetUserInfoByOpenId_wx:{
	 	value:Url+'/api/person/GetUserInfoByOpenId_wx',
	 	name:'通过微信的openid获取用户信息',
	 	method:'POST',
	 	pages: [],
	 },
	 //--------------------------------------获取所有的车站--------------------------------------
	 GetStarte:{
	 	value: Url2 + '/Home/GetStarte',
	 	name:'获取所有的车站',
	 	method:'POST',
	 	header: {'content-type': 'application/json'},
	 },
	 //--------------------------------------获取所有的设备数据--------------------------------------
	 GetSerialsByID:{
	 	value: Url2 + '/Home/GetSerialsByID',
	 	name:'获取所有的设备数据',
	 	method:'POST',
	 	header: {'content-type': 'application/json'},
	 },
	  //--------------------------------------获取所有设备--------------------------------------
	 GetNumAll:{
	 	value: Url2 + '/Home/GetNumAll',
	 	name:'获取所有设备',
	 	method:'POST',
	 	header: {'content-type': 'application/json'},
	 },

}

export default {
	Interface,
	appConfig,
	systemConfig,
}