import {
	isTest,
	host,
	host_lexin,
	//名片小程序
	staticHost
} from '@/utils/const.js'

/**
 * 后端请求域名
 */
export const globalHost = () => {
	if (isTest) {
		return host.dev
	} else {
		return host.prod
	}
}
export const globalHost_lexin = () => {
	if (isTest) {
		return host_lexin.dev
	} else {
		return host_lexin.prod
	}
}

/**
 * 格式化金钱
 */
export const toMoney = (val) => { //数字
	var str = (val / 100 * 100).toFixed(2) + '';
	var intSum = str.substring(0, str.indexOf(".")).replace(/\B(?=(?:\d{3})+$)/g, ','); //取到整数部分
	var dot = str.substring(str.length, str.indexOf(".")) //取到小数部分搜索
	var ret = intSum + dot;
	return ret;
}
export const toMoneyWan = (num) => {
	num = Number(num)
	return num >= 10000 ? ((num / 10000).toFixed(2)) + "万" : num / 1 + "元"
}

/**
 * 格式化日期
 */
// 对Date的扩展，将 Date 转化为指定格式的String   
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
// 例子：   
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18  
export const formatDate = (date, fmt) => {
	var o = {
		"M+": date.getMonth() + 1, //月份   
		"d+": date.getDate(), //日   
		"h+": date.getHours(), //小时   
		"m+": date.getMinutes(), //分   
		"s+": date.getSeconds(), //秒   
		"q+": Math.floor((date.getMonth() + 3) / 3), //季度   
		"S": date.getMilliseconds() //毫秒   
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

/**
 * 同步globalData到页面/组件
 */
export const syncGlobaldata = (self) => {
	self.globalData = getApp().globalData
}

//打星
export function plusXing(str, flrst, endLen) {
	var len = endLen - flrst;
	var xing = "";
	for (var i = 0; i < endLen; i++) {
		xing += "*";
	}
	return str.replace(str.substring(flrst, endLen), xing);
}

//从地址获取参数
export const getUrlParam = (key, url) => {
	if (url.indexOf(key + '=') > -1) {
		let strBack = url.split(key + '=')[1] //key=后面的str
		if (strBack.indexOf('&') > -1) { //后面还有参数
			let value = strBack.split('&')[0]
			return value
		} else { //后面没参数了
			return strBack
		}
	} else {
		return null
	}
}

/**
 * 名片小程序
 */
//获取后缀
export const getFileNameSuffix = (str) => {
	if (!str) return ''
	let dotIndex = str.lastIndexOf('.')
	let suffix = str.slice(dotIndex)
	return suffix
}
//isVideo
export const isVideoUrl = (str) => {
	if (!str) return false
	let suffix = getFileNameSuffix(str)
	let flag = false
	let videoSuffixArr = [
		'.mp3', '.mp4', '.avi',
		'.MP3', '.MP4', '.AVI',
		'.m4v', '.mov', '.3gp', '.mpeg1', '.mpeg4', '.flv', '.mjpeg', '.rmvb', '.wmv', '.f4v', '.mkv', '.rm',
		'.M4V', '.MOV', '.3GP', '.MPEG1', '.MPEG4', '.FLV', '.MJPEG', '.RMVB', '.WMV', '.F4V', '.MKV', '.RM',
		'.asf', '.asx', '.dat', '.vob', '.mpeg', '.mpg', '.navi',
		'.ASF', '.ASX', '.DAT', '.VOB', '.MPEG', '.MPG', '.NAVI',
	]
	if (videoSuffixArr.indexOf(suffix) > -1) {
		flag = true
	}
	return flag
}
//获取图片/video路径
export const getImgSrc = (str) => {
	if (!str) return ''
	if (str.indexOf('http') > -1) {
		return str
	} else {
		return isVideoUrl(str) ? (staticHost.videoUrl + str) : (staticHost.imgHead + str)
	}
}

//获取dom元素的信息
export const getNodeRefClientRect = (str) => {
	return new Promise((resolve) => {
		uni
			.createSelectorQuery()
			.select(str)
			.boundingClientRect(function(rect) {
				resolve(rect)
			})
			.exec()
	})
}

//滚动到底
export const pageScrollToBottom = (str, height) => {
	return new Promise(async (resolve) => {
		let rect = await getNodeRefClientRect(str)
		uni.pageScrollTo({
			scrollTop: rect.bottom + height
		})
		resolve()
	})
}

