<template>
  <header class="app-header main-layout">
    <img class="logo" src="/src/assets/images/logo.png" />
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/dashboard">Dashboard</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/login">{{ checkUser }}</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
        user() {
            return this.$store.getters.loggedinUser;
        },
        checkUser() {
            return this.user ? `Welcome ${this.user.username}!` : 'Log-in / Sign-up!'
        }
  }
};


</script>