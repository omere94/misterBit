<template>
    <section>
    <h2>By price</h2>
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
        this.showPrices()
    },
    methods: {
        showPrices() {
            var res = this.$store.getters.getToys.reduce((acc, toy) => {
                toy.labels.forEach(label => {
                    if (!acc[label]) {
                        acc[label] = {
                            total: toy.price,
                            amount: 1
                        };
                    }
                    else {
                        acc[label].total += toy.price;
                        acc[label].amount++;
                    }
                });
                return acc;
            }, {});
            for (const label in res) {
                this.data.labels.push(label);
                this.data.datasets[0].data.push((res[label].total / res[label].amount));
            }
        },
    },
};
    </script>