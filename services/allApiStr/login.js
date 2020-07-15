const api = {
	testTokenApi:'/test/token', //验证token是否失效
	//登录
	loginApi: '/user/login/wechat',
	getMyInfoApi:'/user/getMyinfo', //获取自己info
	modifyMyInfoApi:'/user/modifyMyInfo', //修改自己的信息
	//首页
	getCardListApi: '/user/cardList', //名片列表
	getCardInfoApi: '/user/infoUser', //获取名片info
	setCardToListApi:'/user/addCard', //加入名片夹
	//认证手机号
	getTruePhoneNumberApi: '/user/get/phoneNumber', //获取微信认证手机号
}

export default api
