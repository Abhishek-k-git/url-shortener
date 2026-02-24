import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import urlReducer from './urlSlice'
import analyticsReducer from './analyticsSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    urls: urlReducer,
    analytics: analyticsReducer,
  },
})

export default store
