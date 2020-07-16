<template>
	<view class="box" :style="'padding-top:' + paddindTop + 'rpx;'">
		<image class="img" :style="'width:' + width + 'rpx;'" src="https://cdn.s.bld365.com/wcardnoResult_img.png" mode="widthFix"></image>
		<view class="title">{{ title }}</view>
	</view>
</template>

<script>
export default {
	data() {
		return {}
	},
	props: {
		width: {
			type: Number,
			default: 160
		},
		paddindTop: {
			type: Number,
			default: 65
		},
		title: {
			type: String,
			default: '暂无数据'
		}
	}
}
</script>

<style lang="less">
.box {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.img {
		height: auto;
	}
	.title {
		color: #999;
	}
}
</style>
