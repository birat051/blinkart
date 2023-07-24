import { combineReducers } from 'redux';
import cartReducer from './reducers/cartReducer';
import { configureStore } from '@reduxjs/toolkit'
import { CartState } from './actions/cartActions';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';

export interface RootState {
  cart: CartState;
}

const rootReducer = combineReducers<RootState>({
  cart: cartReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'],
  };

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })

export const persistor = persistStore(store)

