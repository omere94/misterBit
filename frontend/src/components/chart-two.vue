<template>
    <section>
        <h2>By Stock</h2>
        <PieChart :chartData="data" />
    </section>
</template>
   
   <script>
   import { PieChart } from 'vue-chart-3';
   import { Chart, registerables } from 'chart.js';
   Chart.register(...registerables);
   
   export default {
       components: { PieChart },
       data() {
           return {
               data: {
                   labels: [],
                   datasets: [
                       {
                           data: [],
                           backgroundColor: [
                            '#0070d2',
                            '#e83e8c',
                            '#ffee00',
                            '#008827',
                            '#d50b22',
                           ],
                       },
   
                   ]
               }
   
           };
       },
       created() {
           this.showLabels();
       },
       methods: {
           showLabels() {
               const toys = this.$store.getters.getToys;
               var outOfStock = toys.reduce((acc, toy) => {
                   if (!toy.inStock) acc++;
                   return acc;
               }, 0);
               this.data.labels.push('Out of stock');
               this.data.datasets[0].data.push(outOfStock);
               var res = toys.reduce((acc, toy) => {
                   if (toy.inStock) {
                       toy.labels.forEach(label => {
                           if (!acc[label]) acc[label] = 1;
                           else acc[label]++;
   
                       });
                   }
                   return acc;
               }, {});
               for (const label in res) {
                   this.data.labels.push(label);
                   this.data.datasets[0].data.push(res[label]);
               }
           },
   
   
       },
   };
   </script>