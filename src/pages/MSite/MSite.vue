<template>
  <section class="msite">
    <!--首页头部-->
    <header-top :title="address.name">
      <span slot="left" class="header_search">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span slot="right" class="header_login">
        <span class="header_login_text">登录|注册</span>
      </span>
    </header-top>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categoriesArr.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categories,index) in categoriesArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(category,index) in categories" :key="index">
              <div class="food_container">
                <img :src="baseUrl + category.image_url">
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>

        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <div v-else>
        <img src="./images/msite_back.svg"/>
      </div>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <shop-list></shop-list>
    </div>
  </section>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import ShopList from '../../components/ShopList/ShopList.vue'
  import {mapState} from 'vuex'
  export default {
    data (){
      return {
        baseUrl: 'https://fuss10.elemecdn.com'
      }
    },
    mounted (){
      this.$store.dispatch('getCategories')
      this.$store.dispatch('getShops')
    },
    components: {ShopList},
    computed: {
      ...mapState(['address','categories']),
      categoriesArr (){
        const outArr = []
        let innerArr = []
        const MAX = 8
        this.categories.forEach(c => {
          if(innerArr.length === 0){
            outArr.push(innerArr)
          }
          innerArr.push(c)
          if(innerArr.length === MAX){
            innerArr = []
          }
        })
        return outArr
      }
    },
    watch: {
      categories (){
        this.$nextTick(()=>{
          new Swiper('.swiper-container',{
            loop: true,
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
          })
        })
      }
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px

</style>
