<template>
	<view class="container">
		<view class="form">
			<view class="item"><input class="input" placeholder="请输入手机号码" v-model="phone" /></view>
			<view class="item">
				<input class="input" placeholder="请输入验证码" v-model="sms" maxlength="6" />
				<getsmsbtn :limitSecond="60" :phoneNumber="phone" styleStr="color: #999;"></getsmsbtn>
			</view>
		</view>

		<view class="btn" hover-class="btn_active" hover-stay-time="110" @tap="submit">登录</view>
	</view>
</template>
<script>
import getsmsbtn from '@/components/getsmsbtn.vue';
import requestw from '@/utils/requestw.js';
import api_login from '@/services/allApiStr/login.js';
import { key_card_myToken, key_card_unicom_phone } from '@/utils/const.js';
import { redirectUrl } from '@/services/login.js';
import { getUrlParam } from '@/utils/utils_h5.js';

export default {
	components: {
		getsmsbtn
	},
	data() {
		return {
			productId: '',
			hideTips: '',

			phone: '',
			sms: ''
		};
	},
	async onLoad(options) {
		let hideTips = getUrlParam('hideTips');
		if (hideTips && hideTips == '1') {
			this.hideTips = '1';
		}

		if (options.productId) {
			this.productId = options.productId;
		}

		let token = uni.getStorageSync(key_card_myToken);
		let phone = uni.getStorageSync(key_card_unicom_phone);
		if (token && phone) {
			this.goNext(phone);
		}
	},
	methods: {
		goNext(phone) {
			if (this.productId) {
				//去下单
				let url = '/pages/details/details?phone=' + phone + '&productId=' + this.productId;
				if (this.hideTips) {
					url = url + '&hideTips=1';
				}
				uni.redirectTo({
					url
				});
			} else {
				//没有商品就是查看列表
				let url = '/pages/order/order?phone=' + phone;
				uni.redirectTo({
					url
				});
			}
		},
		async submit() {
			//验证
			if (this.phone == '' || this.sms == '') {
				uni.showToast({
					title: '信息请填写完整',
					icon: 'none'
				});
				return;
			}
			//验证 end

			uni.showLoading({
				title: '请稍候...',
				mask: true
			});

			let postData = {
				smsCaptcha: this.sms
			};

			let res = await requestw({
				url: api_login.loginBySMSApi,
				data: postData
			});

			if (res && res.resultCode == '200') {
				uni.showToast({
					title: res.systemMessage || '登录成功',
					mask: true
				});

				uni.setStorageSync(key_card_unicom_phone, this.phone);
				setTimeout(() => {
					this.goNext(this.phone);
				}, 1200);
			} else {
				uni.hideLoading();
				uni.showModal({
					title: '提示',
					content: res.systemMessage || '操作失败',
					showCancel: false
				});
			}
		}
	} //methods
};
</script>

<style lang="less" scoped>
@import '~utils/utils.less';

.container {
	padding: 76rpx 48rpx 0;
}

.item {
	.flexCenter;
	height: 97rpx;
	.hairline();
	.input {
		flex: 1 0 0;
		height: 100%;
	}
}

.btn {
	.flexCenter;
	.flexJCenter;
	height: 82rpx;
	border-radius: 41rpx;
	background-color: @primaryColor;
	color: #fff;
	margin: 76rpx 0;
}

.btn_active {
	background-color: @hoverColor;
}
</style>
