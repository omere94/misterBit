<template>
   <GMapMap
      :center="center"
      :zoom="14"
      map-type-id="terrain"
      style="width: 500px; height: 300px"
   >
      <GMapCluster>
         <GMapMarker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            @click="center = m.position"
         />
      </GMapCluster>
   </GMapMap>
</template>
<script>
   export default {
      name: 'App',
      data() {
         return {
            center: { lat: 32.00094236242111, lng: 34.73142477492578 },
            markers: [
               {
                  position: {
                     lat: 32.00094236242111,
                     lng: 34.73142477492578,
                  },
               }, // Along list of clusters
               {
                  position: {
                     lat: 32.02591861872609,
                     lng: 34.73909563991699,
                  },
               }, // Along list of clusters
               {
                  position: {
                     lat: 32.00787167143741,
                     lng: 34.73504682652268,
                  },
               }, // Along list of clusters
            ],
         }
      },
   }
</script>

<style>
   .vue-map-container {
       height: 400px;
      width: 40vw;
   }
</style>
