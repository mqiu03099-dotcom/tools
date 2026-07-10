<template>
	<view class="page">
		<view v-if="userInfo" class="profile">
			<image class="avatar" :src="userInfo.avatarUrl" mode="aspectFill"></image>
			<view class="nickname">{{ userInfo.nickname }}</view>
			<view class="status">状态：{{ userInfo.status === 1 ? '正常' : '禁用' }}</view>
			<view class="stats">
				<view class="item">积分：{{ userInfo.pointsBalance }}</view>
				<view class="item">上传：{{ userInfo.uploadCount }}</view>
				<view class="item">下载：{{ userInfo.downloadCount }}</view>
				<view class="item">喜欢：{{ userInfo.likeCount }}</view>
				<view class="item">别人下载我的：{{ userInfo.downloadedByOthersCount }}</view>
				<view class="item">别人喜欢我的：{{ userInfo.likedByOthersCount }}</view>
			</view>
		</view>
		<view v-else class="empty">暂无用户信息</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: null
			}
		}
	}
</script>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: 24rpx;
		padding: 32rpx;
	}

	.profile {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20rpx;
	}

	.avatar {
		width: 128rpx;
		height: 128rpx;
		border-radius: 64rpx;
	}

	.nickname {
		font-size: 36rpx;
		font-weight: 600;
		color: #111111;
	}

	.status,
	.empty {
		font-size: 28rpx;
		color: #666666;
	}

	.stats {
		display: flex;
		flex-direction: column;
		gap: 16rpx;
		width: 100%;
		padding: 24rpx;
		background-color: #ffffff;
		border-radius: 16rpx;
	}

	.item {
		font-size: 28rpx;
		color: #333333;
	}
</style>
