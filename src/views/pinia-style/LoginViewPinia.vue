<script setup>
import router from '@/router/router';
import useStore from '@/store/piniaStore';

const store = useStore()

function login() {
  const loginSuccess = store.login()

  if (loginSuccess) {
    router.push({name: "home"})
  } else {
    alert("Credentials don't match")
  }
}
</script>

<template>
  <section class="h-[80vh] flex flex-row justify-center items-center">
    <div class="bg-gray-50 min-w-[50%] max-w-full text-center">
      <div class="py-5 bg-green-700 border-b-2 border-b-violet-800">
        <h2 class="text-2xl font-semibold text-gray-50">Login</h2>
      </div>
      <div class="py-10 px-5 bg-gray-50">
        <div class="mb-5">
          <input v-model="store.email" type="text" class="py-2 px-4 rounded border border-violet-800" placeholder="Your Email">
        </div>
        <div>
          <input v-model="store.password" type="password" class="py-2 px-4 rounded border border-violet-800" placeholder="Your Password">
        </div>
      </div>
      <button @click="login()" class="py-2 w-full bg-violet-800 text-gray-50 text-lg font-semibold">Login</button>
    </div>
  </section>
</template>

<style scoped></style>
