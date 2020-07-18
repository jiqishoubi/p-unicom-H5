const api = {
	redirectUrlApi: '/redirect/unicomUr', //后台重定向
	loginApi: '/app/doLogin', //phone_number
	getSMSApi: '/app/sendAppLoginSMSCaptcha', //token
	loginBySMSApi: '/app/doAppLoginBySMSCaptcha', //验证码登录

	//微信jssdk支付
	getOpenidApi: '/api/wx/pay/getOpenId', //code secret
}

export default api
