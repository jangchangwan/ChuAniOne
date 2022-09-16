const SET_TOKEN = 'set_token';

const AuthInitialState = {
  token: null
}

export const setToken = (token:any) => ({
  type: SET_TOKEN,
  token
})

export const AuthReducer = (state = AuthInitialState, action:any) => {
  switch(action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.token
      }
    default:
      return state;
  }
}