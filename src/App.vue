<template>
<div>
    <Header />
    <router-view/>
    <Footer />
</div>
</template>

<script>
import Header from "./components/layout/Header.vue"
import Footer from "./components/layout/Footer.vue"
import {mapActions} from "vuex"
import "./assets/tailwind.min.css"
export default {
  name: "App",
  components:{
    Header,
    Footer
  },
  methods:{
    ...mapActions({fetchData: "fetchCovidData"})
  },
  async created(){
    this.fetchData()
  }
}
</script>
