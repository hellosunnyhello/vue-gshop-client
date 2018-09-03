export default {
  totalCount (state){
    return state.shopCart.reduce((prev,food)=>prev + food.count,0)
  },
  totalPrice (state){
    return state.shopCart.reduce((prev,food)=>prev + food.count*food.price,0)
  },
  upRatings (state){
    return state.ratings.filter((rating)=>rating.score > 3)
  },
  downRatings (state){
    return state.ratings.filter((rating)=>rating.score <= 3)
  }

}
