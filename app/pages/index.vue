<template>
  <div>
    <UPageHero
      title="奶蛙大笑"
      description="欢迎使用奶蛙大笑壁纸头像表情包网站，这里整理了适合聊天、社交资料、桌面和朋友圈使用的图片内容，帮你更快找到顺眼又有趣的素材。"
      :links="[{
        label: '开始使用',
        to: '/user',
        trailingIcon: 'i-lucide-arrow-right',
        size: 'xl'
      }, {
        label: '赞助广告',
        to: 'https://omg10.com/4/11342781',
        target: '_blank',
        rel: 'sponsored nofollow noopener',
        icon: 'i-lucide-badge-dollar-sign',
        size: 'xl',
        color: 'neutral',
        variant: 'subtle'
      }]"
    />

    <UPageSection
      id="features"
      title="壁纸、头像、表情包，一次找齐"
      description="按日常聊天、社交展示和设备美化场景整理内容，减少翻找成本，把常用素材放到更顺手的位置。"
      :features="[{
        icon: 'i-lucide-image',
        title: '精选壁纸',
        description: '整理适合手机和桌面的壁纸内容，清爽、可爱、个性风格都能快速浏览。'
      }, {
        icon: 'i-lucide-user-round',
        title: '头像合集',
        description: '收集适合社交资料、聊天账号和情侣好友使用的头像，方便按感觉挑选。'
      }, {
        icon: 'i-lucide-smile-plus',
        title: '表情包素材',
        description: '准备一些轻松好玩的表情包内容，聊天接梗、斗图和日常互动都能用上。'
      }, {
        icon: 'i-lucide-tags',
        title: '分类清晰',
        description: '围绕头像、壁纸、表情包等内容分类展示，进来就能知道该从哪里开始找。'
      }, {
        icon: 'i-lucide-sparkles',
        title: '风格轻松',
        description: '整体内容偏有趣、可爱和生活化，不追求复杂说明，只让素材更容易被看见。'
      }, {
        icon: 'i-lucide-refresh-cw',
        title: '持续补充',
        description: '后续可以继续扩展更多主题内容，让网站慢慢变成常用图片素材入口。'
      }]"
    />

    <UPageSection>
      <div class="flex flex-col items-center gap-8 px-4 py-16 text-center">
        <div class="flex max-w-4xl flex-col items-center gap-4">
          <h2 class="text-4xl font-bold tracking-tight text-highlighted sm:text-5xl">
            先挑一个喜欢的头像
          </h2>
          <p class="max-w-3xl text-lg text-muted">
            从头像专区开始浏览，找到合适的图片后再去看看壁纸和表情包内容。
          </p>
        </div>
        <div class="flex flex-wrap justify-center gap-3">
          <UButton
            label="进入头像专区"
            to="/avatar"
            trailing-icon="i-lucide-arrow-right"
            size="xl"
          />
          <UButton
            label="查看用户页"
            to="/user"
            icon="i-lucide-user"
            color="neutral"
            variant="outline"
            size="xl"
          />
        </div>
      </div>
    </UPageSection>
  </div>
</template>
