<script setup lang="ts">
import { ref } from "vue";

const count = ref(0);

async function countUp() {
  count.value++;
  try {
    const result = await fetch("/api/test");
    console.log(result);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
</script>

<template>
  <div class="mt-20 text-center">
    <p>{{ count }}</p>
    <button type="button" @click="countUp()">UP!</button>
  </div>
</template>
