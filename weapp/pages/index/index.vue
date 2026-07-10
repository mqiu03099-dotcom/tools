<template>
  <view class="page">
    <up-tag text="标签"></up-tag>
    <up-tag
      text="标签"
      type="warning"
    ></up-tag>
    <up-tag
      text="标签"
      type="success"
    ></up-tag>
    <up-tag
      text="标签"
      type="error"
    ></up-tag>
    <up-search
      placeholder="日照香炉生紫烟"
      v-model="keyword"
    ></up-search>
  </view>
</template>

<script>
export default {};
</script>

<style>
.title {
  font-size: 40rpx;
  font-weight: 600;
  color: #111111;
}

.desc {
  font-size: 28rpx;
  color: #666666;
}
</style>

