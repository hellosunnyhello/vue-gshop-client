
import ajax from './ajax'
const BASE = '/api'
//[1、根据经纬度获取位置详情](#1根据经纬度获取位置详情)<br/>
export const reqAddress = geohash => ajax(`${BASE}/position/${geohash}`)

//[2、获取食品分类列表](#2获取食品分类列表)<br/>
export const reqCategories = () => ajax(BASE + '/index_category')

//根据经纬度获取商铺列表
export const reqShops = (latitude,longitude) => ajax(BASE + '/shops',{latitude,longitude})

//[4、根据经纬度和关键字搜索商铺列表](#4根据经纬度和关键字搜索商铺列表)<br/>
export const reqSearchShops = (keyword,geohash) => ajax(BASE + '/search_shops',{keyword,geohash})

//[6、用户名密码登陆](#6用户名密码登陆)<br/>
export const reqLoginPwd = ({name,pwd,captcha}) => ajax(BASE + '/login_pwd',{name,pwd,captcha},'POST')

//[7、发送短信验证码](#7发送短信验证码)<br/>
export const reqSendcode = phone => ajax(BASE + '/sendcode',{phone})

//[8、手机号验证码登陆](#8手机号验证码登陆)<br/>
export const reqLoginSms = ({phone,code}) => ajax(BASE + '/login_sms',{phone,code},'POST')

//[9、根据会话获取用户信息](#9根据会话获取用户信息)<br/>
export const reqUserInfo = () => ajax(BASE + '/userinfo')

//[10、用户登出](#10用户登出)<br/>
export const reqLogout = () => ajax(BASE + '/logout')

//获取商家的商品
export const reqShopGoods = () => ajax('/shop_goods')

//获取商家的评分
export const reqShopRatings = () => ajax('/shop_ratings')

//获取商家的详情
export const reqShopInfo = () => ajax('/shop_info')
