<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
@import 'uview-ui/index.scss';
</style>

<style>
view,
input,
textarea,
button {
	font-size: 27rpx;
	font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif !important;
}
</style>
