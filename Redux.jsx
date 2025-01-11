
// run the command 
npm install @reduxjs/toolkit react-redux

//store.js

import { configureStore } from '@reduxjs/toolkit'
import reducerfunction  from 'slicefile'

export default configureStore({
  reducer: reducerfunction,
})

// slicefile.js
import { createSlice } from '@reduxjs/toolkit'

const initialUser = loadFromSessionStorage()

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    details:initialUser ,
  },
  reducers: {
    setdata: (state,action) => {
     state.userDetails = action.payload;
    },
    cleardata: (state,action) => {
      state.userDetails = null;
    },
  },
})

export const { setUser, clearUser } = counterSlice.actions;
export default userSlice.reducer;

//index.js


import store from './app/store'
import { Provider } from 'react-redux'

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
)

// selector function
import { useSelector, useDispatch } from 'react-redux'
 // counter is the name of name:"counter"
const count = useSelector((state) => state.counter.userDetails)

dispatch(decrement(data))
