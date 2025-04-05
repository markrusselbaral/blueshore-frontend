<template>
  <div class="app">
    <header class="app-header">
      <h1>My Vue App</h1>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>