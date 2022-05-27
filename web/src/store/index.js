import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './reducers/LoginSlice'

export const store = configureStore({
  reducer: {
      loginSlice: loginSlice
  },
})
