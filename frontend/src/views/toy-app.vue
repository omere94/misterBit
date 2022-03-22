<template>
<section class="toy-app">
  <toy-filter @setFilter="setFilter" />
  <toy-list v-if="toys" @removeToy="removeToy" :toys="toys" />

  <nice-popup class="chat" v-if="isChatOpen">
    <template #header></template>

    <p>Chat is currently offline.</p>

    <template #footer></template>
  </nice-popup>
    <span class="add-toy">
      <router-link to="/edit">Add Toy</router-link>
    </span>
    <div @click="isChatOpen = !isChatOpen" class="chat-widget">Chat</div>


</section>

</template>

<script>
import toyList from '../components/toy-list.vue';
import toyFilter from '../components/toy-filter.vue';
import nicePopup from '../components/nice-popup.vue';
export default {

  name: 'toy-app',
  data() {
    return {
      isChatOpen: false
    };
  },
  methods: {
    removeToy(toyId) {
      this.$store.dispatch({ type: 'removeToy', id: toyId });
    },
    setFilter(filterBy) {
      this.$store.dispatch({ type: 'filter', filterBy });
    },
  },
  computed: {
    toys() {
      return this.$store.getters.getToys;
    }
  },
  components: {
    toyList,
    toyFilter,
    nicePopup
  }
};
</script>

<style scoped>
</style>
