<script setup>
useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp>
    <UHeader :toggle="false">
      <template #left>
        <NuxtLink to="/">奶蛙大笑</NuxtLink>
      </template>
      <template #right>
        <UColorModeButton />
      </template>
    </UHeader>
    <UMain>
      <NuxtPage />
    </UMain>
    <USeparator icon="i-simple-icons-nuxtdotjs" />
    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          {{ title }} • © {{ new Date().getFullYear() }}
        </p>
      </template>
      <template #right>
        <div class="flex items-center gap-2 px-2">
          <UButton
            label="赞助广告"
            to="https://omg10.com/4/11342781"
            target="_blank"
            rel="sponsored nofollow noopener"
            color="neutral"
            variant="ghost"
          />

          <UPopover mode="hover">
            <UButton
              to="/wallpapers/1.jpg"
              target="_blank"
              :avatar="{
                src: '/wallpapers/1.jpg',
                alt: '资源图片',
                loading: 'lazy'
              }"
              aria-label="资源图片"
              color="neutral"
              variant="ghost"
            />

            <template #content>
              <UAvatar
                src="/wallpapers/1.jpg"
                alt="资源图片预览"
                size="3xl"
                loading="lazy"
              />
            </template>
          </UPopover>
        </div>
      </template>
    </UFooter>
  </UApp>
</template>
