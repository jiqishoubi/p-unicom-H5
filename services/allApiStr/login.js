const api = {
	loginApi: '/app/doLogin', //phone_number
	getSMSApi: '/app/sendAppLoginSMSCaptcha', //token
	loginBySMSApi: '/app/doAppLoginBySMSCaptcha', //验证码登录
}

export default api
