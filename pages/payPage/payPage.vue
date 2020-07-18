<template>
	<view><view style="padding-top: 180rpx;text-align: center;">微信跳转中...</view></view>
</template>

<script>
import { appid_bld, appSecret_bld, key_card_unicom_phone } from '@/utils/const.js';
import { getUrlParam, initWexinH5JSPayConfig, initWeixinJSBridge } from '@/utils/utils_h5.js';
import { getOpenId } from '@/services/login.js';
export default {
	data() {
		return {
			tradeNo: '',
			code: ''
		};
	},
	onLoad(options) {
		let redirect_uri = window.location.href;
		if (options.tradeNo) {
			this.tradeNo = options.tradeNo;
		}
		uni.showLoading({
			title: '请稍候...',
			mask: true
		});
		let code = getUrlParam('code');
		if (!code) {
			window.location.href = `
      https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid_bld}&redirect_uri=${encodeURIComponent(
				redirect_uri
			)}&response_type=code&scope=snsapi_base&state=123#wechat_redirect
    `;
		} else {
			this.code = code;
			this.init();
		}
	},
	methods: {
		async init() {
			//一、code换openid
			let postData = {
				code: this.code,
				secret: appSecret_bld
			};
			let openid = await getOpenId(postData); //oDAeAwVtTEsql5oSRIVRQC5UwO54
			if (!openid) {
				uni.hideLoading();
				uni.showModal({
					title: '提示',
					content: '获取openid失败',
					showCancel: false
				});
				return;
			}

			//二、微信config
			let postData2 = {
				openId: openid,
				tradeNo: getUrlParam('tradeNo')
			};
			let res2 = await initWexinH5JSPayConfig(postData2);
			let flag = false;
			if (res2 && res2.code == 200 && res2.data && res2.data.sign) {
				flag = true;
			}
			if (!flag) {
				uni.hideLoading();
				uni.showModal({
					title: '提示',
					content: res2.message || '支付config失败',
					showCancel: false,
					success: () => {
						let phone = uni.getStorageSync(key_card_unicom_phone);
						uni.redirectTo({
							url: '/pages/order/order?phone=' + phone
						});
					}
				});
				return;
			}

			//三、调起支付
			let payConfig = res2.data;
			initWeixinJSBridge(payConfig); //唤起

			setTimeout(() => {
				uni.hideLoading();
				uni.redirectTo({
					url: '/pages/result/result'
				});
			}, 2500);
		}
	} //methods
};
</script>

<style lang="less" scoped></style>
