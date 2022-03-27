<template>
  <section
    style="padding:10px; borderRadius:3px; backgroundColor: red; position: fixed;bottom: 50px ; left: 0"
    class="user-msg"
  >
    {{ userMsg }}
  </section>
</template>

<script>
export default {
  props: ["userMsg"],
};
</script>

<style>
</style>