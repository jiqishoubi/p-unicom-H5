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
