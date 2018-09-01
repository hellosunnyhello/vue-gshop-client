<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul ref="menu">
          <li class="menu-item" v-for="(good,index) in goods"
              :key="index" :class="{current: currentIndex===index}"
              @click="clickMenu(index)">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="foodList">
          <li class="food-list food-list-hook" v-for="(good,index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food,index) in good.foods" :key="index">
                <div class="icon">
                  <img width="57" height="57" :src="food.image">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cart-control :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <shop-cart />
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'
  import CartControl from '../../../components/CartControl/CartControl.vue'
  import ShopCart from '../../../components/ShopCart/ShopCart.vue'
  export default {
    data() {
      return {
        scrollY: 0,
        tops: []
      }
    },
    mounted(){
      this.$store.dispatch('getShopGoods',()=>{
        this.$nextTick(()=>{
          this._initScroll()
          this._initTops()
        })
      })
    },
    methods: {
      _initScroll(){
        this.menuScroll = new BScroll('.menu-wrapper',{
          click: true
        })
        this.foodsScroll = new BScroll('.foods-wrapper',{
          probeType: 2, //不监测惯性滑动和js编码滑动，js的scrollTo
          click: true
        })

        this.foodsScroll.on('scroll',({x,y})=>{
          this.scrollY = Math.abs(y)
        }),
        this.foodsScroll.on('scrollEnd',({x,y})=>{
          this.scrollY = Math.abs(y)
        })
      },
      _initTops (){
        //获取所有的food项，并且遍历求得
        const foods = this.$refs.foodList.getElementsByClassName('food-list-hook')
        let top = 0
        this.tops.push(top)
        for(var i=0;i<foods.length;i++){
          top += foods[i].clientHeight
          this.tops.push(top)
        }
      },
      clickMenu(index){
        this.scrollY = this.tops[index]
        this.foodsScroll.scrollTo(0,-this.tops[index],500)
      },
      //尽量将左侧菜单栏滑动到可视范围内
      _scrollMenuItem (index){
        if(this.menuScroll){
          const menuLi = this.$refs.menu.getElementsByClassName('menu-item')
          this.menuScroll.scrollToElement(menuLi[index],200)
        }
      }
    },
    computed: {
      ...mapState(['goods']),

      currentIndex (){
        //当前的scrollY大于等于当前的top，小于下一个top
        const index = this.tops.findIndex((top,index)=>
          this.scrollY >= top && this.scrollY < this.tops[index+1]
        )
        let preIndex = 0
        if(preIndex !== index){
          this._scrollMenuItem(index)
          preIndex = index
        }
        return index
      }
    },
    components:{CartControl,ShopCart}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 275px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: middle
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>

