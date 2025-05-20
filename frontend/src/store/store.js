import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice.js'
import transactionReducer from './slices/transactionSlice.js'
import savingsGoalReducer from './slices/savingsGoalSlice.js'

export default configureStore({
  reducer: {
    auth: authReducer,
    transaction: transactionReducer,
    savingsGoal: savingsGoalReducer,
  }
})