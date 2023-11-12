/*eslint-disable */
import { configureStore, createSlice } from '@reduxjs/toolkit'

const user = createSlice({
  name : 'user',
  initialState : { name: 'kim', age : 20 },
  reducers : {
    changeName(state){
      state.name = 'park'
    },
    increaseAge(state){
      state.age += 1
    }
  }
});

export const { changeName, increaseAge } =  user.actions

const stock = createSlice({
  name : 'stock',
  initialState : [10, 11, 12],
})

const cart = createSlice({
  name : 'cart',
  initialState : [
    {id : 0, name : 'White and Black', count : 2},
    {id : 2, name : 'Grey Yordan', count : 1}
  ],
  reducers : {
    increaseCount(state, action){
      const item = state.find(item => item.id === action.payload);
      if (item){
        item.count += 1; 
      }
    },
    addToCart(state, action){
      const item = state.find(item => item.id === action.payload);
      if (item){
        alert("이미 있는 상품입니다");
      }else{
        state.push({...action.payload, count : 1})
      }
    }
  }
})

export const { increaseCount, addToCart } = cart.actions 

const store = configureStore({
  reducer: {
    user: user.reducer,
    stock : stock.reducer,
    cart : cart.reducer,
  },
});

export default store;