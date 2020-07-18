import requestw from '@/utils/requestw.js'
import api_order from '@/services/allApiStr/order.js'

//判断是否是IOS
function isIOS() {
	let u = navigator.userAgent;
	let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	return isIOS;
}

//打开新页面
export const openUrl = (url) => {
	// let body = document.body || document.getElementsByTagName("body")[0];
	// let a = document.createElement("a");
	// a.setAttribute("href", url);
	// a.setAttribute("target", '_blank');
	// body.appendChild(a);
	// setTimeout(() => {
	// 	a.click()
	// }, 10)
	// setTimeout(() => {
	// 	body.removeChild(a)
	// }, 50)

	setTimeout(() => {
		window.location.href = url;
	}, 10)
}

//是否是微信
export const isWeixin = () => {
	if (!window.navigator) {
		return false;
	}
	let ua = window.navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true;
	} else {
		return false;
	}
}

/**
 * 取得url参数2
 */
export const getUrlParam = (key) => {
	let url = window.location.href
	if (url.indexOf(key + '=') > -1) {
		let strBack = url.split(key + '=')[1] //key=后面的str
		if (strBack.indexOf('&') > -1) {
			//后面还有参数
			let value = strBack.split('&')[0]
			return value
		} else {
			//后面没参数了
			return strBack
		}
	} else {
		return null
	}
}

/**
 * 微信config
 */
export const initWexinH5JSPayConfig = (params) => {
	return new Promise(async (resolve) => {
		let res = await requestw({
			url: api_order.wxH5JSSdkPayApi,
			data: params
		})
		resolve(res)
	})
}

//微信内H5调起支付
export const initWeixinJSBridge = (config) => {
	function onBridgeReady() {
		WeixinJSBridge.invoke(
			'getBrandWCPayRequest', {
				"appId": config.appId + '', //公众号名称，由商户传入     
				"timeStamp": config.timeStamp + '', //时间戳，自1970年以来的秒数     
				"nonceStr": config.nonceStr + '', //随机串     
				"package": config.package + '',
				"signType": config.signType + '', //微信签名方式：     
				"paySign": config.sign + '' //微信签名 
			},
			function(res) {
				// if (res.err_msg == "get_brand_wcpay_request:ok") {
				// 	// 使用以上方式判断前端返回,微信团队郑重提示：
				// 	//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
				// 	console.log(res)
				// }
				uni.redirectTo({
					url: '/pages/result/result.vue'
				})
			});
	}

	if (typeof WeixinJSBridge == "undefined") {
		if (document.addEventListener) {
			document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
		} else if (document.attachEvent) {
			document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
			document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
		}
	} else {
		onBridgeReady();
	}
}
