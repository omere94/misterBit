<template>
  <section class="toy-edit" v-if="toyToEdit">
  <h1>{{formTitle}}</h1>
    <form @submit.prevent="save">
    <label>
        Name of the toy?
      <input type="text" placeholder="Write the name here" v-model="toyToEdit.name" />
    </label>
    <label>
     Price of the toy?
      <input type="number" v-model="toyToEdit.price" min="0" max="150"/>
    </label>

      <label> On stock?
        <input type="checkbox" v-model="toyToEdit.inStock" />
      </label>
    <div class="categories">
      <p>Choose Categories:</p>
      <el-checkbox v-for="label in labels"
       :key="label" :label="label"
        v-model="toyToEdit.labels"
         size="medium" border />
    </div>





      <button>Save</button>
    </form>
  </section>
</template>

<script>

import { toyService } from '../services/toy.service.js';

export default {
  name: 'toy-edit',
  data() {
    return {
      toyToEdit: null,
    };
  },
 async created() {
    const { id } = this.$route.params;
    if (id) {
      // toyService.getById(id).then((toy) => {
      //   this.toyToEdit = toy;
      // });
      try{
        const toy = await toyService.getById(id)
        this.toyToEdit = toy;
      }catch(err) {
        console.log(err);
      }
    } else this.toyToEdit = toyService.getEmptyToy();
  },
  methods: {
    goBack() {
      this.$router.push('/');
    },
    async save() {
      try {
        await this.$store.dispatch({ type: 'saveToy', toy: this.toyToEdit })
        this.$router.push('/');
      }
      catch(err) {
        console.log(err)
      }
    },
  },
  computed: {
    labels() {
      return this.$store.getters.getLabels;
    },
    formTitle() {
            const { id } = this.$route.params;
            return id ? 'Edit Toy' : 'Add a new toy!';
    },
  }
};
</script>