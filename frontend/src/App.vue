<template>
  <section>
    <app-header />
    <router-view />
    <user-msg v-if="userMsg" :userMsg="userMsg"></user-msg>
  </section>
</template>

<script>
import appHeader from "./components/app-header.vue";
import userMsg from "./components/user-msg.vue";
export default {
  name: "App",
  created() {
    this.$store.dispatch({ type: "loadToys" });
  },
  components: {
    appHeader,
    userMsg,
  },
  computed: {
    userMsg() {
      return this.$store.getters.getUserMsg;
    },
  },
};
</script>