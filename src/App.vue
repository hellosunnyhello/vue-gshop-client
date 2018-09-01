<template>
  <div id="app">
    <router-view></router-view>
    <footer-guide v-show="$route.meta.isShowFooter"></footer-guide>
  </div>
</template>

<script>
  import FooterGuide from './components/FooterGuide/FooterGuide.vue'
  import {reqShopInfo} from './api'
  export default {
    components:{FooterGuide},
    async mounted (){
      this.$store.dispatch('getAddress')
      this.$store.dispatch('getUserInfo')
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
