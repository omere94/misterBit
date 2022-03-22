<template >
<section class="toy-dashboard">
<h1>Toys statistics</h1>
<div class="charts">
    <chart-one v-if="toys" />
    <chart-two v-if="toys" />

</div>


</section>

</template>

<script>
import chartOne from '../components/chart-one.vue';
import chartTwo from '../components/chart-two.vue';

export default {
    data() {
        return {
        };
    },
    computed: {
        toys() {
            return this.$store.getters.getToys;
        },

    },
    components: {
        chartOne,
        chartTwo
    }
};
</script>
