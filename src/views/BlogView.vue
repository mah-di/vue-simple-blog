<script setup>
import axios from 'axios';
import { onBeforeMount, reactive, ref } from 'vue';

const limit = ref(10)
const skip = ref(0)
let posts = reactive([])
const totalPosts = ref(0)

function load() {
  axios.get(`https://dummyjson.com/posts?limit=${limit.value}&skip=${skip.value}`)
    .then(json => json.data)
    .then(data => {
      posts = [...posts, ...data.posts]
      totalPosts.value = data.total
      skip.value += Number(limit.value)
    })
}

onBeforeMount(() => load())
</script>

<template>
  <section>
    <div class="p-5 mb-10 bg-gray-50 ">
      <h2 class="font-bold text-xl">{{ totalPosts > skip ? skip : totalPosts }} / {{ totalPosts }} Blogs</h2>
    </div>
    <div class="px-5 py-10 bg-gray-50">
      <div class="pb-5 text-end">
        <span class="mr-2">Post Limit</span>
        <select class="py-1 px-4 rounded" v-model="limit">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      <div v-for="post in posts" :key="post.id" class="mb-2">
        <router-link :to="{name: 'post', params: {id: post.id}}" class="bg-white py-2 px-5 block ">
          <div class="flex flex-end">
            <p class="mb-5 text-lg font-semibold text-violet-400 grow">{{ post.title }}</p>
            <div>
              <span v-for="(tag, index) in post.tags" :key="index" class="mr-2 px-1 py-[1px] rounded-lg bg-gray-100 text-gray-800 text-xs">{{ tag }}</span>
            </div>
          </div>
          <div class="inline-block bg-gray-50 rounded-full">
            <span class="px-2 py-1 border-r border-r-gray-200 text-sm">&#128077; {{ post.reactions.likes }}</span>
            <span class="px-2 py-1 border-r border-r-gray-200 text-sm">&#128078; {{ post.reactions.dislikes }}</span>
            <span class="px-2 py-1 text-sm">&#128065; {{ post.views }}</span>
          </div>
        </router-link>
      </div>
      <div class="mt-10">
        <button v-show="totalPosts > skip" @click="load()" class="w-[100%] bg-blue-400 py-4 px-10 text-gray-50 font-semibold">Load More</button>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
