<template>
  <div
    v-html="content"
    class="container p-3"
  ></div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const content = ref<string>(`<h1><strong>Contact Us for Know-It-All Toolbox</strong></h1>

<p>Last Updated: November 29, 2025</p>

<h2>1. Contact Us</h2>

<p>If you have any questions, please contact us at:</p>

<p><strong>Email:</strong> knowItAll@knowitalltoolbox.com</p>`);
</script>

<style scoped>
.container * {
  all: revert;
}
</style>
