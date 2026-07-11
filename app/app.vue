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
        <UPopover mode="hover">
          <UButton
            to="https://toolsbox.vip/44ec075511f9f2b3c6f4579295c6baf9.jpg"
            target="_blank"
            :avatar="{
              src: 'https://toolsbox.vip/44ec075511f9f2b3c6f4579295c6baf9.jpg',
              alt: '资源图片',
              loading: 'lazy'
            }"
            aria-label="资源图片"
            color="neutral"
            variant="ghost"
          />

          <template #content>
            <UAvatar
              src="https://toolsbox.vip/44ec075511f9f2b3c6f4579295c6baf9.jpg"
              alt="资源图片预览"
              size="3xl"
              loading="lazy"
            />
          </template>
        </UPopover>
      </template>
    </UFooter>
  </UApp>
</template>
