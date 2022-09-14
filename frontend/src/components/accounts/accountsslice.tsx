import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  loading: false,
  error: null,
  userstate: 0
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user = {}
    },
    savePoint: (state) => {

    },
  },
  extraReducers: {

  },
})

export const { resetUser, savePoint } = loginSlice.actions
export default loginSlice.reducer