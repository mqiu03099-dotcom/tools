<template>
  <div>
    <UPageHero
      title="头像专区"
      description="这里会放置奶蛙大笑整理的头像内容，适合社交资料、聊天账号、好友头像和日常换头像时使用。"
      :links="[{
        label: '返回首页',
        to: '/',
        icon: 'i-lucide-house',
        color: 'neutral',
        variant: 'outline'
      }]"
    />

    <UPageSection
      title="后续头像内容会在这里展示"
      description="可以继续按可爱、搞怪、简约、情侣、好友等方向扩展头像分类。"
      :features="[{
        icon: 'i-lucide-smile',
        title: '可爱头像',
        description: '适合日常聊天和轻松风格的社交资料。'
      }, {
        icon: 'i-lucide-laugh',
        title: '搞怪头像',
        description: '更适合想表达幽默感和个性的场景。'
      }, {
        icon: 'i-lucide-users',
        title: '好友头像',
        description: '后续可以整理成套头像，方便好友一起使用。'
      }]"
    />
  </div>
</template>
