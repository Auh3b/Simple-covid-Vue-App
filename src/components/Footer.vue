<template>
    <footer class=" bg-gray-200 text-gray-500 px-5 py-10 text-center z-10 mt-10">
    <div class="main-footer flex flex-col items-center justify-center mx-auto w-5/6  gap-4">
        <p class="disclaimer text-justify">
            <b>Disclaimer:</b> All data displayed is courtesy from <a href="https://disease.sh/" target="_blank">NOVEL COVID19 API</a
          >
          and
          <a href="https://malawipublichealth.org/" target="_blank">PHIM</a>,
          and will be displayed when publicly available. We endeavour to keep
          the information up to date and correct, we make no representations or
          warranties of any kind, express or implied, about the completeness,
          accuracy, reliability, suitability or availability with respect to the
          website or the information, products, services, or related graphics
          contained on the website for any purpose. Any reliance you place on
          such information is therefore strictly at your
          <strong> own risk</strong>
        </p>
        <p class="u-full-width">
          Copyright &copy; PCK Data Analytics <span class="copy-date">{{year}}</span>
        </p>
    </div>
    </footer>
</template>
<script>
export default {
    name: "Footer",
    data(){
      return{
        year:""
      }
    },
    methods:{
      getYear(){
        let Year = new Date()
        this.year = Year.getFullYear()
      }
    },
    created(){
      this.getYear()
    }
}
</script>