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
import requestw from '@/utils/requestw.js';

const api_picker = {
	getListApi: '/app/queryAreaList'
};

export default {
	data() {
		return {
			visible: false,
			list: [
				{
					selected: null
				},
				{
					selected: null
				},
				{
					selected: null
				}
			],
			current: 0,

			//数据缓存
			cache: {}
		};
	},
	computed: {
		showList() {}
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
			this.init();
		},
		close() {
			this.visible = false;
		},
		change(index) {
			this.current = index;
		},
		init() {},
		async getList(parentCode) {
			let postData = {
				parentCode: parentCode || '2101'
			};
			let res = await requestw({
				url: api_picker.getListApi,
				data: postData
			});
		}
	} //methods
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
