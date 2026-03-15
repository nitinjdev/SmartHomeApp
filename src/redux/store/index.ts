import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import authReducer from "../auth/authSlice";
import deviceReducer from "../devices/deviceSlice";
import energyReducer from '../energy/energySlice';
import { createAsyncStorage } from "@react-native-async-storage/async-storage";

// create a storage instance
export const asyncStorage = createAsyncStorage("appDB");

const reducers = combineReducers({
    auth: authReducer,
    devices: deviceReducer,
    energy:energyReducer
});

 const persistConfig = {
    key: 'root',
    storage: asyncStorage,

    // whitelist for persist data
    whitelist: ['auth', 'devices', 'energy'],
  };
  
  const persistedReducer = persistReducer(persistConfig, reducers);
  
  export const store = configureStore({
    reducer: persistedReducer,
  
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
  
  export const persistor = persistStore(store);