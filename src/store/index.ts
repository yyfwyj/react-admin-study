import { configureStore, combineReducers } from "@reduxjs/toolkit";
import loginSlice from "./module/login";
import userSlice from "./module/user";
import { decryptData, encryptData } from "@/utils/Crypto/crypto";
import persistReducer from "redux-persist/es/persistReducer";
import { persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // 使用localStorage存储

// 自定义持久化 Transform（加密/解密）
const encryptTransform = {
  in: (state: any) => {
    try {
      const jsonString = JSON.stringify(state);
      const encrypted = encryptData(jsonString);
      return encrypted;
    } catch (error) {
      console.error("加密转换失败:", error);
      return "";
    }
  }, // 存储时加密
  out: (state: string) => {
    console.log("解密前的状态:", state);
    try {
      if (!state) return {};
      const decrypted = decryptData(state);
      console.log("解密后的状态:", decrypted);
      return decrypted;
    } catch (error) {
      console.error("解密转换失败:", error);
      return {}; // 返回空对象以防止应用崩溃
    }
  }, // 获取时解密
};

// 持久化配置
const persistConfig = {
  key: 'root', // 存储的key
  storage, // 使用localStorage存储
  transforms: [encryptTransform], // 应用加密Transform
};

// 组合所有的reducer
const rootReducer = combineReducers({
  login: loginSlice.reducer,
  user: userSlice.reducer,
});

// 持久化根 Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 创建 Store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // 禁用序列化检查（因为 redux-persist 使用了非可序列化的 Transform）
    }),
});

// 创建持久化 Store
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;