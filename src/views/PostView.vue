<script setup>
import axios from 'axios';
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const postId = route.params.id
let post = ref(null)
let notFound = ref(null)

onBeforeMount(() => {
  axios.get(`https://dummyjson.com/posts/${postId}`)
    .then(json => json.data)
    .then(data => post.value = {...data})
    .catch(() => notFound.value = "Oops, Nothing Found")
})

function displayStats(stat) {
  try {
    return stat
  } catch {
    return ""
  }
}
</script>

<template>
  <section>
    <template v-if="Object.keys(post).length > 0">
      <div class="pb-10 border-b-2 border-b-violet-800">
        <h2 class="text-2xl font-bold mb-5">{{ post.title }}</h2>
        <div>
          <span v-for="(tag, index) in post.tags" :key="index" class="mr-3 py-[2px] px-2 bg-gray-50 rounded text-sm font-semibold">{{ tag }}</span>
        </div>
      </div>
      <div class="py-20 border-b-2 border-b-violet-800">
        <p>{{ post.body }}</p>
      </div>
      <div class="py-8 bg-gray-50">
          <span class="px-5 border-r border-r-gray-200 text-lg font-semibold">&#128077; {{ displayStats(post.reactions.likes) }}</span>
          <span class="px-5 border-r border-r-gray-200 text-lg font-semibold">&#128078; {{ displayStats(post.reactions.dislikes) }}</span>
          <span class="px-5 text-lg font-semibold">&#128065; {{ displayStats(post.views) }}</span>
      </div>
    </template>
    <template v-else>
      <div class="h-[80vh] flex flex-row justify-center items-center text-3xl text-gray-800 font-bold">
        {{ notFound }}
      </div>
    </template>
  </section>
</template>

<style scoped></style>
