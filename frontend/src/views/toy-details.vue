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
        <input
          type="text"
          placeholder="Add new review!"
          v-model="newReview.content"
        />
        <button>Save</button>
      </form>
    </article>
    <button @click="goBack">go back</button>
    <chat-room
      @msgSent="saveToy"
      @addMsg="addMsg"
      v-if="isChatOpen"
      :toy="toy"
    />
    <!-- <nice-popup class="chat" >
    <template #header></template>

    <p>Chat is currently offline.</p>

    <template #footer></template>
  </nice-popup> -->
    <div @click="isChatOpen = !isChatOpen" class="chat-widget">Chat</div>
  </section>
</template>

<script>
import { toyService } from "../services/toy.service.js";
// import nicePopup from '../components/nice-popup.vue';
import chatRoom from "../components/chat-room.vue";

export default {
  name: "toy-details",
  data() {
    return {
      toy: null,
      reviews: [],
      newReview: {
        userId: this.$store.getters.loggedinUser?._id || "",
        toyId: null,
        content: "",
      },
      isChatOpen: false,
    };
  },
  async created() {
    const { id } = this.$route.params;
    const toy = await toyService.getById(id);
    this.toy = toy;
    this.newReview.toyId = id;
    this.reviews = await this.$store.dispatch({
      type: "loadReviews",
      filterBy: { toyId: id },
    });
  },
  methods: {
    saveToy() {
      const toy = JSON.parse(JSON.stringify(this.toy));
      this.$store.dispatch({ type: "saveToy", toy });
    },
    addMsg(msg) {
      console.log("addMsg(msg) from details", msg);
      if (!this.toy.msgs) this.toy.msgs = [];
      this.toy.msgs.push(msg);
    },
    goBack() {
      this.$router.push("/");
    },
    async addReview() {
      await this.$store.dispatch({ type: "addReview", review: this.newReview });
    },
  },
  computed: {
    formatDate() {
      return new Date(this.toy.createdAt).toDateString();
    },
    formatPrice() {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(this.toy.price);
    },
    reviews() {
      return this.$store.getters.reviews;
    },
  },
  components: {
    chatRoom,
  },
};
</script>