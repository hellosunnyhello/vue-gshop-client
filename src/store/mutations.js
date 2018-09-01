import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORIES,
  RECEIVE_SHOPS,
  SAVE_USER,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_SHOP_GOODS,
  RECEIVE_SHOP_RATINGS,
  RECEIVE_SHOP_INFO,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT
} from './mutation-types'
import Vue from 'vue'
export default {
  [RECEIVE_ADDRESS] (state, {address}){
    state.address = address
  },
  [RECEIVE_CATEGORIES] (state, {categories}){
    state.categories = categories
  },
  [RECEIVE_SHOPS] (state, {shops}){
    state.shops = shops
  },
  [SAVE_USER] (state, {user}){
    state.user = user
  },
  [RECEIVE_USER_INFO] (state, {user}){
    state.user = user
  },
  [RESET_USER_INFO] (state){
    state.user = {}
  },
  [RECEIVE_SHOP_GOODS] (state,{goods}) {
    state.goods = goods
  },
  [RECEIVE_SHOP_RATINGS] (state,{ratings}){
    state.ratings = ratings
  },
  [RECEIVE_SHOP_INFO] (state,{info}) {
    state.info = info
  },
  [INCREMENT_FOOD_COUNT] (state,{food}) {
    //这里要考虑到food是之前存下的数据，已有数据绑定，
    // 直接新增的属性没有数据绑定，即使数据更新，界面也不会监测到更新
    if(!food.count){
      Vue.set(food,'count',1)
      state.shopCart.push(food)
    }else {
      food.count++
    }
  },
  [DECREMENT_FOOD_COUNT] (state,{food}) {
    //这里要考虑到food是之前存下的数据，已有数据绑定，
    // 直接新增的属性没有数据绑定，即使数据更新，界面也不会监测到更新
    if(food.count){
      food.count --
      if(food.count === 0){
        state.shopCart.splice(state.shopCart.indexOf(food),1)
      }
    }
  },
}
