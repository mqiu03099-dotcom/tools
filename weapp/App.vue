<script>
	import { ensureWeappLogin } from './services/auth.js'

	export default {
		onLaunch() {
			ensureWeappLogin().catch((error) => {
				uni.showToast({
					title: error.message || '登录失败',
					icon: 'none'
				})
			})
		}
	}
</script>

<style>
	page {
		background-color: #f5f5f5;
	}

	.page {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		gap: 24rpx;
		padding: 48rpx 32rpx;
		background-color: #f5f5f5;
		box-sizing: border-box;
	}
</style>
