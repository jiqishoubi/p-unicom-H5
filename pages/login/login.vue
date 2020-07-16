<template>
	<view class="container">
		<view class="form">
			<view class="item"><input class="input" placeholder="请输入手机号码" v-model="phone" /></view>
			<view class="item">
				<input class="input" placeholder="请输入验证码" v-model="sms" />
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

export default {
	components: {
		getsmsbtn
	},
	data() {
		return {
			phone: '',
			sms: ''
		};
	},
	methods: {
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
				setTimeout(() => {
					uni.navigateTo({
						url: '/pages/details/details?phone='+this.phone
					});
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
