import { combineReducers, configureStore } from "@reduxjs/toolkit";
import user1 from "./Slice/userSlice.js";
import courseReducer from './Slice/courseSlice.js'
import loadingBarSlice from './Slice/loadingBarSlice.js'
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import profileSlice from "./Slice/profileSlice.js"
import viewCourseSlice from "./Slice/viewCourseSlice.js"
const rootReducer = combineReducers(
  { 
    user: user1 ,
    course:courseReducer,
    profile:profileSlice,
    loadingBar:loadingBarSlice,
    viewCourse:viewCourseSlice,
    
});
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, // Use persistedReducer here
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Corrected spelling of "serializableCheck"
    }),
});

export const persistor = persistStore(store);