<template>
    <div class="flex w-2/3 mx-auto justify-between mb-10">
        <div v-for="(data, index) in quickStats" :key="index">
         <Stat :data="data"/>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import Stat from "./Stat.vue"
export default {
    name: "QuickStat",
    components:{
        Stat
    },
    computed: {
        ...mapGetters({ quickStats: "getQuickStats" }),
    },
};
</script>
