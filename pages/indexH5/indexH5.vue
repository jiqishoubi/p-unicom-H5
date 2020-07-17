<template>
	<view class="page">
		<view class="goBtn" @tap.stop="goContent">我的订单</view>

		<view class="img_wrap"><image v-for="(item, index) in imgList" :key="index" :src="item.img" mode="widthFix" @tap.stop="clickItem(item)"></image></view>
	</view>
</template>

<script>
const imgList = [
	{ id: '1', img: require('../../assets/img1.png') },
	{ id: '1', img: require('../../assets/img2.png') },
	{ id: '1', img: require('../../assets/img3.png') },
	{ id: '1', img: require('../../assets/img4.png') },
	{ id: '1', img: require('../../assets/img5.png') }
];
export default {
	data() {
		return {
			imgList
		};
	},
	methods: {
		goContent() {
			uni.navigateTo({
				url: '/pages/login/login'
			});
		},
		clickItem(item) {
			if (item.id) {
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
