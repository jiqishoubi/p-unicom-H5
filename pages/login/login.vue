<template>
	<view class="container">
		<view class="form">
			<view class="item"><input class="input" placeholder="请输入手机号码" v-model="phone" /></view>
			<view class="item">
				<input class="input" placeholder="请输入验证码" v-model="sms" />
				<getsmsbtn :limitSecond="60" :allUrl="allUrl" :phoneNumber="phone" styleStr="color: #999;"></getsmsbtn>
			</view>
		</view>

		<view class="btn" hover-class="btn_active" hover-stay-time="110" @tap="submit">登录</view>
	</view>
</template>
<script>
import getsmsbtn from '@/components/getsmsbtn.vue';
export default {
	components: {
		getsmsbtn
	},
	data() {
		return {
			allUrl: '',

			phone: '',
			sms: ''
		};
	},
	methods: {
		submit() {
			uni.navigateTo({
				url:'/pages/details/details'
			})
		}
	}
};
</script>

<style lang="less" scoped>
@import '~utils/utils.less';

.container {
	padding: 76rpx 24rpx 0;
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
