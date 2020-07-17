<template>
	<view class="page">
		<view class="goBtn" @tap.stop="goContent">我的订单</view>

		<view class="img_wrap"><image v-for="(item, index) in imgList" :key="index" :src="item.img" mode="widthFix" @tap.stop="clickItem(item)"></image></view>

		<wexin-tips ref="wexinTips"></wexin-tips>
	</view>
</template>

<script>
import wexinTips from '@/components/weixinTips/weixinTips.vue';
import imgList from './imgList.js';
export default {
	components: {
		wexinTips
	},
	data() {
		return {
			imgList
		};
	},
	methods: {
		goContent() {
			if (!this.$refs.wexinTips.checkOpen()) {
				return;
			}

			uni.navigateTo({
				url: '/pages/login/login'
			});
		},
		clickItem(item) {
			if (item.id) {
				if (!this.$refs.wexinTips.checkOpen()) {
					return;
				}

				uni.navigateTo({
					url: '/pages/login/login?productId=' + item.id
				});
			}
		}
	} //methods
};
</script>

<style lang="less" scoped>
@import '~utils/utils.less';

.page {
	position: relative;
}

.goBtn {
	.flexCenter;
	.flexJCenter;
	position: absolute;
	top: 60rpx;
	right: 0;
	width: 120rpx;
	height: 42rpx;
	background-color: @primaryColor;
	border-top-left-radius: 21rpx;
	border-bottom-left-radius: 21rpx;
	color: #fff;
	font-size: 23rpx;
	z-index: 55;
}

.img_wrap {
	font-size: 0;
	image {
		width: 100%;
		height: auto;
	}
}
</style>
