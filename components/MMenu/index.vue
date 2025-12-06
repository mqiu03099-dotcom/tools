<template>
  <ul class="menu flex-nowrap! menu-md bg-base-200 rounded-none p-3!">
    <li
      v-for="({ name, path }, index) in headerMenu"
      :key="index"
    >
      <MA :href="getHref({ path, name })">
        {{ name }}
      </MA>
    </li>
    <li
      v-for="(menu1, index1) in menu"
      :key="index1"
    >
      <MA
        v-if="!menu1.children"
        :href="getHref({ path: menu1.path, name: menu1.name })"
      >
        {{ menu1.name }}
      </MA>
      <details
        open
        v-else
      >
        <summary>
          {{ menu1.name }}
        </summary>
        <ul>
          <li
            v-for="(menu2, index2) in menu1.children"
            :key="index2"
          >
            <MA
              v-if="!menu2.children"
              :href="getHref({ path: menu2.path, name: menu2.name })"
            >
              {{ menu2.name }}
            </MA>
            <details
              open
              v-else
            >
              <summary>
                {{ menu2.name }}
              </summary>
              <ul>
                <li
                  v-for="(menu3, index3) in menu2.children"
                  :key="index3"
                >
                  <MA
                    v-if="!menu3.children"
                    :href="getHref({ path: menu3.path, name: menu3.name })"
                  >
                    {{ menu3.name }}
                  </MA>
                  <details
                    open
                    v-else
                  >
                    <summary>
                      {{ menu3.name }}
                    </summary>
                  </details>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </details>
    </li>
    <li
      v-for="({ name, path }, index) in footerMenu"
      :key="index"
    >
      <MA :href="getHref({ path, name })">
        {{ name }}
      </MA>
    </li>
  </ul>
</template>

<script lang="ts" setup>
const getHref = (value: Menu) => {
  const { name, path } = value;
  if (path) {
    return path;
  }
  if (name) {
    return `/detail/${name}`;
  }
  return "/";
};
</script>

<style scoped></style>
