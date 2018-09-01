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

import {
  reqAddress,
  reqCategories,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopGoods,
  reqShopRatings,
  reqShopInfo
} from '../api'

export default {
  async getAddress ({commit,state}){
    const {latitude,longitude} = state
    const geohash = `${latitude},${longitude}`
    const result = await reqAddress(geohash)
    const address = result.data
    commit(RECEIVE_ADDRESS,{address})
  },
  async getCategories ({commit,state}){
    const result = await reqCategories()
    const categories = result.data
    commit(RECEIVE_CATEGORIES,{categories})
  },
  async getShops ({commit,state}){
    const {latitude,longitude} = state
    const result = await reqShops(latitude,longitude)
    const shops = result.data
    commit(RECEIVE_SHOPS,{shops})
  },
  updateUser ({commit},user){
    commit(SAVE_USER,{user})
  },
  async getUserInfo ({commit}){
    const result = await reqUserInfo()
    if(result.code === 0){
      const user = result.data
      commit(RECEIVE_USER_INFO,{user})
    }
  },
  async resetUser ({commit}){
    const result = await reqLogout()
    if(result.code === 0){
      commit(RESET_USER_INFO)
    }
  },

  async getShopGoods ({commit},callback){
    const result = await reqShopGoods()
    if(result.code === 0){
      const goods = result.data
      commit(RECEIVE_SHOP_GOODS,{goods})
      callback && callback()
    }
  },
  async getShopRatings ({commit}){
    const result = await reqShopRatings()
    if(result.code === 0){
      const ratings = result.data
      commit(RECEIVE_SHOP_RATINGS,{ratings})
    }
  },
  async getShopInfo ({commit}){
    const result = await reqShopInfo()
    if(result.code === 0){
      const info = result.data
      commit(RECEIVE_SHOP_INFO,{info})
    }
  },

  updateFoodCount ({commit},{food,isAdd}){
    if(isAdd){
      commit(INCREMENT_FOOD_COUNT,{food})
    }else {
      commit(DECREMENT_FOOD_COUNT,{food})
    }
  }

}
