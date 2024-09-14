<script setup>
import { useRoute, useRouter } from 'vue-router'
import useStore from './store/piniaStore'
// import authState from './utils/authState';
// import { useStore } from 'vuex';

const store = useStore()

const route = useRoute()
const router = useRouter()

// pinia
function logout() {
  const loggedOut = store.logout()

  if (loggedOut && route.meta.requiresAuth) {
    router.push({ name: 'login' })
  }
}

// vuex
// function logout() {
//   store.dispatch("logout")
//   if (!store.getters.isAuthenticated && route.meta.requiresAuth) {
//     router.push({name: "login"})
//   }
// }
</script>

<template>
  <section class="flex w-[1980px] max-w-[100%]">
    <aside
      class="bg-green-700 w-[20%] min-h-[100vh] text-gray-50 font-semibold border-r-2 border-r-violet-800"
    >
      <!-- pinia -->
      <span v-show="store.isAuthenticated" class="block p-5 bg-gray-50 text-gray-900"
        >Welcome, {{ store.name }}</span
      >
      <!-- vuex -->
      <!-- <span
        v-show="store.getters.isAuthenticated"
        class="block p-5 bg-gray-50 text-gray-900"
        >Welcome, {{ store.getters.name }}</span
      > -->
      <router-link
        class="block p-5 border-b-4 border-b-violet-800 hover:bg-green-600 hover:border-b-violet-600"
        :class="route.name == 'home' ? ['bg-green-600', 'border-b-violet-600'] : ''"
        :to="{ name: 'home' }"
        >Home</router-link
      >
      <router-link
        class="block p-5 border-b-4 border-b-violet-800 hover:bg-green-600 hover:border-b-violet-600"
        :class="route.name == 'about' ? ['bg-green-600', 'border-b-violet-600'] : ''"
        :to="{ name: 'about' }"
        >About Us</router-link
      >
      <router-link
        class="block p-5 border-b-4 border-b-violet-800 hover:bg-green-600 hover:border-b-violet-600"
        :class="route.name == 'contact' ? ['bg-green-600', 'border-b-violet-600'] : ''"
        :to="{ name: 'contact' }"
        >Contact Us</router-link
      >
      <router-link
        class="block p-5 border-b-4 border-b-violet-800 hover:bg-green-600 hover:border-b-violet-600"
        :class="route.name == 'blog' ? ['bg-green-600', 'border-b-violet-600'] : ''"
        :to="{ name: 'blog' }"
        >Blog</router-link
      >
      <!-- pinia -->
      <router-link
        v-if="!store.isAuthenticated"
        class="block p-5 border-b-4 border-b-violet-800 hover:bg-green-600 hover:border-b-violet-600"
        :class="route.name == 'login' ? ['bg-green-600', 'border-b-violet-600'] : ''"
        :to="{ name: 'login' }"
        >Log In</router-link
      >
      <!-- vuex -->
      <!-- <router-link
        v-if="!store.getters.isAuthenticated"
        class="block p-5 border-b-4 border-b-violet-800 hover:bg-green-600 hover:border-b-violet-600"
        :class="route.name == 'login' ? ['bg-green-600', 'border-b-violet-600'] : ''"
        :to="{ name: 'login' }"
        >Log In</router-link
      > -->
      <span
        v-else
        class="block p-5 border-b-4 border-b-violet-800 hover:bg-green-600 hover:border-b-violet-600 cursor-pointer"
        @click="logout()"
        >Log Out</span
      >
      <!-- composable -->
      <!-- <router-link
        v-if="!authState.isAuthenticated"
        class="block p-5 border-b-4 border-b-violet-800 hover:bg-green-600 hover:border-b-violet-600"
        :class="route.name == 'login' ? ['bg-green-600', 'border-b-violet-600'] : ''"
        :to="{ name: 'login' }"
        >Log In</router-link
      >
      <span
        v-else
        class="block p-5 border-b-4 border-b-violet-800 hover:bg-green-600 hover:border-b-violet-600 cursor-pointer"
        @click="authState.logout() ? $router.go() : undefined"
        >Log Out</span
      > -->
    </aside>

    <main class="w-[80%]">
      <header class="p-10 w-[100%] bg-gray-50 text-green-600 border-b-4 border-b-violet-600">
        <h2 class="text-2xl font-bold">The Blog</h2>
      </header>
      <router-view class="p-10"></router-view>
    </main>
  </section>
</template>

<style scoped></style>
