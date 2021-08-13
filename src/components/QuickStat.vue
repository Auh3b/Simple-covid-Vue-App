<template>
    <button @click="changeMap" class="card rounded py-5 px-4 text-center bg-gray-200 text-gray-800 hover:bg-gray-400 hover:text-gray-100 focus:bg-gray-800 focus:text-gray-100 divide-y divide-gray-300 ">
        <h3 class="font-bold  pb-1 mb-1 ">{{data.name}}</h3>
        <p class="text-3xl ">{{formatNum(data.stat) }}</p>
    </button>
</template>
<script>
export default {
    name:"QuickStat",
    props:['data'],
    data(){
        return{
            selection:"",
        }
    },
    methods:{
        formatNum(x){
              return x.toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
        changeMap(){
            const category = this.data.category
            this.isActive = !this.isActive
            this.$emit("getClickedCategory", category)
        }
    }
}
</script>