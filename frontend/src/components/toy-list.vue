<template >
  <p v-if="isLoading">Loading...</p>
  <section class="toy-list main-layout" v-else>
    <carousel :breakpoints="breakpoints" :wrap-around="true">
      <slide v-for="toy in toys" :key="toy._id">
        <toy-preview @removeToy="removeToy"  :toy="toy"  />
      </slide>
          <template #addons>
      <Navigation />
      <Pagination />
    </template>
    </carousel>
  </section>
</template>

<script>
import toyPreview from './toy-preview.vue';
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
export default {

  name: 'toy-list',

  props: {
    toys: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      breakpoints: {

        400: {
          itemsToShow: 2
        },
        700: {
          itemsToShow: 3
        },
        900: {
          itemsToShow: 4
        },
        1300: {
          itemsToShow: 5
        }
      }
    }
  },
  components: {
    toyPreview,
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  methods: {
    removeToy(toyId) {
      this.$emit('removeToy', toyId);
    },
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    }
  }
};
</script>
