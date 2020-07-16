<template>
	<view>
		<view v-if="!timer" @tap="getSms" :style="styleStr">获取验证码</view>
		<view v-else class="second">{{ second }}s</view>
	</view>
</template>

<script>
import patternCreator from '@/utils/patternCreator.js';
import requestw from '@/utils/requestw.js';
import api_login from '@/services/allApiStr/login.js';
import { key_card_myToken } from '@/utils/const.js';

export default {
	data() {
		return {
			second: 0,
			timer: null
		};
	},
	props: ['limitSecond', 'phoneNumber', 'styleStr'],
	/**
	 * 周期
	 */
	beforeCreate() {},
	created() {},
	beforeMount() {
		this.second = this.limitSecond;
	},
	mounted() {},
	beforeUpdate() {},
	updated() {},
	beforeDestroy() {},
	destroyed() {},
	/**
	/**
	 * 方法
	 */
	methods: {
		async getSms() {
			//验证
			if (this.phoneNumber == '' || !patternCreator.mobilePhone.pattern.test(this.phoneNumber)) {
				uni.showToast({ title: '请输入正确格式的手机号', icon: 'none', mask: true });
				return;
			}
			//验证 end

			uni.showLoading({ title: '请稍候...', mask: true });

			//一、doLogin
			let postData = {
				phone_number: this.phoneNumber
			};
			let res = await requestw({
				url: api_login.loginApi,
				data: postData
			});
			let token = '';
			if (res && res.resultCode == '200' && res.value && res.value.token) {
				token = res.value.token;
			}
			if (!token) {
				uni.hideLoading();
				uni.showModal({
					title: '提示',
					content: res.systemMessage || '登录失败',
					showCancel: false
				});
				return;
			}

			//二、获取验证码
			let postData2 = {
				token
			};
			let res2 = await requestw({
				url: api_login.getSMSApi,
				data: postData2
			});
			if (!res2 || res2.resultCode !== '200') {
				console.log(res2);
				uni.hideLoading();
				uni.showModal({
					title: '提示',
					content: res2.systemMessage || '操作失败',
					showCancel: false
				});
				return;
			}

			uni.showToast({ title: res2.systemMessage || '验证码发送成功', icon: 'none' });
			uni.setStorageSync(key_card_myToken, token);

			this.bgTimer();
		},
		bgTimer() {
			let timer = setInterval(() => {
				let nextSecond = this.second - 1;
				if (nextSecond < 0) {
					this.endTimer();
					return;
				}
				this.second = nextSecond;
			}, 1000);
			this.timer = timer;
		},
		endTimer() {
			clearInterval(this.timer);
			this.timer = null;
			this.second = this.limitSecond;
		}
	}
};
</script>

<style lang="less">
.second {
	color: #bcbcbc;
}
</style>
