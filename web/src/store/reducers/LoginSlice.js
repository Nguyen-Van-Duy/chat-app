import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userId: null,
  isLogin: false,
  conversationId: ''
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload
      state.isLogin = true
    },
    setConversationId: (state, action) => {
      state.conversationId = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUserId, setConversationId } = loginSlice.actions

export default loginSlice.reducer;