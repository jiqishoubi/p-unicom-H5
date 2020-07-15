<template>
	<view>
		<view v-if="!timer" @tap="getSms" :style="styleStr">获取验证码</view>
		<view v-else class="second">{{ second }}s</view>
	</view>
</template>

<script>
import patternCreator from '@/utils/patternCreator.js'
import requestw from '@/utils/requestw.js'

export default {
	data() {
		return {
			second: 0,
			timer: null
		}
	},
	props: ['limitSecond', 'type', 'allUrl', 'phoneNumber', 'styleStr', 'validBeforeFlag'],
	/**
	 * 周期
	 */
	beforeCreate() {},
	created() {},
	beforeMount() {
		this.second = this.limitSecond
	},
	mounted() {},
	beforeUpdate() {},
	updated() {},
	beforeDestroy() {},
	destroyed() {},
	/**
	/**
	 * 方法
	 */
	methods: {
		async getSms() {
			//再之前的验证
			if (this.validBeforeFlag == false) {
				uni.showToast({ title: '图片和信息请上传/填写完整', icon: 'none', mask: true })
				return
			}
			//再之前的验证 end

			//验证
			if (this.phoneNumber == '' || !patternCreator.mobilePhone.pattern.test(this.phoneNumber)) {
				uni.showToast({ title: '请输入正确格式的手机号', icon: 'none', mask: true })
				return
			}
			//验证 end

			uni.showLoading({ title: '请稍候...', mask: true })
			let postData = {
				phoneNumber: this.phoneNumber
			}
			let res = await requestw({
				type: this.type ? this.type : 'post',
				url: this.allUrl,
				data: postData
			})
			// if (res.code !== 200) {
			// 	uni.showToast({ title: res.message ? res.message : '操作失败', icon: 'none', mask: true })
			// 	return
			// }
			if(res.resultCode!=='200'){
				uni.showToast({ title: res.systemMessage ? res.systemMessage : '操作失败', icon: 'none', mask: true })
				return
			}

			uni.showToast({ title: res.systemMessage, icon: 'none' })

			this.bgTimer()
		},
		bgTimer() {
			let timer = setInterval(() => {
				let nextSecond = this.second - 1
				if (nextSecond < 0) {
					this.endTimer()
					return
				}
				this.second = nextSecond
			}, 1000)
			this.timer = timer
		},
		endTimer() {
			clearInterval(this.timer)
			this.timer = null
			this.second = this.limitSecond
		}
	}
}
</script>

<style lang="less">
.second {
	color: #bcbcbc;
}
</style>
