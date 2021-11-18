<template>
  <button @click="handleClick()" :class="'transition duration-200 ease-in-out p-5 rounded-md flex flex-col items-center '+ activeClass ">
      <h4 class="text-center">{{data.name}}</h4>
      <span class="text-center">{{formatNum(data.count)}}</span>
  </button>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
name:"state",
props:["data"],
data(){
  return{
    active: "bg-gray-800 text-gray-100",
    inactive:"border border-gray-500 text-gray-600"
  }
},
computed:{
  ...mapGetters({category: "getCategory"}),
  activeClass(){
    return this.category.alt === this.data.name ? this.active : this.inactive
  }
},
methods:{
  ...mapMutations(["setCategory","setMapData"]),
  handleClick (){
    this.setCategory(this.data.name)
    this.setMapData()
  },
  formatNum(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        ...mapMutations({setCategory: "setCategory"})
}
}
</script>

<style>

</style>