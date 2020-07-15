<template>
	<view class="container">
		<view class="tips">请填写预约信息</view>

		<view class="form">
			<view class="item">
				<view class="label">
					<uni-icons type="phone-filled" size="14"></uni-icons>
					<view class="label_text">联系电话</view>
				</view>
				<view class="input_wrap">
					<view class="input"><input placeholder="请输入..." v-model="phone" /></view>
				</view>
			</view>

			<view class="item">
				<view class="label">
					<uni-icons type="location-filled" size="14"></uni-icons>
					<view class="label_text">办理地址</view>
				</view>
				<view class="input_wrap">
					<view class="input"><input placeholder="请输入..." /></view>
					<uni-icons type="arrowright" size="13" color="#8c8c8c"></uni-icons>
				</view>
			</view>

			<view class="item">
				<view class="label">
					<uni-icons type="shop" size="14"></uni-icons>
					<view class="label_text">办理门店</view>
				</view>
				<view class="input_wrap">
					<view class="input"><input placeholder="请输入..." /></view>
					<uni-icons type="arrowright" size="13" color="#8c8c8c"></uni-icons>
				</view>
			</view>
		</view>

		<view class="count">
			预付款
			<text style="padding: 0 7rpx 0 9rpx;">&yen;</text>
			<text style="font-weight: bold;">{{ '100.00' }}</text>
		</view>

		<view class="desc">此预约单享受联通信用优惠直降补贴资格，支付成功后，您需到线下格力门店办理相关业务及产品选购，如办理失败，全额给您退款。</view>

		<view class="btn" hover-class="btn_active" hover-stay-time="110" @tap="submit">支付</view>
		
		<picker-area></picker-area>
	</view>
</template>

<script>
import uniIcons from '@/components/uni-ui/uni-icons/uni-icons.vue';
import pickerArea from '@/components/picker-area/picker-area.vue'
export default {
	components: {
		uniIcons,
		pickerArea
	},
	data() {
		return {
			phone: ''
		};
	},
	methods: {
		submit() {}
	} //methods
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
