<template>
  <app-header />
  <router-view />
</template>

<script>
import appHeader from './components/app-header.vue';
export default {
  name: 'App',
    created() {
    this.$store.dispatch({ type: 'loadToys' })
  },
  components: {
    appHeader
  }
}

</script>