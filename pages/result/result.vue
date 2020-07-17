<template>
	<view>
		<view class="container">
			<view class="icon"><u-icon name="order" size="150" color="#afafaf"></u-icon></view>
			<view class="title">请确认微信支付是否已完成</view>
			<view>
				<view class="u-border btn btn1" hover-class="btn_active" hover-stay-time="110" @tap.stop="success">已完成支付</view>
				<view class="u-border btn" hover-class="btn_active" hover-stay-time="110" @tap.stop="fail">支付遇到问题，重新支付</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getPayStatus } from '@/services/order.js';
import { key_card_unicom_lookingTradeNo, key_card_unicom_phone } from '@/utils/const.js';
export default {
	data() {
		return {};
	},
	methods: {
		async success() {
			let phone = uni.getStorageSync(key_card_unicom_phone);
			let tradeNo = uni.getStorageSync(key_card_unicom_lookingTradeNo);
			let flag = await getPayStatus(tradeNo);
			if (flag) {
				uni.redirectTo({
					url: '/pages/order/order?phone=' + phone
				});
			} else {
				uni.showModal({
					title: '提示',
					content: '获取支付状态失败，请您稍后尝试刷新',
					showCancel: false,
					success: () => {
						uni.redirectTo({
							url: '/pages/order/order?phone=' + phone
						});
					}
				});
			}
		},
		async fail() {
			let phone = uni.getStorageSync(key_card_unicom_phone);
			uni.redirectTo({
				url: '/pages/order/order?phone=' + phone
			});
		}
	} //methods
};
</script>

<style>
page {
	background-color: #fff;
}
</style>
<style lang="less" scoped>
@import './index.less';
</style>
