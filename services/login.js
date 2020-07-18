import requestw from '@/utils/requestw.js'
import api_login from '@/services/allApiStr/login.js'

export const redirectUrl = () => {
	return new Promise(async (resolve) => {
		let res = await requestw({
			type: 'post',
			url: api_login.redirectUrlApi
		})
		console.log(res)
	})
}

export const getOpenId = (params) => {
	return new Promise(async (resolve) => {
		let openid = await requestw({
			url: api_login.getOpenidApi,
			data: params
		})
		resolve(openid)
	})
}
