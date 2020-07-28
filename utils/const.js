export const isTest = false

export const host_lexin = {
	dev: 'https://payt.bld365.com',
	prod: 'https://pay.bld365.com',
}

export const host = {
	// dev: 'http://1.2.4.160:9229', //商
	dev: 'https://unioncardmallt.bld365.com',
	prod: 'https://unioncardmallt.bld365.com',
}

export const staticHost = {
	imgHead: (isTest ? host.dev : host.prod) + '/static/img/',
	voiceUrl: (isTest ? host.dev : host.prod) + '/static/mp3/',
	videoUrl: (isTest ? host.dev : host.prod) + '/static/mp4/',
}

//storage key
export const key_lexin_openid = 'lexin_openid'
export const key_lexin_unionid = 'lexin_unionid';
export const key_lexin_mpUserInfo = 'lexin_mpUserInfo';
//名片小程序
export const defaultCardId = '8463' //默认显示的userid
export const defaultTeamId = '2'
export const key_card_wxUserInfo = 'key_card_wxUserInfo' //微信的userInfo
export const key_card_userInfo = 'key_card_userInfo' //自己
export const key_card_curCardInfo = 'key_card_curCardInfo' //当前/最后浏览的cardInfo

export const key_card_myToken = 'key_card_myToken' //联通H5使用这个
export const key_card_unicom_phone = 'key_card_unicom_phone'
export const key_card_unicom_lookingTradeNo = 'key_card_unicom_lookingTradeNo'

//名片小程序
export const searchWrapHeight = 109
export const tabbarHeight = 113
export const isXBottom = 38 //iphonex安全距离

// //便利电
// export const appid = 'wx6e34871a94507a96'
// export const appSecret = '57a471343e78aebc1e14367300c64cdc'
//数字生活
export const appid = 'wx24838353bbccfc54'
export const appSecret = 'ed8878188299ea9a6e51171ed0fca0ff'
