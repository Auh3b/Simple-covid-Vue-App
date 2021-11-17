<template>
  <div class="home">
    <!-- Header -->
   <Header />
   <!-- quickStats -->
   <div v-if="!loading" class="main-section w-full mx-auto">
   <div class="quick w-4/6 mb-10 mx-auto">
     <div class="mb-10 grid md:grid-2-cols lg:grid-cols-4 gap-4 px-5 py-3">
       <QuickStat v-for="quickStat in quickStats" :data="quickStat" :key="quickStat.category" @getClickedCategory="setClickedCategory"  />
     </div>
      <p class="text-center my-4 text-gray-600">Last Updated: {{formatDate(lastupdate) }}</p>
   </div>

   <!-- table and map -->
    <div class="detail px-4 md:px-10 mx-0 lg:mx-auto flex flex-col lg:flex-row gap-4 items-center justify-center ">
      <div id="table" class="w-full md:w-1/2 shadow-lg rounded">
        <DataTable :covidData="covidData"/>
      </div>
      <div id="map" class="w-2/2">
      <Map :covidData="covidData" :category="clickedCategory"/>
      </div>
    </div>
    <div class="chart hidden lg:block w-4/6 mx-10 mt-10 shadow-lg rounded mx-auto">
      <Chart :chartData="timelineData"/>
    </div>
   </div>
  <div v-else class="main-section">
    <p class="text-center my-4 text-gray-600">Loading...</p>
  </div>

  <div class="tooltip"></div>

  <!--footer  -->
  <Footer />
  </div>
</template>

<script>

import moment from "moment"
import Header from "@/components/Header"
import QuickStat from "@/components/QuickStat"
import DataTable from "@/components/DataTable"
import Map from "@/components/Map"
import Chart from "@/components/Chart"
import Footer from "@/components/Footer"

document.title = "Malawi Covid-19 Update"

export default {
  name: 'Home',
  components:{
    Header,
    QuickStat,
    DataTable,
    Map,
    Chart,
    Footer
  },
  data(){
    return{
      covidData:[],
      timelineData:[],
      quickStats:[],
      lastupdate:"",
      loading:true,
      clickedCategory:"numberOfRecoveredPatients"
    }
  },
  methods:{
    async fetchData(url){
      const res = await fetch(url)
      const data = await res.json()
      return data
    },
      getQuickStats(data){
      const quickStats = []
      const params = [
          {lookUp:"numberOfActiveCases", name: "Active Cases"},
          {lookUp:"numberOfConfirmedCases", name: "Total Cases"},
          {lookUp:"numberOfConfirmedDeaths", name: "Total Deaths"},
          {lookUp:"numberOfRecoveredPatients", name: "Total Recovered"}
           ]
      params.forEach(param =>{
        quickStats.push({name: param.name ,category: param.lookUp, stat:  data.districts.map(d => d[param.lookUp]).reduce((i, l)=> i + l)})
      })
      return quickStats
    },
    formatDate(x){
      return moment(x).format("Do MMMM YYYY")
    },
    setClickedCategory(category){
      this.clickedCategory = category
    }
  },
  async created(){
    const data = await this.fetchData("https://covid19.health.gov.mw/api/districts/aggregates")
    const timeline = await this.fetchData("https://disease.sh/v3/covid-19/historical/malawi?lastdays=all")
    this.timelineData = timeline.timeline
    this.covidData = data.districts
    this.quickStats = this.getQuickStats(data)
    this.lastupdate = data.lastupdate
    this.loading = false
  }
  
  
}
</script>
<style>

#table{
  height: 500px;
  overflow-y: scroll;
  overflow-x: hidden;
}
@media (max-width: 500px) {
  #table{
  overflow-x: scroll;
  }
  
}
</style>
