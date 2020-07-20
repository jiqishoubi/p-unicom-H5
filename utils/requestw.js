/**
 * 请求公共方法
 */
import {
	globalHost
} from '@/utils/utils.js'
import {
	key_card_myToken,
	key_card_unicom_phone,
	key_card_unicom_lookingTradeNo
} from '@/utils/const.js'

const requestw = ({
	type = 'post',
	url,
	data,
	headers,
	reportPerformance,
}) => {
	return new Promise((resolve, reject) => {
		//名片token
		let myToken = uni.getStorageSync(key_card_myToken)

		// url
		let urlTemp = url.indexOf('http') > -1 ? url : (globalHost() + url)

		// data / token
		let dataTemp = {
			token: myToken || null,
			...data,
		}
		for (let key in dataTemp) {
			if (dataTemp[key] == null || dataTemp[key] == undefined) {
				delete dataTemp[key]
			}
		}

		// headers
		let headersTemp = {
			'content-type': 'application/json', //默认
			// 'content-type': 'application/x-www-form-urlencoded',
			...headers,
		}
		// headers end

		uni.request({
			method: type,
			url: urlTemp,
			data: dataTemp,
			header: headersTemp,
			// dataType	String	否	json	如果设为 json，会尝试对返回的数据做一次 JSON.parse	
			// responseType	String	否	text	设置响应的数据类型。合法值：text、arraybuffer	5+App和支付宝小程序不支持
			success: (res) => {
				let result = res.data
				console.log(result)
				if (result.systemMessage && result.systemMessage.indexOf('无效') > -1) {
					uni.removeStorageSync(key_card_myToken)
					uni.removeStorageSync(key_card_unicom_phone)
					uni.removeStorageSync(key_card_unicom_lookingTradeNo)

					// uni.reLaunch({
					// 	url: '/pages/indexH5/indexH5.vue'
					// })
					window.location.href = 'https://unigree.bld365.com/#/pages/indexH5/indexH5'
					resolve()
					return
				}

				resolve(result)
			},
			fail: (err) => {
				resolve(false)
			}
		})
	})
}

export default requestw
