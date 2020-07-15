<template>
	<view class="container" :style="'display:' + (visible ? 'block' : 'none') + ';'">
		<view class="modal">
			<view class="title_wrap">
				<view>请选择所在地区</view>
				<view @tap.stop="close">关闭</view>
			</view>

			<view class="tabs">
				<view v-for="(item, index) in list" :key="index" class="tabs_item" :class="{ active: index == current }" @tap.stop="change(index)">
					<view class="tabs_item_text">{{ item.selected ? item.selected.name : '请选择' }}</view>
				</view>
			</view>

			<view class="content"></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			visible: true,
			list: [
				{
					selected: null,
				},
				{
					selected: null,
				},
				{
					selected: null,
				}
			],
			current: 0,

			//数据缓存
			cache: {}
		};
	},
	computed:{
		showList(){
			
		}
	},
	beforeCreate() {},
	created() {},
	beforeMount() {},
	mounted() {},
	beforeUpdate() {},
	updated() {},
	beforeDestroy() {},
	destroyed() {},
	methods: {
		open() {
			this.visible = true;
		},
		close() {
			this.visible = false;
		},
		change(index) {
			this.current = index;
		},
		getList() {}
	} //methods
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
