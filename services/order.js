import requestw from '@/utils/requestw.js'
import api_order from '@/services/allApiStr/order.js'

//拿到调起微信支付的url
export const goPayAjax = (tradeNo) => {
	return new Promise(async (resolve) => {
		let resUrl = await requestw({
			url: api_order.goPayApi,
			data: {
				tradeNo
			}
		})
		resolve(resUrl)
	})
}

//获取微信端的支付状态
export const getPayStatus = (tradeNo) => {
	return new Promise(async (resolve) => {
		let res = await requestw({
			url: api_order.getPayStatusApi,
			data: {
				tradeNo,
			},
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
			}
		})
		let flag = false
		if (res && res.code == 200 && res.data && res.data.trade_state && res.data.trade_state == 'SUCCESS') {
			flag = true
		}
		resolve(flag)
	})
}
