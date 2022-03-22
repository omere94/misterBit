<template>
  <section v-if="toy">
    <article>
      <h3>{{ toy.name }}</h3>
      <p>
        <span>SKU:</span>
        {{ toy._id }}
      </p>
      <p>
        <span>Categories:</span>
      </p>
      <p v-for="label in toy.labels" :key="label">{{ label }}</p>
      <p>
        <span>PRICE:</span>
        {{ formatPrice }}
      </p>
      <p>
        <span>Placed on store at:</span>
        {{ formatDate }}
      </p>

      <h4>Reviews:</h4>
      <ul>
        <li v-for="review in reviews" :key="review._id">
          <p>{{ review.content }}</p>
        </li>
      </ul>
        <form @submit.prevent="addReview">
          <input type="text" placeholder="Add new review!" v-model="newReview.content" />
        <button>Save</button>
        </form>
    </article>
    <button @click="goBack">go back</button>
  </section>
  <pre>{{newReview}}</pre>
</template>

<script>
import { toyService } from '../services/toy.service.js';


export default {
  name: 'toy-details',
  data() {
    return {
      toy: null,
      reviews: [],
      newReview: {
          userId: this.$store.getters.loggedinUser._id,
          toyId: null,
          content: ''
      }
    };
  },
  async created() {
    const { id } = this.$route.params;
    const toy = await toyService.getById(id)
    this.toy = toy;
    this.newReview.toyId = id
    this.reviews = await this.$store.dispatch({type: 'loadReviews', id })
    // review = {toyId,content,userId}
    // method - addReview(review) - review-store - action - addReview() - service - post-AddReviews.
    // Controller - toyid - service - getReviews(toyId) - cretira.toyId = val -toyId
  },
  methods: {
    goBack() {
      this.$router.push('/');
    },
    async addReview() {
        await this.$store.dispatch({ type: 'addReview', review: this.newReview })
    }
  },
  computed: {
    formatDate() {
      return new Date(this.toy.createdAt).toDateString();
    },
    formatPrice() {
      return new Intl.NumberFormat('en-US',
        { style: 'currency', currency: 'USD' })
        .format(this.toy.price);
    },
    reviews() {
      return this.$store.getters.reviews;
    },
    user() {
      return 
    },
  }
};

</script>