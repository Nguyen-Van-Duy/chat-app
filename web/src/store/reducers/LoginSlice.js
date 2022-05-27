import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userId: 'id',
  isLogin: false
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload
      state.isLogin = true
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUserId } = loginSlice.actions

export default loginSlice.reducer;