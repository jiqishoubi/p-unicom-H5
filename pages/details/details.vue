<template>
	<view class="container">
		<view class="tips">请填写预约信息</view>

		<view class="goods_info">{{ productInfo.productName || '暂无商品信息' }}</view>

		<!-- 表单 -->
		<view class="form">
			<view class="form_title">填写订单</view>

			<view class="item">
				<view class="input_box">
					<u-field
						class="input_filed"
						label-width="0"
						clearable
						:field-style="{ fontSize: '27rpx' }"
						style="padding-left: 24rpx; padding-right: 24rpx;"
						v-model="userName"
						placeholder="请输入姓名"
					/>
				</view>
			</view>
			<view class="item">
				<view class="input_box">
					<u-field
						class="input_filed"
						label-width="0"
						clearable
						:field-style="{ fontSize: '27rpx' }"
						style="padding-left: 24rpx; padding-right: 24rpx;"
						v-model="phone"
						placeholder="请输入手机号"
					/>
				</view>
			</view>
			<view class="item">
				<view class="input_box">
					<!-- 市区选择 -->
					<picker
						class="input_picker"
						mode="multiSelector"
						:range="showPickerArr"
						:value="pickerBindValue"
						range-key="name"
						@columnchange="pickerColumnChange"
						@change="pickerConfirm"
						@cancel="pickerCancel"
					>
						{{ showPickerStr }}
					</picker>
				</view>
			</view>
			<view class="item">
				<view class="input_box">
					<u-field
						class="input_filed"
						label-width="0"
						clearable
						:field-style="{ fontSize: '27rpx' }"
						style="padding-left: 24rpx; padding-right: 24rpx;"
						v-model="address"
						placeholder="请输入详细地址"
					/>
				</view>
			</view>
		</view>
		<!-- 表单 end -->

		<view class="butie_wrap">
			<view class="butie_item" style="margin-bottom: 20rpx;">
				<text>商品金额</text>
				<text class="count">
					&yen;
					<text v-if="productInfo.productPrice">{{ toMoney(productInfo.productPrice / 100) }}</text>
					<text v-else>-</text>
				</text>
			</view>
			<view class="butie_item">
				<text>联通补贴</text>
				<text class="count count2">-&yen;{{ '600.00' }}</text>
			</view>
		</view>

		<view class="desc">
			<view style="margin-bottom: 5rpx;">温馨提示：</view>
			此商品享受联通直降600元的补贴优惠，下单后需办理联通99元的5G套餐合约，办理中需冻结您的花呗额度687元，请确保您已开通花呗，额度充足，以便联通官方人员上门为您办理，办理成功后无需您还款，联通每月按期为您还款，直至分期结束。
		</view>

		<view style="height: 90rpx;"></view>
		<view class="btn_wrap">
			<view class="endCount">&yen;{{ totalMoney }}</view>
			<view class="btn" hover-class="btn_active" hover-stay-time="110" @tap="submit">支付</view>
		</view>
	</view>
</template>

<script>
import uniIcons from '@/components/uni-ui/uni-icons/uni-icons.vue';
import rangeShiqu from '@/components/picker-area/area_shiqu.js';
import requestw from '@/utils/requestw.js';
import api_order from '@/services/allApiStr/order.js';
import { toMoney } from '@/utils/utils.js';
import patternCreator from '@/utils/patternCreator.js';
import { goPayAjax } from '@/services/order.js';
import { key_card_unicom_lookingTradeNo } from '@/utils/const.js';
import { openUrl } from '@/utils/utils_h5.js';
export default {
	components: {
		uniIcons
	},
	data() {
		return {
			toMoney,

			userName: '',
			phone: '',
			address: '',

			//市区
			rangeShiqu,
			pickerBindValue: [0, 0], //绑定的
			pickerValue: [null, null],
			//市区 end

			productInfo: {}
		};
	},
	computed: {
		showPickerArr() {
			let childArr = JSON.parse(JSON.stringify(this.rangeShiqu[this.pickerBindValue[0]].children));
			return [rangeShiqu, childArr];
		},
		showPickerStr() {
			let str = '请选择市区';
			if (this.pickerValue[0] !== null && this.pickerValue[1] !== null) {
				let shi = this.showPickerArr[0][this.pickerValue[0]].name;
				let qu = this.showPickerArr[1][this.pickerValue[1]].name;
				str = shi + qu;
			}
			return str;
		},
		totalMoney() {
			let str = '-';
			if (this.productInfo.productPrice) {
				let num = this.productInfo.productPrice / 100 - 600;
				if (num <= 0) {
					str = '0.01';
				} else {
					str = toMoney(num);
				}
			}
			return str;
		}
	},
	onLoad(options) {
		if (options.phone) {
			this.phone = options.phone;
			this.productId = options.productId;
		}
		this.getProductInfo();
	},
	methods: {
		//地区
		pickerColumnChange(e) {
			let valueArr = JSON.parse(JSON.stringify(this.pickerBindValue));
			let columnIndex = e.detail.column;
			let index = e.detail.value;
			valueArr[columnIndex] = index;
			this.pickerBindValue = valueArr;
		},
		pickerConfirm(e) {
			this.pickerValue = JSON.parse(JSON.stringify(e.detail.value));
		},
		pickerCancel() {
			if (this.pickerValue[0] !== null && this.pickerValue[1] !== null) {
				this.pickerBindValue = JSON.parse(JSON.stringify(this.pickerValue));
			}
		},
		//获取商品详情
		async getProductInfo() {
			let res = await requestw({
				url: api_order.getProductInfoApi,
				data: { productId: this.productId }
			});
			if (res && res.resultCode == '200' && res.value) {
				this.productInfo = res.value;
			} else {
				uni.showModal({
					title: '提示',
					content: res.systemMessage || '未查到商品信息',
					showCancel: false,
					success: () => {
						uni.navigateBack();
					}
				});
			}
		},
		//提交
		async submit() {
			//验证
			if (this.userName.trim() == '' || this.phone.trim() == '' || this.showPickerStr == '请选择市区' || this.address.trim() == '') {
				uni.showToast({
					title: '信息请填写完整',
					icon: 'none'
				});
				return;
			}
			if (!patternCreator.mobilePhone.pattern.test(this.phone)) {
				uni.showToast({
					title: '请输入正确格式的手机号',
					icon: 'none'
				});
				return;
			}
			//验证 end

			uni.showLoading({
				title: '请稍候...',
				mask: true
			});

			//一、下订单
			let address = this.showPickerStr + this.address;
			let postData = {
				custName: this.userName,
				goodsId: this.productInfo.productId,
				phoneNumber: this.phone,
				address
			};
			let res = await requestw({
				url: api_order.submitOrderApi,
				data: postData
			});
			if (!res || res.resultCode !== '200') {
				uni.showToast({
					title: res.systemMessage || '网络异常'
				});
				return;
			}

			//二、支付
			let tradeNo = res.value.tradeNo;
			let res2 = await goPayAjax(tradeNo);
			if (!res2) {
				uni.showToast({
					title: '唤起支付失败',
					icon: 'none',
					mask: true
				});
				setTimeout(() => {
					uni.redirectTo({
						url: '/pages/order/order?phone=' + this.phone
					});
				}, 1300);
				return;
			}

			uni.hideLoading();

			uni.setStorageSync(key_card_unicom_lookingTradeNo, tradeNo);
			openUrl(res2);
			uni.redirectTo({
				url: '/pages/result/result'
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
