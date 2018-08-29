import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORIES,
  RECEIVE_SHOPS,
  RECEIVE_USERINFO
} from './mutation-types'

import {
  reqAddress,
  reqCategories,
  reqShops
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
  getUserInfo ({commit},user){
    commit(RECEIVE_USERINFO,{user})
  }
}
