const api = {
	getRealnameInfoApi: '/mp/userAuth/getUserAuth', //获取实名信息
	getSMSApi: '/mp/userAuth/sendSMSCaptcha', //获取验证码
	submitRealnameApi: '/mp/userAuth/submit', //实名提交
	
	//签约
	getFenxiaoSignInfoApi:'/mp/sign/getPdfUrl', //获取分销协议  userId  teamId
	signFenxiaoApi:'/mp/sign/sign', //签约分销协议
	
	//银行卡
	getBankListApi: '/mp/bankcard/getBankCardList', //获取银行卡列表
	addBankcardApi: '/mp/bankcard/addBankCard', //绑定银行卡
	getBankSMSApi: '/mp/bankcard/sendSMSCaptcha', //绑定银行卡 获取验证码
	removeBankcardApi: '/mp/bankcard/removeBankCard', //解绑银行卡


	//酬金 
	getProfitAccountApi: '/mp/profit/getProfitAccount', //获取账户余额
	getProfitListApi: '/web/profit/query', //收益列表
	getProfitDetailApi: '/web/profitDetail/query', //收益详情

	//提现
	checkProfitStateApi: '/mp/profit/checkProfitSubmitState', //验证是否可以提现
	getSubmitTokenApi: '/mp/profit/getSubmitToken', //获取提现的token
	submitProfitApi: '/mp/profitSubmit', //提现
	getWithdrawRecordApi: '/mp/withdrawProfit/queryPage', //获取提现记录
}
export default api
