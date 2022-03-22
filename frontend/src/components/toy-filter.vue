<template>
  <section class="toy-filter">

    <div class="search">
       <input v-model="filterBy.name" @input="setFilter" type="text" placeholder="Search toy.." />
    </div>

  <div class="stock-filter">
    <label>
      | All |
      <input type="radio" value v-model="filterBy.stock" @change="setFilter" />
    </label>

    <label>
      | On stock |
      <input type="radio" value="true" v-model="filterBy.stock" @change="setFilter" />
    </label>

    <label>
     | Out of stock |
      <input type="radio" value="false" v-model="filterBy.stock" @change="setFilter" />
    </label>
        <el-select
      style="width: 150px"
      placeholder="Select category"
      @change="setFilter"
      multiple
      v-model="filterBy.labels"
      collapse-tags
      collapse-tags-tooltip
    >
      <el-option v-for="label in labels" :key="label" :label="label" :value="label" />
    </el-select>
    |
  </div>
 

    <label>
      Sort By:
      <select @change="setFilter" v-model="filterBy.sortBy">
        <option value="time">Time</option>
        <option value="name">Name</option>
        <option value="price">Price</option>
      </select>
    </label>
  </section>
</template>

<script>
export default {
  name: 'toy-filter',
  data() {
    return {
      filterBy: {
        name: '', stock: '', labels: [], sortBy: ''
      },
    };
  },
  methods: {
    setFilter() {
      this.$emit('setFilter', JSON.parse(JSON.stringify(this.filterBy)));
    },
  },
  computed: {
    labels() {
      return this.$store.getters.getLabels;
    }
  }
};
</script>
