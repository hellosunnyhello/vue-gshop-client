import Mock from 'mockjs'
import dataApi from './data.json'

Mock.mock('/shop_goods',{code:0,data:dataApi.goods})
Mock.mock('/shop_ratings',{code:0,data:dataApi.ratings})
Mock.mock('/shop_info',{code:0,data:dataApi.info})
