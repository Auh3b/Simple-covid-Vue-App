<template>
  <div class="home">
   <div v-if="isLoading">
     <h1 class="text-center text-6xl">Loading...</h1>
   </div>
   <div v-else>
      <QuickStat />
    <!-- table and map -->
      <div class="detail px-4 md:px-10 mx-0 lg:mx-auto flex flex-col lg:flex-row gap-4 items-center justify-center ">
        <div id="table" class="w-full md:w-1/2 shadow-lg rounded">
          <DataTable />
        </div>
        <div>
          <Map />
        </div>
    </div>
    <Chart />
   </div>

  <div class="tooltip"></div>
  </div>
</template>

<script>
import QuickStat from "../components/QuickStat.vue"
import Map from "../components/Map.vue"
import Chart from "../components/Chart.vue"
import DataTable from "@/components/DataTable"
import { mapGetters } from 'vuex'


document.title = "Malawi Covid-19 Update"

export default {
  name: 'Home',
  components:{
    QuickStat,
    Map,
    Chart,
    DataTable,
  },
  computed:{
    ...mapGetters({isLoading: "getIsLoading"}),
    ...mapGetters({mapData: "getMapData"})
  }
}
</script>
<style>

.loading-screen{
  border-radius: 5px;
  display: grid;
  grid-template-columns: repeat(3, 200px);
  justify-content: center;
  gap: 10px;
}

.loading-element{
  width: 100%;
  height: 70px;
  display: flex;
  gap: 5px;
}

.loading-profile{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #555;
}

.loading-content{
  list-style: none;
}

.loading-content li{
  background: #555;
  height: 10px;
  border-radius: 20%;
}

.loading-content li:first-of-type(){
  width: 100%;
}

.loading-content li:last-of-type(){
  width: 30%;
}



.is-loading{
    animation: loading1 700ms alternate infinite ease-in-out;
}

@keyframes loading1 {
  from{
    background: #ccc;
  }
  to{
    background: #aaa;
  }
}

#table{
  height: 500px;
  overflow-y: scroll;
  overflow-x: hidden;
}
@media (max-width: 500px) {
  #table{
  overflow: scroll;
  }
  
}
</style>