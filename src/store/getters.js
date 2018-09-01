export default {
  totalCount (state){
    return state.shopCart.reduce((prev,food)=>prev + food.count,0)
  },
  totalPrice (state){
    return state.shopCart.reduce((prev,food)=>prev + food.count*food.price,0)
  }
}
