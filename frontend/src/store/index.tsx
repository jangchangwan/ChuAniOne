// persist관련
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// slice 불러오기
// import accountsReducer from '../components/accounts/accountsslice'
import {AuthReducer} from './authslice'
// thunk 관련
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import LoginReducer from './Loginslice'
const rootPersistConfig = {
  key: 'root',
  storage,
}

const rootReducers = combineReducers({

  // signup: signupReducer,
  // accounts : accountsReducer,
  auth: AuthReducer,
  login: LoginReducer
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducers)

// 직렬화 오류 해결 https://guiyomi.tistory.com/116
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
    devTools: process.env.NODE_ENV !== 'production',
})
export type AppDispatch = typeof store.dispatch;
export default store;
