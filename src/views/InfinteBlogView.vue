<!-- Blog page with virtual list and infinite scrolling -->

<script setup>
import { ref, computed } from 'vue';
import { useVirtualList, useInfiniteScroll } from '@vueuse/core'
import axios from 'axios';

const data = ref([])
const totalPosts = ref(0)
const fetchedPosts = computed(() => data.value.length)
const skip = ref(0)

async function fetchPosts() {
    const response = await axios.get(
        `https://dummyjson.com/posts?limit=10&skip=${skip.value}`
    )
    const { posts, total } = response.data
    data.value.push(...posts)
    totalPosts.value = total

    skip.value += 10
}

const { list, containerProps, wrapperProps } = useVirtualList(data, {
    itemHeight: 108
})

useInfiniteScroll(containerProps.ref, async () => await fetchPosts(), {
    distance: 100
})
</script>

<template>
    <section>
      <div class="p-5 mb-10 bg-gray-50 ">
        <h2 class="font-bold text-xl">{{ fetchedPosts }} / {{ totalPosts }} Blogs</h2>
      </div>
      <div v-bind="containerProps" class="px-5 py-10 bg-gray-50 h-[70vh]">
        <div v-bind="wrapperProps">
            <div v-for="post in list" :key="post.index" class="mb-2 h-[100px]">
              <router-link :to="{name: 'post', params: {id: post.data.id}}" class="bg-white py-2 px-5 block h-[100%] flex flex-col justify-center">
                <div class="flex flex-end">
                  <p class="mb-5 text-lg font-semibold text-violet-400 grow">{{ post.data.title }}</p>
                  <div>
                    <span v-for="(tag, index) in post.data.tags" :key="index" class="mr-2 px-1 py-[1px] rounded-lg bg-gray-100 text-gray-800 text-xs">{{ tag }}</span>
                  </div>
                </div>
                <div>
                    <div class="inline-block bg-gray-50 rounded-full">
                      <span class="px-2 py-1 border-r border-r-gray-200 text-sm">&#128077; {{ post.data.reactions.likes }}</span>
                      <span class="px-2 py-1 border-r border-r-gray-200 text-sm">&#128078; {{ post.data.reactions.dislikes }}</span>
                      <span class="px-2 py-1 text-sm">&#128065; {{ post.data.views }}</span>
                    </div>
                </div>
              </router-link>
            </div>
        </div>
      </div>
    </section>
  </template>

<style scoped></style>