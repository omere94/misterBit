<template>
<section class="toy-app">
  <toy-filter @setFilter="setFilter" />
  <toy-list v-if="toys" @removeToy="removeToy" :toys="toys" />
    <span class="add-toy">
      <router-link to="/edit">Add Toy</router-link>
    </span>


</section>

</template>

<script>
import toyList from '../components/toy-list.vue';
import toyFilter from '../components/toy-filter.vue';
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
  }
};
</script>

<style scoped>
</style>
