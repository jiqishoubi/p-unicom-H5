<template>
	<view>
		<view v-if="list && list.length > 0">
			<view v-for="(item, index) in list" :key="index" class="order_box">
				<order-item :item="item" @onZhifu="zhifuOrder" @onCancel="cancelOrder" @onRefund="refundOrder"></order-item>
			</view>
		</view>
		<no-result v-else></no-result>

		<confirm-modal ref="confirmModal"></confirm-modal>
	</view>
</template>

<script>
import orderItem from '@/components/order-item/order-item.vue';
import confirmModal from '@/components/confirm-modal/confirm-modal.vue';
import noResult from '@/components/noResult.vue';
import requestw from '@/utils/requestw.js';
import api_order from '@/services/allApiStr/order.js';
import { goPayAjax } from '@/services/order.js';
import { key_card_unicom_lookingTradeNo } from '@/utils/const.js';
export default {
	components: {
		orderItem,
		confirmModal,
		noResult
	},
	data() {
		return {
			phone: '',

			list: []
		};
	},
	onLoad(options) {
		if (options.phone) {
			this.phone = options.phone;
			this.getList();
		} else {
			uni.showToast({
				title: '参数缺失',
				icon: 'none'
			});
		}
	},
	onShow() {},
	onReady() {},
	onHide() {},
	onUnload() {},
	onPullDownRefresh() {
		setTimeout(() => {
			uni.stopPullDownRefresh();
		}, 400);
	},
	onReachBottom() {},
	onPageScroll() {},
	onBackPress() {},
	methods: {
		//获取
		async getList() {
			let postData = {
				phoneNumber: this.phone
			};
			uni.showLoading({
				title: '请稍候...'
			});
			let res = await requestw({
				url: api_order.getOrderListApi,
				data: postData
			});
			uni.hideLoading();
			if (res && res.resultCode == '200' && res.value) {
				this.list = res.value;
			}
		},
		//操作
		async zhifuOrder(item) {
			uni.showLoading({
				title: '请稍候...',
				mask: true
			});
			let res = await goPayAjax(item.tradeNo);
			uni.hideLoading();
			if (!res) {
				uni.showToast({
					title: '唤起支付失败',
					icon: 'none',
					mask: true
				});
				return;
			}

			uni.setStorageSync(key_card_unicom_lookingTradeNo, item.tradeNo);
			window.location.href = res;
		},
		cancelOrder(item) {
			this.$refs.confirmModal.open({
				str: '确认取消订单？',
				success: async () => {
					let postData = {
						tradeNo: item.tradeNo
					};
					uni.showLoading({
						title: '请稍候...'
					});
					let res = await requestw({
						url: api_order.cancelApi,
						data: postData
					});
					uni.hideLoading();
					if (res && res.resultCode == '200') {
						uni.showToast({
							title: '操作成功',
							mask: true
						});
						setTimeout(() => {
							this.getList();
						}, 1200);
					} else {
						uni.showToast({
							title: res.systemMessage || '网络异常',
							icon: 'none'
						});
					}
				}
			});
		},
		refundOrder(item) {
			this.$refs.confirmModal.open({
				str: '确认申请退款？',
				success: async () => {
					let postData = {
						tradeNo: item.tradeNo
					};
					uni.showLoading({
						title: '请稍候...'
					});
					let res = await requestw({
						url: api_order.refundApi,
						data: postData
					});
					uni.hideLoading();
					console.log(res);
					if (res && res.resultCode == '200') {
						uni.showToast({
							title: '操作成功',
							mask: true
						});
						setTimeout(() => {
							this.getList();
						}, 1200);
					} else {
						uni.showToast({
							title: res.systemMessage || '网络异常',
							icon: 'none'
						});
					}
				}
			});
		}
	} //methods
};
</script>

<style>
page {
	background-color: #f0f0f0;
}
</style>
<style lang="less" scoped>
@import './index.less';
</style>
