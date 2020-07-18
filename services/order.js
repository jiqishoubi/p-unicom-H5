import requestw from '@/utils/requestw.js'
import api_order from '@/services/allApiStr/order.js'
import {
	key_card_unicom_lookingTradeNo,
	key_card_unicom_phone
} from '@/utils/const.js'
import {
	isWeixin
} from '@/utils/utils_h5.js'
import {
	openUrl
} from '@/utils/utils_h5.js'

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

//去支付
export const goPayWrap = async (tradeNo) => {
	uni.setStorageSync(key_card_unicom_lookingTradeNo, tradeNo);

	if (isWeixin()) {
		uni.hideLoading();
		//微信内js支付
		uni.redirectTo({
			url: '/pages/payPage/payPage?tradeNo=' + tradeNo
		});
	} else {
		//微信外H5支付
		let res2 = await goPayAjax(tradeNo);
		uni.hideLoading();
		if (!res2) {
			uni.showToast({
				title: '唤起支付失败',
				icon: 'none',
				mask: true
			});
			let phone = uni.getStorageSync(key_card_unicom_phone)
			setTimeout(() => {
				uni.redirectTo({
					url: '/pages/order/order?phone=' + phone
				});
			}, 1300);
			return;
		}
		openUrl(res2);
		uni.redirectTo({
			url: '/pages/result/result'
		});
	}
}
