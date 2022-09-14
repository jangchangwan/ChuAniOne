// persist관련
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// slice 불러오기
import accountsReducer from '../components/accounts/accountsslice'

// thunk 관련
import { combineReducers, configureStore } from '@reduxjs/toolkit'

const rootPersistConfig = {
  key: 'root',
  storage,
}

const rootReducers = combineReducers({

  // signup: signupReducer,
  accounts : accountsReducer,
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

export default function configStore() {
  const persistor = persistStore(store)
  return { store, persistor }
}