<template>
	<view class="mask" :style="'display:' + (visible ? 'block' : 'none') + ';'" @tap="closeMask">
		<view class="img_box"><image class="img" :src="img" mode="widthFix"></image></view>
	</view>
</template>

<script>
import { isWeixin } from '@/utils/utils_h5.js';
const img = require('../../assets/guide_wechat_dld.png');
export default {
	data() {
		return {
			img,
			visible: false
		};
	},
	methods: {
		closeMask() {
			this.visible = false;
		},
		//返回true可以继续往下走
		checkOpen() {
			if (isWeixin()) {
				this.visible = true;
				return false;
			}
			return true;
		}
	}
};
</script>

<style lang="less" scoped>
@import '~utils/utils.less';

.mask {
	.maskStyle;
	background-color: rgba(0, 0, 0, 0.75);
	z-index: 66;
}
.img_box {
	position: absolute;
	top: 132rpx;
	right: 24rpx;
	z-index: 66;
	.img {
		width: 550rpx;
	}
}
</style>
