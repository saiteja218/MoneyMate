import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice.js'
import transactionReducer from './slices/transactionSlice.js'

export default configureStore({
  reducer: {
    auth: authReducer,
    transaction: transactionReducer,
  }
})