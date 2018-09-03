<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span class="block" @click="selectTotalRatings" :class="{active: isActive[0]}">
        全部<span class="count">{{ratings.length}}</span>
      </span>
      <span class="block" @click="selectUpRatings" :class="{active: isActive[1]}">
        推荐<span class="count">{{upRatings.length}}</span>
      </span>
      <span class="block" @click="selectDownRatings" :class="{active: isActive[2]}">
        吐槽<span class="count">{{downRatings.length}}</span>
      </span>
    </div>
    <div class="switch"  :class="{'on': hasContent}" @click="toggleHasContent">
      <span class="iconfont icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
  import {mapState,mapGetters} from 'vuex'
  export default {
    data() {
      return {
        hasContent: true,
        isActive: [true,false,false],
      }
    },
    computed: {
      ...mapState(['ratings']),
      ...mapGetters(['upRatings','downRatings'])
    },
    methods: {
      selectTotalRatings (){
        const {hasContent} = this
        let ratings = this.ratings
        this.isActive = [true,false,false]
        this.$emit('toggleSelect',{selectType: 0})
      },
      selectUpRatings (){
        const {hasContent} = this
        let ratings = this.upRatings
        this.isActive = [false,true,false]
        this.$emit('toggleSelect',{selectType: 1, hasContent})
      },
      selectDownRatings (){
        const {hasContent} = this
        let ratings = this.downRatings
        this.isActive = [false,false,true]
        this.$emit('toggleSelect',{selectType: 2, hasContent})
      },
      toggleHasContent (){
        this.hasContent = !this.hasContent
        this.$emit('toggleHasContent',{hasContent:this.hasContent})
      }
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"

  .ratingselect
    .rating-type
      padding: 18px 0
      margin: 0 18px
      border-1px(rgba(7, 17, 27, 0.1))
      font-size: 0
      .block
        display: inline-block
        padding: 8px 12px
        margin-right: 8px
        line-height: 16px
        border-radius: 1px
        font-size: 12px
        color: rgb(77, 85, 93)
        background: rgba(77, 85, 93, 0.2)
        &.active
          background: $green
          color: #fff
        .count
          margin-left: 2px
          font-size: 8px
    .switch
      padding: 12px 18px
      line-height: 24px
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      color: rgb(147, 153, 159)
      font-size: 0
      &.on
        .icon-check_circle
          color: $green
      .icon-check_circle
        display: inline-block
        vertical-align: top
        margin-right: 4px
        font-size: 24px
      .text
        display: inline-block
        vertical-align: top
        font-size: 12px
</style>

