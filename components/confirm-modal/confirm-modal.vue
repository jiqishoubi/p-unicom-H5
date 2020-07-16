<template>
	<view class="mask" :style="'display:' + (visible ? 'block' : 'none') + ';'">
		<view class="modal">
			<view class="content">{{ options.str }}</view>
			<view class="btn_wrap">
				<view v-if="options.showCancel" class="btn btn1" hover-class="btn1_active" hover-stay-time="110" @tap.stop="cancel">取消</view>
				<view class="btn btn2" hover-class="btn2_active" hover-stay-time="110" @tap.stop="ok">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
const defaultOptions = {
	str: '确认执行当前操作？',
	showCancel: true,
	success: () => {}
};
export default {
	data() {
		return {
			visible: false,
			options: defaultOptions
		};
	},
	methods: {
		open(options) {
			if (options) {
				this.options = {
					...this.options,
					...options
				};
				console.log(this.options);
			}
			this.visible = true;
		},
		close() {
			this.visible = false;
			this.options = defaultOptions;
		},
		cancel() {
			this.close();
		},
		ok() {
			if (this.options.success) {
				this.options.success();
			}
			this.close();
		}
	} //methods
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
