<script setup lang="ts">
import { ref } from 'vue'
import useAuth from '@/composables/useAuth'
import router from '@/router'

const { login, isLoading, error, isAuthenticated } = useAuth()
const email = ref<string>('')
const password = ref<string>('')

const handleLogin = async () => {
  await login(email.value, password.value)
  if (isAuthenticated.value) {
    router.push({ name: 'home' })
  }
}
</script>

<template>
  <div class="login-wrapper">
    <div class="login-card">
      <h2 class="login-title">Login to My Music App</h2>
      <p class="login-subtitle">Please enter your credentials</p>

      <form @submit.prevent="handleLogin" class="login-form">
        <span class="error">{{ error }}</span>
        <input type="email" v-model="email" placeholder="Email" class="login-input" required />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          class="login-input"
          required
        />
        <button type="submit" class="login-button" :disabled="isLoading">
          <span v-if="isLoading">...</span>
          <span v-else>Login</span>
        </button>
        <a href="/create">create account</a>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Courier New', Courier, monospace;
  height: 80vh;
}

.error {
  color: #ffcccc;
  font-size: 1rem;
  margin-bottom: 10px;
}

.login-card {
  background-color: #2c3e50;
  padding: 30px 40px;
  border-radius: 0.75rem;
  width: 100%;
  max-width: 400px;
  color: white;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
}

.login-title {
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.login-subtitle {
  font-size: 0.9rem;
  color: #ccc;
  margin-bottom: 25px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.login-input {
  padding: 12px 15px;
  border-radius: 0.5rem;
  border: none;
  outline: none;
  background-color: #1a252f;
  color: white;
  font-size: 0.9rem;
}

.login-input::placeholder {
  color: #aaa;
  font-family: 'Courier New', Courier, monospace;
}

.login-button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.3s ease;
  font-weight: bold;
  font-family: 'Courier New', Courier, monospace;
}

.login-button:hover {
  background-color: #2980b9;
}
</style>
