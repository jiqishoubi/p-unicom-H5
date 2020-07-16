<template>
	<view class="item">
		<view class="title">
			<view>订单号：{{ item.tradeNo || '-' }}</view>
			<view>{{ item.tradeStateName || '' }}</view>
		</view>
		<view class="content">
			<view class="p">{{ item.goodsName || '' }}</view>
			<view class="p">{{ item.custName || '' }} {{ item.phoneNumber || '' }}</view>
			<view class="p">{{ item.custAddress || '' }}</view>
			<view class="p">{{ item.tradeDateStr }}</view>
		</view>
		<view class="ctrl_wrap">
			<view class="count">&yen;{{ toMoney(item.totalAmount / 100) }}</view>
			<view class="btn_wrap">
				<view v-if="item.tradeState == '0'" class="u-border btn btn_zhifu" hover-class="btn_active" hover-stay-time="110" @tap.stop="clickBtn('onZhifu')">去支付</view>
				<view v-if="item.tradeState == '0'" class="u-border btn btn_cancel" hover-class="btn_active" hover-stay-time="110" @tap.stop="clickBtn('onCancel')">取消订单</view>
			</view>
		</view>
	</view>
</template>

<script>
import { toMoney } from '@/utils/utils.js';
export default {
	data() {
		return {
			toMoney
		};
	},
	props: {
		item: {
			type: Object,
			default: {}
		}
	},
	methods: {
		clickBtn(emitStr) {
			this.$emit(emitStr, this.item);
		}
	} //methods
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
